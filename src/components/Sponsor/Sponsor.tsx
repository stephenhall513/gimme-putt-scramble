import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";

interface SponsorProps {
  sponsor: ScrambleSponsor;
}

const Sponsor = ({ sponsor }: SponsorProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="text-center">Sponsored By:</div>
      <div>
        {sponsor.sponsorImage ? (
          <Link href={"https://" + sponsor.sponsorWebsite} legacyBehavior>
            <a target="_blank" className="flex justify-center py-5">
              <Image
                src={sponsor.sponsorImage}
                height={250}
                width={400}
                alt="Sponsor"
              />
            </a>
          </Link>
        ) : (
          <div className="text-3xl text-center py-5">{sponsor.sponsorName}</div>
        )}
        <div className="text-xs text-center">{sponsor.sponsorWebsite}</div>
      </div>
    </>
  );
};

export default Sponsor;
