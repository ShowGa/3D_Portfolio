import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { Html } from "@react-three/drei";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";
// import the audio
import audio from "../assets/sakura.mp3";
import { soundoff, soundon } from "../assets/icons";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  // chagne the show div with this state
  const [currentStage, setCurrentStage] = useState(1);
  // checking wether playing the audio or not
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  // useRef for new audio and setting
  const music = useRef(new Audio(audio));
  music.current.volume = 0.4;
  music.current.loop = true;

  // make application looks good in all different kind of device
  // see screen size, modify the scale in position
  const adjustIslandForScreenSize = () => {
    let screenScale;
    let scerenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, scerenPosition, rotation];
  };

  const adjustPlaneScreenSize = () => {
    let screenScale;
    let screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.8, 1.8, 1.8];
      screenPosition = [0, -1.8, 0];
    } else {
      screenScale = [3.2, 3.2, 3.2];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneScreenSize();

  // useEffect for audio
  useEffect(() => {
    if (isPlayingMusic) {
      music.current.play();
    }

    return () => {
      music.current.pause();
    };
  }, [isPlayingMusic]);

  return (
    <section className="w-full h-screen  relative">
      <div className="absolute top-28 left-0 right-0 flex items-center justify-center z-10">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      {!isRotating && (
        <div className="absolute bottom-24 left-0 right-0 z-20 flex items-center justify-center md:bottom-16">
          <p>&#8592; Left Right &#8594;</p>
        </div>
      )}

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Bird isRotating={isRotating} />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            position={planePosition}
            scale={planeScale}
            rotation={[0, 20.3, 0]}
            isRotating={isRotating}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-4">
        <img
          src={isPlayingMusic ? soundon : soundoff}
          alt="sound trumpet"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => {
            setIsPlayingMusic(!isPlayingMusic);
          }}
        />
      </div>
    </section>
  );
};

export default Home;
