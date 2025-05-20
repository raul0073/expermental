// features/CameraFocusSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CameraTarget {
  position: [number, number, number]; // target camera position
  lookAt: [number, number, number];   // what the camera should look at
}

interface CameraFocusState {
  target: CameraTarget | null;
}

const initialState: CameraFocusState = {
  target: null,
};

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setCameraTarget: (state, action: PayloadAction<CameraTarget>) => {
      state.target = action.payload;
    },
    clearCameraTarget: (state) => {
      state.target = null;
    },
  },
});

export const { setCameraTarget, clearCameraTarget } = cameraSlice.actions;
export default cameraSlice.reducer;
