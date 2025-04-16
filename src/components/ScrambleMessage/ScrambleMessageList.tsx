// components/ScrambleMessages.tsx
"use client";
import useSWR from "swr";
import { fetcher } from "@/api/fetcher";
import Loader from "../Loader";
import { ScrambleTeamMessage } from "@/types/ScrambleTeamMessage";
import { useEffect, useState } from "react";
import { Alert, Badge, Typography } from "@mui/material";
import ScrambleMessage from "./ScrambleMessage";
import MailIcon from "@mui/icons-material/Mail";
import toast from "react-hot-toast";

const LOCAL_STORAGE_KEY = (scrambleTeamId: string) =>
  `scramble-lastSeen-${scrambleTeamId}`;

export default function ScrambleMessages({
  scrambleTeamId,
}: {
  scrambleTeamId: string;
}) {
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const { data: messages, isLoading } = useSWR<ScrambleTeamMessage[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/Scramble/GetScrambleTeamMessages/${scrambleTeamId}`,
    fetcher
  );

  useEffect(() => {
    const lastSeen = Number(
      localStorage.getItem(LOCAL_STORAGE_KEY(scrambleTeamId))
    );
    if (messages?.length) {
      const latestMsgTime = new Date(messages[0].createdAt).getTime();
      if (!lastSeen || latestMsgTime > lastSeen) {
        setHasNewMessages(true);
        toast.success("You Have a New Message");
      }
    }
  }, [messages]);

  const markAllAsSeen = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY(scrambleTeamId), `${Date.now()}`);
    setHasNewMessages(false);
  };

  return (
    <>
      {hasNewMessages && (
        // <Alert color="success" onClose={markAllAsSeen} className="mb-4">
        //   New Message!
        // </Alert>
        <div className="flex flex-row justify-end">
          <Badge color="error" variant="dot" invisible={!hasNewMessages}>
            <MailIcon color="action" />
          </Badge>
        </div>
      )}

      {/* {messages?.map((msg: ScrambleTeamMessage) => (
        <ScrambleMessage key={msg.messageId} message={msg} />
      ))} */}
    </>
  );
}
