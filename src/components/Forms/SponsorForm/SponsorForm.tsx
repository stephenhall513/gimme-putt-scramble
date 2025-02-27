"use client";
import {
  CreateScrambleSponsor,
  CreateScrambleTeam,
  GetScrambles,
  UploadScrambleLogo,
  UploadScrambleTeams,
} from "@/api/scramble";
import { ScrambleSponsor } from "@/types/ScrambleSponsor";
import { ScrambleTeamCreate } from "@/types/Team";
import {
  Button,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
} from "@mui/material";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Scramble } from "@/types/Scramble";
import { convertFieldResponseIntoMuiTextFieldProps } from "@mui/x-date-pickers/internals";
import { gridColumnVisibilityModelSelector } from "@mui/x-data-grid";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const sponsorFormSchema = Yup.object({
  sponsorName: Yup.string().required("Sponsor Name is required"),
  sponsorEmail: Yup.string().email().required("Sponsor's Email is required"),
  sponsorWebsite: Yup.string(),
  sponsorPhone: Yup.string(),
  sponsorType: Yup.string().required("Please select a Sponsor Type"),
  holeNumber: Yup.number().when("sponsorType", {
    is: "Hole",
    then: (schema) =>
      schema.required("Please enter a number between 1 and 18").min(1).max(18),
    otherwise: (schema) => schema.notRequired(),
  }),
});

interface SponsorFormProps {
  scrambleEventId: string;
  isOpen: boolean;
  close: () => void;
}

