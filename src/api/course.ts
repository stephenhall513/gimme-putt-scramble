import { Club } from "@/types/Club";
import { ClubSearch } from "@/types/ClubSearch";
import { Course } from "@/types/Course";
import { CourseSearch } from "@/types/CourseSearch";
import { TeeBox } from "@/types/TeeBox";
import axios from "axios";

export const SearchClubs = async (data: ClubSearch) => {
  try {
    const response = await axios.post<Club[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/Course/SearchClubs`,
      data
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API responded with:", error.response.data);
    } else {
      console.error("Error making API request:", error);
    }
    throw error; // Rethrow after logging to handle it further up the call stack or to let it fail loudly.
  }
};

export const SearchCourses = async (data: CourseSearch) => {
  try {
    const response = await axios.post<Course[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/Course/SearchCourses`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API responded with:", error.response.data);
    } else {
      console.error("Error making API request:", error);
    }
    throw error; // Rethrow after logging to handle it further up the call stack or to let it fail loudly.
  }
};

export const GetTeeBoxes = async (courseId: string) => {
  try {
    const response = await axios.get<TeeBox[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/Course/GetTeeBoxes?courseId=${courseId}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API responded with:", error.response.data);
    } else {
      console.error("Error making API request:", error);
    }
    throw error; // Rethrow after logging to handle it further up the call stack or to let it fail loudly.
  }
};
