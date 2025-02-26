export type ScrambleSponsor = {
  id?: string;
  scrambleId: string;
  sponsorName: string;
  sponsorWebsite: string;
  sponsorPhone: string;
  sponsorEmail: string;
  sponsorImage?: string;
  holeNumber: number;
  sponsorType: string;
  file?: File;
};
