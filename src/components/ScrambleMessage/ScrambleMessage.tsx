import { Card, CardContent, Typography } from "@mui/material";
import { ScrambleTeamMessage } from "@/types/ScrambleTeamMessage";
import { format } from "date-fns";

export default function ScrambleMessage({
  message,
}: {
  message: ScrambleTeamMessage;
}) {
  return (
    <>
      <Card key={message.messageId} className="mb-3">
        <CardContent>
          <Typography variant="h6">{message.title}</Typography>
          <Typography variant="body2" className="text-gray-500">
            {format(message.createdAt, "MM/dd/yyyy hh:mm aa")}
          </Typography>
          <Typography>{message.body}</Typography>
        </CardContent>
      </Card>
    </>
  );
}
