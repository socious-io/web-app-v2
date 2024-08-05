export const PREFERENCES_TOGGLES = [
  {
    key: 'HIRING',
    title: 'Hiring',
    subtitle: 'You are currently actively hiring professionals.',
    value: 'OFF',
  },
  {
    key: 'CRYPTO_PAYMENT_AVAILABLE',
    title: 'Crypto payment available',
    subtitle: 'Do you offer payment in crypto?',
    value: 'OFF',
  },
];

export const PREFERENCES_CULTURE_QUESTIONS = [
  {
    key: 'RISK_TAKING_VS_RISK_AVERSE',
    title: 'Risk-Taking vs. Risk-Averse',
    subtitle: 'Embracing Uncertainty vs. Prioritizing Safety',
    answers: [
      { label: 'Strongly embraces uncertainty', value: 'STRONG_HIGH' },
      { label: 'Moderately embraces uncertainty', value: 'MODERATE_HIGH' },
      { label: 'Neutral', value: 'NEUTRAL' },
      { label: 'Moderately prioritizes safety', value: 'MODERATE_LOW' },
      { label: 'Strongly prioritizes safety', value: 'STRONG_LOW' },
      { label: 'Prefer not say', value: 'PREFER_NOT_SAY' },
    ],
    value: '',
    description: '',
  },
  {
    key: 'RESULTS_DRIVEN_VS_PROCESS_ORIENTED',
    title: 'Results-Driven vs. Process-Oriented',
    subtitle: 'Outcome Focus vs. Methodical Approach',
    answers: [
      { label: 'Strongly outcome-focused', value: 'STRONG_HIGH' },
      { label: 'Moderately outcome-focused', value: 'MODERATE_HIGH' },
      { label: 'Neutral', value: 'NEUTRAL' },
      { label: 'Moderately process-oriented', value: 'MODERATE_LOW' },
      { label: 'Strongly process-oriented', value: 'STRONG_LOW' },
      { label: 'Prefer not say', value: 'PREFER_NOT_SAY' },
    ],
    value: '',
    description: '',
  },
  {
    key: 'AUTONOMY_VS_STRUCTURED_GUIDANCE',
    title: 'Autonomy vs. Structured Guidance',
    subtitle: 'Self-Directed Freedom vs. Supported Directions',
    answers: [
      { label: 'Strongly self-directed', value: 'STRONG_HIGH' },
      { label: 'Moderately self-directed', value: 'MODERATE_HIGH' },
      { label: 'Neutral', value: 'NEUTRAL' },
      { label: 'Moderately needs directions', value: 'MODERATE_LOW' },
      { label: 'Strongly needs directions', value: 'STRONG_LOW' },
      { label: 'Prefer not say', value: 'PREFER_NOT_SAY' },
    ],
    value: '',
    description: '',
  },
  {
    key: 'HONEST_FEEDBACK_VS_AVOID_CONFLICT',
    title: 'Honest Feedback vs Avoid Conflict',
    subtitle: 'Directness in Communication vs. Maintaining Harmony',
    answers: [
      { label: 'Strongly direct in communication', value: 'STRONG_HIGH' },
      { label: 'Moderately direct in communication', value: 'MODERATE_HIGH' },
      { label: 'Neutral', value: 'NEUTRAL' },
      { label: 'Moderately prefers maintaining harmony', value: 'MODERATE_LOW' },
      { label: 'Strongly prefers maintaining harmony', value: 'STRONG_LOW' },
      { label: 'Prefer not say', value: 'PREFER_NOT_SAY' },
    ],
    value: '',
    description: '',
  },
];
