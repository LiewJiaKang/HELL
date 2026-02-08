import { useState } from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

type GrammarTable = {
    headers: string[];
    rows: string[][];
};

type GrammarSection = {
    id: string;
    title: string;
    subtitle: string;
    explanation: string;
    tables?: GrammarTable[];
};

const grammarSections: GrammarSection[] = [
    {
        id: "noun",
        title: "Nouns",
        subtitle: "Names of people, places, things, and ideas",
        explanation:
            "Nouns identify entities such as people, places, objects, and abstract ideas. They can be classified into several types based on their function and meaning.",
        tables: [
            {
                headers: ["Type", "Description", "Example"],
                rows: [
                    ["Common", "General names", "city, teacher"],
                    ["Proper", "Specific names", "Malaysia, Liew"],
                    ["Concrete", "Physical objects", "chair, apple"],
                    ["Abstract", "Ideas or feelings", "freedom, anger"],
                    ["Countable", "Can be counted", "books, coins"],
                    ["Uncountable", "Cannot be counted", "water, information"],
                    ["Collective", "Group of individuals", "team, herd"],
                ],
            },
        ],
    },
    {
        id: "pronoun",
        title: "Pronouns",
        subtitle: "Words that replace nouns",
        explanation:
            "Pronouns replace or refer to nouns to avoid repetition and improve sentence flow. They must agree with their antecedents in number and gender.",
        tables: [
            {
                headers: ["Type", "Function", "Example"],
                rows: [
                    ["Personal", "Refers to specific people or things", "I, you, he, she, it, they"],
                    ["Possessive", "Shows ownership", "my, your, his, her, their"],
                    ["Reflexive", "Refers back to the subject", "myself, herself"],
                    ["Demonstrative", "Points to specific things", "this, that, these, those"],
                    ["Relative", "Introduces relative clauses", "who, which, that"],
                    ["Indefinite", "Refers to non-specific people or things", "someone, anyone, nothing"],
                ],
            },
        ],
    },
    {
        id: "adjective",
        title: "Adjectives",
        subtitle: "Words that describe nouns",
        explanation:
            "Adjectives modify nouns by giving more information about their qualities, quantity, or identity. They usually appear before the noun or after a linking verb.",
        tables: [
            {
                headers: ["Type", "Function", "Example"],
                rows: [
                    ["Descriptive", "Describes qualities", "tall, beautiful"],
                    ["Quantitative", "Shows amount", "many, few, some"],
                    ["Demonstrative", "Points out nouns", "this, those"],
                    ["Possessive", "Shows ownership", "my, her, their"],
                    ["Interrogative", "Used in questions", "which, what, whose"],
                    ["Comparative", "Compares two", "bigger, faster"],
                    ["Superlative", "Compares three or more", "biggest, fastest"],
                ],
            },
        ],
    },
    {
        id: "adverb",
        title: "Adverbs",
        subtitle: "Words that modify verbs, adjectives, or other adverbs",
        explanation:
            "Adverbs describe how, when, where, how often, or to what extent an action occurs. Many adverbs end in -ly, but not all.",
        tables: [
            {
                headers: ["Type", "Question Answered", "Example"],
                rows: [
                    ["Manner", "How?", "quickly, carefully"],
                    ["Time", "When?", "now, yesterday"],
                    ["Place", "Where?", "here, outside"],
                    ["Frequency", "How often?", "always, rarely"],
                    ["Degree", "To what extent?", "very, too, enough"],
                ],
            },
        ],
    },
    {
        id: "interjection",
        title: "Interjections",
        subtitle: "Words that express emotion or reaction",
        explanation:
            "Interjections express sudden feelings or responses. They are often followed by an exclamation mark and can stand alone or be embedded in a sentence.",
        tables: [
            {
                headers: ["Interjection", "Emotion / Function", "Example"],
                rows: [
                    ["Wow!", "Surprise / admiration", "Wow! That’s impressive."],
                    ["Oops!", "Mistake / accident", "Oops! I dropped it."],
                    ["Oh!", "Realization / surprise", "Oh! I see now."],
                    ["Hey!", "Calling attention", "Hey! Come here."],
                    ["Ugh!", "Disgust / annoyance", "Ugh! That’s gross."],
                    ["Ah!", "Understanding / relief", "Ah! That makes sense."],
                ],
            },
        ],
    },
    {
        id: "verbs",
        title: "Verbs",
        subtitle: "Words that show action or state",
        explanation:
            "Verbs express actions, states of being, or conditions. They change form to show tense, aspect, voice, and mood.",
        tables: [
            {
                headers: ["Type", "Function", "Example"],
                rows: [
                    ["Action", "Shows physical or mental action", "run, think"],
                    ["Linking", "Connects subject to description", "is, seem"],
                    ["Helping (Auxiliary)", "Helps main verb form tense/voice", "has, will, be"],
                    ["Transitive", "Requires an object", "She reads a book."],
                    ["Intransitive", "Does not require an object", "He sleeps."],
                ],
            },
        ],
    },
    {
        id: "conjunction",
        title: "Conjunctions",
        subtitle: "Words that join",
        explanation:
            "Conjunctions connect words, phrases, or clauses to create more complex and meaningful sentences.",
        tables: [
            {
                headers: ["Type", "Conjunctions", "Example"],
                rows: [
                    ["Coordinating", "for, and, nor, but, or, yet, so", "I tried, but I failed."],
                    ["Subordinating", "because, although, if, when, while", "I stayed because it rained."],
                    ["Correlative", "both...and, either...or, neither...nor", "Both he and I agreed."],
                ],
            },
        ],
    },
    {
        id: "preposition",
        title: "Prepositions",
        subtitle: "Words that show relationships",
        explanation:
            "Prepositions show relationships between nouns and other words, especially in terms of place, time, direction, and cause.",
        tables: [
            {
                headers: ["Category", "Prepositions", "Example"],
                rows: [
                    ["Place", "in, on, under, between", "The cat is under the table."],
                    ["Time", "at, on, in, during", "I wake up at 6 AM."],
                    ["Direction", "to, into, onto, toward", "She walked into the room."],
                ],
            },
        ],
    },
];

