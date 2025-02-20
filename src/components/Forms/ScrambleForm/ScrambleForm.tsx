"use client";
import { CreateScrambleEvent } from "@/api/scrambleEvent";
import { CheckScrambleCode, CreateScramble } from "@/api/scramble";
import { Scramble } from "@/types/Scramble";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Icon,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { getCookies } from "cookies-next";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import SearchIcon from "@mui/icons-material/Search";
import { GetTeeBoxes, SearchClubs } from "@/api/course";
import { Course } from "@/types/Course";
import { DataGrid } from "@mui/x-data-grid";
import { ClubSearch } from "@/types/ClubSearch";
import { Club } from "@/types/Club";
import { TeeBox } from "@/types/TeeBox";

const scrambleFormSchema = Yup.object({
  scrambleName: Yup.string().required("Scramble Name is required"),
  scrambleCode: Yup.string()
    .required("Scramble Code is required")
    .min(6, "Scramble Code must be at least 6 characters"),
  description: Yup.string(),
  scrambleDate: Yup.date().required("Scramble Start Date is required"),
  courseId: Yup.string().required("Please Choose a Course"),
  startTime: Yup.date().nullable().required("Start Time is Required"),
  numOfHoles: Yup.string().required(
    "Please select the # of holes for your scramble"
  ),
});

interface ScrambleProps {
  eventId: string;
  onSuccess: () => void;
}

