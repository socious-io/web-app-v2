export function generateRandomEmail() {
  return `e2e_test_${Date.now()}@gmail.com`;
}

export class User {
  firstname: string;
  lastname: string;
  email: string;
  username: string;

  constructor(firstname: string, lastname: string, email: string, username: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
  }

  getIdentity() {
    return [
      {
        current: true,
        primary: true,
        id: 'd1c7109a-0ede-4190-869c-dd62cd7107be',
        type: 'users',
        meta: {
          id: 'd1c7109a-0ede-4190-869c-dd62cd7107be',
          city: null,
          name: `${this.firstname} ${this.lastname}`,
          email: this.email,
          avatar: null,
          status: 'ACTIVE',
          address: null,
          country: null,
          username: this.username,
          open_to_work: false,
          wallet_address: null,
          open_to_volunteer: false,
        },
        created_at: '2024-03-21T10:07:49.101Z',
      },
    ];
  }

  getProfile(social_causes: string[], skills: string[], city: string) {
    social_causes = social_causes.map((cause) => cause.toUpperCase());
    return {
      id: 'd1c7109a-0ede-4190-869c-dd62cd7107be',
      username: this.username,
      first_name: this.firstname,
      last_name: this.lastname,
      city,
      geoname_id: null,
      country: 'IS',
      mission: null,
      bio: null,
      impact_points: 0,
      skills,
      followers: 0,
      followings: 0,
      created_at: '2024-03-21T10:07:49.101Z',
      wallet_address: null,
      proofspace_connect_id: null,
      phone: null,
      address: null,
      social_causes,
      avatar: null,
      cover_image: null,
      reported: false,
      following: false,
      follower: false,
      connection_status: null,
      connection_id: null,
      mobile_country_code: null,
      open_to_work: false,
      open_to_volunteer: false,
      educations: null,
      portfolios: null,
      certificates: null,
      recommendations: null,
      languages: null,
      experiences: null,
    };
  }
}

export class OrganizationUser {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  orgEmail: string;
  orgUsername: string;
  city: string;
  socialCauses: string[];

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    orgEmail: string,
    orgUsername: string,
    city: string,
    socialCauses: string[],
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.orgEmail = orgEmail;
    this.orgUsername = orgUsername;
    this.city = city;
    this.socialCauses = socialCauses;
  }

  get() {
    const social_causes = this.socialCauses.map((socialCause) => socialCause.toUpperCase());
    return {
      id: 'deb0e215-e2cd-4d7f-9ae3-bc7141acd3cf',
      name: `${this.firstname} ${this.lastname}`,
      bio: 'test',
      description: 'afdfasf',
      email: this.email,
      phone: null,
      city: this.city,
      type: 'NONPROFIT',
      address: null,
      website: null,
      created_at: '2023-07-11T18:39:09.046Z',
      updated_at: '2023-07-11T18:39:09.046Z',
      social_causes,
      followers: 1,
      followings: 0,
      country: 'AE',
      wallet_address: null,
      impact_points: 0,
      mission: 'mission',
      culture: 'culture',
      image: null,
      cover_image: null,
      mobile_country_code: null,
      created_by: '20b07c1c-b142-4ee3-a87f-122aa99a7659',
      shortname: this.orgUsername,
      old_id: null,
      status: 'ACTIVE',
      search_tsv: null,
      other_party_id: null,
      other_party_title: null,
      other_party_url: null,
      geoname_id: 292968,
      verified_impact: false,
      hiring: false,
      size: null,
      industry: null,
      did: null,
      following: false,
      follower: false,
      connection_status: null,
      connection_id: null,
      benefits: null,
      recommendations: null,
    };
  }
}
