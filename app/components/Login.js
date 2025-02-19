"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Minimum 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    const endpoint = isRegister ? "/api/register" : "/api/login";
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    alert(result.message);

    if (res.ok && !isRegister) {
      localStorage.setItem("token", result.token);
      router.push("/Transactions");
    }

    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{isRegister ? "Register" : "Login"}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegister && (
            <>
              <input {...register("name")} placeholder="Name" className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </>
          )}

          <input {...register("email")} type="email" placeholder="Email" className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input {...register("password")} type="password" placeholder="Password" className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button 
            type="submit" 
            className="bg-blue-600 text-white p-3 w-full rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-blue-500 font-semibold ml-1 hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
