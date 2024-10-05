import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  // Ref of each video on the carousel
  const videoRef = useRef([]);
  // Container of dots on the carousel control for each video.
  const videoDivRef = useRef([]);
  // The progress of the video. (child of videoDivRef)
  const videoSpanRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  // Destructure so we can use it without using the '.' accessing notation.
  // This holds the state of the focused video on the carousel
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;
  // State to hold the metadata of the video once loaded.
  const [loadedData, setLoadedData] = useState([]);

  useGSAP(() => {
    // Use the scroll to trigger the playing of the video.

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "play none none none",
      },
      onComplete: () =>
        // Once scrolled, start playing. (The area where 'startPlay' is now 'true')
        {
          console.log("complete");
          setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
        },
    });

    // Move the videos when they are going to be played
    gsap.to(".slider", {
      // Move by -100px depending on the video playing.
      transform: `translateX(${-100 * videoId}%)`,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [isEnd, videoId]);

  // To Play or Pause the video on the carousel
  useEffect(() => {
    // Kinda still not sure about this condition's purpose tho...
    if (loadedData.length > 3) {
      // If it 'isPlaying' is toggled and now 'false', pause the vid.
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        // If it 'isPlaying' is toggled and now 'true', play the vid.
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Function to add the event of the loaded metadata and trigger the first playing of video.
  const handleLoadedMetadata = (i, e) => setLoadedData((prev) => [...prev, e]);

  useEffect(() => {
    let currentProg = 0;
    let span = videoSpanRef.current;

    // Animate the progress of the video
    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        // See 'onUpdate' vs 'ticker' below...
        onUpdate: () => {
          // Logic to do the updating of the video's progress bar.
          // Set the current video progress to this variable.
          const progress = Math.ceil(anim.progress() * 100);
          // Then compare. (Example comparison: progress = 0.02, currentProg = 0 )
          // Will not happen if both are at 0 or 100.
          if (progress != currentProg) {
            currentProg = progress;

            // Modify the container and increase the width.
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 1200 ? "10vw" : "4vw",
            });
            // Modify the progress indicator.
            gsap.to(span[videoId], {
              width: `${currentProg}%`,
              backgroundColor: "#FFFFFF",
            });
          }
        },
        onComplete: () => {
          // Once the video ends, and still playing other vids, return the dot to its
          // original size and color.
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: 12,
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // Function to update the progress of the animation to sync it with the video
      const animUpdate = () => {
        anim.progress(
          // A floating number from 0 to 1 linking the video progress to the animation progress.
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      // Condition to add or remove the syncer to the gsap 'ticker'.
      // Also affected by the 'Play/Pause' button.
      if (isPlaying) {
        // 'gsap.ticker' - allows to execute code on every tick of the animation engine's
        //                 GLOBAL internal render loop. (not on a specific running animation)
        // '.add()' - adds a callback listener and executes it on every tick.

        // "ticker" VS "onUpdate"
        // • ticker   - It fires on every frame (like requestAnimationFrame),
        //              even if there are no GSAP animations running.
        //            - INDEPENDENT of any specific GSAP animation.
        // • onUpdate - is TIED to a specific gsap animation.
        //            - fires only when the animation progresses and is tied to that
        //              specific animation’s timeline, so if the animation is paused or
        //              completed, the onUpdate callback stops firing.
        //            - Fires everytime the animation updates (on each frame of the
        //              animation’s progress)
        gsap.ticker.add(animUpdate);
      } else {
        // 'remove()' - remove the callback listener when video ends.
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  // Function for pressing the 'Pause/play/reset' button
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {
          // Individual videos div

          hightlightsSlides.map((item, idx) => (
            <div key={item.id} className="sm:pr-20 pr-10 slider">
              <div className="video-carousel_container">
                <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                  <video
                    id="video"
                    playsInline={true}
                    preload="auto"
                    muted
                    ref={(el) => {
                      videoRef.current[idx] = el;
                    }}
                    onPlay={() => {
                      setVideo((prev) => ({ ...prev, isPlaying: true }));
                    }}
                    // Event checks if it is the last video on the carousel when the vid ends.
                    onEnded={() =>
                      idx !== 3
                        ? handleProcess("video-end", idx)
                        : handleProcess("video-last")
                    }
                    // This event triggers when the metadata of the video has loaded.
                    onLoadedMetadata={(e) => handleLoadedMetadata(idx, e)}
                    // This one is just for my testing...
                    // onTimeUpdate={(e) => {
                    //   console.log(e.target.currentTime, isPlaying);
                    // }}
                    className={`${
                      item.id === 2 && "translate-x-44"
                    } pointer-events-none`}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>

                {
                  // Text on the video
                }
                <div className="absolute top-12 left-[5%] z-10">
                  {item.textLists.map((text) => (
                    <p key={text} className="md:text-2xl text-xl font-medium">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {
        // Carousel Controls
      }
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, idx) => (
            <span
              key={idx}
              ref={(el) => (videoDivRef.current[idx] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full rounded-full"
                ref={(el) => (videoSpanRef.current[idx] = el)}
              />
            </span>
          ))}
        </div>

        {
          // Pause and Play btn
        }
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => {
                    handleProcess("video-reset");
                  }
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
