import { useState } from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { IconSpeakerphone } from "@tabler/icons-react";

type Definition = {
    definition: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
};

type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
};

type DictionaryEntry = {
    word: string;
    phonetics?: ApiPhonetic[];
    meanings: Meaning[];
};


type ApiPhonetic = {
    audio?: string;
    sourceUrl?: string;
    license?: { name: string; url: string };
};

type ApiDefinition = {
    definition: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
};

type ApiMeaning = {
    partOfSpeech: string;
    definitions: ApiDefinition[];
};

type ApiEntry = {
    word: string;
    phonetics?: ApiPhonetic[];
    meanings: ApiMeaning[];
};


export default function Dictionary() {
    const [savedWords, setSavedWords] = useState<string[]>(
        JSON.parse(localStorage.getItem("savedWords") || "[]")
    );
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [entry, setEntry] = useState<DictionaryEntry | null>(null);
    const [search, setSearch] = useState("");
    const [saved, setSaved] = useState(false);

    const cleanWord = (word: string) => word.replace(/^[^\w]+|[^\w]+$/g, "");

    const fetchDefinition = async (word: string): Promise<DictionaryEntry | null> => {
        const trimmed = cleanWord(word);
        if (!trimmed) return null;

        try {
            const res = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${trimmed}`
            );
            if (!res.ok) return null;

            const data: ApiEntry[] = await res.json();
            const entry = data[0];

            return {
                word: entry.word,
                phonetics: entry.phonetics,
                meanings: entry.meanings.map((m) => ({
                    partOfSpeech: m.partOfSpeech,
                    definitions: m.definitions.map((d) => ({
                        definition: d.definition,
                        example: d.example,
                        synonyms: d.synonyms,
                        antonyms: d.antonyms,
                    })),
                })),
            };
        } catch {
            return null;
        }
    };

    const handleSearch = async () => {
        if (!search.trim()) return;
        setSelectedWord(search);
        const fetched = await fetchDefinition(search);
        setEntry(fetched);
        setSaved(false);
    };

    const handleSelectSavedWord = async (word: string) => {
        setSelectedWord(word);
        const fetched = await fetchDefinition(word);
        setEntry(fetched);
        setSaved(false);
    };

    const handleSaveWord = () => {
        if (!entry) return;
        const cleaned = cleanWord(entry.word).toLowerCase();
        if (!savedWords.includes(cleaned)) {
            const updated = [...savedWords, cleaned];
            setSavedWords(updated);
            localStorage.setItem("savedWords", JSON.stringify(updated));
        }
        setSaved(true);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen px-4 py-8 max-w-6xl mx-auto flex gap-6">
                {/* Left Panel: Saved Words */}
                <div className="w-1/3">
                    <div className="card bg-base-200 shadow p-4 sticky top-8">
                        <h3 className="font-bold mb-2">Saved Words</h3>
                        {savedWords.length === 0 ? (
                            <p className="text-sm opacity-60">No saved words yet.</p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {savedWords.map((word, i) => (
                                    <button
                                        key={i}
                                        className={`text-left px-2 py-1 rounded hover:bg-base-300 ${selectedWord === word ? "bg-base-300 font-bold" : ""
                                            }`}
                                        onClick={() => handleSelectSavedWord(word)}
                                    >
                                        {word}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Search & Definition */}
                <div className="flex-1 flex flex-col gap-4">
                    {/* Search */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search a word..."
                            className="input input-bordered flex-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>
                            Search
                        </button>
                    </div>


                    {/* Definition */}
                    {entry && (
                        <div className="card bg-base-200 shadow p-4 flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <h2 className="font-bold text-lg">{entry.word}</h2>
                                    {entry.phonetics?.find(p => p.audio)?.audio && (
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() =>
                                                new Audio(entry.phonetics!.find(p => p.audio)!.audio!).play()
                                            }
                                            title="Play pronunciation"
                                        >
                                            <IconSpeakerphone width={16} />
                                        </button>
                                    )}
                                </div>
                                <button
                                    className="btn btn-accent btn-sm"
                                    onClick={handleSaveWord}
                                    disabled={
                                        saved || savedWords.includes(entry.word.toLowerCase())
                                    }
                                >
                                    {saved || savedWords.includes(entry.word.toLowerCase())
                                        ? "Word saved"
                                        : "Save Word"}
                                </button>
                            </div>

                            {entry.meanings && entry.meanings.length > 0 ? (
                                entry.meanings.map((m, idx) => (
                                    <div key={idx}>
                                        <span className="italic">{m.partOfSpeech}</span>
                                        <ol className="list-decimal ml-4">
                                            {m.definitions.map((d, i) => (
                                                <li key={i}>{d.definition}</li>
                                            ))}
                                        </ol>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm opacity-60">Definition not found.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
