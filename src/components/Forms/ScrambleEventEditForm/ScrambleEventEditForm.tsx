"use client";
import {
  GetScrambleEvent,
  UpdateScrambleEvent,
  UploadScrambleEventLogo,
} from "@/api/scrambleEvent";
import { ScrambleEvent } from "@/types/ScrambleEvent";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DatePicker } from "@mui/x-date-pickers";
import { error } from "console";
import { getCookie, getCookies } from "cookies-next/client";
import { format, formatDate } from "date-fns";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import EventDetails from "@/components/EventDetails/EventDetails";
import Link from "next/link";
import Loader from "@/components/Loader";

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

const ScrambleEventEditSchema = Yup.object({
  organizationName: Yup.string().required("Company/Organization is required"),
  isNonprofit: Yup.string().required("Please choose Non Profit status"),
  organizerName: Yup.string().required("Organizer Name is required"),
  email: Yup.string().email().required("Contact Email is required"),
  phone: Yup.string().required("Contact Phone Number is required"),
  eventName: Yup.string().required("Event Name is required"),
  description: Yup.string(),
  startDate: Yup.date().required("Event Start Date is required"),
  endDate: Yup.date().required("Event End Date is required"),
  multiple: Yup.string().required("Please select an option"),
});

interface ScrambleEventEditFormProps {
  scrambleEventId: string;
}

