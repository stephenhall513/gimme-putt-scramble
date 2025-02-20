import Event from "@/components/Event/Event";

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
