"use client";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function Login() {
	const { data, error, isLoading } = useSWR(
		"http://localhost:3001/profile",
		fetcher,
		{ shouldRetryOnError: false }
	);
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [special, setSpecial] = useState(false);
	const [notStrong, setNotStrong] = useState(false);
    const [same, setSame] = useState(false);

	function backToLogin() {
		router.replace("/");
	}

	async function updatePassword() {
		setSpecial(false);
		setNotStrong(false);
        setSame(false)
		if (/[^A-Za-z0-9]/.test(password)) {
			setSpecial(true);
			return;
		}
		const result = await axios
			.put(
				"http://localhost:3001/updatePassword",
				{ newPassword: password },
				{
					withCredentials: true,
				}
			)
			.catch((e) => {
				if(e.response.data.includes("strong")){
                    setNotStrong(true);
                }else{
                    setSame(true)
                }
			});
		if (result) {
			router.replace("/profile");
		}
	}

	return isLoading ? (
		<p>Loading...</p>
	) : error ? (
		<>
			<h1>You are not logged in</h1>
			<button onClick={backToLogin}>Back</button>
		</>
	) : (
		<>
			<h1>Change user password</h1>
			<input
				placeholder="New Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
                type="password"
            ></input>
			<button onClick={() => updatePassword()}>Update password</button>
			{special && <p style={{ color: "red" }}>密碼不能包含特殊字元</p>}
			{notStrong && <p style={{ color: "red" }}>密碼不夠強</p>}
            {same && <p style={{ color: "red" }}>密碼與前三次相同</p>}
		</>
	);
}
