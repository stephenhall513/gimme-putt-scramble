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
  const [multiple, setMultiple] = useState<boolean>(false);

  const eventFormComplete = (eventId: string, mulitpleScrambles: boolean) => {
    setScrambleEventId(eventId);
    setMultiple(mulitpleScrambles);
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
            allowMultiple={multiple}
            onSuccess={() => scrambleFormcomplete()}
          />
        ) : (
          <Signup
            onSuccess={(id: string, mulitpleScrambles: boolean) =>
              eventFormComplete(id, mulitpleScrambles)
            }
          />
        )}
      </div>
    </>
  );
};

export default SignupPage;
