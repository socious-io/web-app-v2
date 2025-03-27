export const CREATED_JOB = {
  id: 'd7a53f4f-333e-40a7-8598-605919e98e1c',
  identity_id: 'dc454ccd-39f1-4fe5-9948-c731673f755a',
  description: 'werf',
  project_type: 'ONE_OFF',
  project_length: 'LESS_THAN_A_DAY',
  payment_currency: 'USD',
  payment_range_lower: null,
  payment_range_higher: null,
  experience_level: 0,
  created_at: '2024-04-21T18:07:56.556Z',
  updated_at: '2024-04-21T18:07:56.556Z',
  deleted_at: null,
  status: 'ACTIVE',
  payment_type: 'VOLUNTEER',
  payment_scheme: 'FIXED',
  title: 'test',
  expires_at: null,
  country: 'JP',
  skills: ['REACT.JS'],
  causes_tags: ['SOCIAL'],
  old_id: null,
  other_party_id: null,
  other_party_title: null,
  other_party_url: null,
  remote_preference: 'ONSITE',
  search_tsv: "'test':1 'werf':2",
  city: 'Tokyo',
  weekly_hours_lower: null,
  weekly_hours_higher: null,
  commitment_hours_lower: '20',
  commitment_hours_higher: '30',
  geoname_id: null,
  job_category_id: 'fbacde54-88e6-4d17-8aa9-286a716ba12f',
  impact_job: true,
  promoted: false,
};

export const CATEGORIES = {
  categories: [
    {
      id: "fbacde54-88e6-4d17-8aa9-286a716ba12f",
      name: "Frontend development",
      hourly_wage_dollars: 25,
      created_at: "2022-12-14T13:19:18.541Z",
      updated_at: "2022-12-14T13:19:18.541Z"
    },
    {
      id: "95dedd87-f0d5-46f9-8756-8946308fca77",
      name: "Backend development",
      hourly_wage_dollars: 25,
      created_at: "2022-12-14T13:19:18.541Z",
      updated_at: "2022-12-14T13:19:18.541Z"
    },
    {
      id: "a0839fc4-ee83-4b44-9372-6dcf58fa6ab7",
      name: "Full-stack development",
      hourly_wage_dollars: 28,
      created_at: "2022-12-14T13:19:18.541Z",
      updated_at: "2022-12-14T13:19:18.541Z"
    }
  ]
}

export const LOCATION = {
  page: 1,
  limit: 20,
  total_count: 1,
  items: [
    {
      add_id: null,
      id: 112931,
      name: "Tehran",
      type: "PPLC",
      population: 7153309,
      country_code: "IR",
      alternate_name: null,
      alt_language: null,
      is_historic: null,
      is_colloquial: null,
      is_short_name: null,
      region_id: "26",
      subregion_id: "",
      region_name: "Tehran Province",
      region_iso: "07",
      subregion_name: null,
      subregion_iso: null,
      timezone: "Asia/Tehran",
      country_name: "Iran (Islamic Republic of)",
      timezone_utc: "UTC+03:30"
    }
  ]
}

export const ORGANIZATION_PROJECTS = {
  page: 1,
  limit: 10,
  total_count: 2,
  items: [
    {
      id: "92b7939b-7a8b-434d-b126-0e8c80a216f8",
      identity_id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
      description: "help us to find some people to help",
      project_type: "PART_TIME",
      project_length: "1_3_MONTHS",
      payment_currency: "USD",
      payment_range_lower: null,
      payment_range_higher: null,
      experience_level: 1,
      created_at: "2025-03-05T13:09:10.268Z",
      updated_at: "2025-03-05T13:23:59.452Z",
      deleted_at: null,
      status: "ACTIVE",
      payment_type: "PAID",
      payment_scheme: "FIXED",
      title: "NGO",
      expires_at: null,
      country: null,
      skills: [
        "C++"
      ],
      causes_tags: [
        "HUMAN_RIGHTS"
      ],
      old_id: null,
      other_party_id: null,
      other_party_title: null,
      other_party_url: null,
      remote_preference: "ONSITE",
      search_tsv: "'find':5 'help':2,9 'ngo':1 'peopl':7 'us':3",
      city: null,
      weekly_hours_lower: null,
      weekly_hours_higher: null,
      commitment_hours_lower: null,
      commitment_hours_higher: null,
      geoname_id: null,
      job_category_id: "1f7962c9-5792-4c97-b6df-df98b5546176",
      impact_job: true,
      promoted: false,
      kind: "JOB",
      payment_mode: null,
      identity_type: "organizations",
      identity_meta: {
        id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
        city: "Tehran",
        name: "OrganizationTest",
        email: "imshantik@gmal.com",
        image: null,
        hiring: false,
        status: "ACTIVE",
        address: null,
        country: "IR",
        mission: null,
        verified: false,
        shortname: "organizationtest",
        description: null,
        wallet_address: null,
        verified_impact: false
      },
      job_category: {
        id: "1f7962c9-5792-4c97-b6df-df98b5546176",
        name: "Web Design",
        hourly_wage_dollars: 22.5,
        created_at: "2022-12-14T13:19:18.541708+00:00",
        updated_at: "2022-12-14T13:19:18.541708+00:00"
      },
      work_samples: [],
      missions: 0,
      applicants: 0,
      saved: false,
      not_interested: false
    },
    {
      id: "ecce2dec-35a2-4a6a-a0d8-155cd898f6b9",
      identity_id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
      description: "teacher needed to teach figma",
      project_type: "PART_TIME",
      project_length: "1_3_MONTHS",
      payment_currency: "USD",
      payment_range_lower: "10",
      payment_range_higher: "15",
      experience_level: 3,
      created_at: "2025-02-28T10:20:53.884Z",
      updated_at: "2025-02-28T10:20:53.884Z",
      deleted_at: null,
      status: "ACTIVE",
      payment_type: "PAID",
      payment_scheme: "HOURLY",
      title: "teacher",
      expires_at: null,
      country: null,
      skills: [
        "EDUCATION"
      ],
      causes_tags: [
        "EDUCATION"
      ],
      old_id: null,
      other_party_id: null,
      other_party_title: null,
      other_party_url: null,
      remote_preference: "REMOTE",
      search_tsv: "'figma':6 'need':3 'teach':5 'teacher':1,2",
      city: null,
      weekly_hours_lower: null,
      weekly_hours_higher: null,
      commitment_hours_lower: null,
      commitment_hours_higher: null,
      geoname_id: null,
      job_category_id: "bc2e14cd-5087-44cd-ad0d-8e6a87a4c35a",
      impact_job: true,
      promoted: false,
      kind: "JOB",
      payment_mode: null,
      identity_type: "organizations",
      identity_meta: {
        id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
        city: "Tehran",
        name: "OrganizationTest",
        email: "imshantik@gmal.com",
        image: null,
        hiring: false,
        status: "ACTIVE",
        address: null,
        country: "IR",
        mission: null,
        verified: false,
        shortname: "organizationtest",
        description: null,
        wallet_address: null,
        verified_impact: false
      },
      job_category: {
        id: "bc2e14cd-5087-44cd-ad0d-8e6a87a4c35a",
        name: "UX/UI Design",
        hourly_wage_dollars: 32,
        created_at: "2022-12-14T13:19:18.541708+00:00",
        updated_at: "2022-12-14T13:19:18.541708+00:00"
      },
      work_samples: [],
      missions: 0,
      applicants: 1,
      saved: false,
      not_interested: false
    }
  ]
}

