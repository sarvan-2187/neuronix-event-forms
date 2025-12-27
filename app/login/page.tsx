"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        setError("");
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res?.ok) {
            router.push("/create-event");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-neutral-900 p-8 rounded-xl w-96">
                <h1 className="text-2xl text-yellow-400 font-bold text-center">
                    Neuronix Admin
                </h1>

                <input
                    className="w-full mt-6 p-2 bg-black border text-white"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full mt-4 p-2 bg-black border text-white"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={login}
                    className="w-full mt-6 bg-yellow-400 text-black py-2 font-semibold"
                >
                    Login
                </button>

                {error && (
                    <p className="text-red-400 text-center mt-3">{error}</p>
                )}
            </div>
        </div>
    );
}
