"use client";
import { GetScrambleEvents } from "@/api/scrambleEvent";
import ScrambleEventList from "@/components/ScrambleEventList/ScrambleEventList";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { ScrambleEvent } from "@/types/ScrambleEvent";
import Loader from "@/components/Loader";
import Image from "next/image";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

const MyEventsPage = () => {
  const router = useRouter();
  const [scrambleEvents, setScrambleEvents] = useState<ScrambleEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEvents = async () => {
      const golferId = await getCookie("golferId");
      if (golferId) {
        var response = await GetScrambleEvents(golferId);
        if (response.status == 200) {
          setScrambleEvents(response.data);
        }
      }
      setIsLoading(false);
    };
    getEvents();
  }, []);

  const gotoDetails = async (scrambleEventId: string) => {
    console.log("Navigating to event:", scrambleEventId); // Debug log
    router.push("/myevents/" + scrambleEventId);
  };

  const gotoTeams = async (scrambleEventId: string) => {
    console.log("Navigating to event:", scrambleEventId); // Debug log
    router.push("/myevents/" + scrambleEventId + "/teams");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
            <div className="container mx-auto">
              <div className="p-2">
                <Container className="bg-[#F8F6F5] rounded-md p-4">
                  <div
                    className="text-center text-xl pb-6"
                    style={{ fontFamily: "Russo One" }}
                  >
                    My Events
                  </div>
                  <ScrambleEventList
                    key="scrambleList"
                    scrambleEvents={scrambleEvents}
                    onEditClick={gotoDetails}
                  />
                </Container>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyEventsPage;
