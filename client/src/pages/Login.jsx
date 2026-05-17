import React, {
    useState,
} from "react";

import "./Login.css";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    supabase,
} from "../supabase";

function Login() {

    const [data, setData] =
        useState({

            username: "",

            password: "",
        });

    const navigate =
        useNavigate();

    // HANDLE INPUT
    const handleChange =
        (e) => {

        setData({

            ...data,

            [e.target.name]:
                e.target.value,
        });
    };

    // LOGIN
    const handleLogin =
        async () => {

        // ADMIN DETAILS
        let adminusername =
            "the_howling_online_store";

        let adminpassword =
            "myOnlinestore@2006";

        // EMPTY VALIDATION
        if (
            !data.username ||
            !data.password
        ) {

            alert(
                "Fill all fields"
            );

            return;
        }

        // USERNAME VALIDATION
        if (
            data.username.length < 4
        ) {

            alert(
                "Username must contain minimum 4 characters"
            );

            return;
        }

        // PASSWORD VALIDATION
        if (
            data.password.length < 6
        ) {

            alert(
                "Password must contain minimum 6 characters"
            );

            return;
        }

        // ADMIN LOGIN
        if (

            data.username ===
            adminusername

            &&

            data.password ===
            adminpassword
        ) {

            localStorage.setItem(
                "auth",
                "true"
            );

            localStorage.setItem(
                "currentuser",
                "admin"
            );

            alert(
                "Admin login successful 🔥"
            );

            navigate("/admin");

            return;
        }

        // FIND USER IN DATABASE
        const {
            data: users,
            error,
        } = await supabase

            .from("users")

            .select("*")

            .eq(
                "username",
                data.username
            )

            .eq(
                "password",
                data.password
            );

        // DATABASE ERROR
        if (error) {

            console.log(error);

            alert(
                "Login Failed"
            );

            return;
        }

        // USER EXISTS
        if (
            users &&
            users.length > 0
        ) {

            localStorage.setItem(
                "auth",
                "true"
            );

            localStorage.setItem(

                "currentuser",

                JSON.stringify(
                    users[0]
                )
            );

            alert(
                "Login successful 🔥"
            );

            navigate("/home");

        } else {

            alert(
                "Invalid username or password"
            );
        }
    };

    return (

        <div className="login-page">

            <div className="login-box">

                <h1 className="login-heading">
                    Login
                </h1>

                <input
                    type="text"

                    name="username"

                    placeholder="Enter username"

                    onChange={
                        handleChange
                    }

                    className="login-input"
                />

                <input
                    type="password"

                    name="password"

                    placeholder="Enter password"

                    onChange={
                        handleChange
                    }

                    className="login-input"
                />

                <button
                    onClick={
                        handleLogin
                    }

                    className="login-btn"
                >
                    Login
                </button>

                <p className="register-text">

                    Don't have an account?

                    <Link
                        to="/register"

                        className="register-link"
                    >
                        Register
                    </Link>

                </p>

                <Link
                    to="/home"

                    className="home-link"
                >
                    Back to Home
                </Link>

            </div>

        </div>
    );
}

export default Login;