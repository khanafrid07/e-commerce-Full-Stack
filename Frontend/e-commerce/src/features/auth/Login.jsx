import { useState } from "react";
import { loginUser, logout } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  const handleLogout=(e)=>{
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="bg-secondary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
         </button>
        {user && (
          <button className="bg-secondary" type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}
