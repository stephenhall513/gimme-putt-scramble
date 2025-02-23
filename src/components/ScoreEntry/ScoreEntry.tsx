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
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import HoleMap from "../HoleMap";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import HoleInfo from "../HoleInfo";
import Loader from "../Loader";

interface ScoreEntryProps {
  scrambleTeamId: string;
}

const ScoreEntry = ({ scrambleTeamId }: ScoreEntryProps) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [holeInfo, setHoleInfo] = useState<ScrambleScore>();
  const [currentHoleNumber, setCurrentHoleNumber] = useState<number>(0);
  const [nextHoleNumber, setNextHoleNumber] = useState<number>(0);
  const [prevHoleNumber, setPrevHoleNumber] = useState<number>(0);
  const point1 = { lng: -84.3173979, lat: 39.0476951 };
  const point2 = { lng: -84.3179987, lat: 39.0506613 };

  useEffect(() => {
    const getHoleInfo = async () => {
      const response = await GetScrambleHoleInfo(
        scrambleTeamId,
        currentHoleNumber
      );

      if (response.status === 200) {
        setHoleInfo(response.data);
        const hole = response.data.hole;

        if (hole) {
          setNextHoleNumber(hole.holeNumber === 18 ? 1 : hole.holeNumber + 1);
          setPrevHoleNumber(hole.holeNumber === 1 ? 18 : hole.holeNumber - 1);
        }
      }
    };

    getHoleInfo();
  }, [currentHoleNumber, scrambleTeamId]);

  const formik = useFormik({
    initialValues: {
      scrambleTeamId: scrambleTeamId,
      holeId: holeInfo?.holeId,
      strokes: holeInfo ? holeInfo.strokes : 0,
      submitAction: "",
    },
    onSubmit: async (values) => {
      const scrambleScore: ScrambleScore = {
        scrambleTeamId: holeInfo?.scrambleTeamId ? holeInfo.scrambleTeamId : "",
        holeId: holeInfo?.holeId ? holeInfo.holeId : "",
        scrambleScoreId: holeInfo?.scrambleScoreId,
        strokes: values.strokes,
      };

      try {
        const response = await AddScores(scrambleScore);
        if (response.status === 200) {
          toast.success("Score Saved");

          // Navigate based on the submit action
          if (values.submitAction === "next") {
            setCurrentHoleNumber(nextHoleNumber);
          } else if (values.submitAction === "prev") {
            setCurrentHoleNumber(prevHoleNumber);
          }
        }
      } catch (error) {
        toast.error("There was a Problem Saving Score");
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

  return (
    <>
      {!holeInfo ? (
        <Loader />
      ) : (
        <div className="h-screen flex flex-col w-full">
          {holeInfo.hole ? <HoleInfo hole={holeInfo.hole} /> : false}
          <div className="flex flex-col justify-center">
            <Button
              size="small"
              onClick={() => {
                setShowMap((currentShowMap) => !currentShowMap);
              }}
            >
              {showMap ? "Close Map" : "Show Map"}
            </Button>
          </div>
          {showMap ? (
            <div
              key={"hole-" + showMap}
              className="mx-auto"
              style={{ width: "100%", height: "100%" }}
            >
              <HoleMap key={Date.now()} point1={point1} point2={point2} />
            </div>
          ) : (
            <div>
              <form onSubmit={formik.handleSubmit}>
                <Grid2 container rowSpacing={2}>
                  <Grid2 size={{ sm: 12 }} className="w-full">
                    <div className="flex flex-row justify-between w-full">
                      <Button
                        type="submit"
                        variant="text"
                        color="primary"
                        onClick={() =>
                          formik.setFieldValue("submitAction", "prev")
                        }
                      >
                        <ChevronLeft /> Previous
                      </Button>

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
                    </div>
                  </Grid2>

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
                        {[...Array(10)].map((_, i) => (
                          <FormControlLabel
                            key={i + 1}
                            value={(i + 1).toString()}
                            control={<Radio />}
                            label={(i + 1).toString()}
                          />
                        ))}
                      </RadioGroup>
                      {formik.errors.strokes && formik.touched.strokes ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.strokes}
                        </div>
                      ) : null}
                    </FormControl>
                  </Grid2>
                </Grid2>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ScoreEntry;
