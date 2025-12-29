"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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

                {/* USERNAME */}
                <input
                    className="w-full mt-6 p-2 bg-black border border-neutral-700 text-white rounded-md"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* PASSWORD */}
                <div className="relative mt-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full p-2 bg-black border border-neutral-700 text-white rounded-md pr-10"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-yellow-400 transition"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* LOGIN */}
                <button
                    onClick={login}
                    className="w-full mt-6 bg-yellow-400 text-black py-2 font-semibold rounded-md hover:bg-yellow-300 transition"
                >
                    Login
                </button>

                {/* ERROR */}
                {error && (
                    <p className="text-red-400 text-center mt-3">{error}</p>
                )}
            </div>
        </div>
    );
}

