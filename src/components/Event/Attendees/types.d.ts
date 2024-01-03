type Attendee = {
  id: string;
  name: string;
  lastname: string;
  image: string;
};

export type AttendeesTypes = {
  title: string;
  attendees: Attendee[];
};
