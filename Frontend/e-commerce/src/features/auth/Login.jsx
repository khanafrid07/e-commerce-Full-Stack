import { useState } from "react";
import { loginUser, logout } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  
  return (
    <div className="grid md:grid-cols-2 min-h-screen">

      {/* Banner */}
      <div className="relative bg-gray-400 flex items-center justify-center">
        <h1 className="text-white text-3xl">Banner Page</h1>

        {/* Mobile overlay */}
        <div className="absolute inset-0 flex items-center justify-center md:hidden">
          <LoginForm email={email} setEmail={setEmail} handleSubmit={handleSubmit} password={password} setPassword={setPassword} error={error} loading={loading

          }/>
        </div>
      </div>

      {/* Desktop form */}
      <div className="hidden md:flex justify-center items-center border p-8">
        <LoginForm email={email} setEmail={setEmail} handleSubmit={handleSubmit} password={password} setPassword={setPassword} error={error} loading={loading}/>
      </div>

    </div>
  );
}
