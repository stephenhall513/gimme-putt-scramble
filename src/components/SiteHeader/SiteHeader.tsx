import Image from "next/image";
import Link from "next/link";

const SiteHeader = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__logo">
          <Link href="/">
            <div className="bg-black flex flex-col items-center m-6">
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
            </div>
          </Link>
        </div>
        {/* <nav className="site-header__nav">
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default SiteHeader;
// This code defines a simple site header component with a logo and navigation links.
