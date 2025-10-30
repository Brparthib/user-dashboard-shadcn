import type { TUser } from "@/types";
import { appReducer, initialState } from "@/utils/reducer";
import { useReducer, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function useAppReducer() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const setModalOpen = (open: boolean) => {
    dispatch({ type: "SET_MODAL_OPEN", payload: open });
  };

  const setAlertOpen = (open: boolean) => {
    dispatch({ type: "SET_ALERT_OPEN", payload: open });
  };

  const setUserData = (user: TUser[]) => {
    dispatch({ type: "SET_USER_DATA", payload: user });
  };

  const setSelectedUser = (user: TUser) => {
    dispatch({ type: "SET_SELECTED_USER", payload: user });
  };

  const setDob = (date: string) => {
    dispatch({ type: "SET_DOB", payload: date });
  };

  const setGender = (gender: string) => {
    dispatch({ type: "SET_GENDER", payload: gender });
  };

  const setDesignation = (designation: string) => {
    dispatch({ type: "SET_DESIGNATION", payload: designation });
  };

  const setSkills = (skills: string[]) => {
    dispatch({ type: "SET_SKILLS", payload: skills });
  };

  const setUploadedImage = (file: File) => {
    dispatch({ type: "SET_UPLOADED_IMAGE", payload: file });
  };

  const setImagePreview = (previewUrl: string) => {
    dispatch({ type: "SET_IMAGE_PREVIEW", payload: previewUrl });
  };

  const setFormType = (formType: string) => {
    dispatch({ type: "SET_FORM_TYPE", payload: formType });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    setUploadedImage(file);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const deleteUser = (user: TUser) => {
    const updatedUsers = state.userData.filter((data) => data.id !== user.id);
    dispatch({ type: "SET_USER_DATA", payload: updatedUsers });
  };

  const printUser = () => {
    reactToPrintFn();
  };

  return {
    state,
    actions: {
      setModalOpen,
      setAlertOpen,
      setUserData,
      setSelectedUser,
      setDob,
      setGender,
      setDesignation,
      setSkills,
      setUploadedImage,
      setImagePreview,
      setFormType,
      setLoading,
      setError,
      resetForm,
      handleImageUpload,
      deleteUser,
      printUser,
    },
    contentRef,
  };
}
