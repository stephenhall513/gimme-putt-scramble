export type ScrambleTeamMessage = {
  messageId: string;
  title: string;
  body: string;
  createdAt: Date;
  isRead: boolean;
  readAt?: Date;
};
