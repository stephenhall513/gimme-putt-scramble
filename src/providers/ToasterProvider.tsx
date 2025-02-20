"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          className: "bg-primary-color text-white",
        },
        error: {
          style: {
            background: "red",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