const SponsorForm = ({ scrambleEventId, isOpen, close }: SponsorFormProps) => {
  const [showScrambles, setShowScramble] = useState<boolean>(false);
  const [scrambleId, setScrambleId] = useState<string>("");
  const [scrambles, setScrambles] = useState<Scramble[]>([]);

  useEffect(() => {
    console.log("EventId", scrambleEventId);
    const getScrambles = async () => {
      const response = await GetScrambles(scrambleEventId);
      console.log("scrambles", response);
      if (response.status == 200) {
        setScrambles(response.data);
        if (response.data.length === 1) {
          const id = response.data[0].id;
          if (id) {
            console.log("loaded", id);
            setScrambleId(id);
            setShowScramble(false);
          }
        } else {
          setShowScramble(true);
        }
      }
    };

    getScrambles();
  }, [scrambleEventId]);

  const formik = useFormik({
    initialValues: {
      scrambleId: null,
      sponsorName: "",
      sponsorWebsite: "",
      sponsorPhone: "",
      sponsorEmail: "",
      holeNumber: 0,
      sponsorType: "",
      file: null,
    },
    validationSchema: sponsorFormSchema,
    onSubmit: async (values) => {
      try {
        if (scrambleId) {
          const scrambleSponsor: ScrambleSponsor = {
            scrambleId: scrambleId,
            sponsorName: values.sponsorName,
            sponsorWebsite: values.sponsorWebsite,
            sponsorPhone: values.sponsorPhone,
            sponsorEmail: values.sponsorEmail,
            holeNumber: values.holeNumber ? Number(values.holeNumber) : 0,
            sponsorType: values.sponsorType,
          };

          const response = await CreateScrambleSponsor(scrambleSponsor);
          if (response.status == 200) {
            const sponsorId = response.data;
            if (formik.values.file) {
              const uploadResponse = await UploadScrambleLogo(
                sponsorId,
                formik.values.file
              );
            }

            toast.success("Sponsor Added");
            close();
          }
        } else {
          console.log("No ScrambleID");
        }
      } catch (error) {
        toast.error("There was a Problem Adding Sponsor");
        console.error("Error submitting form:", error);
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
              <Container className="bg-[#F8F6F5] rounded-md p-6">
                {showScrambles ? (
                  <div>
                    <div
                      className="text-center text-black text-xl pb-6"
                      style={{ fontFamily: "Russo One", fontSize: 16 }}
                    >
                      Select a Scramble
                    </div>
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="scramble-label">Scramble</InputLabel>
                        <Select
                          labelId="scramble-label"
                          id="scramble"
                          label="Scramble"
                          size="small"
                          value={scrambleId} // ✅ Directly bind `scrambleId` state
                          onChange={(event: SelectChangeEvent) => {
                            console.log("Selected Scramble ID:", event);
                            // if (event?.target?.value) {
                            //   setScrambleId(event.target.value);
                            // }
                            //setShowScramble(false);
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select a Scramble
                          </MenuItem>

                          {scrambles.length > 0 ? (
                            scrambles.map((scramble: Scramble, index) => (
                              <MenuItem
                                key={
                                  scramble.id?.toString() || `fallback-${index}`
                                } // ✅ Ensures key is always a string
                                value={scramble.id}
                              >
                                {scramble.scrambleName}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="" disabled>
                              No scrambles available
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className="text-center text-black text-xl pb-6"
                      style={{ fontFamily: "Russo One", fontSize: 16 }}
                    >
                      Add Sponsor
                    </div>
                    <form onSubmit={formik.handleSubmit} method="post">
                      <Grid2 container spacing={2}>
                        <Grid2 size={{ md: 4, sm: 12 }}>
                          <TextField
                            id="sponsorName"
                            name="sponsorName"
                            type="text"
                            label="Sponsor Name"
                            placeholder=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                          />
                          {formik.errors.sponsorName &&
                          formik.touched.sponsorName ? (
                            <div className="text-xs text-red-600">
                              {formik.errors.sponsorName}
                            </div>
                          ) : (
                            false
                          )}
                        </Grid2>
                        <Grid2 size={{ md: 4, sm: 12 }}>
                          <TextField
                            id="sponsorEmail"
                            name="sponsorEmail"
                            type="text"
                            label="Sponsor Email"
                            placeholder=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                          />
                          {formik.errors.sponsorEmail &&
                          formik.touched.sponsorEmail ? (
                            <div className="text-xs text-red-600">
                              {formik.errors.sponsorEmail}
                            </div>
                          ) : (
                            false
                          )}
                        </Grid2>
                        <Grid2 size={{ md: 4, sm: 12 }}>
                          <TextField
                            id="sponsorWebsite"
                            name="sponsorWebsite"
                            type="text"
                            label="Sponsor Website"
                            placeholder=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                          />
                          {formik.errors.sponsorWebsite &&
                          formik.touched.sponsorWebsite ? (
                            <div className="text-xs text-red-600">
                              {formik.errors.sponsorWebsite}
                            </div>
                          ) : (
                            false
                          )}
                        </Grid2>
                        <Grid2 size={{ md: 4, sm: 12 }}>
                          <TextField
                            id="sponsorPhone"
                            name="sponsorPhone"
                            type="text"
                            label="Sponsor Phone"
                            placeholder=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                          />
                          {formik.errors.sponsorPhone &&
                          formik.touched.sponsorPhone ? (
                            <div className="text-xs text-red-600">
                              {formik.errors.sponsorPhone}
                            </div>
                          ) : (
                            false
                          )}
                        </Grid2>
                        <Grid2 size={{ md: 4, sm: 12 }}>
                          <FormControl fullWidth>
                            <InputLabel id="sponsorType-label">
                              Sponsor Type
                            </InputLabel>
                            <Select
                              labelId="sponsorType-label"
                              id="sponsorType"
                              label="Sponsor Type"
                              size="small"
                              value={formik.values.sponsorType || ""}
                              onChange={(event) => {
                                const selectedType = event.target.value;
                                formik.setFieldValue(
                                  "sponsorType",
                                  selectedType
                                );

                                // ✅ Reset holeNumber to null if type is not "hole"
                                if (selectedType !== "hole") {
                                  formik.setFieldValue("holeNumber", null);
                                }
                              }}
                            >
                              <MenuItem value="Scramble">Scramble</MenuItem>
                              <MenuItem value="Leaderoard">
                                Leaderboard
                              </MenuItem>
                              <MenuItem value="Beverage">Beverage</MenuItem>
                              <MenuItem value="hole">Hole</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid2>
                        {formik.values.sponsorType == "hole" ? (
                          <Grid2 size={{ md: 4, sm: 12 }}>
                            <TextField
                              id="holeNumber"
                              name="holeNumber"
                              type="number"
                              label="Hole #"
                              placeholder=""
                              size="small"
                              fullWidth
                              variant="outlined"
                              value={formik.values.holeNumber ?? ""}
                              onChange={(event) => {
                                const value = event.target.value;
                                formik.setFieldValue(
                                  "holeNumber",
                                  value ? Number(value) : null
                                );
                              }}
                            />

                            {formik.errors.holeNumber &&
                            formik.touched.holeNumber ? (
                              <div className="text-xs text-red-600">
                                {formik.errors.holeNumber}
                              </div>
                            ) : (
                              false
                            )}
                          </Grid2>
                        ) : (
                          false
                        )}
                        <Grid2>
                          <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload Sponsor Logo
                            <VisuallyHiddenInput
                              type="file"
                              accept="image/*"
                              onChange={(event) => {
                                const file = event.currentTarget.files?.[0];
                                if (file) {
                                  formik.setFieldValue("file", file);
                                }
                              }}
                            />
                          </Button>
                        </Grid2>
                        <Grid2 size={{ md: 12, sm: 12 }}>
                          <Button
                            type="submit"
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Add Sponsor
                          </Button>
                        </Grid2>
                      </Grid2>
                    </form>
                  </div>
                )}
              </Container>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SponsorForm;
