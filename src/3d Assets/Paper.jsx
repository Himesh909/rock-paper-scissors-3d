import { forwardRef, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

let paperModel = "https://igodhackerr.github.io/assets/paper.glb";

export const Paper = forwardRef((props, ref) => {
  const paper = useRef();

  useEffect(() => {
    const selectedSkin = localStorage.getItem("selectedSkin");
    switch (selectedSkin) {
      case "neon":
        paperModel = "./models/paper2.glb";
        break;
      case "default":
        paperModel = "https://igodhackerr.github.io/assets/paper.glb";
        break;
    }
  }, [localStorage.getItem("selectedSkin")]);

  const { nodes, materials } = useGLTF(paperModel);

  useFrame((state, delta) => {
    paper.current.rotation.y += delta * 0.25;
  });

  return (
    <group {...props} ref={paper} dispose={null}>
      <mesh
        ref={ref}
        name="paper"
        castShadow
        receiveShadow
        geometry={nodes.Cube_Cube001.geometry}
        material={materials["Material.000"]}
      />
    </group>
  );
});

useGLTF.preload(paperModel);
