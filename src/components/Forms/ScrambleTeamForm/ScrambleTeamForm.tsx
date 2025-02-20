"use client";
import { CreateScrambleTeam, UploadScrambleTeams } from "@/api/scramble";
import { ScrambleTeamCreate } from "@/types/Team";
import { Button, Container, Grid2, Modal, TextField } from "@mui/material";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const scrambleTeamFormSchema = Yup.object({
  teamName: Yup.string().required("Team Name is required"),
  captainName: Yup.string().required("Captain's Name is required"),
  captainEmail: Yup.string().email().required("Captain's Email is required"),
  startingHole: Yup.number().required("Please enter a number between 1 and 18"),
});

interface ScrambleTeamFormProps {
  scrambleId: string;
  isOpen: boolean;
  close: () => void;
}

const ScrambleTeamForm = ({
  scrambleId,
  isOpen,
  close,
}: ScrambleTeamFormProps) => {
  const formik = useFormik({
    initialValues: {
      scrambleId: scrambleId,
      teamName: "",
      captainName: "",
      captainEmail: "",
      startingHole: 0,
      status: "Not Started",
    },
    validationSchema: scrambleTeamFormSchema,
    onSubmit: async (values) => {
      const scrambleTeam: ScrambleTeamCreate = {
        scrambleId: scrambleId ? scrambleId : "",
        teamName: values.teamName,
        captainName: values.teamName,
        captainEmail: values.captainName,
        startingHole: values.startingHole,
        status: "Not Started",
      };
      const response = await CreateScrambleTeam(scrambleTeam);
      if (response.status == 200) {
        try {
          if (response.status == 200) {
            toast.success("Team Created");
            close();
          }
        } catch (error) {
          toast.error("There was a Problem Creating Team");
        }
      }
    },
  });

  return (
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
                <form onSubmit={formik.submitForm}>
                  <Grid2 container>
                    <Grid2 size={{ md: 4, sm: 12 }}>
                      <TextField
                        id="teamName"
                        name="teamName"
                        type="text"
                        label="Name of Team"
                        placeholder=""
                        size="small"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                      />
                      {formik.errors.teamName && formik.touched.teamName ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.teamName}
                        </div>
                      ) : (
                        false
                      )}
                    </Grid2>
                    <Grid2 size={{ md: 4, sm: 12 }}>
                      <TextField
                        id="captainName"
                        name="captainName"
                        type="text"
                        label="Captain's Name"
                        placeholder=""
                        size="small"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                      />
                      {formik.errors.captainName &&
                      formik.touched.captainName ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.captainName}
                        </div>
                      ) : (
                        false
                      )}
                    </Grid2>
                    <Grid2 size={{ md: 4, sm: 12 }}>
                      <TextField
                        id="captainEmail"
                        name="captainEmail"
                        type="text"
                        label="Captain's Email"
                        placeholder=""
                        size="small"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                      />
                      {formik.errors.captainName &&
                      formik.touched.captainName ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.captainEmail}
                        </div>
                      ) : (
                        false
                      )}
                    </Grid2>
                    <Grid2 size={{ md: 4, sm: 12 }}>
                      <TextField
                        id="startingHole"
                        name="startingHole"
                        type="text"
                        label="Starting Hole"
                        placeholder=""
                        size="small"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                      />
                      {formik.errors.startingHole &&
                      formik.touched.startingHole ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.startingHole}
                        </div>
                      ) : (
                        false
                      )}
                    </Grid2>
                    <Grid2 size={{ md: 12, sm: 12 }}>
                      <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        color="primary"
                      >
                        Add Team
                      </Button>
                    </Grid2>
                  </Grid2>
                </form>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ScrambleTeamForm;
