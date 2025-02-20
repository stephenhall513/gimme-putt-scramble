import Event from "@/components/Event/Event";
import EventInfo from "@/components/EventInfo";
import EventLogo from "@/components/EventLogo";
import SponsorList from "@/components/SponsorList/SponsorList";
import { ScrambleEvent } from "@/types/ScrambleEvent";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventId = (await params).eventId;
  return (
    <div>
      <Event eventId={eventId} />
    </div>
  );
}
