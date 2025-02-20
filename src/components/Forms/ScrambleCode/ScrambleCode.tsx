"use client";
import { Field, Form, Formik, useFormik } from "formik";
import toast from "react-hot-toast";
import { Button, Container, TextField } from "@mui/material";
import * as Yup from "yup";
import { CheckScrambleCode } from "@/api/scramble";
import { setCookie } from "cookies-next";

const CodeFormSchema = Yup.object({
  code: Yup.string().required("You must enter a Event Code"),
});

const ScrambleCode = ({ onSuccess }: any) => {
  return (
    <>
      <div className="justify-items-center pb-4">
        <Container maxWidth="md">
          <Formik
            initialValues={{
              code: "",
            }}
            validationSchema={CodeFormSchema}
            onSubmit={async (values) => {
              const response = await CheckScrambleCode(values.code);
              if (response.status == 200) {
                toast.success("Event Code is Valid!");
                setCookie("scrambleId", response.data);
                onSuccess(response.data);
              } else {
                toast.error("Invalid Event Code.");
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="justify-items-center">
                <div className="pb-4">
                  <label
                    htmlFor="code"
                    className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px] text-center"
                  >
                    Enter Event Code
                  </label>
                  <Field
                    id="code"
                    name="code"
                    type="text"
                    placeholder="Event Code"
                    className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                  />
                </div>
                {errors.code && touched.code && (
                  <div className="text-sm text-red-600 h-8 flex justify-center items-center">
                    {errors.code}
                  </div>
                )}
                <div>
                  <Button
                    type="submit"
                    title="GO"
                    size="medium"
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
                    GO
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
};

export default ScrambleCode;
