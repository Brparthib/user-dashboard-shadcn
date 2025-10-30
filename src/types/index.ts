import type { LucideIcon } from "lucide-react";

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
  modalOpen: boolean;
  alertOpen: boolean;
  userData: TUser[];
  selectedUser: TUser;
  dob: string;
  gender: string;
  designation: string;
  skills: string[];
  uploadedImage: File | null;
  imagePreview: string;
  formType: string;
  loading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: "SET_MODAL_OPEN"; payload: boolean }
  | { type: "SET_ALERT_OPEN"; payload: boolean }
  | { type: "SET_USER_DATA"; payload: TUser[] }
  | { type: "SET_SELECTED_USER"; payload: TUser }
  | { type: "SET_DOB"; payload: string }
  | { type: "SET_GENDER"; payload: string }
  | { type: "SET_DESIGNATION"; payload: string }
  | { type: "SET_SKILLS"; payload: string[] }
  | { type: "SET_UPLOADED_IMAGE"; payload: File }
  | { type: "SET_IMAGE_PREVIEW"; payload: string }
  | { type: "SET_FORM_TYPE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET_FORM" };

export type TSidebarItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: TSidebarItem[];
  component?: React.ComponentType;
};

export type TSidebarItems = TSidebarItem[];