export const PROJECT_SKILLS = {
  page: 1,
  limit: 500,
  total_count: 3,
  items: [
    {
      id: '1ce1d1aa-efaf-460f-bdbb-c51429d7e02a',
      name: 'C',
      created_at: '2022-09-08T12:05:48.029Z',
    },
    {
      id: '80e497a9-ef2f-4d27-b0d6-493bdddb5e89',
      name: 'C#',
      created_at: '2022-09-08T12:05:48.029Z',
    },
    {
      id: '7df80c0d-a24e-48e0-84ff-ac3cfcb5d87e',
      name: 'C++',
      created_at: '2022-09-08T12:05:48.029Z',
    },
  ],
};
export const SKILLS = {
  page: 1,
  limit: 500,
  total_count: 3,
  items: [
    {
      id: '1ce1d1aa-efaf-460f-bdbb-c51429d7e02a',
      name: 'C',
      created_at: '2022-09-08T12:05:48.029Z',
    },
    {
      id: '80e497a9-ef2f-4d27-b0d6-493bdddb5e89',
      name: 'C#',
      created_at: '2022-09-08T12:05:48.029Z',
    },
    {
      id: '7df80c0d-a24e-48e0-84ff-ac3cfcb5d87e',
      name: 'C++',
      created_at: '2022-09-08T12:05:48.029Z',
    },
  ],
};

