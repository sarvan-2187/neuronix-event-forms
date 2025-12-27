"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
    const router = useRouter(); // ✅ hook at top level

    const [form, setForm] = useState({
        title: "",
        description: "",
        registration_link: "",
        banner_url: "",
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [resultColor, setResultColor] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult("Submitting event...");
        setResultColor("text-yellow-300");

        try {
            const res = await fetch("/api/create-event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.status === 200) {
                setResult("✅ Event created successfully");
                setResultColor("text-green-400");

                setTimeout(() => {
                    router.push("/event-submitted");
                }, 1200);
            } else if (res.status === 401) {
                setResult("❌ Unauthorized. Please login again.");
                setResultColor("text-red-400");
            } else {
                setResult("❌ Something went wrong. Try again.");
                setResultColor("text-red-400");
            }
        } catch {
            setResult("❌ Network error. Please try again.");
            setResultColor("text-red-400");
        }

        setLoading(false);
    };

    return (
        <section className="min-h-screen w-full bg-black flex justify-center px-5 py-16">
            <div className="max-w-3xl w-full bg-neutral-900/70 border border-yellow-500/20 rounded-3xl p-10 shadow-[0_0_45px_rgba(255,200,0,0.18)] backdrop-blur">

                {/* HEADER */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text">
                        Create New Event
                    </h1>
                    <p className="text-neutral-400 mt-2">
                        Neuronix internal event publishing panel
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="mt-12 space-y-10">

                    {/* EVENT TITLE */}
                    <div>
                        <label className="block text-sm font-medium text-yellow-300 mb-2">
                            Event Title
                        </label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Neuronix AI Bootcamp"
                            className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="block text-sm font-medium text-yellow-300 mb-2">
                            Event Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Describe the event, audience, and highlights..."
                            className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    {/* LINKS GRID */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* REGISTRATION LINK */}
                        <div>
                            <label className="block text-sm font-medium text-yellow-300 mb-2">
                                Registration Link
                            </label>
                            <input
                                name="registration_link"
                                value={form.registration_link}
                                onChange={handleChange}
                                placeholder="https://forms.gle/..."
                                className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        {/* BANNER URL */}
                        <div>
                            <label className="block text-sm font-medium text-yellow-300 mb-2">
                                Banner Image URL
                            </label>
                            <input
                                name="banner_url"
                                value={form.banner_url}
                                onChange={handleChange}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold rounded-2xl shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Submitting Event..." : "Publish Event"}
                    </button>

                    {/* RESULT MESSAGE */}
                    <AnimatePresence mode="wait">
                        {result && (
                            <motion.p
                                key={result}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97, y: 6 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className={`text-center font-medium ${resultColor}`}
                            >
                                {result}
                            </motion.p>
                        )}
                    </AnimatePresence>

                </form>
            </div>
        </section>
    );

}
