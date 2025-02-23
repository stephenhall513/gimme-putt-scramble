// app/StyledRoot.tsx
"use client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import Image from "next/image";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppBar
          position="static"
          color="transparent"
          className="bg-black text-white"
        >
          <Toolbar>
            <div className="flex flex-row mx-auto">
              {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon color="secondary" />
            </IconButton> */}
              <div className="bg-black flex flex-col items-center mx-6 mt-0">
                <Link href="/">
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
                </Link>
              </div>
              {/* <div>
                <Button color="primary" variant="text" size="small">
                  Login
                </Button>
                <Button color="primary" variant="text" size="small">
                  Logout
                </Button>
              </div> */}
            </div>
          </Toolbar>
        </AppBar>
        <div className="bg-black flex flex-col items-center m-6">
          {/* <div className="flex justify-center items-center pb-4">
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
          </div> */}
          {children}
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
