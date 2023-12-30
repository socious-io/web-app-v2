interface UserType {
  title: string;
  username: string;
  image?: string | null;
  isAvailable: boolean;
  id: number;
  type: string;
  bio?: string | null;
  isVerified: boolean;
}

export interface UserCardProps {
  user: UserType;
}
