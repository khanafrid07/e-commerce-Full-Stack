import GoogleLoginButton from "./GoogleLoginButton";
export default function LoginForm({ email, setEmail, password, setPassword, loading, error, handleSubmit }) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-3 bg-white rounded w-[22rem] p-6 shadow-lg">
          <h2>Welcome To Shop</h2>
          <p>Shop Smart & Shop Easy</p>

          <input
            className="input border border-gray-400 w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email or username"
            required
          />

          <input
            className="input border border-gray-400 w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />

          <button type="submit" className="btn btn-primary w-1/2">
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <span className="text-sm border-b border-black">Or Login with</span>

          <div className="space-x-4">
            <GoogleLoginButton/>

           
            
            <button type="button" className="btn btn-warning">Facebook</button>
          </div>

          <span>Don’t have an account? <a href="#">Signup</a></span>
        </div>
      </form>
    );
  }
