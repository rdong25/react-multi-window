import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: ["James", "John", "Robert"],
    messages: {},
    inputs: {},
  },
  reducers: {
    changeInput: (state, action) => {
      let { id, value } = action.payload;
      if (id) {
        state.inputs[id] = value;
      }
    },
    sendMessage: (state, action) => {
      let { id, message } = action.payload;
      if (id) {
        if (!state.messages[id]) {
          state.messages[id] = [];
        }

        state.messages[id].push(message);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeInput, sendMessage } = inputSlice.actions;

export default inputSlice.reducer;
