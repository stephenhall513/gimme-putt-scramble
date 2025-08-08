"use client";
import { useRef } from "react";
import { AddScores, GetScrambleHoleInfo } from "@/api/scoring";
import { ScrambleScore } from "@/types/Score";
import {
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid2,
  RadioGroup,
  Radio,
  Card,
  CardContent,
  ButtonGroup,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import HoleMap from "../HoleMap";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import HoleInfo from "../HoleInfo";
import Loader from "../Loader";
import ScrambleScorecard from "../ScrambleScorecard/ScrambleScorecard";
import {
  GetScrambleScorecard,
  GetScrambleTeam,
  ScrambleTeamEnd,
} from "@/api/scramble";
import { Scorecard } from "@/types/Scorecard";
import { Coordinates } from "../MapboxComponent/MapboxComponent";
import Leaderboard from "../ScrambleLeaderboard/ScrambleLeaderboard";
import { ScrambleTeam } from "@/types/Team";
import HoleSponsor from "../HoleSponsor/HoleSponsor";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ScoreEntryProps {
  scrambleTeamId: string;
}

const ScoreEntry = ({ scrambleTeamId }: ScoreEntryProps) => {
  const submitActionRef = useRef<"next" | "prev" | "end" | "">("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [holeInfo, setHoleInfo] = useState<ScrambleScore>();
  const [currentHoleNumber, setCurrentHoleNumber] = useState<number>(0);

  const [finishingHoleNumber, setFinishingHoleNumber] = useState<number>(0);
  const [scrambleTeam, setScrambleTeam] = useState<ScrambleTeam>();
  const [bottomPoint, setBottomPoint] = useState<Coordinates>({
    lng: -84.3173979,
    lat: 39.0476951,
  });
  const [topPoint, setTopPoint] = useState<Coordinates>({
    lng: -84.3179987,
    lat: 39.0506613,
  });

  const [scorecard, setScorecard] = useState<Scorecard>();
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showScorecard, setShowScorecard] = useState<boolean>(false);
  const [showScoring, setShowScoring] = useState<boolean>(true);
  const [showEndRound, setShowEndRound] = useState<boolean>(false);
  const [hasCoordinates, setHasCoordinates] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const getScorecard = async () => {
      const response = await GetScrambleScorecard(scrambleTeamId);
      console.log("Scorecard", response);
      if (response.status == 200) {
        setScorecard(response.data);
      }
    };

    const getTeam = async () => {
      const response = await GetScrambleTeam(scrambleTeamId);
      console.log("ScrambleTeam", response);
      if (response.status == 200) {
        setScrambleTeam(response.data);
        if (currentHoleNumber === 0) {
          setCurrentHoleNumber(response.data.currentHole);
        }
        if (response.data.holesPlayed == response.data.scramble.numOfHoles) {
          setShowEndRound(true);
        }
        if (response.data.startingHole == 1) {
          setFinishingHoleNumber(18);
        } else {
          setFinishingHoleNumber(response.data.startingHole - 1);
        }
      }
    };

    const getHoleInfo = async () => {
      const response = await GetScrambleHoleInfo(
        scrambleTeamId,
        currentHoleNumber
      );

      if (response.status === 200) {
        const hole = response.data.hole;
        console.log("gameType", response.data);
        if (hole?.coordinates && hole.coordinates.length > 0) {
          setHasCoordinates(true);
          const teeboxPoint = hole.coordinates.filter((x) => x.poi == 11)[0];
          const greenPoint = hole.coordinates.filter(
            (x) => x.poi == 1 && x.location == 3
          )[0];

          const coordinate1: Coordinates = {
            lat: teeboxPoint.latitude,
            lng: teeboxPoint.longitude,
          };

          setBottomPoint(coordinate1);

          const coordinate2: Coordinates = {
            lat: greenPoint.latitude,
            lng: greenPoint.longitude,
          };

          setTopPoint(coordinate2);
        }

        setHoleInfo(response.data);
      }

      setIsLoading(false);
    };

    getScorecard();
    getTeam();
    getHoleInfo();
  }, [currentHoleNumber, scrambleTeamId]);

  const formik = useFormik({
    initialValues: {
      scrambleTeamId: scrambleTeamId,
      holeId: holeInfo?.holeId,
      strokes: holeInfo?.strokes || 0,
    },
    onSubmit: async (values) => {
      const action = submitActionRef.current;
      if (values.strokes > 0) {
        const scrambleScore: ScrambleScore = {
          scrambleTeamId: holeInfo?.scrambleTeamId
            ? holeInfo.scrambleTeamId
            : "",
          holeId: holeInfo?.holeId ? holeInfo.holeId : "",
          scrambleScoreId: holeInfo?.scrambleScoreId,
          strokes: values.strokes,
        };

        // Navigate based on the submit action
        switch (action) {
          case "end":
            try {
              const response = await AddScores(scrambleScore);
              if (response.status === 200) {
                toast.success("Score Saved");
              }
            } catch (error) {
              toast.error("There was a Problem Saving Score");
            }
            const endResponse = await ScrambleTeamEnd(scrambleTeamId);
            if (endResponse.status == 200) {
              router.push("/scoring/" + scrambleTeamId + "/summary");
            }
            break;
          case "next":
            try {
              const response = await AddScores(scrambleScore);
              if (response.status === 200) {
                toast.success("Score Saved");
              }
            } catch (error) {
              toast.error("There was a Problem Saving Score");
            }
            setCurrentHoleNumber((prev) => (prev === 18 ? 1 : prev + 1));
            break;
          case "prev":
            setCurrentHoleNumber((prev) => (prev === 1 ? 18 : prev - 1));
            break;
        }
      } else {
        switch (action) {
          case "end":
            toast.error("Please enter a score.");
            break;
          case "next":
            toast.error("Please enter a score.");
            break;
          case "prev":
            setCurrentHoleNumber((prev) => (prev === 1 ? 18 : prev - 1));
            break;
        }
      }
    },
  });

  useEffect(() => {
    if (holeInfo) {
      const initialStrokes =
        holeInfo && holeInfo.strokes && holeInfo.strokes > 0
          ? holeInfo.strokes
          : holeInfo?.hole?.par || 4;

      formik.setValues((prevValues) => ({
        ...prevValues,
        holeId: holeInfo.holeId,
        strokes: initialStrokes,
      }));
    }
  }, [holeInfo]);

  const viewScoring = async () => {
    if (showScoring) {
      setShowScorecard(false);
      setShowScoring(true);
      setShowMap(false);
      setShowLeaderboard(false);
    } else {
      setShowScorecard(false);
      setShowScoring(true);
      setShowMap(false);
      setShowLeaderboard(false);
    }
  };

  const viewMap = () => {
    if (showMap) {
      setShowMap(false);
      setShowScoring(true);
      setShowScorecard(false);
      setShowLeaderboard(false);
    } else {
      setShowMap(true);
      setShowLeaderboard(false);
      setShowScoring(false);
      setShowScorecard(false);
    }
  };

  const viewLeaderboard = async () => {
    if (showLeaderboard) {
      setShowLeaderboard(false);
      setShowScoring(true);
      setShowMap(false);
      setShowScorecard(false);
    } else {
      setShowLeaderboard(true);
      setShowScoring(false);
      setShowMap(false);
      setShowScorecard(false);
    }
  };

  const viewScorecard = async () => {
    if (showScorecard) {
      setShowScorecard(false);
      setShowScoring(true);
      setShowMap(false);
      setShowLeaderboard(false);
    } else {
      setShowScorecard(true);
      setShowScoring(false);
      setShowMap(false);
      setShowLeaderboard(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : holeInfo ? (
        <div className="h-full flex flex-col">
          {scrambleTeam?.scramble.scrambleLogo ? (
            <div className="flex justify-center mb-2">
              <Image
                src={scrambleTeam.scramble.scrambleLogo}
                alt={scrambleTeam?.scramble.scrambleName}
                height={150}
                width={150}
              />
            </div>
          ) : (
            <div className="text-2xl text-center font-bold text-black mb-2">
              {scrambleTeam?.scramble.scrambleName}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            {holeInfo.hole ? <HoleInfo hole={holeInfo.hole} /> : false}
            <Grid2 container rowSpacing={2}>
              <Grid2 size={{ sm: 12 }} className="w-full">
                <div className="flex flex-row justify-between w-full">
                  <Button
                    variant="text"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      submitActionRef.current = "prev";
                      formik.submitForm();
                    }}
                  >
                    <ChevronLeft /> Previous
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      submitActionRef.current = "next";
                      formik.submitForm();
                    }}
                  >
                    Next <ChevronRight />
                  </Button>
                </div>
              </Grid2>
              {holeInfo.gameType ? (
                <Grid2 className="flex flex-row justify-evenly w-full">
                  <div className="font-bold text-red-700">
                    {holeInfo.gameType}
                  </div>
                </Grid2>
              ) : (
                false
              )}
              {showEndRound ? (
                <Grid2 className="flex flex-row justify-evenly w-full">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      submitActionRef.current = "end";
                      formik.submitForm();
                    }}
                  >
                    End Round
                  </Button>
                </Grid2>
              ) : (
                false
              )}
              <Grid2 className="flex flex-row justify-evenly w-full">
                <div>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      size="small"
                      color={showScoring ? "primary" : "secondary"}
                      onClick={() => viewScoring()}
                      style={{ fontSize: "8pt" }}
                    >
                      Entry
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color={showScorecard ? "primary" : "secondary"}
                      onClick={() => viewScorecard()}
                      style={{ fontSize: "8pt" }}
                    >
                      Scorecard
                    </Button>
                    {hasCoordinates ? (
                      <Button
                        variant="contained"
                        size="small"
                        color={showMap ? "primary" : "secondary"}
                        style={{ fontSize: "8pt" }}
                        onClick={() => viewMap()}
                      >
                        Map
                        {/* {showMap ? "Close Map" : "Show Map"} */}
                      </Button>
                    ) : (
                      false
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      color={showLeaderboard ? "primary" : "secondary"}
                      style={{ fontSize: "8pt" }}
                      onClick={() => viewLeaderboard()}
                    >
                      Leaderboard
                    </Button>
                  </ButtonGroup>
                </div>
              </Grid2>
              {showScoring ? (
                <>
                  <Grid2 className="flex flex-col justify-center w-full">
                    <FormControl
                      component="fieldset"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <FormLabel
                        id="multiple-group-label"
                        className="text-black"
                        color="info"
                        style={{
                          marginRight: 20,
                          fontWeight: "bold",
                          color: "#000000",
                          marginBottom: 10,
                        }}
                      >
                        Enter Score for the Hole
                      </FormLabel>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() =>
                            formik.setFieldValue(
                              "strokes",
                              Math.max(1, formik.values.strokes - 1)
                            )
                          }
                        >
                          −
                        </Button>
                        <input
                          type="number"
                          name="strokes"
                          value={formik.values.strokes}
                          readOnly
                          style={{
                            width: "60px",
                            textAlign: "center",
                            fontSize: "1.5rem",
                            padding: "5px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            backgroundColor: "#f9f9f9",
                          }}
                        />
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() =>
                            formik.setFieldValue(
                              "strokes",
                              formik.values.strokes + 1
                            )
                          }
                        >
                          +
                        </Button>
                      </Box>

                      {formik.errors.strokes && formik.touched.strokes ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.strokes}
                        </div>
                      ) : null}
                    </FormControl>
                  </Grid2>
                  {holeInfo.sponsors ? (
                    <div className="flex flex-col justify-center w-full">
                      <div className="text-center">Hole Sponsored By:</div>
                      {holeInfo.sponsors.map((sponsor: ScrambleSponsor) => (
                        <HoleSponsor key={sponsor.id} sponsor={sponsor} />
                      ))}
                    </div>
                  ) : (
                    false
                  )}
                </>
              ) : (
                false
              )}
            </Grid2>
            {hasCoordinates ? (
              showMap ? (
                <div key={"hole-" + showMap} className="mx-auto h-svh pt-5">
                  <HoleMap
                    key={Date.now()}
                    point1={bottomPoint}
                    point2={topPoint}
                  />
                </div>
              ) : (
                false
              )
            ) : (
              false
            )}
            {showLeaderboard && scrambleTeam ? (
              <Card className="p-2 max-w-4xl mx-auto mt-5">
                <CardContent className="overflow-x-auto">
                  <Leaderboard scrambleId={scrambleTeam?.scrambleId} />
                </CardContent>
              </Card>
            ) : (
              false
            )}
            {showScorecard && scorecard ? (
              <Card className="p-2 max-w-4xl mx-auto mt-5">
                <CardContent className="overflow-x-auto">
                  <ScrambleScorecard scorecard={scorecard} />
                </CardContent>
              </Card>
            ) : (
              false
            )}
          </form>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default ScoreEntry;
