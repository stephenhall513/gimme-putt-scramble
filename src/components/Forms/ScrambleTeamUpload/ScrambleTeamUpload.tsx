import { UploadScrambleTeams } from "@/api/scramble";
import { Box, Button, Container, Modal } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

interface ScrambleTeamUploadProps {
  scrambleId: string;
  isOpen: boolean;
  close: () => void;
}

const ScrambleTeamUpload = ({
  scrambleId,
  isOpen,
  close,
}: ScrambleTeamUploadProps) => {
  const [file, setFile] = useState(null);
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) {
      toast("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      if (scrambleId) {
        const response = await UploadScrambleTeams(scrambleId, file);
        if (response.status == 200) {
          toast("File Successully Processed");
          close();
        } else {
          toast("Error uploading file.");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast("Error uploading file.");
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => close()}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div className="container mx-auto">
            <div className="p-2">
              <Container className="bg-[#F8F6F5] rounded-md p-4">
                <div
                  className="text-center text-xl pb-6"
                  style={{ fontFamily: "Russo One" }}
                >
                  Upload Scramble Teams
                </div>
                <div className="text-center text-base">
                  Upload a Comma Separated File to Add Multiple Teams
                </div>
                <div className="text-center p-4">
                  <Link href="" className="text-blue-700 text-sm">
                    Download Template
                  </Link>
                </div>
                {/* <Box
                  sx={{
                    overflow: "auto", // Allows scrolling within the Box if content exceeds its max height
                    maxHeight: "90vh", // Limits the height to 90% of the viewport height
                    width: "auto", // Adjust width as needed
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    outline: "none", // Removes focus outline for aesthetics
                  }}
                > */}
                <form onSubmit={handleSubmit}>
                  <div className="p-4">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex flex-row p-4">
                    <div className="mr-4">
                      <Button type="submit" variant="contained" color="primary">
                        Upload
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="contained"
                        color="inherit"
                        onClick={() => close()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
                {/* </Box> */}
              </Container>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ScrambleTeamUpload;
