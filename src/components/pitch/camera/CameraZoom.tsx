// components/CameraZoom.tsx
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Vector3 } from "three";
import { RootState } from "@/lib/store";
import { clearCameraTarget } from "@/lib/features/CameraFocusSlice";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export function CameraZoom({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }){
  const camera = useThree((state) => state.camera);
  const dispatch = useDispatch();
  const target = useSelector((state: RootState) => state.camera.target);

  const posVec = useRef(new Vector3());
  const lookVec = useRef(new Vector3());

  useFrame(() => {
    if (!target) return;

    // Smooth move to target position
    posVec.current.set(...target.position);
    camera.position.lerp(posVec.current, 0.08); // ✨ lower for smoother motion

    // Smoothly update the camera direction
    lookVec.current.set(...target.lookAt);
    camera.lookAt(...lookVec.current.toArray());

           setTimeout(()=>{
            controlsRef.current?.target.set(...target.lookAt);
    controlsRef.current?.update(); // Must call this
    dispatch(clearCameraTarget());
           },500)
 
  });

  return null;
}
