import { useState } from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { CohereClientV2 } from 'cohere-ai';
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import EssayOutput from "./components/essay-output";

const cohere = new CohereClientV2({ token: import.meta.env.VITE_COHERE_API_KEY });

const THEMES = [
    "People",
    "Science and technology",
    "Shopping",
    "Environment",
    "Sports",
    "Social media",
    "Holiday",
    "Crimes/Horror/Tregedy/Mystery",
];

const LEVELS = ["B1", "B2", "C1", "C2"];

export default function EssayGenerator() {
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState(THEMES[0]);
    const [level, setLevel] = useState("B2");
    const [length, setLength] = useState("medium");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const handleGenerate = async () => {
        if (!title.trim()) return;

        setLoading(true);
        setResult("");


        const response = await cohere.chat({
            messages: [
                {
                    role: "system",
                    content: "You are an essay writer in Malaysia that tells stories in clear, engaging English."
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Write a ${length == "short" ? "200-400" : length == "medium" ? "400-500" : "500-700"} word narrative essay at ${level} level.
Title: ${title}
Theme: ${theme}
Write in full paragraphs. Use descriptive language, varied sentences, and make it engaging.`
                        }
                    ]
                }
            ],
            temperature: 0.3,
            model: "command-a-03-2025"
        });


        setResult(
            response.message.content?.[0]?.type === "text"
                ? response.message.content[0].text
                : "Thinking..."
        );
        console.log(response.message.content?.[0]);
        setLoading(false);
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-base-200 flex justify-center px-4 py-12">
                <div className="w-full max-w-6xl space-y-6">
                    {/* Header */}
                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold">Essay Generator</h1>
                        <p className="text-sm opacity-60">
                            Provide a title, choose a theme and level, and let the machine suffer creatively.
                        </p>
                    </div>

                    {/* Toggle Button */}
                    <div className="flex justify-end">
                        <button
                            className="btn btn-sm btn-accent"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? <IconEye width={20} /> : <IconEyeOff width={20} />}
                            {collapsed ? "Show Generator" : "Hide Generator"}
                        </button>
                    </div>

                    {/* Layout */}
                    <div className="flex flex-col md:flex-row gap-6 transition-all duration-300">
                        {/* Left Panel */}
                        <div
                            className={`
                                overflow-hidden transition-all duration-300
                                ${collapsed
                                    ? "max-h-0 md:max-h-full md:max-w-0"
                                    : "max-h-250 md:max-w-md"
                                }
                                w-full md:w-auto
                            `}
                        >
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body space-y-4">
                                    {/* Title Input */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text mr-2">Essay Title</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. A Day That Changed Everything"
                                            className="input input-bordered"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    {/* Theme Select */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text mr-2">Theme</span>
                                        </label>
                                        <select
                                            className="select select-bordered"
                                            value={theme}
                                            onChange={(e) => setTheme(e.target.value)}
                                        >
                                            {THEMES.map((t) => (
                                                <option key={t} value={t}>
                                                    {t}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Level & Length */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Level</span>
                                            </label>
                                            <select
                                                className="select select-bordered"
                                                value={level}
                                                onChange={(e) => setLevel(e.target.value)}
                                            >
                                                {LEVELS.map((lvl) => (
                                                    <option key={lvl} value={lvl}>
                                                        {lvl}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Length</span>
                                            </label>
                                            <select
                                                className="select select-bordered"
                                                value={length}
                                                onChange={(e) => setLength(e.target.value)}
                                            >
                                                <option value="short">Short</option>
                                                <option value="medium">Medium</option>
                                                <option value="long">Long</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary w-full"
                                        onClick={handleGenerate}
                                        disabled={!title.trim() || loading}
                                    >
                                        {loading ? (
                                            <span className="loading loading-spinner"></span>
                                        ) : null}
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="flex-1 card bg-base-100 shadow-lg">
                            <div className="card-body">
                                {loading ? (
                                    <span className="skeleton skeleton-text">AI is thinking...</span>
                                ) :
                                    (result ? (
                                        <EssayOutput result={result} />
                                    ) : (
                                        <p className="text-sm opacity-60">
                                            Your generated essay will appear here.
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
