export const SocialCauses = {
  SOCIAL: 'SOCIAL',
  POVERTY: 'POVERTY',
  HOMELESSNESS: 'HOMELESSNESS',
  HUNGER: 'HUNGER',
  HEALTH: 'HEALTH',
  SUBSTANCE_ABUSE: 'SUBSTANCE_ABUSE',
  MENTAL: 'MENTAL',
  BULLYING: 'BULLYING',
  SECURITY: 'SECURITY',
  EDUCATION: 'EDUCATION',
  GENDER_EQUALITY: 'GENDER_EQUALITY',
  GENDER_BASED_VIOLENCE: 'GENDER_BASED_VIOLENCE',
  SEXUAL_VIOLENCE: 'SEXUAL_VIOLENCE',
  DOMESTIC_VIOLENCE: 'DOMESTIC_VIOLENCE',
  WATER_SANITATION: 'WATER_SANITATION',
  SUSTAINABLE_ENERGY: 'SUSTAINABLE_ENERGY',
  DECENT_WORK: 'DECENT_WORK',
  INEQUALITY: 'INEQUALITY',
  MINORITY: 'MINORITY',
  MULTICULTURALISM: 'MULTICULTURALISM',
  DIVERSITY_INCLUSION: 'DIVERSITY_INCLUSION',
  INDIGENOUS_PEOPLES: 'INDIGENOUS_PEOPLES',
  DISABILITY: 'DISABILITY',
  LGBTQI: 'LGBTQI',
  REFUGEE: 'REFUGEE',
  MIGRANTS: 'MIGRANTS',
  ORPHANS: 'ORPHANS',
  CHILD_PROTECTION: 'CHILD_PROTECTION',
  COMMUNITY_DEVELOPMENT: 'COMMUNITY_DEVELOPMENT',
  DEPOPULATION: 'DEPOPULATION',
  OVERPOPULATION: 'OVERPOPULATION',
  HUMAN_RIGHTS: 'HUMAN_RIGHTS',
  SUSTAINABILITY: 'SUSTAINABILITY',
  RESPONSIBLE_CONSUMPTION: 'RESPONSIBLE_CONSUMPTION',
  CLIMATE_CHANGE: 'CLIMATE_CHANGE',
  NATURAL_DISASTERS: 'NATURAL_DISASTERS',
  BIODIVERSITY: 'BIODIVERSITY',
  ANIMAL_RIGHTS: 'ANIMAL_RIGHTS',
  ARMED_CONFLICT: 'ARMED_CONFLICT',
  PEACEBUILDING: 'PEACEBUILDING',
  DEMOCRACY: 'DEMOCRACY',
  CIVIC_ENGAGEMENT: 'CIVIC_ENGAGEMENT',
  JUSTICE: 'JUSTICE',
  GOVERNANCE: 'GOVERNANCE',
  CRIME_PREVENTION: 'CRIME_PREVENTION',
  CORRUPTION: 'CORRUPTION',
  OTHER: 'OTHER',
  RURAL_DEVELOPMENT: 'RURAL_DEVELOPMENT',
  VEGANISM: 'VEGANISM',
  BLACK_LIVES_MATTER: 'BLACK_LIVES_MATTER',
  ISLAMOPHOBIA: 'ISLAMOPHOBIA',
  ANTI_SEMITISM: 'ANTI_SEMITISM',
  ABORTION: 'ABORTION',
  EUTHANASIA: 'EUTHANASIA',
  NEURODIVERSITY: 'NEURODIVERSITY',
  SUSTAINABLE_COMMUNITIES: 'SUSTAINABLE_COMMUNITIES',
  BIODIVERSITY_LIFE_BELOW_WATER: 'BIODIVERSITY_LIFE_BELOW_WATER',
  PEACE_JUSTICE: 'PEACE_JUSTICE',
  COLLABORATION_FOR_IMPACT: 'COLLABORATION_FOR_IMPACT',
  INNOVATION: 'INNOVATION',
};

export const SDG = {
  HEALTH: 'HEALTH',
  LIFE: 'LIFE',
  REDUCED_INEQUALITIES: 'REDUCED_INEQUALITIES',
  PEACE_JUSTICE: 'PEACE_JUSTICE',
  SUSTAINABLE_CITIES_COMMUNITIES: 'SUSTAINABLE_CITIES_COMMUNITIES',
  GENDER_EQUALITY: 'GENDER_EQUALITY',
  CLIMATE_ACTION: 'CLIMATE_ACTION',
  NO_POVERTY: 'NO_POVERTY',
  LIFE_BELOW_WATER: 'LIFE_BELOW_WATER',
  GOALS_PARTNERSHIPS: 'GOALS_PARTNERSHIPS',
  ZERO_HUNGER: 'ZERO_HUNGER',
  EDUCATION_QUALITY: 'EDUCATION_QUALITY',
  CLEAN_WATER_SANITATION: 'CLEAN_WATER_SANITATION',
  ENERGY: 'ENERGY',
  ECONOMIC_GROWTH: 'ECONOMIC_GROWTH',
  INDUSTRY_INNOVATION_INFRASTRUCTURE: 'INDUSTRY_INNOVATION_INFRASTRUCTURE',
  RESPONSIBLE_CONSUMPTION_PRODUCTION: 'RESPONSIBLE_CONSUMPTION_PRODUCTION',
  OTHER: 'OTHER',
};