export const PROJECTS = {
  page: 1,
  limit: 10,
  total_count: 139,
  items: [
    {
      id: "615be3c0-b294-4901-a208-2409d545959d",
      identity_id: "2bd26aa5-f745-4f12-bca7-17916161ae8b",
      description: "### **About Us:**\r\n\r\nSocious is a talent marketplace that makes impact work accessible and transparent; we build connections between purpose-driven individuals and impact organizations through AI matching. By leveraging blockchain technology, we make social/environmental impact work traceable and reward contributions.\r\n\r\nHaving secured funding, we're in expansion mode. Join us in this journey!\r\n\r\n### **Job Summary:**\r\n\r\nAs a Sales & BD Rep, you will be responsible for driving sales growth by identifying and engaging potential customers, building strong relationships, and effectively communicating the value of our products/services. You will work closely with the sales and marketing teams to execute sales strategies and achieve targets.\r\n\r\n### **Key Responsibilities:**\r\n\r\n- **Prospect and Generate Leads:** Identify and research potential customers through various channels, including cold calling, email campaigns, social media, and networking events.\r\n- **Build Relationships:** Establish and maintain strong relationships with prospective and existing clients, understanding their needs and providing tailored solutions.\r\n- **Sales Presentations:** Conduct product demonstrations and presentations to showcase the value and benefits of our offerings.\r\n- **Negotiate and Close Deals:** Effectively negotiate terms and close sales deals, ensuring customer satisfaction and loyalty.\r\n- **Market Research:** Stay informed about industry trends, competitor activities, and market conditions to identify opportunities and threats.\r\n- **Collaborate:** Work closely with the sales and marketing teams to develop and implement effective sales strategies and campaigns.\r\n- **Customer Feedback:** Gather and relay customer feedback to the product development team to help improve our offerings.\r\n- **Reporting:** Maintain accurate records of sales activities, pipeline, and performance metrics, and provide regular reports to the sales manager.\r\n\r\n### **Skills/Experience:**\r\n\r\n- A strong desire to make a social/environmental impact. Prior experience in this realm is a plus.\r\n- **Experience:** 1-2 years of sales experience (preferred but not required). We welcome applications from fresh graduates, especially those with relevant internships or project experience, ideally in a tech startup or related industry.\r\n- **Education:** Bachelor's degree in Business, Marketing, or a related field is preferred.\r\n- **Skills:**\r\n    - Excellent communication and interpersonal skills in English (business level) and Japanese (Native-level Japanese is preferred).\r\n    - Strong presentation and negotiation abilities.\r\n    - Proficiency in using CRM software and sales tools.\r\n    - Ability to work independently and as part of a team.\r\n- **Attributes:**\r\n    - Goal-oriented with a strong drive to achieve and exceed targets.\r\n    - Adaptable and able to thrive in a fast-paced startup environment.\r\n    - Passionate about technology and innovation.\r\n\r\n### **What We Offer:**\r\n\r\n- Make a lasting impact on the lives of many and on the world.\r\n- Take part in shaping the future by working with the most advanced and pioneering technologies in the field.\r\n- Collaborate with and learn from passionate, diverse, and high-performing colleagues.\r\n- Achieve the perfect work-life balance with flexible hours and unlimited paid leave.\r\n- Thrive in a remote-first setting with occasional team get-togethers.\r\n- Commit to your growth with ongoing learning and development opportunities.\r\n- Navigate a vibrant, fast-paced work setting.\r\n- Take the lead with autonomy in decision-making.\r\n- Relish a culture of trust, transparency, and unwavering support.\r\n- Become a member of a team that is deeply committed to fostering a socially responsible and ecologically sustainable work environment.\r\n- Enjoy a competitive compensation package: a base salary of ¥5,000,000 - ¥8,000,000 annually (approximately USD 35,000 - 60,000), plus 10%-30% commission on sales revenue generated, along with token allocation.\r\n\r\n**Socious Referral Program:**\r\n\r\nKnow someone just right for Socious? We highly value word-of-mouth recommendations. Successfully refer a candidate, and enjoy a $1,000 reward as a token of our gratitude. Just share this job link!\r\n\r\nYour support in broadening our talent search is invaluable. Thank you.\r\n\r\n**Our mission and values:**\r\n\r\n**Mission:** Give everyone the chance to make a difference.\r\n\r\n**Our values:**\r\n\r\n- Diversity, inclusion, and belonging.\r\n- Life first, work second.\r\n- High performance for high impact.\r\n- Autonomy and accountability.\r\n- Candor, collaboration, and play.",
      project_type: "FULL_TIME",
      project_length: "6_MONTHS_OR_MORE",
      payment_currency: "USD",
      payment_range_lower: "35000",
      payment_range_higher: "90000",
      experience_level: 1,
      created_at: "2024-05-29T07:26:08.775Z",
      updated_at: "2024-05-29T22:27:13.976Z",
      deleted_at: null,
      status: "ACTIVE",
      payment_type: "PAID",
      payment_scheme: "FIXED",
      title: "Sales & BD Rep",
      expires_at: null,
      country: "JP",
      skills: [
        "BUSINESS_DEVELOPMENT",
        "MARKETING_STRATEGY",
        "SALES",
        "SALES_MANAGEMENT",
        "SOCIAL_MEDIA_MARKETING"
      ],
      causes_tags: [
        "SOCIAL"
      ],
      old_id: null,
      other_party_id: null,
      other_party_title: null,
      other_party_url: null,
      remote_preference: "HYBRID",
      search_tsv: "'-2':272 '-30':540 '000':526,527,529,530,535,537,575 '1':271,574 '10':539 '35':534 '5':525 '60':536 '8':528 'a':8,61,254,259,268,297,311,355,362,376,391,449,471,488,497,500,508,517,521,569,573,578,610 'abilities':338 'ability':347 'able':372 'about':4,186,383 'accessible':15 'accountability':629 'accurate':236 'achieve':105,366,433 'activities':190,240 'adaptable':370 'advanced':414 'ai':30 'allocation':549 'along':546 'and':16,26,42,75,82,97,104,110,114,128,134,140,146,155,161,167,173,180,191,197,205,210,215,220,242,245,319,326,336,344,351,367,371,385,399,415,423,428,443,467,493,511,571,601,616,628,632 'annually':531 'applications':283 'approximately':532 'as':60,352,577 'attributes':357 'autonomy':482,627 'bachelor':304 'balance':439 'base':522 'bd':2,63 'be':67 'become':496 'belonging':617 'benefits':162 'between':21 'blockchain':34 'broadening':591 'build':19,131 'building':79 'business':308,324 'but':278 'by':32,73,409 'calling':123 'campaigns':125,216 'candidate':570 'candor':630 'chance':607 'channels':120 'clients':142 'close':168,174 'closely':93,201 'cold':122 'collaborate':199,421 'collaboration':631 'colleagues':432 'commission':541 'commit':460 'committed':505 'communicating':84 'communication':318 'compensation':519 'competitive':518 'competitor':189 'conditions':193 'conduct':152 'connections':20 'contributions':44 'crm':342 'culture':489 'customer':178,217,222 'customers':78,117 'deals':169,176 'decision':485 'decision-making':484 'deeply':504 'degree':306 'demonstrations':154 'desire':256 'develop':209 'development':227,468 'difference':611 'diverse':427 'diversity':614 'drive':364 'driven':24 'driving':70 'ecologically':512 'education':303 'effective':212 'effectively':83,170 'email':124 'engaging':76 'english':323 'enjoy':516,572 'ensuring':177 'environment':381,515 'especially':287 'establish':133 'events':130 'everyone':605 'exceed':368 'excellent':317 'execute':101 'existing':141 'expansion':51 'experience':263,270,276,294 'fast':378,474 'fast-paced':377,473 'feedback':218,223 'field':313,420 'first':452,619 'flexible':441 'for':69,557,624 'fostering':507 'fresh':285 'from':284,425 'funding':47 'future':408 'gather':219 'generate':111 'generated':545 'get':458 'get-togethers':457 'give':604 'goal':359 'goal-oriented':358 'graduates':286 'gratitude':582 'growth':72,463 'having':45 'help':230 'high':430,622,625 'high-performing':429 'highly':560 'hours':442 'ideally':295 'identify':113,195 'identifying':74 'impact':13,27,39,261,393,626 'implement':211 'improve':231 'in':50,55,264,296,307,322,340,375,405,418,448,483,590 'including':121 'inclusion':615 'independently':350 'individuals':25 'industry':187,302 'informed':185 'innovation':386 'internships':291 'interpersonal':320 'invaluable':596 'is':7,267,314,332,503,595 'japanese':327,331 'job':58,586 'join':53 'journey':57 'just':555,583 'key':107 'know':553 'lasting':392 'lead':480 'leads':112 'learn':424 'learning':466 'leave':446 'level':325,330 'leveraging':33 'life':438,618 'link':587 'lives':396 'loyalty':181 'maintain':135,235 'make':37,258,390,609 'makes':12 'making':486 'manager':252 'many':398 'market':182,192 'marketing':98,206,309 'marketplace':10 'matching':31 'media':127 'member':498 'metrics':244 'mission':600,603 'mode':52 'most':413 'mouth':565 'native':329 'native-level':328 'navigate':470 'needs':145 'negotiate':166,171 'negotiation':337 'networking':129 'not':279 'occasional':455 'of':87,163,238,274,354,397,490,499,524,564,580 'offer':389 'offerings':165,233 'on':394,400,542 'ongoing':465 'opportunities':196,469 'or':292,300,310 'organizations':28 'oriented':360 'our':88,164,232,581,592,599,612 'paced':379,475 'package':520 'paid':445 'part':353,404 'passionate':382,426 'perfect':435 'performance':243,623 'performing':431 'pioneering':416 'pipeline':241 'play':633 'plus':269,538 'potential':77,116 'preferred':277,315,333 'presentation':335 'presentations':151,156 'prior':262 'product':153,226 'products/services':89 'proficiency':339 'program':552 'project':293 'prospect':109 'prospective':139 'provide':246 'providing':147 'purpose':23 'purpose-driven':22 're':49 'realm':266 'recommendations':566 'records':237 'refer':568 'referral':551 'regular':247 'related':301,312 'relationships':81,132,137 'relay':221 'relevant':290 'relish':487 'remote':451 'remote-first':450 'rep':3,64 'reporting':234 'reports':248 'required':280 'research':115,183 'responsibilities':108 'responsible':68,510 'revenue':544 'reward':43,576 'right':556 's':305 'salary':523 'sales':1,62,71,96,102,150,175,204,213,239,251,275,345,543 'satisfaction':179 'search':594 'second':621 'secured':46 'setting':453,477 'shaping':406 'share':584 'showcase':158 'skills':316,321 'skills/experience':253 'social':126 'social/environmental':38,260 'socially':509 'socious':6,550,558 'software':343 'solutions':149 'someone':554 'startup':299,380 'stay':184 'strategies':103,214 'strong':80,136,255,334,363 'successfully':567 'summary':59 'support':495,589 'sustainable':513 'tailored':148 'take':403,478 'talent':9,593 'targets':106,369 'team':228,356,456,501 'teams':99,207 'tech':298 'technologies':417 'technology':35,384 'terms':172 'thank':597 'that':11,502 'the':85,95,159,203,225,250,395,401,407,412,419,434,479,606 'their':144 'this':56,265,585 'those':288 'threats':198 'thrive':374,447 'through':29,118 'to':100,157,194,208,224,229,249,257,348,365,373,461,506,608 'togethers':459 'token':548,579 'tools':346 'traceable':41 'transparency':492 'transparent':17 'trends':188 'trust':491 'understanding':143 'unlimited':444 'unwavering':494 'us':5,54 'usd':533 'using':341 'value':86,160,561 'values':602,613 'various':119 'vibrant':472 'we':18,36,48,281,388,559 'welcome':282 'what':387 'will':66,91 'with':94,138,202,289,361,411,422,440,454,464,481,547 'word':563 'word-of-mouth':562 'work':14,40,92,200,349,437,476,514,620 'work-life':436 'working':410 'world':402 'years':273 'you':65,90,598 'your':462,588",
      city: "Tokyo",
      weekly_hours_lower: null,
      weekly_hours_higher: null,
      commitment_hours_lower: null,
      commitment_hours_higher: null,
      geoname_id: null,
      job_category_id: "1e76aff6-f2cb-48a0-bb18-4c9e9d42c88e",
      impact_job: true,
      promoted: true,
      kind: "JOB",
      payment_mode: null,
      identity_type: "organizations",
      identity_meta: {
        id: "2bd26aa5-f745-4f12-bca7-17916161ae8b",
        city: "Tokyo, Tokyo Prefecture",
        name: "Socious",
        email: "info@socious.io",
        image: "https://storage.googleapis.com/socious-gcs/ad4ae46f5dc138d8bc63928890bc64e0.png",
        hiring: true,
        status: "ACTIVE",
        address: "Nihonbashi 3-2-14-1F, Chuo Ward, Tokyo, Japan 103-0027",
        country: "JP",
        mission: "Our mission is to give everyone the chance to make a difference.\r\n\r\nWe are a talent platform that makes impact work accessible and transparent; we build connections between purpose-driven individuals and organizations. By leveraging blockchain technology, we make social/environmental impact work traceable and reward contributions with crypto tokens.",
        verified: true,
        shortname: "socious",
        description: null,
        wallet_address: null,
        verified_impact: true
      },
      job_category: {
        id: "1e76aff6-f2cb-48a0-bb18-4c9e9d42c88e",
        name: "Sales",
        hourly_wage_dollars: 20,
        created_at: "2023-01-26T15:00:00+00:00",
        updated_at: "2023-01-26T15:00:00+00:00"
      },
      work_samples: [],
      missions: 0,
      applicants: 10,
      saved: false,
      not_interested: false
    }
  ]
}

