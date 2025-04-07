import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { Button, Container } from "@mui/material";
import Link from "next/link";

const InfoPage = () => {
  return (
    <>
      <div>
        <SiteHeader />
        <Container className="bg-[#F8F6F5] rounded-md p-4">
          <div
            className="text-center text-xl pb-6"
            style={{ fontFamily: "Russo One" }}
          >
            Looking to Host a Golf Scramble? Look No Further!
          </div>
          <div className="text-center pb-6">
            <Link
              href="https://gimmeputtgolf.com/signup"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="contained"
                color="primary"
                title="Get Started Now!"
                size="large"
              >
                Get Started Today!
              </Button>
            </Link>
          </div>
          <div>
            Are you planning to host a golf scramble but dreading the hassle of
            organization? Gimme Putt Golf is here to simplify your life. This
            innovative app is designed specifically for golf enthusiasts who
            want to manage golf scrambles without the headache. From
            registration to scoring, Gimme Putt Golf covers all bases, ensuring
            a seamless and enjoyable experience for both organizers and
            participants.
          </div>
          <div
            className="text-lg pb-4 pt-4"
            style={{ fontFamily: "Russo One" }}
          >
            Effortless Organization
          </div>
          <div>
            Gimme Putt Golf streamlines the entire process of setting up and
            managing a golf scramble. With its user-friendly interface, you can
            quickly create events, set up teams, and manage registrations in
            just a few taps. The app handles participant details efficiently,
            allowing you to focus more on the game and less on the paperwork.
          </div>
          <div
            className="text-lg pb-4 pt-4"
            style={{ fontFamily: "Russo One" }}
          >
            Real-Time Scoring
          </div>
          <div>
            Forget about the manual tallying of scores. Gimme Putt Golf offers a
            real-time scoring system that updates instantly as the game
            progresses. Participants can also view live leaderboards on their
            devices, adding excitement and a competitive edge to the scramble.
          </div>
          <div
            className="text-lg pb-4 pt-4"
            style={{ fontFamily: "Russo One" }}
          >
            Enhanced Communication
          </div>
          <div>
            Communication is key in any event, and Gimme Putt Golf ensures that
            you&apos;re always connected. The app provides built-in messaging
            features that allow you to send updates, changes, and announcements
            directly to participants&apos; phones. Whether it&apos;s a change in
            tee time or a weather update, your message gets through instantly,
            keeping everyone informed and engaged.
          </div>
          <div
            className="text-lg pb-4 pt-4"
            style={{ fontFamily: "Russo One" }}
          >
            Post-Event Features
          </div>
          <div>
            After the scramble, the app continues to serve. Gimme Putt Golf
            provides detailed analytics and reports that help you understand
            participant engagement and event success. You can also use the
            platform to share results and photos, keeping the community active
            and encouraging future participation.
          </div>
          <div
            className="text-lg pb-4 pt-4"
            style={{ fontFamily: "Russo One" }}
          >
            User-Friendly Experience
          </div>
          <div className="pb-4">
            Designed with golfers in mind, Gimme Putt Golf boasts an intuitive
            layout that makes navigation a breeze. Whether you&apos;re
            tech-savvy or not, you&apos;ll find managing your golf scramble
            through this app straightforward and hassle-free.
          </div>
          <div>
            Gimme Putt Golf is more than just an app—it&apos;s your partner in
            organizing memorable golf scrambles. It&apos;s time to elevate your
            golf events with efficiency and flair, making every scramble a hit.
            Try Gimme Putt Golf today and discover how easy and enjoyable
            hosting a golf scramble can be!
          </div>
          <div className="text-center pt-6">
            <Link href="https://gimmeputtgolf.com/signup">
              <Button
                variant="contained"
                color="primary"
                title="Get Started Now!"
                size="large"
              >
                Get Started Today!
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default InfoPage;
