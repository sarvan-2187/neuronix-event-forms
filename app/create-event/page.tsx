"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

/* ---------- LINK VALIDATOR ---------- */
const isValidLink = (link: string) =>
    link.startsWith("http://") || link.startsWith("https://");

export default function CreateEventPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        description: "",
        registration_link: "",
        banner_url: "",
        prize_money: "",
        event_dates: "",
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [resultColor, setResultColor] = useState("text-yellow-300");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        /* ---------- CLIENT VALIDATION ---------- */
        if (!isValidLink(form.registration_link)) {
            setResult("Invalid registration link. Must start with http:// or https://");
            setResultColor("text-red-400");
            return;
        }

        if (!isValidLink(form.banner_url)) {
            setResult("Invalid banner image URL. Must start with http:// or https://");
            setResultColor("text-red-400");
            return;
        }

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
                setResult("Event created successfully");
                setResultColor("text-green-400");

                setTimeout(() => {
                    router.push("/event-submitted");
                }, 1200);
            } else if (res.status === 401) {
                setResult("Unauthorized. Please login again.");
                setResultColor("text-red-400");
            } else {
                setResult("Something went wrong. Try again.");
                setResultColor("text-red-400");
            }
        } catch {
            setResult("Network error. Please try again.");
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
                            className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200"
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
                            className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200"
                            required
                        />
                    </div>

                    {/* LINKS */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-yellow-300 mb-2">
                                Registration Link
                            </label>
                            <input
                                name="registration_link"
                                value={form.registration_link}
                                onChange={handleChange}
                                placeholder="https://forms.gle/..."
                                className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-yellow-300 mb-2">
                                Banner Image URL
                            </label>
                            <input
                                name="banner_url"
                                value={form.banner_url}
                                onChange={handleChange}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200"
                                required
                            />
                        </div>
                    </div>

                    {/* EVENT META */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-yellow-300 mb-2">
                                Event Dates
                            </label>
                            <input
                                name="event_dates"
                                value={form.event_dates}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-yellow-300 mb-2">
                                Prize Money
                            </label>
                            <input
                                name="prize_money"
                                value={form.prize_money}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-black/50 border border-yellow-500/25 px-4 py-3 text-neutral-200"
                            />
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold rounded-2xl disabled:opacity-50"
                    >
                        {loading ? "Submitting Event..." : "Publish Event"}
                    </button>

                    {/* RESULT */}
                    <AnimatePresence mode="wait">
                        {result && (
                            <motion.p
                                key={result}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
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