export type Badges = { value: string; label: string; color: string; description: string };
export const BADGES: Record<string, Badges> = {
  NO_POVERTY: {
    value: 'NO_POVERTY',
    label: 'No Poverty',
    color: 'black',
    description: `
    Eradicating poverty in all its forms remains one of the greatest challenges facing humanity. While the number of people living in extreme poverty dropped by more than half between 1990 and 2015, too many are still struggling for the most basic human needs. 
    As of 2015, about 736 million people still lived on less than US$1.90 a day; many lack food, clean drinking water and sanitation. Rapid growth in countries such as China and India has lifted millions out of poverty, but progress has been uneven. Women are more likely to be poor than men because they have less paid work, education, and own less property.
    Progress has also been limited in other regions, such as South Asia and sub-Saharan Africa, which account for 80 percent of those living in extreme poverty. New threats brought on by climate change, conflict and food insecurity, mean even more work is needed to bring people out of poverty.
    The SDGs are a bold commitment to finish what we started, and end poverty in all forms and dimensions by 2030. This involves targeting the most vulnerable, increasing basic resources and services, and supporting communities affected by conflict and climate-related disasters.
    `,
  },
  ZERO_HUNGER: {
    value: 'ZERO_HUNGER',
    label: 'Zero Hunger',
    color: 'black',
    description: `
    The number of undernourished people has dropped by almost half in the past two decades because of rapid economic growth and increased agricultural productivity. Many developing countries that used to suffer from famine and hunger can now meet their nutritional needs. Central and East Asia, Latin America and the Caribbean have all made huge progress in eradicating extreme hunger.

Unfortunately, extreme hunger and malnutrition remain a huge barrier to development in many countries. There are 821 million people estimated to be chronically undernourished as of 2017, often as a direct consequence of environmental degradation, drought and biodiversity loss. Over 90 million children under five are dangerously underweight. Undernourishment and severe food insecurity appear to be increasing in almost all regions of Africa, as well as in South America.

The SDGs aim to end all forms of hunger and malnutrition by 2030, making sure all people–especially children–have sufficient and nutritious food all year. This involves promoting sustainable agricultural, supporting small-scale farmers and equal access to land, technology and markets. It also requires international cooperation to ensure investment in infrastructure and technology to improve agricultural productivity.
`,
  },
  HEALTH: {
    value: 'HEALTH',
    label: 'Good Health and Well-Being',
    color: '#459C49',
    description: `
    We have made great progress against several leading causes of death and disease. Life expectancy has increased dramatically; infant and maternal mortality rates have declined, we’ve turned the tide on HIV and malaria deaths have halved.

Good health is essential to sustainable development and the 2030 Agenda reflects the complexity and interconnectedness of the two. It takes into account widening economic and social inequalities, rapid urbanization, threats to the climate and the environment, the continuing burden of HIV and other infectious diseases, and emerging challenges such as noncommunicable diseases. Universal health coverage will be integral to achieving SDG 3, ending poverty and reducing inequalities. Emerging global health priorities not explicitly included in the SDGs, including antimicrobial resistance, also demand action.

But the world is off-track to achieve the health-related SDGs. Progress has been uneven, both between and within countries. There’s a 31-year gap between the countries with the shortest and longest life expectancies. And while some countries have made impressive gains, national averages hide that many are being left behind. Multisectoral, rights-based and gender-sensitive approaches are essential to address inequalities and to build good health for all.

`,
  },
  EDUCATION_QUALITY: {
    value: 'EDUCATION_QUALITY',
    label: 'Quality Education',
    color: 'black',
    description: `
    Since 2000, there has been enormous progress in achieving the target of universal primary education. The total enrollment rate in developing regions reached 91 percent in 2015, and the worldwide number of children out of school has dropped by almost half. There has also been a dramatic increase in literacy rates, and many more girls are in school than ever before. These are all remarkable successes.

Progress has also been tough in some developing regions due to high levels of poverty, armed conflicts and other emergencies. In Western Asia and North Africa, ongoing armed conflict has seen an increase in the number of children out of school. This is a worrying trend. While Sub-Saharan Africa made the greatest progress in primary school enrollment among all developing regions – from 52 percent in 1990, up to 78 percent in 2012 – large disparities still remain. Children from the poorest households are up to four times more likely to be out of school than those of the richest households. Disparities between rural and urban areas also remain high.

Achieving inclusive and quality education for all reaffirms the belief that education is one of the most powerful and proven vehicles for sustainable development. This goal ensures that all girls and boys complete free primary and secondary schooling by 2030. It also aims to provide equal access to affordable vocational training, to eliminate gender and wealth disparities, and achieve universal access to a quality higher education.
    `,
  },
  GENDER_EQUALITY: {
    value: 'GENDER_EQUALITY',
    label: 'Gender Equality',
    color: '#EA3F2A',
    description: `
Ending all discrimination against women and girls is not only a basic human right, it’s crucial for sustainable future; it’s proven that empowering women and girls helps economic growth and development.

UNDP has made gender equality central to its work and we’ve seen remarkable progress in the past 20 years. There are more girls in school now compared to 15 years ago, and most regions have reached gender parity in primary education.

But although there are more women than ever in the labour market, there are still large inequalities in some regions, with women systematically denied the same work rights as men. Sexual violence and exploitation, the unequal division of unpaid care and domestic work, and discrimination in public office all remain huge barriers. Climate change and disasters continue to have a disproportionate effect on women and children, as do conflict and migration.

It is vital to give women equal rights land and property, sexual and reproductive health, and to technology and the internet. Today there are more women in public office than ever before, but encouraging more women leaders will help achieve greater gender equality.
`,
  },
  CLEAN_WATER_SANITATION: {
    value: 'CLEAN_WATER_SANITATION',
    label: 'Clean Water & Sanitation',
    color: '#26BDE2',
    description: `
    Water scarcity affects more than 40 percent of people, an alarming figure that is projected to rise as temperatures do. Although 2.1 billion people have improved water sanitation since 1990, dwindling drinking water supplies are affecting every continent.

More and more countries are experiencing water stress, and increasing drought and desertification is already worsening these trends. By 2050, it is projected that at least one in four people will suffer recurring water shortages.

Safe and affordable drinking water for all by 2030 requires we invest in adequate infrastructure, provide sanitation facilities, and encourage hygiene. Protecting and restoring water-related ecosystems is essential.

Ensuring universal safe and affordable drinking water involves reaching over 800 million people who lack basic services and improving accessibility and safety of services for over two billion.

In 2015, 4.5 billion people lacked safely managed sanitation services (with adequately disposed or treated excreta) and 2.3 billion lacked even basic sanitation.
    `,
  },
  ENERGY: {
    value: 'ENERGY',
    label: 'Affordable and Clean Energy',
    color: 'black',
    description: `
    Between 2000 and 2018, the number of people with electricity increased from 78 to 90 percent, and the numbers without electricity dipped to 789 million.

Yet as the population continues to grow, so will the demand for cheap energy, and an economy reliant on fossil fuels is creating drastic changes to our climate.

Investing in solar, wind and thermal power, improving energy productivity, and ensuring energy for all is vital if we are to achieve SDG 7 by 2030.

Expanding infrastructure and upgrading technology to provide clean and more efficient energy in all countries will encourage growth and help the environment.
    `,
  },
  ECONOMIC_GROWTH: {
    value: 'ECONOMIC_GROWTH',
    label: 'Decent Work and Economic Growth',
    color: 'black',
    description: `
    Over the past 25 years the number of workers living in extreme poverty has declined dramatically, despite the lasting impact of the 2008 economic crisis and global recession. In developing countries, the middle class now makes up more than 34 percent of total employment – a number that has almost tripled between 1991 and 2015.

However, as the global economy continues to recover we are seeing slower growth, widening inequalities, and not enough jobs to keep up with a growing labour force. According to the International Labour Organization, more than 204 million people were unemployed in 2015.

The SDGs promote sustained economic growth, higher levels of productivity and technological innovation. Encouraging entrepreneurship and job creation are key to this, as are effective measures to eradicate forced labour, slavery and human trafficking. With these targets in mind, the goal is to achieve full and productive employment, and decent work, for all women and men by 2030.
    `,
  },
  INDUSTRY_INNOVATION_INFRASTRUCTURE: {
    value: 'INDUSTRY_INNOVATION_INFRASTRUCTURE',
    label: 'Industry, Innovation & Infrastructure',
    color: 'black',
    description: `
    Investment in infrastructure and innovation are crucial drivers of economic growth and development. With over half the world population now living in cities, mass transport and renewable energy are becoming ever more important, as are the growth of new industries and information and communication technologies.

Technological progress is also key to finding lasting solutions to both economic and environmental challenges, such as providing new jobs and promoting energy efficiency. Promoting sustainable industries, and investing in scientific research and innovation, are all important ways to facilitate sustainable development.

More than 4 billion people still do not have access to the Internet, and 90 percent are from the developing world. Bridging this digital divide is crucial to ensure equal access to information and knowledge, as well as foster innovation and entrepreneurship.   
    `,
  },
  REDUCED_INEQUALITIES: {
    value: 'REDUCED_INEQUALITIES',
    label: 'Reduced Inequalities',
    color: '#DD1367',
    description: `
    Income inequality is on the rise—the richest 10 percent have up to 40 percent of global income whereas the poorest 10 percent earn only between 2 to 7 percent. If we take into account population growth inequality in developing countries, inequality has increased by 11 percent.

Income inequality has increased in nearly everywhere in recent decades, but at different speeds. It’s lowest in Europe and highest in the Middle East.

These widening disparities require sound policies to empower lower income earners, and promote economic inclusion of all regardless of sex, race or ethnicity.

Income inequality requires global solutions. This involves improving the regulation and monitoring of financial markets and institutions, encouraging development assistance and foreign direct investment to regions where the need is greatest. Facilitating the safe migration and mobility of people is also key to bridging the widening divide.
    `,
  },
  SUSTAINABLE_CITIES_COMMUNITIES: {
    value: 'SUSTAINABLE_CITIES_COMMUNITIES',
    label: 'Sustainable Cities & Communities',
    color: '#FD9D24',
    description: `
    More than half of us  live in cities. By 2050, two-thirds of all humanity—6.5 billion people—will be urban. Sustainable development cannot be achieved without significantly transforming the way we build and manage our urban spaces.

The rapid growth of cities—a result of rising populations and increasing migration—has led to a boom in mega-cities, especially in the developing world, and slums are becoming a more significant feature of urban life.

Making cities sustainable means creating career and business opportunities, safe and affordable housing, and building resilient societies and economies. It involves investment in public transport, creating green public spaces, and improving urban planning and management in participatory and inclusive ways.
    `,
  },
  RESPONSIBLE_CONSUMPTION_PRODUCTION: {
    value: 'RESPONSIBLE_CONSUMPTION_PRODUCTION',
    label: 'Responsible Consumption & Production',
    color: '#BF8B2E',
    description: `
    Achieving economic growth and sustainable development requires that we urgently reduce our ecological footprint by changing the way we produce and consume goods and resources. Agriculture is the biggest user of water worldwide, and irrigation now claims close to 70 percent of all freshwater for human use.

The efficient management of our shared natural resources, and the way we dispose of toxic waste and pollutants, are important targets to achieve this goal. Encouraging industries, businesses and consumers to recycle and reduce waste is equally important, as is supporting developing countries to move towards more sustainable patterns of consumption by 2030.

A large share of the world population is still consuming far too little to meet even their basic needs.  Halving the per capita of global food waste at the retailer and consumer levels is also important for creating more efficient production and supply chains. This can help with food security, and shift us towards a more resource efficient economy.
    `,
  },
  CLIMATE_ACTION: {
    value: 'CLIMATE_ACTION',
    label: 'Climate Action',
    color: '#3F7E44',
    description: `
    There is no country that is not experiencing the drastic effects of climate change. Greenhouse gas emissions are more than 50 percent higher than in 1990. Global warming is causing long-lasting changes to our climate system, which threatens irreversible consequences if we do not act.

The annual average economic losses from climate-related disasters are in the hundreds of billions of dollars. This is not to mention the human impact of geo-physical disasters, which are 91 percent climate-related, and which between 1998 and 2017 killed 1.3 million people, and left 4.4 billion injured. The goal aims to mobilize US$100 billion annually by 2020 to address the needs of developing countries to both adapt to climate change and invest in low-carbon development.

Supporting vulnerable regions will directly contribute not only to Goal 13 but also to the other SDGs. These actions must also go hand in hand with efforts to integrate disaster risk measures, sustainable natural resource management, and human security into national development strategies. It is still possible, with strong political will, increased investment, and using existing technology, to limit the increase in global mean temperature to two degrees Celsius above pre-industrial levels, aiming at 1.5°C, but this requires urgent and ambitious collective action.
    `,
  },
  LIFE_BELOW_WATER: {
    value: 'LIFE_BELOW_WATER',
    label: 'Life Below Water',
    color: '#0A97D9',
    description: `
    The world’s oceans – their temperature, chemistry, currents and life – drive global systems that make the Earth habitable for humankind. How we manage this vital resource is essential for humanity as a whole, and to counterbalance the effects of climate change.

Over three billion people depend on marine and coastal biodiversity for their livelihoods. However, today we are seeing 30 percent of the world’s fish stocks overexploited, reaching below the level at which they can produce sustainable yields.

Oceans also absorb about 30 percent of the carbon dioxide produced by humans, and we are seeing a 26 percent rise in ocean acidification since the beginning of the industrial revolution. Marine pollution, an overwhelming majority of which comes from land-based sources, is reaching alarming levels, with an average of 13,000 pieces of plastic litter to be found on every square kilometre of ocean.

The SDGs aim to sustainably manage and protect marine and coastal ecosystems from pollution, as well as address the impacts of ocean acidification. Enhancing conservation and the sustainable use of ocean-based resources through international law will also help mitigate some of the challenges facing our oceans.
    `,
  },
  LIFE: {
    value: 'LIFE',
    label: 'Life on Land',
    color: '#56C02B',
    description: `
    Human life depends on the earth as much as the ocean for our sustenance and livelihoods. Plant life provides 80 percent of the human diet, and we rely on agriculture as an important economic resources. Forests cover 30 percent of the Earth’s surface, provide vital habitats for millions of species, and important sources for clean air and water, as well as being crucial for combating climate change.

Every year, 13 million hectares of forests are lost, while the persistent degradation of drylands has led to the desertification of 3.6 billion hectares, disproportionately affecting poor communities.

While 15 percent of land is protected, biodiversity is still at risk. Nearly 7,000 species of animals and plants have been illegally traded. Wildlife trafficking not only erodes biodiversity, but creates insecurity, fuels conflict, and feeds corruption.

Urgent action must be taken to reduce the loss of natural habitats and biodiversity which are part of our common heritage and support global food and water security, climate change mitigation and adaptation, and peace and security.
    `,
  },
  PEACE_JUSTICE: {
    value: 'PEACE_JUSTICE',
    label: 'Peace & Justice Strong Institutions',
    color: '#56C02B',
    description: `
    We cannot hope for sustainable development without peace, stability, human rights and effective governance, based on the rule of law. Yet our world is increasingly divided. Some regions enjoy peace, security and prosperity, while others fall into seemingly endless cycles of conflict and violence. This is not inevitable and must be addressed.

Armed violence and insecurity have a destructive impact on a country’s development, affecting economic growth, and often resulting in grievances that last for generations. Sexual violence, crime, exploitation and torture are also prevalent where there is conflict, or no rule of law, and countries must take measures to protect those who are most at risk

The SDGs aim to significantly reduce all forms of violence, and work with governments and communities to end conflict and insecurity. Promoting the rule of law and human rights are key to this process, as is reducing the flow of illicit arms and strengthening the participation of developing countries in the institutions of global governance.
    `,
  },
  GOALS_PARTNERSHIPS: {
    value: 'GOALS_PARTNERSHIPS',
    label: 'Partnerships for the Goals',
    color: 'black',
    description: `
    The SDGs can only be realized with strong global partnerships and cooperation. Official Development Assistance remained steady but below target, at US$147 billion in 2017. While humanitarian crises brought on by conflict or natural disasters continue to demand more financial resources and aid. Many countries also require Official Development Assistance to encourage growth and trade.

    The world is more interconnected than ever. Improving access to technology and knowledge is an important way to share ideas and foster innovation. Coordinating policies to help developing countries manage their debt, as well as promoting investment for the least developed, is vital for sustainable growth and development.
    
    The goals aim to enhance North-South and South-South cooperation by supporting national plans to achieve all the targets. Promoting international trade, and helping developing countries increase their exports is all part of achieving a universal rules-based and equitable trading system that is fair and open and benefits all.
    `,
  },
  //   OTHER: { value: 'OTHER', label: 'Other', color: 'black' },
};

