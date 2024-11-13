"use client";
import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login page",
	description: "Page to login",
};

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

	return (
		<div className={styles.page}>
			<h1>Login Page</h1>
			<input
				placeholder="Username"
				onChange={(e) => onUsernameChange(e)}
				value={username}
			></input>
			<input
				placeholder="Password"
				onChange={(e) => onPasswordChange(e)}
				value={password}
			></input>
		</div>
	);
}
