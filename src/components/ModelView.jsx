import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import React, { Suspense } from "react";
import Lights from "./3JS/Lights";
import Iphone from "./3JS/Iphone";

import * as THREE from "three";
import Loader from "./misc/Loader";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  camera,
  setRotation,
  size,
  item,
}) => {
  return (
    // if you put 'absolute' here, it will stack the two <View>s. Same principles
    // of 2 <divs> with both 'absolute.
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      {
        // Lights and the Custom Light
      }
      <Lights />
      <ambientLight intensity={0.2} />

      {
        // The Phone Model
      }
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        // Event when the interaction finished (user stopped orbiting the 3D Model)
        // 'getAzimuthalAngle' - returns the current horizontal rotation, in radians.
        onEnd={() => {
          console.log("Azimuth", controlRef.current.getAzimuthalAngle());
          setRotation(controlRef.current.getAzimuthalAngle());
        }}
      />
      <group
        ref={groupRef}
        name={index === 1 ? "small" : "large"}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <Iphone scale={index === 1 ? 15 : 17} item={item} size={size} />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
