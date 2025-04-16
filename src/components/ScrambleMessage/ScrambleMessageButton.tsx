"use client";
import MailIcon from "@mui/icons-material/Mail";
import { Badge, IconButton } from "@mui/material";
import { useState } from "react";
import ScrambleMessageModal from "./ScrambleMessageModal";
import { useScrambleMessages } from "@/hooks/useScrambleMessages";

export default function ScrambleMessageButton({
  scrambleTeamId,
}: {
  scrambleTeamId: string;
}) {
  const [open, setOpen] = useState(false);
  const { hasUnread } = useScrambleMessages(scrambleTeamId);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Badge color="error" variant="dot" invisible={!hasUnread}>
          <MailIcon />
        </Badge>
      </IconButton>
      <ScrambleMessageModal
        open={open}
        onClose={() => setOpen(false)}
        scrambleTeamId={scrambleTeamId}
      />
    </>
  );
}