export const SocialCausesSDGMapping = {
  SOCIAL: SDG.REDUCED_INEQUALITIES,
  POVERTY: SDG.NO_POVERTY,
  HOMELESSNESS: SDG.REDUCED_INEQUALITIES,
  HUNGER: SDG.ZERO_HUNGER,
  HEALTH: SDG.HEALTH,
  SUBSTANCE_ABUSE: SDG.HEALTH,
  MENTAL: SDG.HEALTH,
  BULLYING: SDG.HEALTH,
  SECURITY: SDG.PEACE_JUSTICE,
  EDUCATION: SDG.EDUCATION_QUALITY,
  GENDER_EQUALITY: SDG.GENDER_EQUALITY,
  GENDER_BASED_VIOLENCE: SDG.GENDER_EQUALITY,
  SEXUAL_VIOLENCE: SDG.GENDER_EQUALITY,
  DOMESTIC_VIOLENCE: SDG.GENDER_EQUALITY,
  WATER_SANITATION: SDG.LIFE_BELOW_WATER,
  SUSTAINABLE_ENERGY: SDG.ENERGY,
  //   DECENT_WORK: SDG.DECENT_WORK,
  INEQUALITY: SDG.REDUCED_INEQUALITIES,
  MINORITY: SDG.REDUCED_INEQUALITIES,
  MULTICULTURALISM: SDG.REDUCED_INEQUALITIES,
  DIVERSITY_INCLUSION: SDG.REDUCED_INEQUALITIES,
  INDIGENOUS_PEOPLES: SDG.REDUCED_INEQUALITIES,
  DISABILITY: SDG.REDUCED_INEQUALITIES,
  LGBTQI: SDG.REDUCED_INEQUALITIES,
  REFUGEE: SDG.REDUCED_INEQUALITIES,
  MIGRANTS: SDG.REDUCED_INEQUALITIES,
  ORPHANS: SDG.REDUCED_INEQUALITIES,
  CHILD_PROTECTION: SDG.REDUCED_INEQUALITIES,
  COMMUNITY_DEVELOPMENT: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  DEPOPULATION: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  OVERPOPULATION: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  HUMAN_RIGHTS: SDG.REDUCED_INEQUALITIES,
  SUSTAINABILITY: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  RESPONSIBLE_CONSUMPTION: SDG.RESPONSIBLE_CONSUMPTION_PRODUCTION,
  CLIMATE_CHANGE: SDG.CLIMATE_ACTION,
  NATURAL_DISASTERS: SDG.CLIMATE_ACTION,
  BIODIVERSITY: SDG.REDUCED_INEQUALITIES,
  ANIMAL_RIGHTS: SDG.LIFE,
  ARMED_CONFLICT: SDG.PEACE_JUSTICE,
  PEACEBUILDING: SDG.PEACE_JUSTICE,
  DEMOCRACY: SDG.PEACE_JUSTICE,
  CIVIC_ENGAGEMENT: SDG.PEACE_JUSTICE,
  JUSTICE: SDG.PEACE_JUSTICE,
  GOVERNANCE: SDG.PEACE_JUSTICE,
  CRIME_PREVENTION: SDG.PEACE_JUSTICE,
  CORRUPTION: SDG.PEACE_JUSTICE,
  OTHER: SDG.OTHER,
  RURAL_DEVELOPMENT: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  VEGANISM: SDG.RESPONSIBLE_CONSUMPTION_PRODUCTION,
  BLACK_LIVES_MATTER: SDG.REDUCED_INEQUALITIES,
  ISLAMOPHOBIA: SDG.REDUCED_INEQUALITIES,
  ANTI_SEMITISM: SDG.REDUCED_INEQUALITIES,
  ABORTION: SDG.HEALTH,
  EUTHANASIA: SDG.HEALTH,
  NEURODIVERSITY: SDG.REDUCED_INEQUALITIES,
  SUSTAINABLE_COMMUNITIES: SDG.SUSTAINABLE_CITIES_COMMUNITIES,
  BIODIVERSITY_LIFE_BELOW_WATER: SDG.LIFE_BELOW_WATER,
  PEACE_JUSTICE: SDG.PEACE_JUSTICE,
  COLLABORATION_FOR_IMPACT: SDG.GOALS_PARTNERSHIPS,
  INNOVATION: SDG.INDUSTRY_INNOVATION_INFRASTRUCTURE,
};

