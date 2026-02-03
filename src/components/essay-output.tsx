import { useState, useRef, type JSX } from "react";

type Phonetic = {
    audio?: string;
    sourceUrl?: string;
    license?: { name: string; url: string };
};

type Definition = {
    definition: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
};

type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms?: string[];
    antonyms?: string[];
};

type DictionaryEntry = {
    word: string;
    phonetics?: Phonetic[];
    meanings: Meaning[];
    license?: { name: string; url: string };
    sourceUrls?: string[];
};

export default function EssayOutput({ result }: { result: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [entry, setEntry] = useState<DictionaryEntry | null>(null);
    const [savedWords, setSavedWords] = useState<string[]>([]);
    const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(
        null
    );

    // --- trim symbols/punctuation ---
    const cleanWord = (word: string) => word.replace(/^[^\w]+|[^\w]+$/g, "");

    const fetchDefinition = async (word: string) => {
        const trimmed = cleanWord(word);
        if (!trimmed) return null;

        try {
            const res = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${trimmed}`
            );
            if (!res.ok) return null; // 404 or other errors
            const data: DictionaryEntry[] = await res.json();
            return data?.[0] || null;
        } catch {
            return null;
        }
    };

    const handleWordClick = async (e: React.MouseEvent, word: string) => {
        e.stopPropagation();
        setSelectedWord(word);
        setEntry(null);

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setPopupPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }

        const fetched = await fetchDefinition(word);
        setEntry(fetched);
    };

    const handleSaveWord = () => {
        if (!selectedWord) return;
        const cleaned = cleanWord(selectedWord).toLowerCase();
        if (!savedWords.includes(cleaned)) {
            setSavedWords([...savedWords, cleaned]);
            console.log("Saved word:", cleaned);
        }
    };

    const handleClosePopup = () => {
        setSelectedWord(null);
        setEntry(null);
        setPopupPos(null);
    };
    const paragraphs = result.split(/\n\s*\n/);


    const splitWords = (word: string) =>
        word
            .split(/([–—])/g) // split on en dash or em dash, but keep them as separate items
            .filter(Boolean);

    const renderParagraph = (text: string) => {
        const result: JSX.Element[] = [];

        // Split text by ** to find bold sections
        const sections = text.split(/\*\*/);

        sections.forEach((section, index) => {
            const isBold = index % 2 === 1;

            // Split section by spaces, keeping spaces
            section.split(/(\s+)/).forEach((chunk, i) => {
                if (!chunk) return;

                // Keep spaces as is
                if (chunk.trim() === "") {
                    result.push(<span key={`${index}-${i}-space`}>{chunk}</span>);
                    return;
                }

                // Split chunk further by dashes (symbols stay)
                const words = splitWords(chunk);

                words.forEach((word, j) => {
                    const clean = word.replace(/^[^\w]+|[^\w]+$/g, ""); // for dictionary lookup only
                    const isSelected = selectedWord === clean;

                    result.push(
                        <span
                            key={`${index}-${i}-${j}`}
                            onClick={(e) => handleWordClick(e, clean)}
                            className={`cursor-pointer ${isBold ? "font-bold text-lg" : ""} ${isSelected ? "underline" : ""
                                }`}
                        >
                            {word}
                        </span>
                    );
                });
            });
        });

        return result;
    };

    return (
        <div className="relative" ref={containerRef}>
            {paragraphs.map((para, idx) => (
                <p key={idx} className="mb-4">
                    {renderParagraph(para)}
                </p>
            ))}

            {/* Tooltip Popup */}
            {selectedWord && popupPos && (
                <div
                    ref={(el) => {
                        if (!el || !containerRef.current) return;

                        const rect = containerRef.current.getBoundingClientRect();
                        const tooltipRect = el.getBoundingClientRect();
                        let top = popupPos.y + 10;
                        let left = popupPos.x + 10;

                        // Prevent tooltip from going below container
                        if (top + tooltipRect.height > rect.height) {
                            top = Math.max(0, rect.height - tooltipRect.height - 10);
                        }

                        // Prevent tooltip from going beyond right edge
                        if (left + tooltipRect.width > rect.width) {
                            left = Math.max(0, rect.width - tooltipRect.width - 10);
                        }

                        el.style.top = `${top}px`;
                        el.style.left = `${left}px`;
                    }}
                    className="absolute z-50 w-80 p-3 bg-base-100 border rounded shadow-lg flex flex-col gap-2 transition-all"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{cleanWord(selectedWord)}</h3>
                        <button className="btn btn-ghost btn-xs" onClick={handleClosePopup}>
                            ✕
                        </button>
                    </div>

                    {entry ? (
                        <div className="text-sm space-y-1 max-h-60 overflow-y-auto">
                            {entry.phonetics?.[0]?.audio && (
                                <audio controls className="w-full mb-1">
                                    <source src={entry.phonetics[0].audio} type="audio/mpeg" />
                                </audio>
                            )}

                            {entry.meanings.map((m, idx) => (
                                <div key={idx} className="mb-1">
                                    <span className="italic">{m.partOfSpeech}</span>
                                    <ol className="list-decimal ml-4">
                                        {m.definitions.map((d, i) => (
                                            <li key={i}>
                                                {d.definition}
                                                {d.example && (
                                                    <div className="text-xs opacity-70">Example: {d.example}</div>
                                                )}
                                                {d.synonyms && d.synonyms.length > 0 && (
                                                    <div className="text-xs opacity-70">
                                                        Synonyms: {d.synonyms.join(", ")}
                                                    </div>
                                                )}
                                                {d.antonyms && d.antonyms.length > 0 && (
                                                    <div className="text-xs opacity-70">
                                                        Antonyms: {d.antonyms.join(", ")}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            ))}

                            {entry.sourceUrls && entry.sourceUrls.length > 0 && (
                                <a
                                    href={entry.sourceUrls[0]}
                                    target="_blank"
                                    className="text-xs opacity-50 underline"
                                >
                                    Source
                                </a>
                            )}
                        </div>
                    ) : (
                        <p className="text-sm opacity-60">Definition not found.</p>
                    )}

                    <button
                        className="btn btn-accent btn-sm w-full"
                        onClick={handleSaveWord}
                    >
                        Save Word
                    </button>
                </div>
            )}

            {savedWords.length > 0 && (
                <div className="mt-2 text-sm opacity-70">
                    Saved Words: {savedWords.join(", ")}
                </div>
            )}
        </div>
    );
}
