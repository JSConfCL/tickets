type Organizer = {
  name: string;
  lastname: string;
  email: string;
  image: string;
}

export type OrganizersTypes = {
  title: string;
  organizers: Organizer[];
  className?: string;
};