export const APPLICANT_STATUS = {
  PENDING: 'PENDING',
  OFFERED: 'OFFERED',
  REJECTED: 'REJECTED',
  WITHRAWN: 'WITHDRAWN',
  APPROVED: 'APPROVED',
  HIRED: 'HIRED',
};

export const UserStatusType = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPEND: 'SUSPEND',
};

export const ProjectLengthType = {
  LESS_THAN_A_DAY: 'LESS_THAN_A_DAY',
  LESS_THAN_A_MONTH: 'LESS_THAN_A_MONTH',
  ONE_THREE_MONTHS: '1_3_MONTHS',
  THREE_SIX_MONTHS: '3_6_MONTHS',
  SIX_MONTHS_OR_MORE: '6_MONTHS_OR_MORE',
};

export const ProjectType = {
  ONE_OFF: 'ONE_OFF',
  PART_TIME: 'PART_TIME',
  FULL_TIME: 'FULL_TIME',
};

export const ProjectRemotePreferenceType = {
  ONSITE: 'ONSITE',
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID',
};

export const ProjectStatusType = {
  DRAFT: 'DRAFT',
  EXPIRE: 'EXPIRE',
  ACTIVE: 'ACTIVE',
};

export const ProjectPaymentType = {
  VOLUNTEER: 'VOLUNTEER',
  PAID: 'PAID',
};