const ScrambleEventEditForm = ({
  scrambleEventId,
}: ScrambleEventEditFormProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [scrambleEvent, setScrambleEvent] = useState<ScrambleEvent>();

  useEffect(() => {
    if (!scrambleEventId) return; // Prevent fetching if scrambleEventId is not available

    const getScrambleEvent = async () => {
      console.log("Fetching scramble event for ID:", scrambleEventId);
      try {
        const response = await GetScrambleEvent(scrambleEventId);
        if (response.status === 200) {
          setScrambleEvent(response.data);
        } else {
          console.error("Failed to fetch event:", response);
        }
      } catch (error) {
        console.error("Error fetching scramble event:", error);
      }
    };
    getScrambleEvent();
  }, [scrambleEventId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      golferId: scrambleEvent ? scrambleEvent.golferId : "",
      organizerName: scrambleEvent ? scrambleEvent?.organizerName : "",
      email: scrambleEvent ? scrambleEvent?.organizerEmail : "",
      phone: scrambleEvent ? scrambleEvent?.organizerPhone : "",
      eventName: scrambleEvent ? scrambleEvent?.eventName : "",
      description: scrambleEvent ? scrambleEvent?.description : "",
      organizationName: scrambleEvent ? scrambleEvent?.organizationName : "",
      isNonprofit: scrambleEvent?.isNonprofit == true ? "yes" : "no",
      startDate: scrambleEvent
        ? format(scrambleEvent?.startDate, "MM/dd/yyyy")
        : new Date(),
      endDate: scrambleEvent
        ? format(scrambleEvent?.endDate, "MM/dd/yyyy")
        : new Date(),
      multiple: scrambleEvent?.hasMultipleScrambles == true ? "yes" : "no",
      eventLogo: scrambleEvent ? scrambleEvent?.eventLogo : "",
      file: null,
    },
    validationSchema: ScrambleEventEditSchema,
    onSubmit: async (values) => {
      const scrambleEvent: ScrambleEvent = {
        id: scrambleEventId,
        golferId: values.golferId,
        eventName: values.eventName,
        description: values.description,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        organizationName: values.organizationName,
        isNonprofit: values.isNonprofit == "yes" ? true : false,
        organizerName: values.organizerName,
        organizerEmail: values.email,
        organizerPhone: values.phone,
        eventLogo: values.eventLogo,
        hasMultipleScrambles: values.multiple == "yes" ? true : false,
        isPaid: false,
      };

      const response = await UpdateScrambleEvent(scrambleEvent);
      try {
        if (response.status == 200) {
          if (formik.values.file) {
            const uploadResponse = await UploadScrambleEventLogo(
              scrambleEventId,
              formik.values.file
            );
          }
          const id = response.data;
          toast.success("Event Updated");
          const refreshResponse = await GetScrambleEvent(scrambleEventId);
          if (response.status == 200) {
            setScrambleEvent(refreshResponse.data);
          }
          setIsEdit(false);
        }
      } catch (error) {
        toast.error("There was a Problem Updating Event");
      }
    },
  });

  if (!scrambleEventId) {
    return <Loader />; // Show a loader until scrambleEventId is available
  }

  if (!scrambleEvent) {
    return <Loader />; // Show a loader until scrambleEvent is fetched
  }

  return (
    <>
      {isEdit ? (
        <div className="p-2">
          <Container className="bg-[#F8F6F5] rounded-md p-4">
            <div className="flex flex-col">
              <div
                className="text-center text-black text-xl pb-6"
                style={{ fontFamily: "Russo One", fontSize: 16 }}
              >
                Please provide information of your event
              </div>
              <form onSubmit={formik.handleSubmit}>
                <Grid2 container spacing={1} rowSpacing={2}>
                  <Grid2 size={{ lg: 6, md: 6, sm: 12 }}>
                    <TextField
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      label="Organization/Company Name"
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={formik.values.organizationName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.organizationName &&
                    formik.touched.organizationName ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.organizationName}
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ md: 6, sm: 12 }}>
                    <FormControl
                      component="fieldset"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FormLabel
                        id="nonprofit-group-label"
                        className="text-black"
                        color="primary"
                        style={{ marginRight: 20 }}
                      >
                        Is your company/organization a Non-Profit?
                      </FormLabel>
                      <RadioGroup
                        id="isNonprofit"
                        name="isNonprofit"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "isNonprofit",
                            event.target.value
                          )
                        }
                        style={{ flexDirection: "row" }}
                        value={formik.values.isNonprofit}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                    {formik.errors.isNonprofit && formik.touched.isNonprofit ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.isNonprofit}
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ lg: 6, md: 6, sm: 12 }}>
                    <TextField
                      id="eventName"
                      name="eventName"
                      type="text"
                      label="Event Name"
                      size="small"
                      variant="outlined"
                      fullWidth
                      onChange={formik.handleChange}
                      value={formik.values.eventName}
                    />
                    {formik.errors.eventName && formik.touched.eventName ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.eventName}
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ lg: 3, md: 6, sm: 12 }}>
                    <DatePicker
                      name="startDate"
                      label="Event Start Date"
                      value={
                        new Date(format(formik.values.startDate, "MM/dd/yyyy"))
                      }
                      slotProps={{ textField: { size: "small" } }}
                      onChange={(value) =>
                        formik.setFieldValue("startDate", value, true)
                      }
                    />
                    {formik.errors.startDate && formik.touched.startDate ? (
                      <div className="text-xs text-red-600">
                        Start Date is required
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ lg: 3, md: 6, sm: 12 }}>
                    <DatePicker
                      name="endDate"
                      label="Event End Date"
                      value={
                        new Date(format(formik.values.endDate, "MM/dd/yyyy"))
                      }
                      slotProps={{ textField: { size: "small" } }}
                      onChange={(value) =>
                        formik.setFieldValue("endDate", value, true)
                      }
                    />
                    {formik.errors.endDate && formik.touched.endDate ? (
                      <div className="text-xs text-red-600">
                        End Date is required
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ lg: 12, sm: 12 }}>
                    <TextField
                      id="description"
                      name="description"
                      type="text"
                      multiline={true}
                      label="Event Description"
                      rows={4}
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ md: 3, sm: 12 }}>
                    <TextField
                      id="organizaerName"
                      name="organizaerName"
                      type="text"
                      label="Organizer Name"
                      placeholder=""
                      size="small"
                      fullWidth
                      variant="outlined"
                      value={formik.values.organizerName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.organizerName &&
                    formik.touched.organizerName ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.organizerName}
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ md: 3, sm: 12 }}>
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      label="Contact Email"
                      size="small"
                      variant="outlined"
                      fullWidth
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.email}
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ md: 3, sm: 12 }}>
                    <TextField
                      id="phone"
                      name="phone"
                      type="tel"
                      label="Contact Phone Number"
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.email}
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ lg: 8, sm: 12 }}>
                    <FormControl
                      component="fieldset"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FormLabel
                        id="multiple-group-label"
                        className="text-black"
                        color="primary"
                        style={{ marginRight: 20 }}
                      >
                        Are you going to have multiple sites/scrambles for your
                        event?
                      </FormLabel>
                      <RadioGroup
                        name="multiple"
                        onChange={(event) =>
                          formik.setFieldValue("multiple", event.target.value)
                        }
                        style={{ flexDirection: "row" }}
                        value={formik.values.multiple}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      {formik.errors.multiple && formik.touched.multiple ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.multiple}
                        </div>
                      ) : (
                        false
                      )}
                    </FormControl>
                  </Grid2>
                  <Grid2>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Event Logo
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
                  <Grid2 size={{ lg: 12, sm: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{
                        width: "100px",
                        height: "50px",
                        borderRadius: 5,
                        color: "#FFFFFF",
                        fontWeight: "bold",
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      color="inherit"
                      style={{
                        width: "100px",
                        height: "50px",
                        borderRadius: 5,
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        backgroundColor: "#a2a2a2",
                      }}
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </Button>
                  </Grid2>
                </Grid2>
              </form>
            </div>
          </Container>
        </div>
      ) : (
        <>
          <div className="flex flex-row">
            <div className="flex-2 my-4 mr-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEdit(true)}
              >
                Edit Event
              </Button>
            </div>
            <div className="flex-2 my-4">
              <Link href={`/myevents/events/${scrambleEventId}/sponsors`}>
                <Button
                  variant="contained"
                  color="primary"
                  title="Manage Sponsors"
                  size="medium"
                >
                  Manage Sponsors
                </Button>
              </Link>
            </div>
          </div>
          <EventDetails
            scrambleEventId={scrambleEventId}
            refreshTrigger={isEdit}
          />
        </>
      )}
    </>
  );
};

export default ScrambleEventEditForm;
