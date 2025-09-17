"use client";
import { Field, Form, Formik, useFormik } from "formik";
import toast from "react-hot-toast";
import { Button, Container, TextField } from "@mui/material";
import * as Yup from "yup";
import { CheckScrambleEmail } from "@/api/scramble";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { ScrambleTeam } from "@/types/Team";
import ScrambleTeamsSelect from "@/components/ScrambleTeamsSelect/ScrambleTeamsSelect";
import { useRouter } from "next/navigation";

const CodeFormSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid Email Address")
    .required("Please enter an Email Address"),
});

const ScrambleEntry = () => {
  const router = useRouter();
  const [scrambleTeams, setScrambleTeams] = useState<ScrambleTeam[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSuccess = (data: ScrambleTeam[]) => {
    setScrambleTeams(data);

    if (data.length > 0) {
      setIsOpen(true);
    } else {
      toast.error("No Scramble Teams Found.");
    }
  };

  const onSelect = (id: string) => {
    router.push("/scramble/" + id);
  };

  return (
    <>
      <div className="justify-items-center pb-4">
        <Container maxWidth="md">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={CodeFormSchema}
            onSubmit={async (values) => {
              const response = await CheckScrambleEmail(values.email);
              console.log("Scramble teams", response);
              if (response.status == 200) {
                onSuccess(response.data);
              } else {
                toast.error("Invalid Email Address.");
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
                    Enter Email Address that Your Team is Registered With
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email Address"
                    className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-sm text-red-600 h-8 flex justify-center items-center">
                    {errors.email}
                  </div>
                )}
                {}
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
        <ScrambleTeamsSelect
          scrambleTeams={scrambleTeams ? scrambleTeams : []}
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          select={onSelect}
        />
      </div>
    </>
  );
};

export default ScrambleEntry;
