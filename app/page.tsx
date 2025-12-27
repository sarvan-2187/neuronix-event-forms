"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <section className="font-sans min-h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900/70 border border-yellow-500/20 rounded-2xl p-8 shadow-[0_0_35px_rgba(255,200,0,0.15)] backdrop-blur">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Neuronix Logo"
            className="h-16 w-auto opacity-90"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text">
          Neuronix Admin
        </h1>
        <p className="text-neutral-400 text-center mt-2">
          Authorized access only <br></br> Connect your Browser to Continue
        </p>

        {/* BUTTON */}
        <div className="mt-10">
          <button
            onClick={() => router.push("/create-event")}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Go to Event Panel
          </button>
        </div>
      </div>
    </section>
  );
}
