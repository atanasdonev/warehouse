import React from "react";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authService from "../services/authService";
import { Link } from "react-router-dom";
import "../styles/register-login.css";

const USERNAME_REGEX = /^[a-zA-Z_]{5,15}$/;
const PASS_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~|_@-]).{6,20}$/;
const PHONE_NUMBER_REGEX = /([0-9-_ ])\w+/;
const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;!?:\s@"]+(\.[^<>()[\]\\.,;:?!\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {
	const usernameRef = useRef();
	const errRef = useRef();

	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [phoneNumber, setPhoneNumber] = useState("");
	const [validPhoneNumber, setValidPhoneNumber] = useState(false);
	const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		usernameRef.current.focus();
	}, []);

	useEffect(() => {
		setValidUsername(USERNAME_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PASS_REGEX.test(password));
		setValidMatch(password === matchPassword);
	}, [password, matchPassword]);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPhoneNumber(PHONE_NUMBER_REGEX.test(phoneNumber));
	}, [phoneNumber]);

	useEffect(() => {
		setErrMsg("");
	}, [username, password, matchPassword, email, phoneNumber]);

	const handleSubmit = e => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = USERNAME_REGEX.test(username);
		const v2 = PASS_REGEX.test(password);
		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			setSuccess("true");
			return;
		}

		const user = {
			username,
			email,
			password,
			phoneNumber,
			role: ["user"]
		};

		console.log(user);

		authService
			.registerUser(user)
			.then(response => {
				//clear state and controlled inputs
				setUsername("");
				setPassword("");
				setMatchPassword("");
				setEmail("");
				setPhoneNumber("");
				setSuccess(true);
			})
			.catch(error => {
				console.error("Registration failed", error);
				setErrMsg("Registration Failed");
				errRef.current.focus();
			});
	};

	return (
		<div className="register-container">
			{success ? (
				<section className="register-section">
					<h1>Success!</h1>
					<p>
						<Link to={"/"}>Sign In</Link>
					</p>
				</section>
			) : (
				<section className="register-section">
					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
						{errMsg}
					</p>
					<h1>Register</h1>
					<form className="register-form" onSubmit={handleSubmit}>
						<label htmlFor="username" className="username-label">
							Username:
							<FontAwesomeIcon
								icon={faCheck}
								className={validUsername ? "valid" : "hide"}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validUsername || !username ? "hide" : "invalid"}
							/>
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
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<p
							id="uidnote"
							className={
								userFocus && username && !validUsername ? "instructions" : "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							5 to 15 characters.
							<br />
							Uppercase letters, lowercase letters and underscores allowed.
						</p>

						<label htmlFor="password" className="password-label">
							Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={validPassword ? "valid" : "hide"}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validPassword || !password ? "hide" : "invalid"}
							/>
						</label>
						<input
							className="password-input"
							type="password"
							id="password"
							onChange={e => setPassword(e.target.value)}
							value={password}
							required
							onFocus={() => setPasswordFocus(true)}
							onBlur={() => setPasswordFocus(false)}
						/>
						<p
							id="passwordnote"
							className={passwordFocus && !validPassword ? "instructions" : "offscreen"}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							6 to 20 characters.
							<br />
							Must include uppercase and lowercase letters, a number and a special
							character.
							<br />
							Allowed special characters: <span>|</span> <span>@</span> <span>-</span>
							<span>_</span> <span>~</span>
						</p>

						<label htmlFor="confirm_password" className="password-label">
							Confirm Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={validMatch && matchPassword ? "valid" : "hide"}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validMatch || !matchPassword ? "hide" : "invalid"}
							/>
						</label>
						<input
							className="password-input"
							type="password"
							id="confirm_password"
							onChange={e => setMatchPassword(e.target.value)}
							value={matchPassword}
							required
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p
							id="confirmnote"
							className={matchFocus && !validMatch ? "instructions" : "offscreen"}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>

						<label htmlFor="email" className="email-label">
							Email:
							<FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
							<FontAwesomeIcon
								icon={faTimes}
								className={validEmail || !email ? "hide" : "invalid"}
							/>
						</label>
						<input
							className="email-input"
							type="email"
							id="email"
							autoComplete="on"
							onChange={e => setEmail(e.target.value)}
							value={email}
							required
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
						/>
						<p
							id="emailnote"
							className={
								emailFocus && email && !validEmail ? "instructions" : "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must be a valid email.
						</p>

						<label htmlFor="phone_number" className="phone_number-label">
							Phone number:
							<FontAwesomeIcon
								icon={faCheck}
								className={validPhoneNumber ? "valid" : "hide"}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"}
							/>
						</label>
						<input
							className="phone_number-input"
							type="text"
							id="phone_number"
							autoComplete="off"
							onChange={e => setPhoneNumber(e.target.value)}
							value={phoneNumber}
							onFocus={() => setPhoneNumberFocus(true)}
							onBlur={() => setPhoneNumberFocus(false)}
						/>
						<p
							id="phonenumbernote"
							className={
								phoneNumberFocus && phoneNumber && !validPhoneNumber
									? "instructions"
									: "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							Only numbers and special characters allowed.
							<br />
							Allowed special characters: <span>_</span>
							<span>-</span>
						</p>

						<button
							disabled={
								!validUsername || !validEmail || !validPassword || !validMatch
									? true
									: false
							}
						>
							Sign Up
						</button>
					</form>
					<p>
						Already registered?
						<br />
						<span className="line">
							<Link to={"/login"}>Sign In</Link>
						</span>
					</p>
				</section>
			)}
		</div>
	);
};

export default Register;
