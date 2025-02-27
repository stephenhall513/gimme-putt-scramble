import {
  CreateScrambleLongDrive,
  GetScrambleLongDrive,
  UpdateScrambleLongDrive,
} from "@/api/scramble";
import {
  ScrambleLongDrive,
  ScrambleLongDriveAdd,
  ScrambleLongDriveUpdate,
} from "@/types/ScrambleLongDrive";
import { Button, Grid2, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const scrambleLongDriveFormSchema = Yup.object({
  holeNumber: Yup.number().required("Please Enter Hole #").min(1).max(18),
});

interface ScrambleLongDriveForm {
  scrambleId: string;
  scrambleLongDriveId?: string | null;
  close: () => void;
}

const ScrambleLongDriveForm = ({
  scrambleId,
  scrambleLongDriveId,
  close,
}: ScrambleLongDriveForm) => {
  const isEditing = !!scrambleLongDriveId;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [existingLongDrive, setExisitingLongDrive] =
    useState<ScrambleLongDrive>();

  useEffect(() => {
    const getLongDrive = async () => {
      console.log("UseEffect");
      if (scrambleLongDriveId) {
        console.log("ID is there");
        const response = await GetScrambleLongDrive(scrambleLongDriveId);
        if (response.status == 200) {
          setExisitingLongDrive(response.data);
        }
      }

      setIsLoading(false);
    };

    getLongDrive();
  }, [scrambleLongDriveId]);

  const formik = useFormik({
    initialValues: {
      scrambleId: scrambleId,
      holeNumber: existingLongDrive?.hole?.holeNumber || 0,
      golferName: existingLongDrive?.golferName || "",
    },
    validationSchema: scrambleLongDriveFormSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditing && scrambleLongDriveId) {
          const longDriveUpdate: ScrambleLongDriveUpdate = {
            id: scrambleLongDriveId,
            scrambleId: scrambleId,
            holeNumber: values.holeNumber,
            golferName: values.golferName,
          };

          const response = await UpdateScrambleLongDrive(longDriveUpdate);
          if (response.status === 200) {
            toast.success("Long Drive Updated Successfully");
          }
        } else {
          const longDrive: ScrambleLongDriveAdd = {
            scrambleId: scrambleId,
            holeNumber: values.holeNumber,
            golferName: values.golferName,
          };

          const response = await CreateScrambleLongDrive(longDrive);

          if (response.status == 200) {
            toast.success("Long Drive Added");
          }
        }

        resetForm();
        close();
      } catch (error) {
        toast.error("There was a Problem Creating Long Drive");
      }
    },
  });

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container>
            <Grid2 size={{ lg: 3, sm: 6 }}>
              <TextField
                id="holeNumber"
                name="holeNumber"
                label="Hole #"
                type="number"
                value={formik.values.holeNumber}
                onChange={formik.handleChange}
                size="small"
              />
            </Grid2>
            <Grid2 size={{ lg: 3, sm: 6 }}>
              <TextField
                id="golferName"
                name="golferName"
                label="Golfer Name"
                value={formik.values.golferName}
                onChange={formik.handleChange}
                size="small"
              />
            </Grid2>
            <Grid2 size={{ lg: 3, sm: 6 }} className="flex flex-row">
              <div className="mr-2">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  {isEditing ? "Update Long Drive" : "Add Long Drive"}
                </Button>
              </div>
              <div>
                <Button
                  type="submit"
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
      )}
    </>
  );
};

export default ScrambleLongDriveForm;
