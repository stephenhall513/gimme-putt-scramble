import { ScrambleSponsor } from "@/types/ScrambleSponsor";

interface SponsorListProps {
  sponsors: ScrambleSponsor[];
}

const SponsorList = ({ sponsors }: SponsorListProps) => {
  return (
    <ul>
      {sponsors.map((sponsor, index) => (
        <li key={index}>{sponsor.sponsorName}</li>
      ))}
    </ul>
  );
};

export default SponsorList;
