import { ScrambleSponsor } from "./ScrambleSponsor";

export type ScrambleEvent = {
  id?: string;
  golferId: string;
  eventName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  organizationName: string;
  isNonprofit: boolean;
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  eventLogo: string;
  hasMultipeScrambles: boolean;
  isPaid: boolean;
  sponsors?: ScrambleSponsor[];
};
