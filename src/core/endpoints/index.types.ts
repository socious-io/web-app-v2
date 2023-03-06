export type GetProject = (id: string) => {
  applicants: number;
  applied: boolean;
  city: string;
};

export type GetOffer = {
  id: string;
  created_at: string;
  project_id: string;
  project: {
    id: string;
    description: string;
    title: string;
  };
  offerer: {
    meta: {
      image: string;
      name: string;
    };
  };
};
