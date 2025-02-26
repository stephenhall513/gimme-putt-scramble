"use client";
import { CreateScrambleEvent } from "@/api/scrambleEvent";
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
import { DatePicker } from "@mui/x-date-pickers";
import { error } from "console";
import { getCookie, getCookies } from "cookies-next/client";
import { format, formatDate } from "date-fns";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const signupFormSchema = Yup.object({
  organizationName: Yup.string().required("Company/Organization is required"),
  isNonprofit: Yup.string().required("Please choose Non Profit status"),
  firstName: Yup.string().required("Contact First Name is required"),
  lastName: Yup.string().required("Contact Last Name is required"),
  email: Yup.string().email().required("Contact Email is required"),
  phone: Yup.string().required("Contact Phone Number is required"),
  eventName: Yup.string().required("Event Name is required"),
  description: Yup.string(),
  startDate: Yup.date().required("Event Start Date is required"),
  endDate: Yup.date().required("Event End Date is required"),
  multiple: Yup.string().required("Please select an option"),
});

interface SignupProps {
  onSuccess: (id: string) => void;
}

const Signup = ({ onSuccess }: SignupProps) => {
  const { push } = useRouter();
  const [showSignup, setShowSignup] = useState<boolean>(true);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [golferIdValue, setGolferIdValue] = useState("");

  useEffect(() => {
    const allCookies = getCookies();
    if (allCookies) {
      if (Object.keys(allCookies).length == 0) {
        setShowSignup(false);
      }
    }

    const firstName = getCookie("firstName");
    if (firstName) {
      setFirstNameValue(firstName);
    }

    const lastName = getCookie("lastName");
    if (lastName) {
      setLastNameValue(lastName);
    }

    const email = getCookie("email");
    if (email) {
      setEmailValue(email);
    }

    const golferId = getCookie("golferId");
    if (golferId) {
      setGolferIdValue(golferId);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      phone: "",
      eventName: "",
      description: "",
      organizationName: "",
      isNonprofit: "",
      startDate: "",
      endDate: "",
      multiple: "",
    },
    validationSchema: signupFormSchema,
    onSubmit: async (values) => {
      const scrambleEvent: ScrambleEvent = {
        golferId: golferIdValue,
        eventName: values.eventName,
        description: values.description,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        organizationName: values.organizationName,
        isNonprofit: values.isNonprofit == "yes" ? true : false,
        organizerName: values.firstName + " " + values.lastName,
        organizerEmail: values.email,
        organizerPhone: values.phone,
        eventLogo: "",
        hasMultipleScrambles: values.multiple == "yes" ? true : false,
        isPaid: false,
      };

      const response = await CreateScrambleEvent(scrambleEvent);
      try {
        if (response.status == 200) {
          const id = response.data;
          toast.success("Event Created, Continue to Next Section");
          onSuccess(id);
        }
      } catch (error) {
        toast.error("There was a Problem Creating Event");
      }
    },
  });
  return (
    <>
      {showSignup ? (
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
                        name="isNonprofit"
                        onChange={formik.handleChange}
                        style={{ flexDirection: "row" }}
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
                      value={new Date(formik.values.startDate)}
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
                      value={new Date(formik.values.endDate)}
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
                      onChange={formik.handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ md: 3, sm: 12 }}>
                    <TextField
                      id="firstName"
                      name="firstName"
                      type="text"
                      label="Contact First Name"
                      placeholder=""
                      size="small"
                      fullWidth
                      variant="outlined"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.firstName && formik.touched.firstName ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.firstName}
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ md: 3, sm: 12 }}>
                    <TextField
                      id="lastName"
                      name="lastName"
                      type="text"
                      label="Contact Last Name"
                      placeholder=""
                      size="small"
                      variant="outlined"
                      fullWidth
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lastName && formik.touched.lastName ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.lastName}
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
                        onChange={formik.handleChange}
                        style={{ flexDirection: "row" }}
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
                  <Grid2 size={{ lg: 12, sm: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      style={{
                        width: "100px",
                        height: "50px",
                        borderRadius: 5,
                        color: "#FFFFFF",
                        fontWeight: "bold",
                      }}
                    >
                      Continue
                    </Button>
                  </Grid2>
                </Grid2>
              </form>
            </div>
          </Container>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default Signup;
