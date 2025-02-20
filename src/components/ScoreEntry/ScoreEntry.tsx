"use client";
import { AddScores } from "@/api/scoring";
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

const ScoreEntry = () => {
  //Get ScrambleTeam Info - Get Current Hole
  //Get the Coordinates of the Hole Teebox and Back of the Green
  //

  const formik = useFormik({
    initialValues: {
      scrambleTeamId: "",
      holeId: "",
      strokes: 0,
    },
    onSubmit: async (values) => {
      const scrambleScore: ScrambleScore = {
        scrambleTeamId: values.scrambleTeamId,
        holeId: values.holeId,
        strokes: values.strokes,
      };

      const response = await AddScores(scrambleScore);
      try {
        if (response.status == 200) {
          toast.success("Score Saved");
        }
      } catch (error) {
        toast.error("There was a Problem Saving Score");
      }
    },
  });

  return (
    <>
      <form>
        <Grid2 container rowSpacing={2}>
          <Grid2>
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
                Score
              </FormLabel>
              <RadioGroup
                name="strokes"
                onChange={formik.handleChange}
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
                <FormControlLabel value="6" control={<Radio />} label="6" />
                <FormControlLabel value="7" control={<Radio />} label="7" />
                <FormControlLabel value="8" control={<Radio />} label="8" />
                <FormControlLabel value="9" control={<Radio />} label="9" />
                <FormControlLabel value="10" control={<Radio />} label="10" />
              </RadioGroup>
              {formik.errors.strokes && formik.touched.strokes ? (
                <div className="text-xs text-red-600">
                  {formik.errors.strokes}
                </div>
              ) : (
                false
              )}
            </FormControl>
          </Grid2>
          <Grid2>
            <Button type="submit" variant="contained" color="primary">
              Previous
            </Button>
          </Grid2>
          <Grid2>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Grid2>
          <Grid2>
            <HoleMap />
          </Grid2>
        </Grid2>
      </form>
    </>
  );
};

export default ScoreEntry;
