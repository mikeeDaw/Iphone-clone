import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";
import ModelView from "./ModelView";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { models, sizes } from "../constants";
import { animateGsapTimeline } from "../utils/animations";

const Model = () => {
  // What size of the model is being viewed
  const [size, setSize] = useState("small");
  // The current model details
  const [model, setModel] = useState({
    id: 1,
    title: "Iphone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    // The texture of the phone
    img: yellowImg,
  });

  // Animate the Heading text
  useGSAP(() => {
    gsap.to("#heading", { opacity: 1, y: 0 });
  }, []);

  // Phone switching sizes & animation
  const tl = gsap.timeline();
  useEffect(() => {
    if (size === "large") {
      // Params: timeline, modelRef, model rotation, animate from ID, animate to ID, animation properties.
      animateGsapTimeline(tl, small, smRotate, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    } else {
      animateGsapTimeline(tl, large, lgRotate, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  // Camera control for the model view
  const cameraControlSm = useRef();
  const cameraControlLg = useRef();
  // Ref for the models
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());
  // Rotation value of models
  const [smRotate, setSmRotate] = useState(0);
  const [lgRotate, setLgRotate] = useState(0);

  return (
    <section className="common-padding">
      <div className="screen-max-w">
        <h1 className="section-heading" id="heading">
          Take a closer look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {
              // Model View for the Small Phone
            }
            <ModelView
              index={1}
              groupRef={small}
              gsapType={"view1"}
              controlRef={cameraControlSm}
              setRotation={setSmRotate}
              item={model}
              size={size}
            />
            {
              // Model for the larger phone
            }
            <ModelView
              index={2}
              groupRef={large}
              gsapType={"view2"}
              controlRef={cameraControlLg}
              setRotation={setLgRotate}
              item={model}
              size={size}
            />
            {}
            <Canvas
              className="w-full h-full"
              style={{ position: "fixed", inset: 0, overflow: "hidden" }}
              // eventSource - specifies which DOM Element should be the source of
              //               events (mouse clicks, touch, ...) for the 3D Scene.
              //             - default is on the <Canvas> itself.
              eventSource={document.getElementById("root")}
            >
              {
                // <View> - define a specific view inside the canvas.
                //        - allows to split the canvas into multiple regions, each showing
                //          a different perspective or scene
                //        - can edit the properties of space taken (width, height, ...)
                //        - allows to mix traditional HTML and 3D Scenes.
                //        - 'View' is an unstyled HTML DOM element (by default a div, and it
                //           takes the same properties as one)
                //
                // <View.Port> - used to connect the <View> components to the Canvas and
                //               output them.
                //
                // NOTE: Using `View`s, It is advisable to re-connect the event system to a parent
                //       that contains both the CANVAS and the HTML content. ('eventSource' prop)
                //         - It ensures that both are accessible/selectable and even allows you
                //           to mount controls or other deeper integrations into your view.
              }
              <View.Port></View.Port>
            </Canvas>
          </div>

          {
            // Model Name and the Colors control.
          }
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, idx) => (
                  <li
                    key={idx}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              {
                // Button for the size
              }
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
