type Attendee = {
  id: string;
  name?: string | null;
  lastname?: string | null;
  // image: string;
};

export type AttendeesTypes = {
  title: string;
  attendees: Attendee[];
};
