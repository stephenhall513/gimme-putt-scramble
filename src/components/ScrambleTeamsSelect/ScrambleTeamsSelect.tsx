"use client";
import { fetcher } from "@/api/fetcher";
import { ScrambleTeam } from "@/types/Team";
import { Box, Container, Link, Modal } from "@mui/material";
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
        <div>
          <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
            <div className="container mx-auto">
              <div className="p-2">
                <Container className="bg-[#F8F6F5] rounded-md p-4">
                  {scrambleTeams?.map((scrambleTeam: ScrambleTeam) => {
                    return (
                      <Link
                        key={scrambleTeam.id}
                        href={"/scramble/" + scrambleTeam.id}
                        color="primary"
                        underline="none"
                      >
                        <div className="py-2 text-center">
                          <div>{`${scrambleTeam.teamName}`}</div>
                        </div>
                      </Link>
                    );
                  })}
                </Container>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ScrambleTeamsSelect;