export const ProjectPaymentSchemeType = {
  HOURLY: 'HOURLY',
  FIXED: 'FIXED',
};

export const OrganizationType = {
  SOCIAL: 'SOCIAL',
  NONPROFIT: 'NONPROFIT',
  COOP: 'COOP',
  IIF: 'IIF',
  PUBLIC: 'PUBLIC',
  INTERGOV: 'INTERGOV',
  DEPARTMENT: 'DEPARTMENT',
  OTHER: 'OTHER',
};

export const NotificationType = {
  FOLLOWED: 'FOLLOWED',
  COMMENT_LIKE: 'COMMENT_LIKE',
  POST_LIKE: 'POST_LIKE',
  CHAT: 'CHAT',
  SHARE_POST: 'SHARE_POST',
  SHARE_PROJECT: 'SHARE_PROJECT',
  COMMENT: 'COMMENT',
  APPLICATION: 'APPLICATION',
  OFFER: 'OFFER',
  REJECT: 'REJECT',
  APPROVED: 'APPROVED',
  HIRED: 'HIRED',
  PROJECT_COMPLETE: 'PROJECT_COMPLETE',
  ASSIGNEE_CANCELED: 'ASSIGNEE_CANCELED',
  ASSIGNER_CANCELED: 'ASSIGNER_CANCELED',
  ASSIGNER_CONFIRMED: 'ASSIGNER_CONFIRMED',
  CONNECT: 'CONNECT',
  ACCEPT_CONNECT: 'ACCEPT_CONNECT',
  MEMBERED: 'MEMBERED',
};