const ScrambleForm = ({ eventId, onSuccess }: ScrambleProps) => {
  const [showSignup, setShowSignup] = useState<boolean>(true);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [showCourseLookup, setShowCourseLookup] = useState<boolean>(false);
  const [courseName, setCourseName] = useState<string>("");
  const [clubName, setClubName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<string>("");
  const [courseList, setCourseList] = useState<Course[]>();
  const [teeBoxList, setTeeBoxList] = useState<TeeBox[]>();
  const [clubList, setClubList] = useState<Club[]>([]);
  // const [clubList, setClubList] = useState<Club[]>([
  //   {
  //     id: "4db5ee58-b771-49a8-9bc4-08dd4cb4c4f7",
  //     refId: "141520611261288930",
  //     clubName: "Glenview Municipal Golf Club",
  //     city: "Cincinnati",
  //     state: "OH",
  //     country: "USA",
  //     address: "10965 Springfield Pike",
  //     timestampUpdated: new Date(),
  //     courses: [
  //       {
  //         id: "e9a1fe1b-d555-4e72-dffa-08dd4cb4d1f3",
  //         refId: "01114152100876355642",
  //         courseName: "West + West",
  //         numOfHoles: 18,
  //       },
  //       {
  //         id: "15abd82f-d20a-4b2f-dffb-08dd4cb4d1f3",
  //         refId: "01214152100876355642",
  //         courseName: "West + South",
  //         numOfHoles: 18,
  //       },
  //     ],
  //     numOfCourses: 9,
  //   },
  // ]);
  const [selectedCourse, setSelectedCourse] = useState<Course>();
  const [selectedClub, setSelectedClub] = useState<Club>();
  const [selectedTeeBox, setSelectedTeeBox] = useState<TeeBox>();
  const [showCourseGrid, setShowCourseGrid] = useState<boolean>(false);
  const [showTeeBoxGrid, setShowTeeBoxGrid] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  useEffect(() => {
    const allCookies = getCookies();
    if (allCookies) {
      if (Object.keys(allCookies).length == 0) {
        setShowSignup(false);
      }
    }
  }, []);

  const checkCode = async () => {
    if (formik.values.scrambleCode.length >= 6) {
      const response = await CheckScrambleCode(formik.values.scrambleCode);
      if (response.status == 200) {
        setIsAvailable(false);
        setErrorCode("Scramble Code is not available");
        formik.setFieldError("scrambleCode", "Scramble Code is not available");
      } else {
        setIsAvailable(true);
      }
    } else {
      setIsAvailable(false);
      setErrorCode("Scramble Code must be at least 6 characters long");
    }
  };

  const searchClub = async () => {
    let clubSearch: ClubSearch = {
      city: city,
      clubName: clubName,
      state: state,
    };
    const response = await SearchClubs(clubSearch);
    console.log("ClubSearch", response);
    if (response.status == 200) {
      setClubList(response.data);
    }
  };

  const selectClub = async (club: Club) => {
    console.log("Selected", club);
    setSelectedClub(club);
    setCourseList(club.courses);
    setShowCourseGrid(true);
  };

  const selectCourse = async (course: Course) => {
    setSelectedCourse(course);
    formik.setFieldValue("courseId", course.id);

    const courseName =
      selectedClub?.clubName == course.courseName
        ? course.courseName
        : selectedClub?.clubName + " - " + course.courseName;

    formik.setFieldValue("courseName", courseName);
    formik.setFieldValue("courseId", course.id);

    const teeBoxResponse = await GetTeeBoxes(course.id);

    if (teeBoxResponse.status == 200) {
      setTeeBoxList(teeBoxResponse.data);
    }

    setShowTeeBoxGrid(true);
  };

  const selectTeeBox = async (teebox: TeeBox) => {
    setSelectedTeeBox(teebox);
    formik.setFieldValue("teeBoxId", teebox.id);
    const teeName = selectedCourse?.courseName + " - " + teebox.teeBoxColor;
    formik.setFieldValue("courseName", teeName);
    setShowCourseGrid(true);
    setShowCourseLookup(false);
  };

  const formik = useFormik({
    initialValues: {
      scrambleName: "",
      scrambleCode: "",
      description: "",
      scrambleDate: new Date(),
      courseName: "",
      courseId: "",
      teeBoxId: "",
      scrambleLogo: "",
      startTime: new Date(),
      numOfHoles: 18,
    },
    validationSchema: scrambleFormSchema,
    onSubmit: async (values) => {
      const response = await CheckScrambleCode(formik.values.scrambleCode);
      if (response.status != 200) {
        const scramble: Scramble = {
          eventId: eventId,
          scrambleName: values.scrambleName,
          description: values.description,
          scrambleCode: values.scrambleCode,
          scrambleDate: new Date(values.scrambleDate),
          startTime: new Date(values.startTime),
          courseId: selectedCourse ? selectedCourse?.id : "",
          teeBoxId: values.teeBoxId,
          numOfHoles: values.numOfHoles,
          scrambleLogo: values.scrambleLogo,
        };

        const response = await CreateScramble(scramble);
        try {
          if (response.status == 200) {
            toast.success("Scramble Created");
            onSuccess();
          }
        } catch (error) {
          toast.error("There was a Problem Creating Scramble");
        }
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
                Tell us about the details of your scramble
              </div>
              <div>{formik.errors.teeBoxId}</div>
              <form onSubmit={formik.handleSubmit}>
                <Grid2 container spacing={1}>
                  <Grid2 size={{ md: 4, sm: 12 }}>
                    <TextField
                      id="scrambleName"
                      name="scrambleName"
                      type="text"
                      label="Name of Scramble"
                      placeholder=""
                      size="small"
                      fullWidth
                      variant="outlined"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.scrambleName &&
                    formik.touched.scrambleName ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.scrambleName}
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ md: 2, sm: 12 }}>
                    <TextField
                      id="scrambleCode"
                      name="scrambleCode"
                      type="text"
                      label="Scramble Code"
                      placeholder=""
                      size="small"
                      variant="outlined"
                      helperText="This will be the code to access your scrmable"
                      fullWidth
                      onChange={formik.handleChange}
                      onBlur={() => checkCode()}
                    />
                    {formik.errors.scrambleCode &&
                    formik.touched.scrambleCode ? (
                      <div className="text-xs text-red-600">
                        {formik.errors.scrambleCode}
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ md: 2, sm: 12 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => checkCode()}
                    >
                      Check Availability
                    </Button>
                  </Grid2>
                  <Grid2 size={{ md: 3, sm: 12 }}>
                    {isAvailable ? (
                      <div className="text-green-700">
                        Scramble Code is available
                      </div>
                    ) : (
                      <div className="text-red-600">{errorCode}</div>
                    )}
                  </Grid2>
                  <Grid2 size={{ lg: 12, sm: 12 }}>
                    <TextField
                      id="description"
                      name="description"
                      type="text"
                      multiline={true}
                      label="Description"
                      rows={4}
                      size="small"
                      variant="outlined"
                      fullWidth
                      onChange={formik.handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ lg: 3, md: 6, sm: 12 }}>
                    <DatePicker
                      name="scrambleDate"
                      label="Date of the Scramble"
                      slotProps={{ textField: { size: "small" } }}
                      onChange={(value) =>
                        formik.setFieldValue("scrambleDate", value, true)
                      }
                    />
                    {formik.errors.scrambleDate &&
                    formik.touched.scrambleDate ? (
                      <div className="text-xs text-red-600">
                        Scramble Date is required
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ lg: 3, md: 6, sm: 12 }}>
                    <TimePicker
                      name="startTime"
                      label="Scramble Start Time "
                      slotProps={{ textField: { size: "small" } }}
                      format="hh:mm a"
                      onChange={(value) => {
                        console.log("start time", value);
                        formik.setFieldValue("startDate", value);
                      }}
                    />
                    {formik.errors.startTime && formik.touched.startTime ? (
                      <div className="text-xs text-red-600">
                        Start Time is required
                      </div>
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2 size={{ lg: 6, md: 6, sm: 12 }}>
                    <div className="flex flex-row">
                      <TextField
                        id="courseName"
                        name="courseName"
                        type="text"
                        label="Select Golf Course"
                        size="small"
                        variant="outlined"
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.courseName}
                        disabled
                      />
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => setShowCourseLookup(true)}
                      >
                        <SearchIcon fontSize="small" />
                      </Button>
                    </div>
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
                        # of Holes
                      </FormLabel>
                      <RadioGroup
                        name="numOfHoles"
                        onChange={formik.handleChange}
                        style={{ flexDirection: "row" }}
                        defaultValue="18"
                      >
                        <FormControlLabel
                          value="9"
                          control={<Radio />}
                          label="9"
                        />
                        <FormControlLabel
                          value="18"
                          control={<Radio />}
                          label="18"
                        />
                        <FormControlLabel
                          value="36"
                          control={<Radio />}
                          label="36"
                        />
                      </RadioGroup>
                      {formik.errors.numOfHoles ? (
                        <div className="text-xs text-red-600">
                          {formik.errors.numOfHoles}
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
                      color="primary"
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
          <Modal
            open={showCourseLookup}
            onClose={() => setShowCourseLookup(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                overflow: "auto", // Allows scrolling within the Box if content exceeds its max height
                maxHeight: "90vh", // Limits the height to 90% of the viewport height
                width: "auto", // Adjust width as needed
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                outline: "none", // Removes focus outline for aesthetics
              }}
            >
              <Container className="bg-white" maxWidth="md">
                <Grid2 container spacing={1} padding={4}>
                  <Grid2 size={{ lg: 12, sm: 12 }}>Find Course</Grid2>
                  <Grid2 size={{ lg: 4, sm: 12 }}>
                    <TextField
                      id="courseName"
                      name="courseName"
                      size="small"
                      label="Course Name"
                      onChange={(event: any) => setClubName(event.target.value)}
                    />
                  </Grid2>
                  <Grid2 size={{ lg: 4, sm: 12 }}>
                    <TextField
                      id="city"
                      name="city"
                      size="small"
                      label="City"
                      onChange={(event: any) => setCity(event.target.value)}
                    />
                  </Grid2>
                  <Grid2 size={{ lg: 4, sm: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel id="state-label">State</InputLabel>
                      <Select
                        labelId="state-label"
                        id="state-select"
                        value={state}
                        label="Age"
                        onChange={(event: any) => setState(event.target.value)}
                        size="small"
                      >
                        <MenuItem value="AL">Alabama</MenuItem>
                        <MenuItem value="AK">Alaska</MenuItem>
                        <MenuItem value="AZ">Arizona</MenuItem>
                        <MenuItem value="AR">Arkansas</MenuItem>
                        <MenuItem value="CA">California</MenuItem>
                        <MenuItem value="CO">Colorado</MenuItem>
                        <MenuItem value="CT">Connecticut</MenuItem>
                        <MenuItem value="DE">Delaware</MenuItem>
                        <MenuItem value="FL">Florida</MenuItem>
                        <MenuItem value="GA">Georgia</MenuItem>
                        <MenuItem value="HI">Hawaii</MenuItem>
                        <MenuItem value="ID">Idaho</MenuItem>
                        <MenuItem value="IL">Illinois</MenuItem>
                        <MenuItem value="IN">Indiana</MenuItem>
                        <MenuItem value="IA">Iowa</MenuItem>
                        <MenuItem value="KS">Kansas</MenuItem>
                        <MenuItem value="KY">Kentucky</MenuItem>
                        <MenuItem value="LA">Louisiana</MenuItem>
                        <MenuItem value="ME">Maine</MenuItem>
                        <MenuItem value="MD">Maryland</MenuItem>
                        <MenuItem value="MA">Massachusetts</MenuItem>
                        <MenuItem value="MI">Michigan</MenuItem>
                        <MenuItem value="MN">Minnesota</MenuItem>
                        <MenuItem value="MS">Mississippi</MenuItem>
                        <MenuItem value="MO">Missouri</MenuItem>
                        <MenuItem value="MT">Montana</MenuItem>
                        <MenuItem value="NE">Nebraska</MenuItem>
                        <MenuItem value="NV">Nevada</MenuItem>
                        <MenuItem value="NH">New Hampshire</MenuItem>
                        <MenuItem value="NJ">New Jersey</MenuItem>
                        <MenuItem value="NM">New Mexico</MenuItem>
                        <MenuItem value="NY">New York</MenuItem>
                        <MenuItem value="NC">North Carolina</MenuItem>
                        <MenuItem value="ND">North Dakota</MenuItem>
                        <MenuItem value="OH">Ohio</MenuItem>
                        <MenuItem value="OK">Oklahoma</MenuItem>
                        <MenuItem value="OR">Oregon</MenuItem>
                        <MenuItem value="PA">Pennsylvania</MenuItem>
                        <MenuItem value="RI">Rhode Island</MenuItem>
                        <MenuItem value="SC">South Carolina</MenuItem>
                        <MenuItem value="SD">South Dakota</MenuItem>
                        <MenuItem value="TN">Tennessee</MenuItem>
                        <MenuItem value="TX">Texas</MenuItem>
                        <MenuItem value="UT">Utah</MenuItem>
                        <MenuItem value="VT">Vermont</MenuItem>
                        <MenuItem value="VA">Virginia</MenuItem>
                        <MenuItem value="WA">Washington</MenuItem>
                        <MenuItem value="WV">West Virginia</MenuItem>
                        <MenuItem value="WI">Wisconsin</MenuItem>
                        <MenuItem value="WY">Wyoming</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => searchClub()}
                    >
                      Find
                    </Button>
                  </Grid2>
                  <Grid2>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setShowCourseLookup(false)}
                    >
                      Close
                    </Button>
                  </Grid2>
                  <Grid2
                    className="flex justify-center"
                    size={{ md: 12, sm: 12 }}
                  >
                    {isLoading ? (
                      <div className="text-black">Loading Courses!!!</div>
                    ) : (
                      <DataGrid
                        rows={clubList}
                        columns={[
                          {
                            field: "id",
                            headerName: "",
                            sortable: false,
                            filterable: false,
                            width: 110,
                            renderCell: (params) => (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  await selectClub(params.row);
                                }}
                              >
                                Select
                              </Button>
                            ),
                          },
                          {
                            field: "clubName",
                            headerName: "Golf Club",
                            width: 300,
                          },
                          { field: "city", headerName: "City", width: 200 },
                          { field: "state", headerName: "State" },
                        ]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pagination // Enables pagination controls
                        sx={{
                          boxShadow: 1,
                          border: 1,
                          borderColor: "#000000",
                          "& .MuiDataGrid-cell:hover": {
                            color: "#a2a2a2",
                          },
                          "& .MuiDataGrid-container--top": {
                            background: "#2E4706 !important",
                          },
                          "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders *":
                            {
                              background: "#2E4706", // Dark green background
                              color: "#FFFFFF", // Ensuring text color is white
                            },
                        }}
                      />
                    )}
                  </Grid2>
                  <Grid2
                    className="flex justify-center"
                    size={{ md: 12, sm: 12 }}
                  >
                    {showCourseGrid ? (
                      <DataGrid
                        rows={selectedClub?.courses}
                        columns={[
                          {
                            field: "id",
                            headerName: "",
                            sortable: false,
                            filterable: false,
                            width: 110,
                            renderCell: (params) => (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  selectCourse(params.row);
                                }}
                              >
                                Select
                              </Button>
                            ),
                          },
                          {
                            field: "courseName",
                            headerName: "Course",
                            width: 300,
                          },
                          {
                            field: "numOfHoles",
                            headerName: "# of Holes",
                            width: 200,
                          },
                        ]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pagination // Enables pagination controls
                        sx={{
                          boxShadow: 1,
                          border: 1,
                          borderColor: "#000000",
                          "& .MuiDataGrid-cell:hover": {
                            color: "#a2a2a2",
                          },
                          "& .MuiDataGrid-container--top": {
                            background: "#2E4706 !important",
                          },
                          "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders *":
                            {
                              background: "#2E4706", // Dark green background
                              color: "#FFFFFF", // Ensuring text color is white
                            },
                        }}
                      />
                    ) : (
                      false
                    )}
                  </Grid2>
                  <Grid2
                    className="flex justify-center"
                    size={{ md: 12, sm: 12 }}
                  >
                    {showTeeBoxGrid ? (
                      <DataGrid
                        rows={teeBoxList}
                        columns={[
                          {
                            field: "id",
                            headerName: "",
                            sortable: false,
                            filterable: false,
                            width: 110,
                            renderCell: (params) => (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  selectTeeBox(params.row);
                                }}
                              >
                                Select
                              </Button>
                            ),
                          },
                          {
                            field: "teeBoxColor",
                            headerName: "Tee Box",
                            width: 200,
                          },
                          {
                            field: "par",
                            headerName: "Par",
                            width: 200,
                          },
                          {
                            field: "yardage",
                            headerName: "Yardage",
                            width: 200,
                          },
                        ]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pagination // Enables pagination controls
                        sx={{
                          boxShadow: 1,
                          border: 1,
                          borderColor: "#000000",
                          "& .MuiDataGrid-cell:hover": {
                            color: "#a2a2a2",
                          },
                          "& .MuiDataGrid-container--top": {
                            background: "#2E4706 !important",
                          },
                          "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders *":
                            {
                              background: "#2E4706", // Dark green background
                              color: "#FFFFFF", // Ensuring text color is white
                            },
                        }}
                      />
                    ) : (
                      false
                    )}
                  </Grid2>
                </Grid2>
              </Container>
            </Box>
          </Modal>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default ScrambleForm;
