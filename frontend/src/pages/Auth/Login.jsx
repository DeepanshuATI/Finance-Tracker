import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from "../../components/inputs/input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      console.log("Login Response:", response);

      const { accessToken, user } = response.data.data;

      if (accessToken) {
        localStorage.setItem("token", accessToken); 
        updateUser(user); 
        navigate("/dashboard");
      } else {
        throw new Error("Login failed: Token not received.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      if (error.response) {
        setError(error.response.data.message || "An unexpected error occurred.");
      } else if (error.code === "ERR_NETWORK") {
        setError("Network error: Unable to connect to the server. Please try again later.");
      } else {
        setError("Something went wrong! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back Boss</h3>
        <p className=''>Let’s restart your process</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter Your Email"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your Password"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type="submit" className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Register?{' '}
            <Link className="font-medium text-primary underline" to='/signup'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
