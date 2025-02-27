import { GetScramble } from "@/api/scramble";
import { Scramble } from "@/types/Scramble";
import { Box, Grid2 } from "@mui/material";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ScrambleDetailsProps {
  scrambleId: string;
  refreshTrigger: boolean;
}

const ScrambleDetails = ({
  scrambleId,
  refreshTrigger,
}: ScrambleDetailsProps) => {
  const [scramble, setScramble] = useState<Scramble>();

  useEffect(() => {
    const getScramble = async () => {
      const response = await GetScramble(scrambleId);
      if (response.status == 200) {
        setScramble(response.data);
      }
    };
    getScramble();
  }, [scrambleId, refreshTrigger]);

  return (
    <Box borderColor="#000000" border={1} borderRadius={2} padding={4}>
      <Grid2 container spacing={1} rowSpacing={2}>
        <Grid2 size={{ sm: 12 }}>
          {scramble?.scrambleLogo ? (
            <Image
              alt={scramble.scrambleName}
              src={scramble?.scrambleLogo}
              height={200}
              width={200}
            />
          ) : (
            false
          )}
        </Grid2>
        <Grid2 size={{ lg: 6, md: 6, sm: 12 }}>
          <span className="font-bold mr-2">Scramble Name:</span>
          {scramble?.scrambleName}
        </Grid2>
        <Grid2 size={{ lg: 3, md: 6, sm: 12 }}>
          <span className="font-bold mr-2">Date:</span>
          {scramble ? format(scramble?.scrambleDate, "MM/dd/yyyy") : ""}
        </Grid2>
        <Grid2 size={{ lg: 3, md: 6, sm: 12 }}>
          <span className="font-bold mr-2">Start Time:</span>
          {scramble ? format(scramble?.startTime, "h:mm a") : ""}
        </Grid2>
        <Grid2 size={{ lg: 12, sm: 12 }}>
          <span className="font-bold mr-2">Description:</span>
          {scramble?.description}
        </Grid2>
        <Grid2 size={{ md: 4, sm: 12 }}>
          <span className="font-bold mr-2">Course:</span>
          {scramble?.course?.courseName}
        </Grid2>
        <Grid2 size={{ md: 4, sm: 12 }}>
          <span className="font-bold mr-2"># of Holes:</span>
          {scramble?.numOfHoles}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ScrambleDetails;
