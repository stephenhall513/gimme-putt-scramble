"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { RegisterAccount } from "@/api/account";
import { redirect, useRouter } from "next/navigation";
import { Registration } from "@/types/Account";
import SignupConfirmationContent from "../SignupConfirmation/SignupConfirmationContent";
import { getCookies } from "cookies-next";
import { Button } from "@mui/material";

const RegisterForm: React.FC = () => {
  const { push } = useRouter();
  const [showLogin, setShowLogin] = useState<boolean>(false);

  useEffect(() => {
    const allCookies = getCookies();
    if (allCookies) {
      if (Object.keys(allCookies).length > 0) {
        setShowLogin(true);
      }
    }
  }, []);

  const [showConfirmation, setShowConfirmaton] = useState<Boolean>(false);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
  });

  return (
    <>
      {!showLogin ? (
        <div className="py-[15px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
          <div className="container mx-auto max-w-[700px]">
            {!showConfirmation ? (
              <>
                <div className="space-y-[15px] mb-[20px] max-w-[450px] mx-auto text-center">
                  <h2
                    className="font-bold text-white text-xl leading-none"
                    style={{ fontFamily: "Russo One" }}
                  >
                    Create a Free Account Today!
                  </h2>
                  <p></p>
                </div>

                <div className="bg-[#F8F6F5] rounded-[20px] p-[30px] sm:p-[55px]">
                  <div></div>
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                      const registration: Registration = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        emailAddress: values.email,
                        password: values.password,
                      };

                      const response = await RegisterAccount(registration);
                      if (response.status == 200) {
                        setShowConfirmaton(true);
                      }
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form className="space-y-[25px]">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
                          >
                            First Name
                          </label>
                          <Field
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                          />
                          {errors.firstName && touched.firstName ? (
                            <div className="text-[red]">{errors.firstName}</div>
                          ) : null}
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
                          >
                            Last Name
                          </label>
                          <Field
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                          />
                          {errors.lastName && touched.lastName ? (
                            <div className="text-[red]">{errors.lastName}</div>
                          ) : null}
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
                          >
                            Email Address
                          </label>
                          <Field
                            name="email"
                            type="email"
                            placeholder="Email address"
                            className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                          />
                          {errors.email && touched.email ? (
                            <div className="text-[red]">{errors.email}</div>
                          ) : null}
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
                          >
                            Password
                          </label>
                          <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                          />
                          {errors.password && touched.password ? (
                            <div className="text-[red]">{errors.password}</div>
                          ) : null}
                        </div>
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
                          >
                            Confirm Password
                          </label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                          />
                          {errors.confirmPassword && touched.confirmPassword ? (
                            <div className="text-[red]">
                              {errors.confirmPassword}
                            </div>
                          ) : null}
                        </div>

                        {/* <div className="flex items-center">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-[16px] h-[16px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ml-2 text-black"
                        >
                          You accept our{" "}
                          <Link
                            href="/terms-condition"
                            className="font-medium hover:text-[#8cc63f]"
                          >
                            Terms & Condition
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy-policy"
                            className="font-medium hover:text-[#8cc63f]"
                          >
                            Privacy Policy
                          </Link>
                        </label>
                      </div> */}

                        <div>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Register Now
                          </Button>
                        </div>

                        <p className="text-black">
                          Already have an account?{" "}
                          <Link
                            href="/login"
                            className="font-medium hover:text-[#8cc63f]"
                          >
                            Login
                          </Link>
                        </p>
                      </Form>
                    )}
                  </Formik>
                </div>
              </>
            ) : (
              <SignupConfirmationContent />
            )}
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default RegisterForm;