export const IDENTITIES = [
  {
    id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
    type: "organizations",
    meta: {
      id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
      city: "Tehran",
      name: "OrganizationTest",
      email: "imshantik@gmal.com",
      image: null,
      hiring: false,
      status: "ACTIVE",
      address: null,
      country: "IR",
      mission: null,
      verified: false,
      shortname: "organizationtest",
      description: null,
      wallet_address: null,
      verified_impact: false
    },
    created_at: "2025-02-27T13:16:43.884Z",
    primary: false,
    current: false,
    verification_status: null
  },
  {
    id: "3a4aa78b-9bf1-41bc-ab9c-1ae4fd6ebc7d",
    type: "organizations",
    meta: {
      id: "3a4aa78b-9bf1-41bc-ab9c-1ae4fd6ebc7d",
      city: "Tehran",
      name: "shant company",
      email: "mockMail@gmail.com",
      image: null,
      hiring: false,
      status: "ACTIVE",
      address: null,
      country: "IR",
      mission: null,
      verified: false,
      shortname: "shantik",
      description: null,
      wallet_address: null,
      verified_impact: false
    },
    created_at: "2025-02-28T08:24:45.311Z",
    primary: false,
    current: false,
    verification_status: null
  },
  {
    current: true,
    primary: true,
    id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
    type: "users",
    meta: {
      id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
      city: null,
      name: null,
      email: "imshantik@gmail.com",
      avatar: null,
      status: "ACTIVE",
      address: null,
      country: null,
      username: "imshantik5140",
      open_to_work: true,
      is_contributor: null,
      wallet_address: null,
      identity_verified: false,
      open_to_volunteer: false
    },
    created_at: "2025-02-27T10:59:24.278Z",
    verification_status: null
  }
]


