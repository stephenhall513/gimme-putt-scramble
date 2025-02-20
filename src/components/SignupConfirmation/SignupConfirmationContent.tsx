"use client";

import Link from "next/link";

const SignupConfirmationContent = () => {
  return (
    <>
      <div className="bg-[#F8F6F5] text-center relative h-[100vh] max-h-[100vh] overflow-auto py-[50px] md:py-[60px] lg:py-[70px] xl:py-[80px]">
        <div className="container mx-auto">
          <h3 className="text-black text-[25px] lg:text-[30px] font-bold mt-[20px] mb-[15px] leading-[1.3]">
            Thank you for signing up for a Gimme Putt Golf account!
          </h3>

          <p className="text-[14px] md:text-[15px] lg:text-[16px] md:max-w-[540px] text-[#4c4c4c] leading-[1.7] ml-auto mr-auto mb-[15px] lg:mb-[18px]">
            Please check your email to verify your email address. <br />
            You will need to verify your email addres before logging into your
            account.
          </p>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] md:max-w-[540px] text-[#4c4c4c] leading-[1.7] ml-auto mr-auto mb-[15px] lg:mb-[18px]">
            {"If you didn't receive an email, please check your Junk folder"}
          </p>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] md:max-w-[540px] text-[#4c4c4c] leading-[1.7] ml-auto mr-auto mb-[15px] lg:mb-[18px]">
            <Link href={""}>
              Click Here to have the verification email resent
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupConfirmationContent;
