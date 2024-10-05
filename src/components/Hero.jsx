import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  // Video to play depending on the screen size.
  // Smaller video for mobile and larger for bigger screens which
  // happens on initialization.
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  // Handle the setting of video when screen size changes.
  // You can also use there the `react-responsive` library. (recommended.)
  const handleVideoSrc = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrc);

    // Cleanup of the event listener on re-render.
    return () => window.removeEventListener("resize", handleVideoSrc);
  }, []);

  useGSAP(() => {
    gsap.to("#heroTitle", { opacity: 1, duration: 1, delay: 1 });

    gsap.to("#cta", { opacity: 1, y: -50, delay: 1.5 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      {
        // The title and the video section
      }
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="heroTitle" className="hero-title">
          iPhone 15 Pro
        </p>

        {
          // Video playing on the hero section
        }
        <div className="md:w-10/12 w-9/12">
          <video
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy Me
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
