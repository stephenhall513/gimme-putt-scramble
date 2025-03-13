import type { Metadata } from "next";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-black flex flex-col items-center">
        <div className="text-white text-lg" style={{ fontFamily: "Russo One" }}>
          Powered By
        </div>
        <div className="flex justify-center items-center">
          {/* <Image
            src="/images/GimmePuttIconSquare.png"
            alt="Gimme Putt Golf"
            width={75}
            height={75}
          /> */}
          <Image
            src="/images/GimmePuttLogo2.png"
            alt="Gimme Putt Golf"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
