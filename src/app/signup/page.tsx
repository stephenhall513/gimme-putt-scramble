"use client";
import LoginForm from "@/components/Authentication/LoginForm";
import RegisterForm from "@/components/Authentication/RegisterForm";
import ScrambleForm from "@/components/Forms/ScrambleForm/ScrambleForm";
import Signup from "@/components/Forms/Signup/Signup";
import {
  Button,
  Container,
  MobileStepper,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [scrambleEventId, setScrambleEventId] = useState<string>();
  // const [scrambleEventId, setScrambleEventId] = useState<string>(
  //   "4e3bccc4-114f-4fb1-d7a5-08dd4980cd04"
  // );
  const [showEventForm, setShowEventForm] = useState<boolean>(true);
  const [showScrambleForm, setShowScrambleForm] = useState<boolean>(true);

  const eventFormComplete = (eventId: string) => {
    setScrambleEventId(eventId);
    setShowEventForm(false);
    setShowScrambleForm(true);
  };

  const scrambleFormcomplete = () => {
    router.push("/myevents");
  };

  return (
    <>
      <div>
        <RegisterForm />
        {scrambleEventId ? (
          <ScrambleForm
            eventId={scrambleEventId}
            onSuccess={() => scrambleFormcomplete()}
          />
        ) : (
          <Signup onSuccess={(id: string) => eventFormComplete(id)} />
        )}
      </div>
    </>
  );
};

export default SignupPage;
