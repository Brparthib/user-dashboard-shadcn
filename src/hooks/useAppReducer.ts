import { appReducer, initialState } from "@/utils/reducer";
import { useReducer } from "react";

export function useAppReducer() {
  const [state, dispatch] = useReducer(appReducer, initialState);

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

  return {
    state,
    actions: {
      setDob,
      setGender,
      setDesignation,
      setSkills,
      setUploadedImage,
      setImagePreview,
      setLoading,
      setError,
      resetForm,
      handleImageUpload,
    },
  };
}
