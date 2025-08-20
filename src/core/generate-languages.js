import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import process from 'process';

dotenv.config();

const DEFAULT_LANGUAGES = ['Spanish', 'Japanese', 'Korean'];
const OUTPUT_BASE = './src/core/translation/locales/';
const fallbackLangCodes = {
  spanish: 'es',
  japanese: 'jp',
  korean: 'kr',
};

// Validate API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ Missing environment variables.');
  process.exit(1);
}

// Input files
const inputFiles = process.argv.slice(2);
if (!inputFiles.length) {
  console.error('❌ No input files provided.');
  process.exit(1);
}

// Translation using Gemini API
async function translateWithGemini(text, targetLanguage) {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `Translate the following JSON content to ${targetLanguage}. Preserve the JSON structure and keys. Only return valid JSON.\n\n${text}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
      },
    );

    const result = response.data;
    const translated = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('✅ Gemini Response:', translated);
    return translated.trim();
  } catch (err) {
    console.error('❌ API call failed:', err.response?.data || err.message);
  }
}

// Resolve language code
function getLangCode(language) {
  const lang = new Intl.DisplayNames(['en'], { type: 'language' });

  try {
    for (const code of Intl.getCanonicalLocales('en')) {
      const name = lang.of(code);
      if (name?.toLowerCase() === language.toLowerCase()) {
        return code;
      }
    }
  } catch (err) {
    console.error(`❌ Failed to get code of ${lang}:`, err.message);
  }

  return fallbackLangCodes[language.toLowerCase()] || language.toLowerCase().slice(0, 2);
}

// Remove Gemini Response and Extract JSON
function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

// Translate a file
async function generateTranslationFile(inputFile, targetLanguages = DEFAULT_LANGUAGES, outputBase = OUTPUT_BASE) {
  const originalJson = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  const originalText = JSON.stringify(originalJson, null, 2);
  const inputFileName = path.basename(inputFile);

  for (const lang of targetLanguages) {
    console.log(`🔄 Translating to ${lang}...`);
    try {
      const raw = await translateWithGemini(originalText, lang);
      const translatedText = extractJson(raw) || '';
      const parsed = JSON.parse(translatedText);

      const code = getLangCode(lang);
      const outputDir = path.join(outputBase, code);
      const outputPath = path.join(outputDir, inputFileName);
      fs.writeFileSync(outputPath, JSON.stringify(parsed, undefined, 2));
      fs.mkdirSync(outputDir, { recursive: true });

      console.log(`✅ Saved: ${translatedText} with "${code}" code in ${outputPath}`);
    } catch (err) {
      console.error(`❌ Failed to translate to ${lang}:`, err.message);
    }
  }
}

// Translate All Files
(async () => {
  for (const inputFile of inputFiles) {
    if (!inputFile.endsWith('.json') || !fs.existsSync(inputFile)) {
      console.error(`❌ Skipping invalid file: ${inputFile}`);
      continue;
    }

    try {
      await generateTranslationFile(inputFile);
    } catch (err) {
      console.error(`❌ Error processing file ${inputFile}:`, err.message);
    }
  }
})();
