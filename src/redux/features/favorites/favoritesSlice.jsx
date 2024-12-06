import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  favoritesItems: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      // Check if the items already exists in the favorites, if its there dont add it, else add it
      const existingItem = state.favoritesItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.favoritesItems.push(action.payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Dodato u omiljene proizvode!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        state.favoritesItems = state.favoritesItems.filter(
          (item) => item._id !== action.payload._id
        );
        Swal.fire({
          title: "Uklonjeno iz omiljenih proizvoda.",
          // text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK!",
        });
      }
    },
    clearFavorites: (state) => {
      state.favoritesItems = [];
    },
  },
});

//export actions
export const { addToFavorites, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
