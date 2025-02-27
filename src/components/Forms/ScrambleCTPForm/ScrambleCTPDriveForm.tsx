import {
  CreateScrambleCTP,
  GetScrambleCTP,
  UpdateScrambleCTP,
} from "@/api/scramble";
import {
  ScrambleCTP,
  ScrambleCTPAdd,
  ScrambleCTPUpdate,
} from "@/types/ScrambleCTP";
import { Button, Grid2, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const scrambleCTPFormSchema = Yup.object({
  holeNumber: Yup.number().required("Please Enter Hole #").min(1).max(18),
});

interface ScrambleCTPFormProps {
  scrambleId: string;
  scrambleCtpId?: string;
  close: () => void;
}

const ScrambleCTPForm = ({
  scrambleId,
  scrambleCtpId,
  close,
}: ScrambleCTPFormProps) => {
  const isEditing = !!scrambleCtpId;
  const [existingCTP, setExisitingCTP] = useState<ScrambleCTP>();

  useEffect(() => {
    const getCTP = async () => {
      if (scrambleCtpId) {
        const response = await GetScrambleCTP(scrambleCtpId);
        if (response.status == 200) {
          setExisitingCTP(response.data);
        }
      }
    };

    getCTP();
  }, [scrambleCtpId]);

  const formik = useFormik({
    initialValues: {
      scrambleId: scrambleId,
      holeNumber: existingCTP?.hole?.holeNumber || 0,
      golferName: existingCTP?.golferName || "",
    },
    validationSchema: scrambleCTPFormSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("IsEdit", isEditing);
        if (isEditing && scrambleCtpId) {
          const ctpUpdate: ScrambleCTPUpdate = {
            id: scrambleCtpId,
            scrambleId: scrambleId,
            holeNumber: Number(values.holeNumber),
            golferName: values.golferName,
          };

          const response = await UpdateScrambleCTP(ctpUpdate);

          if (response.status == 200) {
            toast.success("Cloeset To Pin Updated");
          }
        } else {
          const ctp: ScrambleCTPAdd = {
            scrambleId: scrambleId,
            holeNumber: Number(values.holeNumber),
            golferName: values.golferName,
          };

          const response = await CreateScrambleCTP(ctp);

          if (response.status == 200) {
            toast.success("Cloeset To Pin Added");
          }
        }

        resetForm();
        close();
      } catch (error) {
        toast.error("There was a Problem Creating Long Drive");
      }

      resetForm();
      close();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid2 container>
          <Grid2 size={{ lg: 3, sm: 4 }}>
            <TextField
              id="holeNumber"
              name="holeNumber"
              label="Hole #"
              type="number"
              size="small"
              value={formik.values.holeNumber}
              onChange={formik.handleChange}
            />
          </Grid2>
          <Grid2 size={{ lg: 3, sm: 4 }}>
            <TextField
              id="golferName"
              name="golferName"
              label="Golfer Name"
              size="small"
              value={formik.values.golferName}
              onChange={formik.handleChange}
            />
          </Grid2>
          <Grid2 size={{ lg: 3, sm: 4 }} className="flex flex-row">
            <div className="mr-2">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                {isEditing ? "Update Closest TO Pin" : "Add Closest TO Pin"}
              </Button>
            </div>
            <div>
              <Button
                type="button"
                variant="contained"
                color="inherit"
                onClick={close}
                size="small"
              >
                Cancel
              </Button>
            </div>
          </Grid2>
        </Grid2>
      </form>
    </>
  );
};

export default ScrambleCTPForm;
