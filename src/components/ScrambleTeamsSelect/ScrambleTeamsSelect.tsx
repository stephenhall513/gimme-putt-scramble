"use client";
import { fetcher } from "@/api/fetcher";
import { ScrambleTeam } from "@/types/Team";
import { Box, Container, Link, Modal } from "@mui/material";
import { format } from "date-fns";
import useSWR from "swr";

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
        <Box className="max-h-[80vh] overflow-y-auto">
          <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
            <div className="container mx-auto">
              <div className="p-2">
                <Container className="bg-[#F8F6F5] rounded-md">
                  {scrambleTeams?.map((scrambleTeam: ScrambleTeam) => {
                    return (
                      <div
                        key={scrambleTeam.id}
                        className="px-10 even:bg-gray-300"
                      >
                        <Link
                          href={"/scramble/" + scrambleTeam.id}
                          color="primary"
                          underline="none"
                        >
                          <div
                            className="pt-1 text-md text-center"
                            style={{ fontFamily: "Russo One" }}
                          >
                            {scrambleTeam.teamName}
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
                        </Link>
                        {/* <hr
                          key={`hr-${scrambleTeam.id}`}
                          className="mt-2 h-px bg-black border-none w-full opacity-100"
                        /> */}
                      </div>
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
