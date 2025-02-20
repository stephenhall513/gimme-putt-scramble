import { ScrambleEvent } from "@/types/ScrambleEvent";
import { Grid2 } from "@mui/material";
import { format } from "date-fns";

interface ScrambleEventListItemProps {
  scrambleEvent: ScrambleEvent;
}

const ScrambleEventListItem = ({
  scrambleEvent,
}: ScrambleEventListItemProps) => {
  return (
    <>
      <Grid2>{scrambleEvent.eventName}</Grid2>
      <Grid2>{scrambleEvent.organizationName}</Grid2>
      <Grid2>{format(scrambleEvent.startDate, "MM/dd/yyyy")}</Grid2>
      <Grid2>{format(scrambleEvent.endDate, "MM/dd/yyyy")}</Grid2>
      <Grid2>Edit</Grid2>
    </>
  );
};

export default ScrambleEventListItem;
