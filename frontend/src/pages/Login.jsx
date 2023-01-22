import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "../services/authService";
import useAuth from "../hooks/useAuth";
import "../styles/register-login.css";

// const USERNAME_REGEX = /^[a-zA-Z_]{5,15}$/;
// const PASS_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~|_@-]).{6,20}$/;

const Login = () => {
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const usernameRef = useRef();
	const errorRef = useRef();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		usernameRef.current.focus();
	}, []);

	useEffect(() => {
		setErrorMsg("");
	}, [username, password]);

	const handleSubmit = e => {
		e.preventDefault();

		const user = {
			username,
			password
		};

		authService
			.loginUser(user)
			.then(response => {
				console.log(response.data);

				setUsername(response.data.username);
				setPassword(response.data.password);
				const accessToken = response?.data?.accessToken;
				const roles = response?.data?.roles;

				setAuth({ username, password, roles, accessToken });

				setUsername("");
				setPassword("");
				navigate(from, { replace: true });
			})
			.catch(error => {
				console.error("Login failed", error);
				setErrorMsg("Login failed");
				errorRef.current.focus();
			});
	};

	return (
		<div className="login-container">
			<section className="login-section">
				<p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"}>
					{errorMsg}
				</p>
				<h1>Sign in</h1>
				<form className="login-form" onSubmit={handleSubmit}>
					<label htmlFor="username" className="username-label">
						Username:
					</label>
					<input
						className="username-input"
						type="text"
						id="username"
						ref={usernameRef}
						autoComplete="off"
						onChange={e => setUsername(e.target.value)}
						value={username}
						required
					/>

					<label htmlFor="password" className="password-label">
						Password:
					</label>
					<input
						className="password-input"
						type="password"
						id="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
						required
					/>

					<button disabled={!username || !password ? true : false}>Sign In</button>
				</form>
				<p>
					Need an account?
					<br />
					<span className="line">
						<Link to={"/register"}>Sign Up</Link>
					</span>
				</p>
			</section>
		</div>
	);
};

export default Login;
