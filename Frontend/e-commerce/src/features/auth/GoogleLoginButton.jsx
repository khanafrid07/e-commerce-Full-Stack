import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../../utils/notify";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (googleToken) => {
    try {
      console.log("Google token:", googleToken);

      await dispatch(loginWithGoogle(googleToken)).unwrap();

      notifySuccess("Login successful 🚀");
      navigate("/");
    } catch (err) {
      notifyError(err || "Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const googleToken = credentialResponse?.credential;

        if (!googleToken) {
          notifyError("Google login failed");
          return;
        }

        handleSuccess(googleToken);
      }}
      onError={() => {
        notifyError("Google login failed");
      }}
    />
  );
};

export default GoogleLoginButton;