import { use, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { googleLogin, githubLogin } from "../services/auth.services";
export default function GetStarted() {

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const user = useSelector(state => state.auth.user)

  const {handleLoginUser , handleRegisterUser} = useAuth()

  const handleSubmit = (e)=>{
    e.preventDefault()

      isLogin ? handleLoginUser({email,password}) : handleRegisterUser({name,email,password})

  }
 console.log(user)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-serif text-[#1a3a2a] mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          {isLogin
            ? "Login to manage your AI bots"
            : "Start building your AI customer support bot"}
        </p>

        {/* OAuth */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => googleLogin()}
            className="w-full border p-3 rounded-lg hover:bg-gray-100"
          >
            Continue with Google
          </button>

          <button
            onClick={() => githubLogin()}
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
          >
            Continue with GitHub
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Form */}
        <form 
        onSubmit={handleSubmit}
        className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              value={name}
              required
              onChange={(e)=>{
                setName(e.target.value)
              }}
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]"
            />
          )}

          <input
            value={email}
            required
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]"
          />

          <input
            value={password}
            required
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a2a]"
          />

          <button
            type="submit"
            className="w-full bg-[#1a3a2a] text-white p-3 rounded-lg hover:bg-[#142c21]"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-sm text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#1a3a2a] font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}