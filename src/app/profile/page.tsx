"use client";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
	const { data, error, isLoading } = useSWR(
		"http://localhost:3001/profile",
		fetcher,
		{ shouldRetryOnError: false }
	);
	const router = useRouter();

	function backToLogin() {
		router.replace("/");
	}

	async function logout() {
		const result = await axios.get("http://localhost:3001/logout", {
			withCredentials: true,
		});
		router.replace("/");
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
			<h1>You have been logged in</h1>
			<p>Welcome to the system! {data.username}!</p>
			<button onClick={() => router.push("/updatePassword")}>
				Update Password
			</button>
			<button onClick={() => logout()}>Logout</button>
		</>
	);
}
