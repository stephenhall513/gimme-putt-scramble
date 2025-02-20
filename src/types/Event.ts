export type Event = {
  id?: string;
  eventName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  organizationName: string;
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  eventLogo: string;
  hasMultipleScrambles: boolean;
  isPaid: boolean;
};
