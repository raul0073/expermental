  import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  
  interface TableState {
     table: []
  }
  
  const initialState: TableState = {
      table: [],
  };
  
  export const tableSlice = createSlice({
      name: "table",
      initialState,
      reducers: {
         //eslint-disable-next-line
          setTable: (state, action: PayloadAction<any>) => {
              state.table = action.payload;
          },
          
      },
  });
  
  export const {
      setTable,
  } = tableSlice.actions;
  
  export default tableSlice.reducer;
  