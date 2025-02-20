"use client";
import { ScrambleEvent } from "@/types/ScrambleEvent";
import Link from "next/link";
import { useEffect, useState } from "react";
import EventLogo from "../EventLogo";
import EventInfo from "../EventInfo";
import SponsorList from "../SponsorList/SponsorList";
import { GetScrambleEvent } from "@/api/scrambleEvent";

interface EventProps {
  eventId: string;
}

const Event = ({ eventId }: EventProps) => {
  const [eventData, setEventData] = useState<ScrambleEvent | null>(null);

  useEffect(() => {
    const getEventData = async () => {
      const response = await GetScrambleEvent(eventId);
      if (response.status == 200) {
        setEventData(response.data);
      }
    };

    getEventData();
  }, []);

  return eventData ? (
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
  );
};

export default Event;
