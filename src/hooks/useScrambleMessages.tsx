// hooks/useScrambleMessages.ts
import { fetcher } from "@/api/fetcher";
import { MarkAllScrambleMessageRead } from "@/api/scramble";
import { ScrambleTeamMessage } from "@/types/ScrambleTeamMessage";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useScrambleMessages = (scrambleTeamId: string) => {
  const {
    data: messages,
    isLoading,
    mutate,
  } = useSWR<ScrambleTeamMessage[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/Scramble/GetScrambleTeamMessages/${scrambleTeamId}`,
    fetcher,
    {
      refreshInterval: 30000,
    }
  );

  const hasUnread = messages?.some((msg: any) => !msg.isRead) ?? false;

  const markAllAsRead = () => {
    MarkAllScrambleMessageRead(scrambleTeamId);
    mutate();
  };

  return { messages, isLoading, hasUnread, markAllAsRead, mutate };
};
