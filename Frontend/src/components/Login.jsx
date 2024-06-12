/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };
        await axios.post("http://localhost:4001/user/login", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    alert(res.data.message);
                    navigate(res.data.redirectUrl);
                    setTimeout(() => {
                        window.location.reload();
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                    });
                }
            }).catch((err) => {
                console.log(err);
                alert("Login failed. Error: " + err.response.data.message + " Please try again");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
                <h3 className="font-bold text-lg text-center">Login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mt-4 space-y-2">
                        <span>Email</span>
                        <br />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-md outline-none"
                            {...register("email", { required: true })}
                        />
                        {errors.email &&
                            <span className="text-sm text-red-500">
                                This field is required
                            </span>}
                    </div>

                    <div className="mt-4 space-y-2">
                        <span>Password</span>
                        <br />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-md outline-none"
                            {...register("password", { required: true })}
                        />
                        {errors.password &&
                            <span className="text-sm text-red-500">
                                This field is required
                            </span>}
                    </div>

                    <div className="flex justify-around mt-6">
                        <button className="bg-pink-500 text-white rounded-md px-3 py-2 hover:bg-pink-700 duration-200">
                            Login
                        </button>
                        <p>
                            Not registered?{" "}
                            <Link
                                to="/signup"
                                className="underline text-blue-500 cursor-pointer"
                            >
                                Signup
                            </Link>{" "}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
