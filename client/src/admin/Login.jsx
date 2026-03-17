import React, { useState } from "react";
import { loginAdmin } from "../apis/adminApi";

const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await loginAdmin(form);

            console.log(res.data);

            // Save token
            localStorage.setItem("token", res.data.token);

            // Redirect to home
            window.location.href = "/";


        } catch (err) {
            console.log(err);
            alert("Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">

            {/* Card */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-10">

                {/* Logo / Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-white text-center mb-1 tracking-tight">
                    Admin Login
                </h2>
                <p className="text-slate-400 text-sm text-center mb-8">
                    Sign in to access your dashboard
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="admin@example.com"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/40 text-sm tracking-wide"
                    >
                        Sign In
                    </button>

                </form>

                {/* Footer note */}
                <p className="text-center text-slate-600 text-xs mt-8">
                    Protected area · Authorized personnel only
                </p>

            </div>
        </div>
    );
};

export default Login;