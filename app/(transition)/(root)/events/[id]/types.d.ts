type Community = {
  name: string;
};

type EventClass = {
  name: string;
  address: null;
  description: string;
  maxAttendees: number;
  status: string;
  startDateTime: Date;
  meetingURL: null;
  community: Community;
  tags: any[];
  users: any[];
  tickets: any[];
};

type Data = {
  event: EventClass;
};

export type EventType = {
  event: EventClass;
};

export type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
