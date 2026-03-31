import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "./authSlice";

const GoogleLoginButton = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const dispatch = useDispatch();

  if (!clientId) {
    console.error("Google Client ID not found! Check your .env file.");
    return null;
  }

  const handleSuccess = (googleToken) => {
    dispatch(loginWithGoogle(googleToken)); 
  };

  return (
   
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const googleToken = credentialResponse.credential; 
          console.log("Google token:", googleToken);

          handleSuccess(googleToken);
        }}
        onError={() => console.log("Google login failed")}
      />
   
  );
};

export default GoogleLoginButton;