export const NOTIFICATIONS = {
  page: 1,
  limit: 50,
  total_count: 13,
  items: [
    {
      id: "2dd24670-fd23-466c-bfae-d7df6dfb74f7",
      type: "CHAT",
      ref_id: "a5f29b60-7d82-4789-8b66-41c2f7f5b2dd",
      user_id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
      data: {
        id: "a5f29b60-7d82-4789-8b66-41c2f7f5b2dd",
        body: {
          body: "imshantik@gmail.com sent you a new message",
          title: "New Message"
        },
        text: "test",
        type: "CHAT",
        media: null,
        muted: false,
        orgin: {
          id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
          meta: {
            id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
            city: "Tehran",
            name: "OrganizationTest",
            email: "imshantik@gmal.com",
            image: null,
            hiring: false,
            status: "ACTIVE",
            address: null,
            country: "IR",
            mission: null,
            verified: false,
            shortname: "organizationtest",
            description: null,
            wallet_address: null,
            verified_impact: false
          },
          type: "organizations",
          created_at: "2025-02-27T13:16:43.884Z"
        },
        refId: "a5f29b60-7d82-4789-8b66-41c2f7f5b2dd",
        chat_id: "47909b77-87b4-461d-b242-eb63bd498fab",
        replied: false,
        identity: {
          id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
          meta: {
            id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
            city: null,
            name: null,
            email: "imshantik@gmail.com",
            avatar: null,
            status: "ACTIVE",
            address: null,
            country: null,
            username: "imshantik5140",
            open_to_work: true,
            is_contributor: null,
            wallet_address: null,
            identity_verified: false,
            open_to_volunteer: false
          },
          type: "users",
          follower: false,
          following: false,
          created_at: "2025-02-27T10:59:24.278Z",
          connection_status: null,
          verification_status: null
        },
        parentId: "47909b77-87b4-461d-b242-eb63bd498fab",
        reply_id: null,
        created_at: "2025-03-15T09:30:33.594Z",
        deleted_at: null,
        updated_at: "2025-03-15T09:30:33.594Z",
        identity_id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
        consolidate_number: 0
      },
      view_at: "2025-03-15T22:01:37.618Z",
      read_at: "2025-03-16T11:50:31.023Z",
      updated_at: "2025-03-16T11:50:31.023Z",
      created_at: "2025-03-15T09:30:33.866Z",
      silent: false
    }
  ]
}

export const PROJECT_DETAILS = {
  id: "2bd26aa5-f745-4f12-bca7-17916161ae8b",
  name: "Socious",
  bio: "Socious is a talent marketplace connecting purpose-driven talent with their dream jobs.",
  description: null,
  email: "info@socious.io",
  phone: "07074906558",
  city: "Tokyo, Tokyo Prefecture",
  type: "SOCIAL",
  address: "Nihonbashi 3-2-14-1F, Chuo Ward, Tokyo, Japan 103-0027",
  website: "https://socious.io",
  created_at: "2021-08-29T10:43:54.000Z",
  updated_at: "2022-02-17T11:18:37.000Z",
  social_causes: [
    "SOCIAL",
    "DECENT_WORK",
    "EDUCATION",
    "POVERTY",
    "SUSTAINABILITY"
  ],
  followers: 167,
  followings: 38,
  country: "JP",
  wallet_address: null,
  impact_points: 0,
  mission: "Our mission is to give everyone the chance to make a difference.\r\n\r\nWe are a talent platform that makes impact work accessible and transparent; we build connections between purpose-driven individuals and organizations. By leveraging blockchain technology, we make social/environmental impact work traceable and reward contributions with crypto tokens.",
  culture: "Diversity, Inclusion and Belonging\r\n\r\nWe want build a more inclusive world and it starts from building an inclusive company.\r\n\r\nLife First, Work Second\r\n\r\nWe believe that family and friends are more important than work. If there is a conflict between life and work, we should always prioritize life.\r\n\r\nHigh Performance for High Social Impact\r\n\r\nOur goal is to maximize social impact, not shareholder value or profit. Our social and financial returns are generally aligned, but if there is a conflict, we prioritize social returns.\r\n\r\nAutonomy and Accountability\r\n\r\nEach Socious member enjoys a high level of autonomy is trusted to do the right thing. They are also accountable for the decisions they make.\r\n\r\nCandor and Collaboration\r\n\r\nBeing honest is better than being nice.",
  image: {
    id: "53e51908-19a2-4579-9566-5842f01531eb",
    identity_id: "2bd26aa5-f745-4f12-bca7-17916161ae8b",
    filename: "Logomark_3 2.png",
    url: "https://storage.googleapis.com/socious-gcs/ad4ae46f5dc138d8bc63928890bc64e0.png",
    created_at: "2023-04-06T08:49:28.777155+00:00"
  },
  cover_image: {
    id: "091193bc-c34b-43f3-89fe-1db4e72d9db2",
    identity_id: "2bd26aa5-f745-4f12-bca7-17916161ae8b",
    filename: "YS-1580189.jpg",
    url: "https://storage.googleapis.com/socious-gcs/a2eba401bef6cbbaa66ca66eac1d8da1.jpg",
    created_at: "2023-04-06T08:50:00.412141+00:00"
  },
  mobile_country_code: "+81",
  created_by: null,
  shortname: "socious",
  old_id: 33,
  status: "ACTIVE",
  search_tsv: "'-0027':32 '-1':25 '-14':24 '-2':23 '103':31 '3':22 'access':54 'account':169,189 'align':156 'also':188 'alway':128 'autonomi':167,178 'believ':107 'belong':86 'better':201 'blockchain':69 'build':58,89,98 'candor':195 'chanc':40 'chuo':27 'collabor':197 'compani':101 'conflict':121,162 'connect':9,59 'contribut':79 'crypto':81 'decis':192 'differ':44 'divers':83 'dream':16 'driven':12,63 'enjoy':173 'everyon':38 'f':26 'famili':109 'financi':152 'first':103 'friend':111 'general':155 'give':37 'goal':138 'high':131,134,175 'honest':199 'impact':52,74,136,143 'import':114 'inclus':84,92,100 'individu':64 'info@socious.io':1 'japan':30 'job':17 'level':176 'leverag':68 'life':102,123,130 'make':42,51,72,194 'marketplac':8 'maxim':141 'member':172 'mission':34 'nice':204 'nihonbashi':21 'organ':66 'perform':132 'platform':49 'prefectur':20 'priorit':129,164 'profit':148 'purpos':11,62 'purpose-driven':10,61 'return':153,166 'reward':78 'right':184 'second':105 'sharehold':145 'social':135,142,150,165 'social/environmental':73 'socious':2,3,4,171 'start':96 'talent':7,13,48 'technolog':70 'thing':185 'token':82 'tokyo':18,19,29 'traceabl':76 'transpar':56 'trust':180 'valu':146 'want':88 'ward':28 'work':53,75,104,116,125 'world':93",
  other_party_id: null,
  other_party_title: null,
  other_party_url: null,
  geoname_id: 1850147,
  verified_impact: true,
  hiring: true,
  size: null,
  industry: null,
  did: "did:prism:b067f28d0085c93e05b34f5e38d920a459053a044313de92ae3eadb6432cfd11",
  verified: true,
  impact_detected: false,
  following: false,
  follower: false,
  connection_status: null,
  connection_id: null,
  benefits: null,
  recommendations: null,
  connections: 23
}

