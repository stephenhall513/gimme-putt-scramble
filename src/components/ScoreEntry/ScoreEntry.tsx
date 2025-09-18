"use client";
import { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { AddScores, GetScrambleHoleInfo } from "@/api/scoring";
import {
  GetScrambleScorecard,
  GetScrambleTeam,
  ScrambleTeamEnd,
} from "@/api/scramble";

import { ScrambleScore } from "@/types/Score";
import { Scorecard } from "@/types/Scorecard";
import { ScrambleTeam } from "@/types/Team";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";
import { Coordinates } from "../MapboxComponent/MapboxComponent";

import HoleInfo from "../HoleInfo";
import HoleMap from "../HoleMap";
import HoleSponsor from "../HoleSponsor/HoleSponsor";
import Loader from "../Loader";
import ScrambleScorecard from "../ScrambleScorecard/ScrambleScorecard";
import Leaderboard from "../ScrambleLeaderboard/ScrambleLeaderboard";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid2,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

interface ScoreEntryProps {
  scrambleTeamId: string;
}

const ScoreEntry = ({ scrambleTeamId }: ScoreEntryProps) => {
  const router = useRouter();
  const submitActionRef = useRef<"next" | "prev" | "end" | "">("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [scrambleTeam, setScrambleTeam] = useState<ScrambleTeam>();
  const [scorecard, setScorecard] = useState<Scorecard>();
  const [holeInfo, setHoleInfo] = useState<ScrambleScore>();
  const [currentHoleNumber, setCurrentHoleNumber] = useState<number | null>(
    null
  );

  const [showMap, setShowMap] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showScorecard, setShowScorecard] = useState<boolean>(false);
  const [showScoring, setShowScoring] = useState<boolean>(true);
  const [hasCoordinates, setHasCoordinates] = useState<boolean>(false);
  const [bottomPoint, setBottomPoint] = useState<Coordinates>({
    lng: -84.3173979,
    lat: 39.0476951,
  });
  const [topPoint, setTopPoint] = useState<Coordinates>({
    lng: -84.3179987,
    lat: 39.0506613,
  });

  const refreshScorecard = async () => {
    try {
      const res = await GetScrambleScorecard(scrambleTeamId);
      if (res?.status === 200) {
        setScorecard(res.data); // new object ref triggers re-render
      }
    } catch {
      // optional: toast.error("Failed to refresh scorecard");
    }
  };

  // Fetch team & scorecard first
  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        const [scorecardRes, teamRes] = await Promise.all([
          GetScrambleScorecard(scrambleTeamId),
          GetScrambleTeam(scrambleTeamId),
        ]);

        if (isCancelled) return;

        if (scorecardRes?.status === 200) setScorecard(scorecardRes.data);

        if (teamRes?.status === 200) {
          const team = teamRes.data as ScrambleTeam;
          setScrambleTeam(team);

          // Normalize hole: avoid 0 by falling back to startingHole or 1
          const initialHole =
            team.currentHole && team.currentHole > 0
              ? team.currentHole
              : team.startingHole && team.startingHole > 0
                ? team.startingHole
                : 1;

          setCurrentHoleNumber((prev) => prev ?? initialHole);
        }
      } catch {
        if (!isCancelled) {
          setLoadError("Failed to load team/scorecard.");
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [scrambleTeamId]);

  // Fetch hole info when both team AND hole number are ready
  useEffect(() => {
    // IMPORTANT: check for null (not falsy), so hole 1 works fine
    if (!scrambleTeam || currentHoleNumber === null) return;

    let isCancelled = false;

    (async () => {
      setIsLoading(true);
      setLoadError(null);
      setHasCoordinates(false);

      try {
        const resp = await GetScrambleHoleInfo(
          scrambleTeamId,
          currentHoleNumber
        );
        if (isCancelled) return;

        if (resp.status === 200) {
          const hole = resp.data?.hole;

          if (hole?.coordinates?.length) {
            const teeboxPoint = hole.coordinates.find((x: any) => x.poi === 11);
            const greenPoint = hole.coordinates.find(
              (x: any) => x.poi === 1 && x.location === 3
            );

            const haveBoth = Boolean(teeboxPoint && greenPoint);
            setHasCoordinates(haveBoth);

            if (haveBoth) {
              setBottomPoint({
                lat: teeboxPoint?.latitude,
                lng: teeboxPoint?.longitude,
              });
              setTopPoint({
                lat: greenPoint?.latitude,
                lng: greenPoint?.longitude,
              });
            }
          }

          setHoleInfo(resp.data);
        } else {
          setLoadError("Failed to load hole info.");
        }
      } catch {
        if (!isCancelled) {
          setLoadError("Failed to load hole info.");
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [scrambleTeam, currentHoleNumber, scrambleTeamId]);

  // Dynamic hole wrap based on scramble settings
  // remove: const [showEndRound, setShowEndRound] = useState<boolean>(false);

  const totalHoles = scrambleTeam?.scramble?.numOfHoles ?? 18;

  const finishingHole = scrambleTeam
    ? scrambleTeam.startingHole === 1
      ? totalHoles
      : scrambleTeam.startingHole - 1
    : null;

  const showEndRound =
    finishingHole != null &&
    currentHoleNumber != null &&
    currentHoleNumber === finishingHole;

  const goNextHole = () =>
    setCurrentHoleNumber((prev) => {
      const v = prev ?? scrambleTeam?.currentHole ?? 1;
      return v >= totalHoles ? 1 : v + 1;
    });

  const goPrevHole = () =>
    setCurrentHoleNumber((prev) => {
      const v = prev ?? scrambleTeam?.currentHole ?? 1;
      return v <= 1 ? totalHoles : v - 1;
    });

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
          scrambleTeamId: holeInfo?.scrambleTeamId ?? "",
          holeId: holeInfo?.holeId ?? "",
          scrambleScoreId: holeInfo?.scrambleScoreId,
          strokes: values.strokes,
        };

        switch (action) {
          case "end":
            try {
              const response = await AddScores(scrambleScore);
              if (response.status === 200) {
                toast.success("Score Saved");
                await refreshScorecard();
              }
            } catch {
              toast.error("There was a Problem Saving Score");
            }
            try {
              const endResponse = await ScrambleTeamEnd(scrambleTeamId);
              if (endResponse.status === 200) {
                router.push(`/scoring/${scrambleTeamId}/summary`);
              }
            } catch {
              toast.error("Failed to end round.");
            }
            break;

          case "next":
            try {
              const response = await AddScores(scrambleScore);
              if (response.status === 200) {
                toast.success("Score Saved");
                await refreshScorecard();
              }
            } catch {
              toast.error("There was a Problem Saving Score");
            }
            goNextHole();
            break;

          case "prev":
            try {
              const response = await AddScores(scrambleScore);
              if (response.status === 200) {
                toast.success("Score Saved");
                await refreshScorecard();
              }
            } catch {
              toast.error("There was a Problem Saving Score");
            }
            goPrevHole();
            break;
        }
      } else {
        switch (action) {
          case "end":
          case "next":
            toast.error("Please enter a score.");
            break;
          case "prev":
            goPrevHole();
            break;
        }
      }
    },
  });

  // Keep form values synced when hole changes
  // AFTER
  useEffect(() => {
    if (!holeInfo) return;

    const initialStrokes =
      holeInfo.strokes && holeInfo.strokes > 0
        ? holeInfo.strokes
        : holeInfo?.hole?.par || 4;

    formik.setValues((prev) => {
      // prevent unnecessary updates that can trigger re-renders
      if (prev.holeId === holeInfo.holeId && prev.strokes === initialStrokes) {
        return prev;
      }
      return {
        ...prev,
        holeId: holeInfo.holeId,
        strokes: initialStrokes,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holeInfo]); // <-- only depends on holeInfo

  // View toggles
  const viewScoring = () => {
    setShowScorecard(false);
    setShowScoring(true);
    setShowMap(false);
    setShowLeaderboard(false);
  };

  const viewMap = () => {
    setShowMap(true);
    setShowLeaderboard(false);
    setShowScoring(false);
    setShowScorecard(false);
  };

  const viewLeaderboard = () => {
    setShowLeaderboard(true);
    setShowScoring(false);
    setShowMap(false);
    setShowScorecard(false);
  };

  const viewScorecard = async () => {
    setShowLeaderboard(false);
    setShowScoring(false);
    setShowMap(false);
    await refreshScorecard();
    setShowScorecard(true);
  };

  // Render fallbacks
  if (isLoading) return <Loader />;
  if (loadError)
    return <div className="p-4 text-red-600 text-center">{loadError}</div>;
  if (!holeInfo)
    return <div className="p-4 text-center">No hole data available.</div>;

  return (
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
        {holeInfo.hole ? <HoleInfo hole={holeInfo.hole} /> : null}

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
              <div className="font-bold text-red-700">{holeInfo.gameType}</div>
            </Grid2>
          ) : null}

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
          ) : null}

          <Grid2 className="flex flex-row justify-evenly w-full">
            <div>
              <ButtonGroup>
                <Button
                  variant="contained"
                  size="small"
                  color={showScoring ? "primary" : "mcnick"}
                  onClick={viewScoring}
                  style={{ fontSize: "8pt" }}
                >
                  Entry
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color={showScorecard ? "primary" : "mcnick"}
                  onClick={viewScorecard}
                  style={{ fontSize: "8pt" }}
                >
                  Scorecard
                </Button>
                {hasCoordinates ? (
                  <Button
                    variant="contained"
                    size="small"
                    color={showMap ? "primary" : "mcnick"}
                    style={{ fontSize: "8pt" }}
                    onClick={viewMap}
                  >
                    Map
                  </Button>
                ) : null}
                <Button
                  variant="contained"
                  size="small"
                  color={showLeaderboard ? "primary" : "mcnick"}
                  style={{ fontSize: "8pt" }}
                  onClick={viewLeaderboard}
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
                      color="mcnick"
                      onClick={() =>
                        formik.setFieldValue(
                          "strokes",
                          Math.max(1, Number(formik.values.strokes || 0) - 1)
                        )
                      }
                    >
                      −
                    </Button>

                    <input
                      type="number"
                      name="strokes"
                      value={formik.values.strokes ?? 0}
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
                      color="mcnick"
                      onClick={() =>
                        formik.setFieldValue(
                          "strokes",
                          Number(formik.values.strokes || 0) + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </Box>
                </FormControl>
              </Grid2>

              {holeInfo.sponsors && (
                <div className="flex flex-col justify-center w-full">
                  {holeInfo.sponsors.length > 0 && (
                    <div className="text-center">Hole Sponsored By:</div>
                  )}
                  {holeInfo.sponsors.map((sponsor: ScrambleSponsor) => (
                    <HoleSponsor key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              )}
            </>
          ) : null}
        </Grid2>

        {showMap && hasCoordinates && (
          <div className="mx-auto h-svh pt-5">
            <HoleMap
              key={`hole-${currentHoleNumber ?? "unknown"}`}
              point1={bottomPoint}
              point2={topPoint}
            />
          </div>
        )}

        {showLeaderboard && scrambleTeam && (
          <Card className="p-2 max-w-4xl mx-auto mt-5">
            <CardContent className="overflow-x-auto">
              <Leaderboard scrambleId={scrambleTeam.scrambleId} />
            </CardContent>
          </Card>
        )}

        {showScorecard && scorecard && (
          <Card className="p-2 max-w-4xl mx-auto mt-5">
            <CardContent className="overflow-x-auto">
              <ScrambleScorecard scorecard={scorecard} />
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
};

export default ScoreEntry;
