export type Resume = { name: string; file: File | null };

export type ApplyApplicationPayload = {
  cover_letter: string;
  cv_link: string;
  cv_name: string;
  share_contact_info: boolean;
  answers: { id: string; answer: string }[];
  attachment?: string;
};
