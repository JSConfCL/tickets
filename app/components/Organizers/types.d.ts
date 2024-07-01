type Organizer = {
  id: string;
  name: string;
  lastname: string;
  image: string;
};

export type OrganizersTypes = {
  title: string;
  organizers: Organizer[];
};
