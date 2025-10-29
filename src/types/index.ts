import { designations } from "@/utils/constant";
export type TUser = {
  id?: number;
  name: string;
  email: string;
  dob: string;
  gender: string;
  designation: string;
  bio: string;
  skills: string[];
  image: string;
};

export type Tdesignations = {
  value: string;
};

export interface AppState {
  dob: string;
  gender: string;
  designation: string;
  skills: string[];
  uploadedImage: File | null;
  imagePreview: string;
  loading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: "SET_DOB"; payload: string }
  | { type: "SET_GENDER"; payload: string }
  | { type: "SET_DESIGNATION"; payload: string }
  | { type: "SET_SKILLS"; payload: string[] }
  | { type: "SET_UPLOADED_IMAGE"; payload: File }
  | { type: "SET_IMAGE_PREVIEW"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET_FORM" };
