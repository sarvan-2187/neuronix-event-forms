"use client";

import { signOut } from "next-auth/react";

export default function EventSubmittedPage() {
    return (
        <section className="min-h-screen w-full bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-neutral-900/70 border border-yellow-500/20 rounded-2xl p-10 shadow-[0_0_35px_rgba(255,200,0,0.15)] backdrop-blur text-center">

                {/* LOGO */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/logo.png"
                        alt="Neuronix Logo"
                        className="h-20 w-auto opacity-90"
                    />
                </div>

                {/* MESSAGE */}
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text">
                    Event Submitted Successfully
                </h1>

                <p className="text-neutral-400 mt-3">
                    Your event has been recorded in the system.
                </p>

                {/* LOGOUT */}
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="mt-8 w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
                >
                    Logout
                </button>
            </div>
        </section>
    );
}
