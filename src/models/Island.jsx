/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: nimzu (https://sketchfab.com/nimzuk)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907
Title: Fox's islands
*/

import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
// import the animation
import { a } from "@react-spring/three";
// import the island
import islandScene from "../assets/3d/island.glb";

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();
  // checking if the action is from keyboard
  const [keyDown, setKeyDown] = useState(false);
  const { nodes, materials } = useGLTF(islandScene);
  // get access to the render and viewport
  const { gl, viewport } = useThree();
  // get the last mouse position
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  // 衰減
  const dampingFactor = 0.95;

  // functionality for grabbing the screen
  // phone and pc mouse difference
  const handelGrabbing = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };
  const handelReleaseGrabbing = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };
  const handelMoveGrabbing = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      lastX.current = clientX;

      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // keyboard
  const handleKeyDown = (e) => {
    setIsRotating(true);
    setKeyDown(true);
    if (e.key === "ArrowLeft") {
      // if (!isRotating) setIsRotating(true);
      // islandRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (e.key === "ArrowRight") {
      // if (!isRotating) setIsRotating(true);
      // islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };
  const handleKeyUp = (e) => {
    setIsRotating(false);
    setKeyDown(false);
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") setIsRotating(false);
  };

  // put all the action with this
  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // moving by keyboard
      if (keyDown) {
        islandRef.current.rotation.y += rotationSpeed.current;
      }

      const rotation = islandRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      // to show different content of the div messages in Home.jsx
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 6.45:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.85:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 3.4:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 5.25:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handelGrabbing);
    canvas.addEventListener("pointerup", handelReleaseGrabbing);
    canvas.addEventListener("pointermove", handelMoveGrabbing);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handelGrabbing);
      canvas.removeEventListener("pointerup", handelReleaseGrabbing);
      canvas.removeEventListener("pointermove", handelMoveGrabbing);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handelGrabbing, handelReleaseGrabbing, handelMoveGrabbing]);

  return (
    <a.group {...props} ref={islandRef}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
};

export default Island;