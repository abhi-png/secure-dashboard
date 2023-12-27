import { useFormik } from "formik";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/config/config.js"
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { userRegisterSchema } from "../../utils/validation/authSchema.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
    email: "",
    password: "",
};

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const onSubmit = async (
        values,
        actions
    ) => {
        try {
            setLoading(true);
            // debugger
            const response = await axios.post(`${BASE_URL}/api/register`, values);
            if (response.status === 200) {
                setLoading(false);
                navigate('/')
                actions.resetForm();
                return response.data;
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: userRegisterSchema,
            onSubmit,
        });
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Sign up
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?
                            <Link
                                to="/"
                                className="font-semibold text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form
                            className="mt-8"
                            onSubmit={handleSubmit}
                        >
                            <div className="space-y-5">
                                <div>
                                    <label
                                        htmlFor=""
                                        className="text-base font-medium text-gray-900"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    {errors.email && touched.email ? (
                                        <p className="text-xs text-red-500 mt-2">{errors.email}</p>
                                    ) : null}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor=""
                                            className="text-base font-medium text-gray-900"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2 relative">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <div className="absolute right-3 top-3">
                                            {showPassword ? (
                                                <Eye size={15} onClick={togglePasswordVisibility} />
                                            ) : (
                                                <EyeOff size={15} onClick={togglePasswordVisibility} />
                                            )}
                                        </div>
                                        {errors.password && touched.password ? (
                                            <p className="text-xs text-red-500 mt-2">
                                                {errors.password}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className={`inline-flex w-full items-center justify-center rounded-md ${loading ? "bg-gray-600" : "bg-black"
                                            } px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
                                    >
                                        {loading ? "Processing" : " Create Account"} <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="h-full w-full">
                    <img
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                        alt="banner"
                    />
                </div>
            </div>
        </section>
    );
}