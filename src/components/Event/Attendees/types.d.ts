type Attendee = {
  name: string;
  lastname: string;
  email: string;
  image: string;
}

export type AttendeesTypes = {
  title: string;
  attendees: Attendee[];
  className?: string;
};
