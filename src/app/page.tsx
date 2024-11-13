'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import { ChangeEvent, useState } from "react";

export default function Home() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordIncorrect, setPasswordIncorrect] = useState(false);
	const [isTimeout, setIsTimeout] = useState(false);

	function onUsernameChange(e: ChangeEvent<HTMLInputElement>) {
		setUsername(e.target.value);
	}

	function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	function login(){

	}

	return (
		<div>
			<h1>Login Page</h1>
			<input
				placeholder="Username"
				onChange={(e) => onUsernameChange(e)}
				value={username}
			></input>
			<br />
			<input
				placeholder="Password"
				onChange={(e) => onPasswordChange(e)}
				value={password}
				type="password"
			></input>
			<br></br>
			<button onClick={() => login()}>Login</button>
		</div>
	);
}