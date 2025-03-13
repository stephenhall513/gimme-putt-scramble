"use client";
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
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useEffect, useState } from "react";
import HoleInfo from "../HoleInfo";
import Loader from "../Loader";
import ScrambleScorecard from "../ScrambleScorecard/ScrambleScorecard";
import { GetScrambleScorecard, GetScrambleTeam } from "@/api/scramble";
import { Scorecard } from "@/types/Scorecard";
import { Coordinates } from "../MapboxComponent/MapboxComponent";
import Leaderboard from "../ScrambleLeaderboard/ScrambleLeaderboard";
import { ScrambleTeam } from "@/types/Team";
import HoleSponsor from "../HoleSponsor/HoleSponsor";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";

interface ScoreEntryProps {
  scrambleTeamId: string;
}

const ScoreEntry = ({ scrambleTeamId }: ScoreEntryProps) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [holeInfo, setHoleInfo] = useState<ScrambleScore>();
  const [currentHoleNumber, setCurrentHoleNumber] = useState<number>(0);
  const [nextHoleNumber, setNextHoleNumber] = useState<number>(0);
  const [prevHoleNumber, setPrevHoleNumber] = useState<number>(0);
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

        if (hole?.coordinates) {
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

        if (hole) {
          setNextHoleNumber(hole.holeNumber === 18 ? 1 : hole.holeNumber + 1);
          setPrevHoleNumber(hole.holeNumber === 1 ? 18 : hole.holeNumber - 1);
        }

        setHoleInfo(response.data);
      }
    };

    getScorecard();
    getHoleInfo();
    getTeam();
  }, [currentHoleNumber, scrambleTeamId]);

  const formik = useFormik({
    initialValues: {
      scrambleTeamId: scrambleTeamId,
      holeId: holeInfo?.holeId,
      strokes: holeInfo ? holeInfo.strokes : 0,
      submitAction: "",
    },
    onSubmit: async (values) => {
      if (values.strokes > 0) {
        const scrambleScore: ScrambleScore = {
          scrambleTeamId: holeInfo?.scrambleTeamId
            ? holeInfo.scrambleTeamId
            : "",
          holeId: holeInfo?.holeId ? holeInfo.holeId : "",
          scrambleScoreId: holeInfo?.scrambleScoreId,
          strokes: values.strokes,
        };

        try {
          const response = await AddScores(scrambleScore);
          if (response.status === 200) {
            toast.success("Score Saved");

            // Navigate based on the submit action
            switch (values.submitAction) {
              case "end":
                // Handle end round logic here
                // For example, you might want to redirect to a summary page or show a message
                break;
              case "next":
                setCurrentHoleNumber(nextHoleNumber);
                break;
              case "prev":
                setCurrentHoleNumber(prevHoleNumber);
                break;
            }
          }
        } catch (error) {
          toast.error("There was a Problem Saving Score");
        }
      } else {
        toast.error("Please enter a score.");
      }
    },
  });

  useEffect(() => {
    if (holeInfo) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        holeId: holeInfo.holeId,
        strokes: holeInfo.strokes,
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
      {!holeInfo ? (
        <Loader />
      ) : (
        <div className="h-full flex flex-col">
          <form onSubmit={formik.handleSubmit}>
            {holeInfo.hole ? <HoleInfo hole={holeInfo.hole} /> : false}
            <Grid2 container rowSpacing={2}>
              <Grid2 size={{ sm: 12 }} className="w-full">
                <div className="flex flex-row justify-between w-full">
                  <Button
                    type="submit"
                    variant="text"
                    color="primary"
                    onClick={() => formik.setFieldValue("submitAction", "prev")}
                  >
                    <ChevronLeft /> Previous
                  </Button>
                  {finishingHoleNumber === currentHoleNumber ? (
                    <Button
                      type="submit"
                      variant="text"
                      color="primary"
                      onClick={() =>
                        formik.setFieldValue("submitAction", "end")
                      }
                    >
                      End Round
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="text"
                      color="primary"
                      onClick={() =>
                        formik.setFieldValue("submitAction", "next")
                      }
                    >
                      Next <ChevronRight />
                    </Button>
                  )}
                </div>
              </Grid2>
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
                      <RadioGroup
                        name="strokes"
                        onChange={formik.handleChange}
                        style={{ flexDirection: "row" }}
                        value={formik.values.strokes}
                      >
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)", // 5 items per row
                            gap: 2, // Adjust spacing between items
                            justifyContent: "center",
                          }}
                        >
                          {[...Array(10)].map((_, i) => (
                            <FormControlLabel
                              key={i + 1}
                              value={(i + 1).toString()}
                              control={<Radio color="primary" />}
                              label={(i + 1).toString()}
                              labelPlacement="top"
                              sx={{
                                margin: 0,
                                gap: "2px",
                                alignItems: "center",
                              }} // Adjust spacing
                            />
                          ))}
                        </Box>
                      </RadioGroup>
                      {formik.errors.strokes && formik.touched.strokes ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.strokes}
                        </div>
                      ) : null}
                    </FormControl>
                  </Grid2>
                  {holeInfo.sponsors ? (
                    <div className="flex flex-col justify-center w-full">
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
            {showMap ? (
              <div key={"hole-" + showMap} className="mx-auto h-svh pt-5">
                <HoleMap
                  key={Date.now()}
                  point1={bottomPoint}
                  point2={topPoint}
                />
              </div>
            ) : (
              false
            )}
            {showLeaderboard && scrambleTeam ? (
              <div className="pt-5">
                <Leaderboard scrambleId={scrambleTeam?.scrambleId} />
              </div>
            ) : (
              false
            )}
            {showScorecard && scorecard ? (
              <Card className="p-2 max-w-4xl mx-auto mt-5 w-full">
                <CardContent className="overflow-x-auto">
                  <ScrambleScorecard scorecard={scorecard} />
                </CardContent>
              </Card>
            ) : (
              false
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default ScoreEntry;
