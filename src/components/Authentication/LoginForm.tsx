"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Field,
  Form,
  Formik,
  FormikHelpers,
  useFormik,
  validateYupSchema,
} from "formik";

import toast, { useToaster } from "react-hot-toast";
import * as Yup from "yup";
import { getCookies, setCookie } from "cookies-next";
import { Credentials, LoginInfo } from "@/types/Account";
import { LoginApi } from "@/api/account";
import { Button } from "@mui/material";

const LoginForm = () => {
  const { push } = useRouter();

  useEffect(() => {
    const allCookies = getCookies();

    if (allCookies) {
      if (Object.keys(allCookies).length > 0) {
        push("/myevents");
      }
    }
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter email address"),
    password: Yup.string().required("Please enter your password"),
  });

  const formSubmit = async (values: any) => {
    const credentials: Credentials = {
      emailAddress: values.email,
      password: values.password,
    };

    const response = await LoginApi(credentials);
    console.log("response", response);
    if (response.status == 200) {
      toast.success("Login Successful!", { position: "top-center" });
      const golfer = response.data as LoginInfo;
      setCookie("token", golfer.token);
      setCookie("email", golfer.emailAddress);
      setCookie("golferId", golfer.id);
      setCookie("firstName", golfer.firstName);
      setCookie("lastName", golfer.lastName);
      push("/myevents");
    } else {
      toast.error("Invalid Email and/or Password!", {
        className: "text-white",
      });
    }
  };

  return (
    <>
      <div className="py-[50px] md:py-[80px] lg:py-[100px] xl:py-[120px]">
        <div className="container mx-auto max-w-[700px]">
          <div className="space-y-[15px] mb-[20px] max-w-[450px] mx-auto text-center text-white">
            <h2 className="font-bold text-[25px] md:text-[30px] lg:text-[35px] leading-none">
              Welcome Back!
            </h2>
            <p>Login to manage your event.</p>
          </div>

          <div className="bg-[#F8F6F5] rounded-[20px] p-[30px] sm:p-[55px]">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                await formSubmit(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-[25px]">
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
                      placeholder="Email Address"
                      className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
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
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-[16px] h-[16px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ml-2 text-[15px]"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-[15px]">
                      <Link
                        href="/forgot-password"
                        className="hover:text-primary-color"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      style={{
                        color: "#FFFFFF",
                      }}
                    >
                      Login Now
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