export default function Grammar() {
    const [active, setActive] = useState(grammarSections[0]);

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-base-100 flex flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="w-full md:w-64 border-base-300 p-4 md:sticky md:top-0 md:h-screen overflow-y-auto bg-base-100 md:bg-base-100">
                    <h2 className="text-lg font-bold mb-4">Grammar Guide</h2>

                    <ul className="w-full menu menu-vertical bg-base-200 rounded-box md:bg-base-200">
                        {grammarSections.map((section) => (
                            <li key={section.id}>
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg transition ${active.id === section.id
                                        ? "bg-primary text-primary-content font-semibold"
                                        : "hover:bg-base-200"
                                        }`}
                                    onClick={() => setActive(section)}
                                >
                                    {section.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Content */}
                <section className="flex-1 px-4 md:px-8 py-6 md:py-10 max-w-full md:max-w-4xl mx-auto">
                    <header className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold">{active.title}</h1>
                        <p className="text-sm opacity-70 mt-1">{active.subtitle}</p>
                    </header>

                    <article className="prose max-w-full">
                        <p>{active.explanation}</p>

                        {active.tables?.map((table, idx) => (
                            <div key={idx} className="overflow-x-auto my-6">
                                <table className="table table-zebra w-full min-w-100">
                                    <thead>
                                        <tr>
                                            {table.headers.map((h, i) => (
                                                <th key={i}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table.rows.map((row, rIdx) => (
                                            <tr key={rIdx}>
                                                {row.map((cell, cIdx) => (
                                                    <td key={cIdx}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </article>
                </section>
            </main>

            <Footer />
        </>
    );
}
