import type { AppAction, AppState } from "@/types";

export const initialState: AppState = {
  dob: "",
  gender: "",
  designation: "",
  skills: [],
  uploadedImage: null,
  imagePreview: "",
  loading: false,
  error: null,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_DOB":
      return {
        ...state,
        dob: action.payload,
        error: null,
      };

    case "SET_GENDER":
      return {
        ...state,
        gender: action.payload,
        error: null,
      };

    case "SET_DESIGNATION":
      return {
        ...state,
        designation: action.payload,
        error: null,
      };

    case "SET_SKILLS":
      return {
        ...state,
        skills: action.payload,
        error: null,
      };

    case "SET_UPLOADED_IMAGE":
      return {
        ...state,
        uploadedImage: action.payload,
        error: null,
      };

    case "SET_IMAGE_PREVIEW":
      return {
        ...state,
        imagePreview: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}
