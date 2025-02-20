import { ScrambleEvent } from "@/types/ScrambleEvent";
import { format } from "date-fns";

interface EventInfoProps {
  scrambleEvent: ScrambleEvent;
}

const EventInfo: React.FC<EventInfoProps> = ({
  scrambleEvent,
}: EventInfoProps) => {
  return (
    <div>
      <h1>{scrambleEvent.eventName}</h1>
      <p>{format(scrambleEvent.startDate, "MM/dd/yyyy")}</p>
      <p>{scrambleEvent.description}</p>
      <p>{scrambleEvent.organizationName}</p>
    </div>
  );
};

export default EventInfo;
