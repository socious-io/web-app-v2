import i18next from 'i18next';
import { ValueGroup } from 'src/modules/Preferences/OrgPreferences/valueContainer/valueContainer.types';

export const PREFERENCES_VALUES: {
  group: ValueGroup;
  key: string;
  title: string;
  subtitle: string;
}[] = [
  {
    group: 'workLifeBalance',
    key: 'RELOCATION_ASSISTANCE',
    title: i18next.t('relocation-assistance'),
    subtitle: i18next.t('relocation-assistance-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'VISA_SUPPORT_AND_SPONSORSHIP',
    title: i18next.t('visa-support-sponsorship'),
    subtitle: i18next.t('visa-support-sponsorship-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'REMOTE_WORK_FLEXIBILITY',
    title: i18next.t('remote-work-flexibility'),
    subtitle: i18next.t('remote-work-flexibility-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'COMMUTER_BENEFITS',
    title: i18next.t('commuter-benefits'),
    subtitle: i18next.t('commuter-benefits-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'GENEROUS_VACATION_POLICY',
    title: i18next.t('generous-vacation-policy'),
    subtitle: i18next.t('generous-vacation-policy-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'CHILDCARE_SUPPORT',
    title: i18next.t('childcare-support'),
    subtitle: i18next.t('childcare-support-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'CASUAL_DRESS',
    title: i18next.t('casual-dress'),
    subtitle: i18next.t('casual-dress-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'PET_FRIENDLY_WORKPLACE',
    title: i18next.t('pet-friendly'),
    subtitle: i18next.t('pet-friendly-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'PARENTAL_LEAVE',
    title: i18next.t('parental-leave'),
    subtitle: i18next.t('parental-leave-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'WORK_LIFE_BALANCE_INITIATIVES',
    title: i18next.t('work-life-balance'),
    subtitle: i18next.t('work-life-balance-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'SABBATICALS',
    title: i18next.t('sabbaticals'),
    subtitle: i18next.t('sabbaticals-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'WELLNESS_BENEFITS',
    title: i18next.t('wellness-benefits'),
    subtitle: i18next.t('wellness-benefits-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'HEALTH_INSURANCE',
    title: i18next.t('health-insurance'),
    subtitle: i18next.t('health-insurance-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'HEALTH_AND_SAFETY_MEASURES',
    title: i18next.t('health-safety-measures'),
    subtitle: i18next.t('health-safety-measures-desc'),
  },
  {
    group: 'workLifeBalance',
    key: 'WORK_LIFE_BALANCE_AND_EMPLOYEE_HEALTH_OTHERS',
    title: i18next.t('others'),
    subtitle: '',
  },
  {
    group: 'benefits',
    key: 'COMPETITIVE_SALARY',
    title: i18next.t('competitive-salary'),
    subtitle: i18next.t('competitive-salary-desc'),
  },
  {
    group: 'benefits',
    key: 'EQUITY_AND_TOKEN_BENEFITS',
    title: i18next.t('token-benefits'),
    subtitle: i18next.t('token-benefits-desc'),
  },
  {
    group: 'benefits',
    key: 'PERFORMANCE_BONUSES',
    title: i18next.t('performance-bonuses'),
    subtitle: i18next.t('performance-bonuses-desc'),
  },
  {
    group: 'benefits',
    key: 'EMPLOYEE_RECOGNITION_PROGRAMS',
    title: i18next.t('employee-recognition-programs'),
    subtitle: i18next.t('employee-recognition-programs-desc'),
  },
  {
    group: 'benefits',
    key: 'EMPLOYEE_DISCOUNTS',
    title: i18next.t('employee-discounts'),
    subtitle: i18next.t('employee-discounts-desc'),
  },
  {
    group: 'benefits',
    key: 'RETIREMENT_PLANS',
    title: i18next.t('retirement-plans'),
    subtitle: i18next.t('retirement-plans-desc'),
  },
  {
    group: 'benefits',
    key: 'COMPANY_MEALS',
    title: i18next.t('company-meals'),
    subtitle: i18next.t('company-meals-desc'),
  },
  {
    group: 'benefits',
    key: 'FLEXIBLE_SPENDING_ACCOUNTS',
    title: i18next.t('flexible-spending-accounts'),
    subtitle: i18next.t('flexible-spending-accounts-desc'),
  },
  {
    group: 'benefits',
    key: 'EMPLOYEE_ASSISTANCE_PROGRAMS_EAP_',
    title: i18next.t('EAP'),
    subtitle: i18next.t('EAP-desc'),
  },
  { group: 'benefits', key: 'FAIR_COMPENSATION_AND_BENEFITS_OTHERS', title: i18next.t('others'), subtitle: '' },
  {
    group: 'growth',
    key: 'PROFESSIONAL_DEVELOPMENT',
    title: i18next.t('professional-development'),
    subtitle: i18next.t('professional-development-desc'),
  },
  {
    group: 'growth',
    key: 'LEADERSHIP_TRAINING_PROGRAMS',
    title: i18next.t('leadership-programs'),
    subtitle: i18next.t('leadership-programs-desc'),
  },
  {
    group: 'growth',
    key: 'LANGUAGE_LEARNING_SUPPORT',
    title: i18next.t('language-learning-support'),
    subtitle: i18next.t('language-learning-support-desc'),
  },
  {
    group: 'growth',
    key: 'MENTORSHIP_OPPORTUNITIES',
    title: i18next.t('mentorship-opportunities'),
    subtitle: i18next.t('mentorship-opportunities-desc'),
  },
  {
    group: 'growth',
    key: 'CAREER_PATHING_ASSISTANCE',
    title: i18next.t('career-pathing-assistance'),
    subtitle: i18next.t('career-pathing-assistance-desc'),
  },
  {
    group: 'growth',
    key: 'PERSONAL_DEVELOPMENT_PLANS',
    title: i18next.t('personal-development-plans'),
    subtitle: i18next.t('personal-development-plans-desc'),
  },
  {
    group: 'growth',
    key: 'CROSS_FUNCTIONAL_TRAINING',
    title: i18next.t('cross-functional-training'),
    subtitle: i18next.t('cross-functional-training-desc'),
  },
  {
    group: 'growth',
    key: 'PERFORMANCE_FEEDBACK_AND_COACHING',
    title: i18next.t('performance-feedback'),
    subtitle: i18next.t('performance-feedback-desc'),
  },
  {
    group: 'growth',
    key: 'NETWORKING_AND_RELATIONSHIP_BUILDING',
    title: i18next.t('networking'),
    subtitle: i18next.t('networking-desc'),
  },
  {
    group: 'growth',
    key: 'DIVERSITY_OF_ASSIGNMENT',
    title: i18next.t('diversity-of-assignment'),
    subtitle: i18next.t('diversity-of-assignment-desc'),
  },
  { group: 'growth', key: 'GROWTH_AND_LEARNING_OTHERS', title: i18next.t('others'), subtitle: '' },
  {
    group: 'diversity',
    key: 'GENDER_EQUITY',
    title: i18next.t('gender-equity'),
    subtitle: i18next.t('gender-equity-desc'),
  },
  {
    group: 'diversity',
    key: 'CULTURAL_DIVERSITY',
    title: i18next.t('cultural-diversity'),
    subtitle: i18next.t('cultural-diversity-desc'),
  },
  {
    group: 'diversity',
    key: 'RACIAL_AND_ETHNIC_EQUALITY',
    title: i18next.t('racial-ethnic-equality'),
    subtitle: i18next.t('racial-ethnic-equality-desc'),
  },
  { group: 'diversity', key: 'LGBTQ_INCLUSION', title: i18next.t('LGBTQ'), subtitle: i18next.t('LGBTQ-desc') },
  {
    group: 'diversity',
    key: 'ACCESSIBILITY_AND_ACCOMMODATION',
    title: i18next.t('accessibility'),
    subtitle: i18next.t('accessibility-desc'),
  },
  {
    group: 'diversity',
    key: 'NEURODIVERSITY_INCLUSION',
    title: i18next.t('neurodiversity-inclusion'),
    subtitle: i18next.t('neurodiversity-inclusion-desc'),
  },
  {
    group: 'diversity',
    key: 'AGE_DIVERSITY',
    title: i18next.t('age-diversity'),
    subtitle: i18next.t('age-diversity-desc'),
  },
  {
    group: 'diversity',
    key: 'SOCIOECONOMIC_INCLUSIVITY',
    title: i18next.t('socioeconomic-inclusivity'),
    subtitle: i18next.t('socioeconomic-inclusivity-desc'),
  },
  {
    group: 'diversity',
    key: 'MULTILINGUALISM_AND_COMMUNICATION',
    title: i18next.t('multilingualism'),
    subtitle: i18next.t('multilingualism-desc'),
  },
  {
    group: 'diversity',
    key: 'RELIGIOUS_AND_SPIRITUAL_RESPECT',
    title: i18next.t('religious-spiritual-respect'),
    subtitle: i18next.t('religious-spiritual-respect-desc'),
  },
  {
    group: 'diversity',
    key: 'DIVERSE_LEADERSHIP_REPRESENTATION',
    title: i18next.t('diverse-leadership'),
    subtitle: i18next.t('diverse-leadership-desc'),
  },
  {
    group: 'diversity',
    key: 'INCLUSIVE_PRACTICES',
    title: i18next.t('inclusive-practices'),
    subtitle: i18next.t('inclusive-practices-desc'),
  },
  {
    group: 'diversity',
    key: 'SOCIAL_EVENTS_AND_TEAM_BUILDING',
    title: i18next.t('social-events'),
    subtitle: i18next.t('social-events-desc'),
  },
  { group: 'diversity', key: 'DIVERSITY_EQUITY_AND_INCLUSION_DEI_OTHERS', title: i18next.t('others'), subtitle: '' },
  {
    group: 'environmentalImpacts',
    key: 'NET_ZERO_COMMITMENTS',
    title: i18next.t('net-zer-commitments'),
    subtitle: i18next.t('net-zer-commitments-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'RENEWABLE_ENERGY_USE',
    title: i18next.t('renewable-energy-use'),
    subtitle: i18next.t('renewable-energy-use-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'CARBON_FOOTPRINT_REDUCTION',
    title: i18next.t('carbon-footprint-reduction'),
    subtitle: i18next.t('carbon-footprint-reduction-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'WASTE_MANAGEMENT_AND_REDUCTION',
    title: i18next.t('waste-management'),
    subtitle: i18next.t('waste-management-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'SUSTAINABLE_RESOURCE_USE',
    title: i18next.t('sustainable-resource-use'),
    subtitle: i18next.t('sustainable-resource-use-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'ECO_FRIENDLY_PRODUCTS_AND_SERVICES',
    title: i18next.t('eco-friendly'),
    subtitle: i18next.t('eco-friendly-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'GREEN_BUILDING_AND_FACILITIES',
    title: i18next.t('green-building'),
    subtitle: i18next.t('green-building-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'WATER_CONSERVATION_INITIATIVES',
    title: i18next.t('water-conservation'),
    subtitle: i18next.t('water-conservation-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'SUSTAINABLE_SUPPLY_CHAIN_PRACTICES',
    title: i18next.t('sustainable-supply-chain'),
    subtitle: i18next.t('sustainable-supply-chain-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'BIODIVERSITY_PROTECTION',
    title: i18next.t('biodiversity-protection'),
    subtitle: i18next.t('biodiversity-protection-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'ENVIRONMENTAL_EDUCATION_AND_AWARENESS',
    title: i18next.t('environmental-education'),
    subtitle: i18next.t('environmental-education-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'POLLUTION_CONTROL_MEASURES',
    title: i18next.t('pollution-controlmeasures'),
    subtitle: i18next.t('pollution-controlmeasures-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'SUSTAINABLE_TRANSPORTATION_INITIATIVES',
    title: i18next.t('sustainable-transportation'),
    subtitle: i18next.t('sustainable-transportation-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'GREEN_PROCUREMENT_POLICIES',
    title: i18next.t('green-procurement-policies'),
    subtitle: i18next.t('green-procurement-policies-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'CLIMATE_CHANGE_MITIGATION',
    title: i18next.t('climate-change'),
    subtitle: i18next.t('climate-change-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'ENERGY_EFFICIENCY_PROGRAMS',
    title: i18next.t('energy-efficiency-programs'),
    subtitle: i18next.t('energy-efficiency-programs-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'REFORESTATION_AND_AFFORESTATION_PROJECTS',
    title: i18next.t('reforestation'),
    subtitle: i18next.t('reforestation-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'WILDLIFE_CONSERVATION_SUPPORT',
    title: i18next.t('wildlife'),
    subtitle: i18next.t('wildlife-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'SUSTAINABLE_AGRICULTURE_SUPPORT',
    title: i18next.t('sustainable-agriculture'),
    subtitle: i18next.t('sustainable-agriculture-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'ENVIRONMENTAL_CERTIFICATIONS',
    title: i18next.t('environmental-certifications'),
    subtitle: i18next.t('environmental-certifications-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'ZERO_WASTE_GOALS',
    title: i18next.t('zero-waste-goals'),
    subtitle: i18next.t('zero-waste-goals-desc'),
  },
  {
    group: 'environmentalImpacts',
    key: 'ENVIRONMENTAL_IMPACT_OTHERS',
    title: i18next.t('others'),
    subtitle: '',
  },
  {
    group: 'socialImpacts',
    key: 'COMMUNITY_ENGAGEMENT_PROGRAMS',
    title: i18next.t('community-engagement'),
    subtitle: i18next.t('community-engagement-desc'),
  },
  {
    group: 'socialImpacts',
    key: 'VOLUNTEERING_OPPORTUNITIES',
    title: i18next.t('volunteering-opportunities'),
    subtitle: i18next.t('volunteering-opportunities-desc'),
  },
  {
    group: 'socialImpacts',
    key: 'CHARITABLE_DONATIONS_AND_PARTNERSHIPS',
    title: i18next.t('charitable-donations'),
    subtitle: i18next.t('charitable-donations-desc'),
  },
  {
    group: 'socialImpacts',
    key: 'CORPORATE_SOCIAL_RESPONSIBILITY_INITIATIVES',
    title: i18next.t('corporate-social-responsibility'),
    subtitle: i18next.t('corporate-social-responsibility-desc'),
  },
  {
    group: 'socialImpacts',
    key: 'SOCIAL_ADVOCACY',
    title: i18next.t('social-advocacy'),
    subtitle: i18next.t('social-advocacy-desc'),
  },
  {
    group: 'socialImpacts',
    key: 'ETHICAL_SUPPLY_CHAIN_MANAGEMENT',
    title: i18next.t('ethical-supply-chain'),
    subtitle: i18next.t('ethical-supply-chain-desc'),
  },
  {
    group: 'socialImpacts',
    key: 'DISASTER_RELIEF_AND_EMERGENCY_SUPPORT',
    title: i18next.t('disaster-relief-support'),
    subtitle: i18next.t('disaster-relief-support-desc'),
  },
  {
    group: 'socialImpacts',
    key: 'EMPLOYEE_MATCHING_GIFT_PROGRAMS',
    title: i18next.t('employee-matching-gift'),
    subtitle: i18next.t('employee-matching-gift-desc'),
  },
  { group: 'socialImpacts', key: 'SOCIAL_IMPACT_OTHERS', title: i18next.t('others'), subtitle: '' },
  {
    group: 'transparency',
    key: 'TRANSPARENCY_IN_OPERATIONS',
    title: i18next.t('transparency-operations'),
    subtitle: i18next.t('transparency-operations-desc'),
  },
  {
    group: 'transparency',
    key: 'OPEN_COMMUNICATION_CHANNELS',
    title: i18next.t('open-communication'),
    subtitle: i18next.t('open-communication-desc'),
  },
  {
    group: 'transparency',
    key: 'ETHICAL_CONDUCT_POLICIES',
    title: i18next.t('ethical-conduct-policies'),
    subtitle: i18next.t('ethical-conduct-policies-desc'),
  },
  {
    group: 'transparency',
    key: 'FINANCIAL_INTEGRITY_AND_REPORTING',
    title: i18next.t('financial-integrity'),
    subtitle: i18next.t('financial-integrity-desc'),
  },
  {
    group: 'transparency',
    key: 'REGULATORY_COMPLIANCE',
    title: i18next.t('regulatory-compliance'),
    subtitle: i18next.t('regulatory-compliance-desc'),
  },
  {
    group: 'transparency',
    key: 'RESPONSIBLE_SUPPLY_CHAIN_MANAGEMENT',
    title: i18next.t('responsible-supply-chain'),
    subtitle: i18next.t('responsible-supply-chain-desc'),
  },
  {
    group: 'transparency',
    key: 'DATA_PRIVACY_AND_SECURITY',
    title: i18next.t('data-privacy-security'),
    subtitle: i18next.t('data-privacy-security-desc'),
  },
  {
    group: 'transparency',
    key: 'RISK_MANAGEMENT_AND_MITIGATION',
    title: i18next.t('risk-management'),
    subtitle: i18next.t('risk-management-desc'),
  },
  {
    group: 'transparency',
    key: 'CORPORATE_ETHICS_TRAINING',
    title: i18next.t('corporate-ethics-training'),
    subtitle: i18next.t('corporate-ethics-training-desc'),
  },
  {
    group: 'transparency',
    key: 'CORPORATE_GOVERNANCE_STANDARDS',
    title: i18next.t('corporate-governance-standards'),
    subtitle: i18next.t('corporate-governance-standards-desc'),
  },
  { group: 'transparency', key: 'TRANSPARENCY_AND_ETHICAL_PRACTICES_OTHERS', title: i18next.t('others'), subtitle: '' },
];

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