export const NotificationTitle = {
  FOLLOWED: 'Followed',
  COMMENT_LIKE: 'Comment liked',
  POST_LIKE: 'Post liked',
  CHAT: 'New Message',
  SHARE_POST: 'Post shared',
  SHARE_PROJECT: 'Job shared',
  COMMENT: 'New commented',
  APPLICATION: 'Job applied',
  OFFER: 'Have an offer',
  REJECT: 'Applicantion updated',
  APPROVED: 'Offer approved',
  HIRED: 'Hired',
  PROJECT_COMPLETE: 'Job done',
  ASSIGNEE_CANCELED: 'Left the job',
  ASSIGNER_CANCELED: 'Canceled the job',
  ASSIGNER_CONFIRMED: 'Confirmed work submission',
  CONNECT: 'Connect request',
  ACCEPT_CONNECT: 'Accept connect request',
  MEMBERED: 'Membered',
};

export const IdentityType = {
  ORG: 'organizations',
  USER: 'users',
};

export const ChatType = {
  CHAT: 'CHAT',
  GROUPED: 'GROUPED',
  CHANNEL: 'CHANNEL',
};

export const ChatMemberType = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
};

export const SearchType = {
  POSTS: 'posts',
  USERS: 'users',
  RELATED_USERS: 'related_users',
  PROJECTS: 'projects',
  CHATS: 'chats',
  ORGANIZATIONS: 'organizations',
};

