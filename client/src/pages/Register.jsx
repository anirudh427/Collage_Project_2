import React, {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    supabase,
} from "../supabase";

import "./Register.css";

function Register() {

    const [user, setUser] =
        useState({

            fullname: "",

            username: "",

            email: "",

            phonenumber: "",

            password: "",
        });

    const navigate =
        useNavigate();

    // HANDLE INPUT
    const handleChange =
        (e) => {

        setUser({

            ...user,

            [e.target.name]:
                e.target.value,
        });
    };

    // REGISTER
    const handleSubmit =
        async () => {

        // EMPTY VALIDATION
        if (

            !user.fullname ||

            !user.username ||

            !user.email ||

            !user.phonenumber ||

            !user.password
        ) {

            alert(
                "All fields are required"
            );

            return;
        }

        // USERNAME VALIDATION
        if (
            user.username.length < 4
        ) {

            alert(
                "Username must contain minimum 4 characters"
            );

            return;
        }

        // EMAIL VALIDATION
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailPattern.test(
                user.email
            )
        ) {

            alert(
                "Enter valid email"
            );

            return;
        }

        // PHONE VALIDATION
        const phonePattern =
            /^[0-9]{10}$/;

        if (
            !phonePattern.test(
                user.phonenumber
            )
        ) {

            alert(
                "Phone number must be 10 digits"
            );

            return;
        }

        // PASSWORD VALIDATION
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (
            !passwordPattern.test(
                user.password
            )
        ) {

            alert(
                "Password must contain minimum 6 characters, one uppercase, one lowercase and one number"
            );

            return;
        }

        // CHECK USER EXISTS
        const {
            data: existingUsers,
            error: fetchError,
        } = await supabase

            .from("users")

            .select("*")

            .eq(
                "email",
                user.email
            );

        if (fetchError) {

            console.log(
                fetchError
            );

            alert(
                "Something went wrong"
            );

            return;
        }

        if (
            existingUsers.length > 0
        ) {

            alert(
                "User already registered"
            );

            return;
        }

        // SAVE USER
        const { error } =
            await supabase

                .from("users")

                .insert([

                    {
                        username:
                            user.username,

                        name:
                            user.fullname,

                        email:
                            user.email,

                        number:
                            user.phonenumber,

                        password:
                            user.password,
                    },
                ]);

        if (error) {

            console.log(error);

            alert(
                "Registration Failed"
            );

        } else {

            alert(
                "Registration Successful "
            );

            navigate("/login");
        }
    };

    return (

        <div className="register-page">

            <div className="register-box">

                <h1 className="register-heading">
                    Register
                </h1>

                <input
                    type="text"

                    name="fullname"

                    placeholder="Enter your full name"

                    onChange={handleChange}

                    className="register-input"
                />

                <input
                    type="text"

                    name="username"

                    placeholder="Enter username"

                    onChange={handleChange}

                    className="register-input"
                />

                <input
                    type="email"

                    name="email"

                    placeholder="Enter email"

                    onChange={handleChange}

                    className="register-input"
                />

                <input
                    type="text"

                    name="phonenumber"

                    placeholder="Enter phone number"

                    onChange={handleChange}

                    className="register-input"
                />

                <input
                    type="password"

                    name="password"

                    placeholder="Enter password"

                    onChange={handleChange}

                    className="register-input"
                />

                <button
                    onClick={
                        handleSubmit
                    }

                    className="register-btn"
                >
                    Register
                </button>

                <p className="login-text">

                    Already have an account?

                    <Link
                        to="/login"

                        className="login-link"
                    >
                        Login
                    </Link>

                </p>

                <Link
                    to="/"

                    className="home-link-register"
                >
                    Back to Home
                </Link>

            </div>

        </div>
    );
}

export default Register;