export const MORE_IDENTITIES = [
  {
    id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
    type: "organizations",
    meta: {
      id: "1396c403-1ade-4c40-b0d1-4680059a46c5",
      city: "Tehran",
      name: "OrganizationTest",
      email: "imshantik@gmal.com",
      image: null,
      hiring: false,
      status: "ACTIVE",
      address: null,
      country: "IR",
      mission: null,
      verified: false,
      shortname: "organizationtest",
      description: null,
      wallet_address: null,
      verified_impact: false
    },
    created_at: "2025-02-27T13:16:43.884Z",
    primary: false,
    current: false,
    verification_status: null
  },
  {
    id: "3a4aa78b-9bf1-41bc-ab9c-1ae4fd6ebc7d",
    type: "organizations",
    meta: {
      id: "3a4aa78b-9bf1-41bc-ab9c-1ae4fd6ebc7d",
      city: "Tehran",
      name: "shant company",
      email: "mockMail@gmail.com",
      image: null,
      hiring: false,
      status: "ACTIVE",
      address: null,
      country: "IR",
      mission: null,
      verified: false,
      shortname: "shantik",
      description: null,
      wallet_address: null,
      verified_impact: false
    },
    created_at: "2025-02-28T08:24:45.311Z",
    primary: false,
    current: false,
    verification_status: null
  },
  {
    current: true,
    primary: true,
    id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
    type: "users",
    meta: {
      id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
      city: null,
      name: null,
      email: "imshantik@gmail.com",
      avatar: null,
      status: "ACTIVE",
      address: null,
      country: null,
      username: "imshantik5140",
      open_to_work: true,
      is_contributor: null,
      wallet_address: null,
      identity_verified: false,
      open_to_volunteer: false
    },
    created_at: "2025-02-27T10:59:24.278Z",
    verification_status: null
  }
]

export const QUESTIONS = {
  questions: [
    {
      id: "ca53a12f-a949-46b1-9e34-8bd933d9a4e2",
      project_id: "615be3c0-b294-4901-a208-2409d545959d",
      question: "How did you hear about us?",
      required: true,
      options: null,
      created_at: "2024-05-29T07:26:09.041Z",
      updated_at: "2024-05-29T07:26:09.041Z",
      old_id: null
    },
    {
      id: "4c1046c6-eb47-4db5-9cee-cf9c00020d45",
      project_id: "615be3c0-b294-4901-a208-2409d545959d",
      question: "Why do you want to contribute to our mission? Could you please tell us about your previous experience with social/environmental impact projects if you have any?",
      required: true,
      options: null,
      created_at: "2024-05-29T07:26:09.095Z",
      updated_at: "2024-05-29T07:26:09.095Z",
      old_id: null
    },
    {
      id: "ff8fd62c-8e6e-4e40-86f8-ff91dcb86f0e",
      project_id: "615be3c0-b294-4901-a208-2409d545959d",
      question: "What is your salary expectation? What is your current salary?",
      required: true,
      options: null,
      created_at: "2024-05-29T07:26:09.116Z",
      updated_at: "2024-05-29T07:26:09.116Z",
      old_id: null
    },
    {
      id: "2d1d66ac-91e0-4846-a846-e3575460ac98",
      project_id: "615be3c0-b294-4901-a208-2409d545959d",
      question: "Could you share two repositories that best showcase your abilities? (attach public repository links)",
      required: null,
      options: null,
      created_at: "2024-05-29T07:26:09.116Z",
      updated_at: "2024-05-29T07:26:09.116Z",
      old_id: null
    },
    {
      id: "ba57d1e3-cb76-481b-8d12-edf30e5f53aa",
      project_id: "615be3c0-b294-4901-a208-2409d545959d",
      question: "When can you start?",
      required: true,
      options: null,
      created_at: "2024-05-29T07:26:09.122Z",
      updated_at: "2024-05-29T07:26:09.122Z",
      old_id: null
    }
  ]
}

export const NOT_INTERESTED = {
  id: "9dbb7cb5-beb5-402e-869a-04070510dbf5",
  identity_id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
  project_id: "776a3d82-684d-406a-a4ba-599d761ca878",
  marked_as: "NOT_INTERESTED",
  created_at: "2025-03-24T21:05:58.810Z"
}

export const MARK_AS_SAVE = {
  id: "aa8d56d0-018b-4d20-be66-a7f423e93eea",
  identity_id: "035f724e-5824-4129-8ed6-96c6dda81a3a",
  project_id: "615be3c0-b294-4901-a208-2409d545959d",
  marked_as: "SAVE",
  created_at: "2025-03-24T21:12:43.504Z"
}

