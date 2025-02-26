import { GetScrambleEvent } from "@/api/scrambleEvent";
import { ScrambleEvent } from "@/types/ScrambleEvent";
import { Box, Grid2 } from "@mui/material";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

interface EventDetailsProps {
  scrambleEventId: string;
  refreshTrigger: boolean;
}

const EventDetails = ({
  scrambleEventId,
  refreshTrigger,
}: EventDetailsProps) => {
  const [scrambleEvent, setScrambleEvent] = useState<ScrambleEvent>();

  useEffect(() => {
    const getScrambleEvent = async () => {
      const response = await GetScrambleEvent(scrambleEventId);
      if (response.status == 200) {
        setScrambleEvent(response.data);
      }
    };
    getScrambleEvent();
  }, [scrambleEventId, refreshTrigger]);

  return (
    <Box borderColor="#000000" border={1} borderRadius={2} padding={4}>
      <Grid2 container spacing={1} rowSpacing={2}>
        <Grid2 size={{ sm: 12 }}>
          {scrambleEvent?.eventLogo ? (
            <Image
              alt={scrambleEvent.eventName}
              src={scrambleEvent?.eventLogo}
              height={200}
              width={200}
            />
          ) : (
            false
          )}
        </Grid2>
        <Grid2 size={{ lg: 6, md: 6, sm: 12 }}>
          <span className="font-bold mr-2">Organization:</span>
          {scrambleEvent?.organizationName}
        </Grid2>
        <Grid2 size={{ md: 6, sm: 12 }}>
          <span className="font-bold mr-2">
            Is your company/organization a Non-Profit?
          </span>
          {scrambleEvent?.isNonprofit == true ? "Yes" : "No"}
        </Grid2>
        <Grid2 size={{ lg: 6, md: 6, sm: 12 }}>
          <span className="font-bold mr-2">Event Name:</span>
          {scrambleEvent?.eventName}
        </Grid2>
        <Grid2 size={{ lg: 3, md: 6, sm: 12 }}>
          <span className="font-bold mr-2">Start Date:</span>
          {scrambleEvent ? format(scrambleEvent?.startDate, "MM/dd/yyyy") : ""}
        </Grid2>
        <Grid2 size={{ lg: 3, md: 6, sm: 12 }}>
          <span className="font-bold mr-2">End Date:</span>
          {scrambleEvent ? format(scrambleEvent?.endDate, "MM/dd/yyyy") : ""}
        </Grid2>
        <Grid2 size={{ lg: 12, sm: 12 }}>
          <span className="font-bold mr-2">Description:</span>
          {scrambleEvent?.description}
        </Grid2>
        <Grid2 size={{ md: 4, sm: 12 }}>
          <span className="font-bold mr-2">Organizer Name:</span>
          {scrambleEvent?.organizerName}
        </Grid2>
        <Grid2 size={{ md: 4, sm: 12 }}>
          <span className="font-bold mr-2">Organizer Email:</span>
          {scrambleEvent?.organizerEmail}
        </Grid2>
        <Grid2 size={{ md: 4, sm: 12 }}>
          <span className="font-bold mr-2">Organizer Phone:</span>
          {scrambleEvent?.organizerPhone}
        </Grid2>
        <Grid2 size={{ lg: 8, sm: 12 }}>
          <span className="font-bold mr-2">
            Are you going to have multiple sites/scrambles for your event?
          </span>
          {scrambleEvent?.hasMultipleScrambles == true ? "Yes" : "No"}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default EventDetails;
