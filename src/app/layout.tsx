import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { StyledRoot } from "./styledRoot";

export const metadata: Metadata = {
  title: "Gimme Putt Golf - Scrambles",
  description: "Scrambles so easy it is like a Gimme Putt",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <AppRouterCacheProvider>
          {/* <div className="bg-black flex flex-col items-center m-6">
            <div className="flex justify-center items-center pb-4">
              <Image
                src="/images/GimmePuttIconSquare.png"
                alt="Gimme Putt Golf"
                width={75}
                height={75}
              />
              <Image
                src="/images/GimmePuttLogo2.png"
                alt="Gimme Putt Golf"
                width={150}
                height={150}
              />
            </div>
          </div> */}
          <StyledRoot>{children}</StyledRoot>
        </AppRouterCacheProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