export const SAVED_JOBS = {
  page: 1,
  limit: 10,
  total_count: 1,
  items: [
    {
      id: "615be3c0-b294-4901-a208-2409d545959d",
      identity_id: "2bd26aa5-f745-4f12-bca7-17916161ae8b",
      description: "### **About Us:**\r\n\r\nSocious is a talent marketplace that makes impact work accessible and transparent; we build connections between purpose-driven individuals and impact organizations through AI matching. By leveraging blockchain technology, we make social/environmental impact work traceable and reward contributions.\r\n\r\nHaving secured funding, we're in expansion mode. Join us in this journey!\r\n\r\n### **Job Summary:**\r\n\r\nAs a Sales & BD Rep, you will be responsible for driving sales growth by identifying and engaging potential customers, building strong relationships, and effectively communicating the value of our products/services. You will work closely with the sales and marketing teams to execute sales strategies and achieve targets.\r\n\r\n### **Key Responsibilities:**\r\n\r\n- **Prospect and Generate Leads:** Identify and research potential customers through various channels, including cold calling, email campaigns, social media, and networking events.\r\n- **Build Relationships:** Establish and maintain strong relationships with prospective and existing clients, understanding their needs and providing tailored solutions.\r\n- **Sales Presentations:** Conduct product demonstrations and presentations to showcase the value and benefits of our offerings.\r\n- **Negotiate and Close Deals:** Effectively negotiate terms and close sales deals, ensuring customer satisfaction and loyalty.\r\n- **Market Research:** Stay informed about industry trends, competitor activities, and market conditions to identify opportunities and threats.\r\n- **Collaborate:** Work closely with the sales and marketing teams to develop and implement effective sales strategies and campaigns.\r\n- **Customer Feedback:** Gather and relay customer feedback to the product development team to help improve our offerings.\r\n- **Reporting:** Maintain accurate records of sales activities, pipeline, and performance metrics, and provide regular reports to the sales manager.\r\n\r\n### **Skills/Experience:**\r\n\r\n- A strong desire to make a social/environmental impact. Prior experience in this realm is a plus.\r\n- **Experience:** 1-2 years of sales experience (preferred but not required). We welcome applications from fresh graduates, especially those with relevant internships or project experience, ideally in a tech startup or related industry.\r\n- **Education:** Bachelor's degree in Business, Marketing, or a related field is preferred.\r\n- **Skills:**\r\n    - Excellent communication and interpersonal skills in English (business level) and Japanese (Native-level Japanese is preferred).\r\n    - Strong presentation and negotiation abilities.\r\n    - Proficiency in using CRM software and sales tools.\r\n    - Ability to work independently and as part of a team.\r\n- **Attributes:**\r\n    - Goal-oriented with a strong drive to achieve and exceed targets.\r\n    - Adaptable and able to thrive in a fast-paced startup environment.\r\n    - Passionate about technology and innovation.\r\n\r\n### **What We Offer:**\r\n\r\n- Make a lasting impact on the lives of many and on the world.\r\n- Take part in shaping the future by working with the most advanced and pioneering technologies in the field.\r\n- Collaborate with and learn from passionate, diverse, and high-performing colleagues.\r\n- Achieve the perfect work-life balance with flexible hours and unlimited paid leave.\r\n- Thrive in a remote-first setting with occasional team get-togethers.\r\n- Commit to your growth with ongoing learning and development opportunities.\r\n- Navigate a vibrant, fast-paced work setting.\r\n- Take the lead with autonomy in decision-making.\r\n- Relish a culture of trust, transparency, and unwavering support.\r\n- Become a member of a team that is deeply committed to fostering a socially responsible and ecologically sustainable work environment.\r\n- Enjoy a competitive compensation package: a base salary of ¥5,000,000 - ¥8,000,000 annually (approximately USD 35,000 - 60,000), plus 10%-30% commission on sales revenue generated, along with token allocation.\r\n\r\n**Socious Referral Program:**\r\n\r\nKnow someone just right for Socious? We highly value word-of-mouth recommendations. Successfully refer a candidate, and enjoy a $1,000 reward as a token of our gratitude. Just share this job link!\r\n\r\nYour support in broadening our talent search is invaluable. Thank you.\r\n\r\n**Our mission and values:**\r\n\r\n**Mission:** Give everyone the chance to make a difference.\r\n\r\n**Our values:**\r\n\r\n- Diversity, inclusion, and belonging.\r\n- Life first, work second.\r\n- High performance for high impact.\r\n- Autonomy and accountability.\r\n- Candor, collaboration, and play.",
      project_type: "FULL_TIME",
      project_length: "6_MONTHS_OR_MORE",
      payment_currency: "USD",
      payment_range_lower: "35000",
      payment_range_higher: "90000",
      experience_level: 1,
      created_at: "2024-05-29T07:26:08.775Z",
      updated_at: "2024-05-29T22:27:13.976Z",
      deleted_at: null,
      status: "ACTIVE",
      payment_type: "PAID",
      payment_scheme: "FIXED",
      title: "Sales & BD Rep",
      expires_at: null,
      country: "JP",
      skills: [
        "BUSINESS_DEVELOPMENT",
        "MARKETING_STRATEGY",
        "SALES",
        "SALES_MANAGEMENT",
        "SOCIAL_MEDIA_MARKETING"
      ],
      causes_tags: [
        "SOCIAL"
      ],
      old_id: null,
      other_party_id: null,
      other_party_title: null,
      other_party_url: null,
      remote_preference: "HYBRID",
      search_tsv: "'-2':272 '-30':540 '000':526,527,529,530,535,537,575 '1':271,574 '10':539 '35':534 '5':525 '60':536 '8':528 'a':8,61,254,259,268,297,311,355,362,376,391,449,471,488,497,500,508,517,521,569,573,578,610 'abilities':338 'ability':347 'able':372 'about':4,186,383 'accessible':15 'accountability':629 'accurate':236 'achieve':105,366,433 'activities':190,240 'adaptable':370 'advanced':414 'ai':30 'allocation':549 'along':546 'and':16,26,42,75,82,97,104,110,114,128,134,140,146,155,161,167,173,180,191,197,205,210,215,220,242,245,319,326,336,344,351,367,371,385,399,415,423,428,443,467,493,511,571,601,616,628,632 'annually':531 'applications':283 'approximately':532 'as':60,352,577 'attributes':357 'autonomy':482,627 'bachelor':304 'balance':439 'base':522 'bd':2,63 'be':67 'become':496 'belonging':617 'benefits':162 'between':21 'blockchain':34 'broadening':591 'build':19,131 'building':79 'business':308,324 'but':278 'by':32,73,409 'calling':123 'campaigns':125,216 'candidate':570 'candor':630 'chance':607 'channels':120 'clients':142 'close':168,174 'closely':93,201 'cold':122 'collaborate':199,421 'collaboration':631 'colleagues':432 'commission':541 'commit':460 'committed':505 'communicating':84 'communication':318 'compensation':519 'competitive':518 'competitor':189 'conditions':193 'conduct':152 'connections':20 'contributions':44 'crm':342 'culture':489 'customer':178,217,222 'customers':78,117 'deals':169,176 'decision':485 'decision-making':484 'deeply':504 'degree':306 'demonstrations':154 'desire':256 'develop':209 'development':227,468 'difference':611 'diverse':427 'diversity':614 'drive':364 'driven':24 'driving':70 'ecologically':512 'education':303 'effective':212 'effectively':83,170 'email':124 'engaging':76 'english':323 'enjoy':516,572 'ensuring':177 'environment':381,515 'especially':287 'establish':133 'events':130 'everyone':605 'exceed':368 'excellent':317 'execute':101 'existing':141 'expansion':51 'experience':263,270,276,294 'fast':378,474 'fast-paced':377,473 'feedback':218,223 'field':313,420 'first':452,619 'flexible':441 'for':69,557,624 'fostering':507 'fresh':285 'from':284,425 'funding':47 'future':408 'gather':219 'generate':111 'generated':545 'get':458 'get-togethers':457 'give':604 'goal':359 'goal-oriented':358 'graduates':286 'gratitude':582 'growth':72,463 'having':45 'help':230 'high':430,622,625 'high-performing':429 'highly':560 'hours':442 'ideally':295 'identify':113,195 'identifying':74 'impact':13,27,39,261,393,626 'implement':211 'improve':231 'in':50,55,264,296,307,322,340,375,405,418,448,483,590 'including':121 'inclusion':615 'independently':350 'individuals':25 'industry':187,302 'informed':185 'innovation':386 'internships':291 'interpersonal':320 'invaluable':596 'is':7,267,314,332,503,595 'japanese':327,331 'job':58,586 'join':53 'journey':57 'just':555,583 'key':107 'know':553 'lasting':392 'lead':480 'leads':112 'learn':424 'learning':466 'leave':446 'level':325,330 'leveraging':33 'life':438,618 'link':587 'lives':396 'loyalty':181 'maintain':135,235 'make':37,258,390,609 'makes':12 'making':486 'manager':252 'many':398 'market':182,192 'marketing':98,206,309 'marketplace':10 'matching':31 'media':127 'member':498 'metrics':244 'mission':600,603 'mode':52 'most':413 'mouth':565 'native':329 'native-level':328 'navigate':470 'needs':145 'negotiate':166,171 'negotiation':337 'networking':129 'not':279 'occasional':455 'of':87,163,238,274,354,397,490,499,524,564,580 'offer':389 'offerings':165,233 'on':394,400,542 'ongoing':465 'opportunities':196,469 'or':292,300,310 'organizations':28 'oriented':360 'our':88,164,232,581,592,599,612 'paced':379,475 'package':520 'paid':445 'part':353,404 'passionate':382,426 'perfect':435 'performance':243,623 'performing':431 'pioneering':416 'pipeline':241 'play':633 'plus':269,538 'potential':77,116 'preferred':277,315,333 'presentation':335 'presentations':151,156 'prior':262 'product':153,226 'products/services':89 'proficiency':339 'program':552 'project':293 'prospect':109 'prospective':139 'provide':246 'providing':147 'purpose':23 'purpose-driven':22 're':49 'realm':266 'recommendations':566 'records':237 'refer':568 'referral':551 'regular':247 'related':301,312 'relationships':81,132,137 'relay':221 'relevant':290 'relish':487 'remote':451 'remote-first':450 'rep':3,64 'reporting':234 'reports':248 'required':280 'research':115,183 'responsibilities':108 'responsible':68,510 'revenue':544 'reward':43,576 'right':556 's':305 'salary':523 'sales':1,62,71,96,102,150,175,204,213,239,251,275,345,543 'satisfaction':179 'search':594 'second':621 'secured':46 'setting':453,477 'shaping':406 'share':584 'showcase':158 'skills':316,321 'skills/experience':253 'social':126 'social/environmental':38,260 'socially':509 'socious':6,550,558 'software':343 'solutions':149 'someone':554 'startup':299,380 'stay':184 'strategies':103,214 'strong':80,136,255,334,363 'successfully':567 'summary':59 'support':495,589 'sustainable':513 'tailored':148 'take':403,478 'talent':9,593 'targets':106,369 'team':228,356,456,501 'teams':99,207 'tech':298 'technologies':417 'technology':35,384 'terms':172 'thank':597 'that':11,502 'the':85,95,159,203,225,250,395,401,407,412,419,434,479,606 'their':144 'this':56,265,585 'those':288 'threats':198 'thrive':374,447 'through':29,118 'to':100,157,194,208,224,229,249,257,348,365,373,461,506,608 'togethers':459 'token':548,579 'tools':346 'traceable':41 'transparency':492 'transparent':17 'trends':188 'trust':491 'understanding':143 'unlimited':444 'unwavering':494 'us':5,54 'usd':533 'using':341 'value':86,160,561 'values':602,613 'various':119 'vibrant':472 'we':18,36,48,281,388,559 'welcome':282 'what':387 'will':66,91 'with':94,138,202,289,361,411,422,440,454,464,481,547 'word':563 'word-of-mouth':562 'work':14,40,92,200,349,437,476,514,620 'work-life':436 'working':410 'world':402 'years':273 'you':65,90,598 'your':462,588",
      city: "Tokyo",
      weekly_hours_lower: null,
      weekly_hours_higher: null,
      commitment_hours_lower: null,
      commitment_hours_higher: null,
      geoname_id: null,
      job_category_id: "1e76aff6-f2cb-48a0-bb18-4c9e9d42c88e",
      impact_job: true,
      promoted: true,
      kind: "JOB",
      payment_mode: null,
      identity_type: "organizations",
      identity_meta: {
        id: "2bd26aa5-f745-4f12-bca7-17916161ae8b",
        city: "Tokyo, Tokyo Prefecture",
        name: "Socious",
        email: "info@socious.io",
        image: "https://storage.googleapis.com/socious-gcs/ad4ae46f5dc138d8bc63928890bc64e0.png",
        hiring: true,
        status: "ACTIVE",
        address: "Nihonbashi 3-2-14-1F, Chuo Ward, Tokyo, Japan 103-0027",
        country: "JP",
        mission: "Our mission is to give everyone the chance to make a difference.\r\n\r\nWe are a talent platform that makes impact work accessible and transparent; we build connections between purpose-driven individuals and organizations. By leveraging blockchain technology, we make social/environmental impact work traceable and reward contributions with crypto tokens.",
        verified: true,
        shortname: "socious",
        description: null,
        wallet_address: null,
        verified_impact: true
      },
      job_category: {
        id: "1e76aff6-f2cb-48a0-bb18-4c9e9d42c88e",
        name: "Sales",
        hourly_wage_dollars: 20,
        created_at: "2023-01-26T15:00:00+00:00",
        updated_at: "2023-01-26T15:00:00+00:00"
      },
      missions: 0,
      applicants: 10,
      saved: true,
      not_interested: false
    }
  ]
}