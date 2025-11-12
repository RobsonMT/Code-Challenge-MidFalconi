export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  profileId: string;
  profile?: {
    id: string;
    name?: string;
  };
};

export type Profile = {
  id: string;
  name?: string;
};
