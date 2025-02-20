export default async function ScramblePage({
  params,
}: {
  params: Promise<{ scrambleEventId: string; scrambleId: string }>;
}) {
  const scrambleEventId = (await params).scrambleEventId;
  const scrambleId = (await params).scrambleId;
  return (
    <div>
      <h1>Scramble ID: {scrambleId}</h1>
      <h2>Event ID: {scrambleEventId}</h2>
    </div>
  );
}
