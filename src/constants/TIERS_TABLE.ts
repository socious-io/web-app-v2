export type Tiers = {
  tier: number;
  min: number;
  max: number;
  access: string;
  community: string;
  discount: string;
  stakingReward: string;
};

export const TIERS: Tiers[] = [
  {
    tier: 1,
    min: 0,
    max: 535,
    access: 'Access to green marketplace offers/opportunities/products',
    community: 'Access to green lounge forum',
    discount: '5% Discount if paying with THANK',
    stakingReward: 'Base Rate',
  },
  {
    tier: 2,
    min: 535,
    max: 536,
    access: 'NA',
    community: 'NA',
    discount: '8% Discount if paying with THANK',
    stakingReward: 'Base Rate + 3.3%',
  },
  {
    tier: 3,
    min: 536,
    max: 8577,
    access: 'NA',
    community: 'NA',
    discount: '11% Discount if paying with THANK',
    stakingReward: 'Base Rate + 6.6%',
  },
  {
    tier: 4,
    min: 8577,
    max: 43423,
    access: 'Access to Bronze only marketplace offers/opportunities/products',
    community: 'Access to bronze lounge forum',
    discount: '15% Bronze Discount if paying with THANK',
    stakingReward: 'Base Rate + 10%',
  },
  {
    tier: 5,
    min: 43423,
    max: 137239,
    access: 'NA',
    community: 'NA',
    discount: '20% Bronze Discount if paying with THANK',
    stakingReward: 'Base Rate + 13.3%',
  },
  {
    tier: 6,
    min: 137239,
    max: 335056,
    access: 'NA',
    community: 'NA',
    discount: '25% Bronze Discount if paying with THANK',
    stakingReward: 'Base Rate + 16.6%',
  },
  {
    tier: 7,
    min: 335056,
    max: 694771,
    access: 'Access to Sliver only marketplace offers/opportunities/products',
    community: 'Access to silver lounge forum',
    discount: '30% Silver Discount if paying with THANK',
    stakingReward: 'Base Rate + 20%',
  },
  {
    tier: 8,
    min: 694771,
    max: 1287150,
    access: 'NA',
    community: 'NA',
    discount: '36% Silver Discount if paying with THANK',
    stakingReward: 'Base Rate + 25%',
  },
  {
    tier: 9,
    min: 1287150,
    max: 2195820,
    access: 'NA',
    community: 'NA',
    discount: '43% Silver Discount if paying with THANK',
    stakingReward: 'Base Rate + 30%',
  },
  {
    tier: 10,
    min: 2195820,
    max: 3517279,
    access: 'Access to Gold only marketplace offer/opportunities/products',
    community: 'Access to gold lounge forum',
    discount: '50% Gold Discount if paying with THANK',
    stakingReward: 'Base Rate + 35%',
  },
  {
    tier: 11,
    min: 3517279,
    max: 5360889,
    access: 'NA',
    community: 'NA',
    discount: '60% Gold Discount if paying with THANK',
    stakingReward: 'Base Rate + 43.3%',
  },
  {
    tier: 12,
    min: 5360889,
    max: 7848878,
    access: 'Access to Platinum only marketplace offers/opportunities/products',
    community: 'Access to platinum lounge forum',
    discount: '70% Gold Discount if paying with THANK',
    stakingReward: 'Base Rate + 50%',
  },
];
