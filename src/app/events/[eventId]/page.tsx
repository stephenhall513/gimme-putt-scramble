import EventInfo from "@/components/EventInfo";
import EventLogo from "@/components/EventLogo";
import SponsorList from "@/components/SponsorList/SponsorList";
import { ScrambleEvent } from "@/types/ScrambleEvent";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const [eventData, setEventData] = useState<ScrambleEvent | null>(null);

  useEffect(() => {
    const getEventData = async () => {
      const response = await fetch("/api/event/get");
      const data: ScrambleEvent = await response.json();
      setEventData(data);
    };

    getEventData();
  }, []);

  return (
    <div>
      {eventData ? (
        <>
          <EventLogo src={eventData.eventLogo} alt={eventData.eventName} />
          <EventInfo scrambleEvent={eventData} />
          {eventData.sponsors ? (
            <SponsorList sponsors={eventData.sponsors} />
          ) : (
            false
          )}
          <Link href={`/blog/${eventData.id}`}>Scramble Info</Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
