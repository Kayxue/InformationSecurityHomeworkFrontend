"use client"
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter();
	const { data, error, isLoading } = useSWR(
		"http://localhost:3001/profile",
		fetcher
	);
	if (error) router.replace("/");
	return isLoading ? (
		<p>Loading...</p>
	) : (
		<>
			<h1>You have been logged in</h1>
			<p>Welcome to the system! {data.username}!</p>
		</>
	);
}
