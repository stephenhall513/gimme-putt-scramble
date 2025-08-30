"use client";
import { ScrambleTeam } from "@/types/Team";
import { Box, Container, Link, Modal } from "@mui/material";
import { format } from "date-fns";

interface ScrambleTeamsSelectProps {
  scrambleTeams: ScrambleTeam[];
  isOpen: boolean;
  close: () => void;
  select: (scrambleTeamId: string) => void;
}

const ScrambleTeamsSelect = ({
  scrambleTeams,
  isOpen,
  close,
  select,
}: ScrambleTeamsSelectProps) => {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => close()}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className="max-h-[80vh] overflow-y-auto bg-[#F8F6F5] rounded-md h-screen w-[80%]">
          <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
            <div className="container mx-auto">
              {/* <Image
                src="/images/GimmePuttLogo2.png"
                height={50}
                width={50}
                alt="Gimme Putt Golf"
              /> */}
              <div
                className="text-center text-[11pt] pb-5 w-[90%] mx-auto"
                style={{ fontFamily: "Russo One" }}
              >
                Below are a list of scramble teams that you are associated with.
              </div>
              <div
                className="text-center text-[11pt] pb-4 w-[90%] mx-auto"
                style={{ fontFamily: "Russo One" }}
              >
                Select Team to Enter Event
              </div>
              <div className="p-2">
                <Container className="bg-[#F8F6F5] rounded-md">
                  {scrambleTeams?.map((scrambleTeam: ScrambleTeam) => {
                    return (
                      <Link
                        key={scrambleTeam.id}
                        href={"/scramble/" + scrambleTeam.id}
                        color="inherit"
                        underline="none"
                      >
                        <div className="even:bg-gray-300 bg-[#009F4D] border-black border-[1px] p-2 rounded-md mb-4">
                          <div
                            className="pt-1 text-md text-center"
                            style={{ fontFamily: "Russo One" }}
                          >
                            {scrambleTeam.teamName}
                          </div>
                          <div
                            className="pt-1 text-sm text-center"
                            style={{ fontFamily: "Russo One" }}
                          >
                            {scrambleTeam.scramble.scrambleName}
                          </div>
                          <div className="text-sm text-center">
                            {scrambleTeam.scramble.course?.courseName}
                          </div>
                          <div className="text-sm text-center">
                            {format(
                              scrambleTeam.scramble.scrambleDate,
                              "MM/dd/yyyy"
                            )}
                          </div>
                          <div
                            className="pt-1 text-sm text-center"
                            style={{ fontFamily: "Russo One" }}
                          >
                            Enter Event
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </Container>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ScrambleTeamsSelect;
