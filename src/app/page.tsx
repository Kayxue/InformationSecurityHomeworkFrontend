"use client";
import { ChangeEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "./fetcher";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordIncorrect, setPasswordIncorrect] = useState(false);
	const [isTimeout, setIsTimeout] = useState(false);
	const [loading, setLoading] = useState(false);

	function onUsernameChange(e: ChangeEvent<HTMLInputElement>) {
		setUsername(e.target.value);
	}

	function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	async function login() {
		setLoading(true);
		setPasswordIncorrect(false);
		setIsTimeout(false);
		const result = await axios
			.post(
				"http://localhost:3001/login",
				{ username, password },
				{ withCredentials: true }
			)
			.catch((e: AxiosError) => {
				if (e.status !== 404) {
					setPasswordIncorrect(true);
					if ((e.response?.data as string).includes("locked")) {
						setIsTimeout(true);
					}
				}
				return -1;
			});
		setLoading(false);
		if (result == -1) return;
		redirect("/profile");
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
			<br />
			<button onClick={() => login()}>Login</button>
			{loading && <p style={{ color: "red" }}>嘗試登入中......</p>}
			{passwordIncorrect && (
				<p style={{ color: "red" }}>使用者名稱或密碼輸入錯誤</p>
			)}
			{isTimeout && <p style={{ color: "red" }}>請五分鐘後再試</p>}
		</div>
	);
}
