"use client";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GetGolferByToken, UpdatePassword } from "@/api/account";
import { ChangePassword } from "@/types/Account";

const ResetPasswordForm = ({ golferId }: { golferId: string | null }) => {
  const router = useRouter();
  return (
    <>
      <div className="py-[50px] md:py-[80px] lg:py-[100px] xl:py-[120px]">
        <div className="container mx-auto max-w-[700px]">
          <div className="space-y-[15px] mb-[20px] max-w-[450px] mx-auto text-center">
            <h2 className="font-bold text-[25px] md:text-[35px] lg:text-[40px] leading-none">
              Reset Your Password
            </h2>
            <p>Enter your new Password</p>
          </div>
          <div className="bg-[#F8F6F5] rounded-[20px] p-[30px] sm:p-[55px]">
            <Formik
              initialValues={{
                newPassword: "",
              }}
              onSubmit={async (values) => {
                if (golferId) {
                  const golferResponse = await GetGolferByToken(
                    golferId.toString()
                  );
                  if (golferResponse.status == 200) {
                    const golferId = golferResponse.data;

                    const changePassword: ChangePassword = {
                      newPassword: values.newPassword,
                      golferId: golferId,
                    };

                    const response = await UpdatePassword(changePassword);

                    if (response.status == 200) {
                      toast.success("Password Updated!");
                      router.push("/login");
                    }
                  }
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-[25px]">
                  <div>
                    <label
                      htmlFor="email"
                      className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
                    >
                      New Password
                    </label>
                    <Field
                      name="newPassword"
                      type="password"
                      placeholder="Enter New Password"
                      className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
                    />
                    {errors.newPassword && touched.newPassword ? (
                      <div className="text-[red]">{errors.newPassword}</div>
                    ) : null}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="py-[15px] px-[30px] block w-full rounded-[6px] bg-primary-color text-white font-semibold text-[16px] md:text-[18px] transition duration-500 ease-in-out hover:bg-black-color"
                    >
                      Update Password
                    </button>
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

export default ResetPasswordForm;
