// components/ScrambleMessageModal.tsx
import { useScrambleMessages } from "@/hooks/useScrambleMessages";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";

export default function ScrambleMessageModal({
  open,
  onClose,
  scrambleTeamId,
}: {
  open: boolean;
  onClose: () => void;
  scrambleTeamId: string;
}) {
  const { messages, isLoading, markAllAsRead } =
    useScrambleMessages(scrambleTeamId);

  const handleClose = () => {
    markAllAsRead();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isLoading && <CircularProgress />}
        <List>
          {messages?.map((msg: any) => (
            <ListItem key={msg.messageId} alignItems="flex-start" divider>
              <ListItemText
                primary={msg.title}
                secondary={
                  <>
                    <Typography component="span">{msg.body}</Typography>
                    {/* <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                    >
                      {format(new Date(msg.createdAt), "MM/dd/yyyy hh:mm aa")}
                    </Typography> */}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
