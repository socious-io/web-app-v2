export const removeIncompleteOpeningTags = (text: string) => {
  const openingTagRegex = /<[^>]*$/; // Matches an incomplete opening tag
  const regex = new RegExp(openingTagRegex.source, 'g');
  return text.replace(regex, '');
};