export const MediaContentType = {
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export const PaymentCurrency = {
  USD: 'USD',
  JPY: 'JPY',
  EUR: 'EUR',
};

export const PaymentService = {
  STRIPE: 'STRIPE',
};

export const Languages = {
  AA: 'Afar',
  AB: 'Abkhazian',
  AE: 'Avestan',
  AF: 'Afrikaans',
  AK: 'Akan',
  AM: 'Amharic',
  AN: 'Aragonese',
  AR: 'Arabic',
  AS: 'Assamese',
  AV: 'Avaric',
  AY: 'Aymara',
  AZ: 'Azerbaijani',
  BA: 'Bashkir',
  BE: 'Belarusian',
  BG: 'Bulgarian',
  BH: 'Bihari languages',
  BI: 'Bislama',
  BM: 'Bambara',
  BN: 'Bengali',
  BO: 'Tibetan',
  BR: 'Breton',
  BS: 'Bosnian',
  CA: 'Catalan',
  CE: 'Chechen',
  CH: 'Chamorro',
  CO: 'Corsican',
  CR: 'Cree',
  CS: 'Czech',
  CU: 'Church Slavic',
  CV: 'Chuvash',
  CY: 'Welsh',
  DA: 'Danish',
  DE: 'German',
  DV: 'Maldivian',
  DZ: 'Dzongkha',
  EE: 'Ewe',
  EL: 'Greek',
  EN: 'English',
  EO: 'Esperanto',
  ES: 'Spanish',
  ET: 'Estonian',
  EU: 'Basque',
  FA: 'Persian',
  FF: 'Fulah',
  FI: 'Finnish',
  FJ: 'Fijian',
  FO: 'Faroese',
  FR: 'French',
  FY: 'Western Frisian',
  GA: 'Irish',
  GD: 'Gaelic',
  GL: 'Galician',
  GN: 'Guarani',
  GU: 'Gujarati',
  GV: 'Manx',
  HA: 'Hausa',
  HE: 'Hebrew',
  HI: 'Hindi',
  HO: 'Hiri Motu',
  HR: 'Croatian',
  HT: 'Haitian',
  HU: 'Hungarian',
  HY: 'Armenian',
  HZ: 'Herero',
  IA: 'Interlingua',
  ID: 'Indonesian',
  IE: 'Interlingue',
  IG: 'Igbo',
  II: 'Sichuan Yi',
  IK: 'Inupiaq',
  IO: 'Ido',
  IS: 'Icelandic',
  IT: 'Italian',
  IU: 'Inuktitut',
  JA: 'Japanese',
  JV: 'Javanese',
  KA: 'Georgian',
  KG: 'Kongo',
  KI: 'Kikuyu',
  KJ: 'Kuanyama',
  KK: 'Kazakh',
  KL: 'Kalaallisut',
  KM: 'Central Khmer',
  KN: 'Kannada',
  KO: 'Korean',
  KR: 'Kanuri',
  KS: 'Kashmiri',
  KU: 'Kurdish',
  KV: 'Komi',
  KW: 'Cornish',
  KY: 'Kirghiz',
  LA: 'Latin',
  LB: 'Luxembourgish',
  LG: 'Ganda',
  LI: 'Limburgan',
  LN: 'Lingala',
  LO: 'Lao',
  LT: 'Lithuanian',
  LU: 'Luba-Katanga',
  LV: 'Latvian',
  MG: 'Malagasy',
  MH: 'Marshallese',
  MI: 'Maori',
  MK: 'Macedonian',
  ML: 'Malayalam',
  MN: 'Mongolian',
  MR: 'Marathi',
  MS: 'Malay',
  MT: 'Maltese',
  MY: 'Burmese',
  NA: 'Nauru',
  NB: 'Norwegian',
  ND: 'North Ndebele',
  NE: 'Nepali',
  NG: 'Ndonga',
  NL: 'Dutch',
  NN: 'Norwegian',
  NO: 'Norwegian',
  NR: 'South Ndebele',
  NV: 'Navajo',
  NY: 'Chichewa',
  OC: 'Occitan',
  OJ: 'Ojibwa',
  OM: 'Oromo',
  OR: 'Oriya',
  OS: 'Ossetic',
  PA: 'Panjabi',
  PI: 'Pali',
  PL: 'Polish',
  PS: 'Pushto',
  PT: 'Portuguese',
  QU: 'Quechua',
  RM: 'Romansh',
  RN: 'Rundi',
  RO: 'Romanian',
  RU: 'Russian',
  RW: 'Kinyarwanda',
  SA: 'Sanskrit',
  SC: 'Sardinian',
  SD: 'Sindhi',
  SE: 'Northern Sami',
  SG: 'Sango',
  SI: 'Sinhala',
  SK: 'Slovak',
  SL: 'Slovenian',
  SM: 'Samoan',
  SN: 'Shona',
  SO: 'Somali',
  SQ: 'Albanian',
  SR: 'Serbian',
  SS: 'Swati',
  ST: 'Sotho, Southern',
  SU: 'Sundanese',
  SV: 'Swedish',
  SW: 'Swahili',
  TA: 'Tamil',
  TE: 'Telugu',
  TG: 'Tajik',
  TH: 'Thai',
  TI: 'Tigrinya',
  TK: 'Turkmen',
  TL: 'Tagalog',
  TN: 'Tswana',
  TO: 'Tonga',
  TR: 'Turkish',
  TS: 'Tsonga',
  TT: 'Tatar',
  TW: 'Twi',
  TY: 'Tahitian',
  UG: 'Uighur',
  UK: 'Ukrainian',
  UR: 'Urdu',
  UZ: 'Uzbek',
  VE: 'Venda',
  VI: 'Vietnamese',
  VO: 'Volapük',
  WA: 'Walloon',
  WO: 'Wolof',
  XH: 'Xhosa',
  YI: 'Yiddish',
  YO: 'Yoruba',
  ZA: 'Zhuang',
  ZH: 'Chinese',
  ZU: 'Zulu',
};

export const LanguageLevel = {
  BASIC: 'BASIC',
  CONVERSANT: 'CONVERSANT',
  PROFICIENT: 'PROFICIENT',
  FLUENT: 'FLUENT',
  NATIVE: 'NATIVE',
};

export const MissionStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETE: 'COMPLETE',
  CONFIRMED: 'CONFIRMED',
  CANCELED: 'CANCELED',
  KICKED_OUT: 'KICKED_OUT',
};

export const OfferStatus = {
  PENDING: 'PENDING',
  WITHDRAWN: 'WITHDRAWN',
  APPROVED: 'APPROVED',
  HIRED: 'HIRED',
  CLOSED: 'CLOSED',
  CANCELED: 'CANCELED',
};

export const OAuthProviders = {
  STRIPE: 'STRIPE',
};

export const NotificationSettings = [
  {
    type: 'FOLLOWED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'COMMENT_LIKE',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'POST_LIKE',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'CHAT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'SHARE_POST',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'SHARE_PROJECT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'COMMENT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'APPLICATION',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'OFFER',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'REJECT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'APPROVED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'HIRED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'PROJECT_COMPLETE',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'ASSIGNEE_CANCELED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'ASSIGNER_CANCELED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'ASSIGNER_CONFIRMED',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'CONNECT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'ACCEPT_CONNECT',
    in_app: true,
    email: true,
    push: true,
  },
  {
    type: 'MEMBERED',
    in_app: true,
    email: true,
    push: true,
  },
];
