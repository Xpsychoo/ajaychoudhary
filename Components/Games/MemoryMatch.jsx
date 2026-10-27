import React, { useEffect, useState } from 'react';
import { Anchor, Cloud, Coffee, Heart, Music, Rocket, RotateCcw, Star, Timer, Trophy, Zap } from 'lucide-react';

const ICONS = { heart: Heart, star: Star, zap: Zap, music: Music, rocket: Rocket, coffee: Coffee, anchor: Anchor, cloud: Cloud };
const BEST_KEY = 'memory-match-best';

const shuffledDeck = () => {
    const deck = Object.keys(ICONS).flatMap((key) => [key, key]);
    for (let i = deck.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

const readBest = () => {
    try {
        const value = Number(window.localStorage.getItem(BEST_KEY));
        return value > 0 ? value : null;
    } catch {
        return null;
    }
};

const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const MemoryMatch = () => {
    // Shuffled after mount so the server-rendered HTML matches the first client render.
    const [deck, setDeck] = useState(null);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [best, setBest] = useState(null);

    const started = moves > 0 || flipped.length > 0;
    const won = deck !== null && matched.length === deck.length / 2;

    const reset = () => {
        setDeck(shuffledDeck());
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setSeconds(0);
    };

    useEffect(() => {
        reset();
        setBest(readBest());
    }, []);

    useEffect(() => {
        if (!started || won) return undefined;
        const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(timer);
    }, [started, won]);

    useEffect(() => {
        if (flipped.length !== 2) return undefined;
        const [a, b] = flipped;
        if (deck[a] === deck[b]) {
            setMatched((m) => [...m, deck[a]]);
            setFlipped([]);
            return undefined;
        }
        const timer = setTimeout(() => setFlipped([]), 800);
        return () => clearTimeout(timer);
    }, [flipped, deck]);

    useEffect(() => {
        if (!won || (best !== null && moves >= best)) return;
        setBest(moves);
        try {
            window.localStorage.setItem(BEST_KEY, String(moves));
        } catch {
            // storage unavailable (private mode etc.): keep the best for this visit only
        }
    }, [won, moves, best]);

    const flip = (i) => {
        if (flipped.length === 2 || flipped.includes(i) || matched.includes(deck[i])) return;
        if (flipped.length === 1) setMoves((m) => m + 1);
        setFlipped([...flipped, i]);
    };

    return (
        <div className="gameCard memoryMatch">
            <div className="scoreBoard">
                <div className="score"><span>Moves</span><strong>{moves}</strong></div>
                <div className="score"><span><Timer aria-hidden="true" /> Time</span><strong>{formatTime(seconds)}</strong></div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best</span><strong>{best ?? '–'}</strong></div>
            </div>

            <div className={`status ${won ? 'done' : ''}`} aria-live="polite">
                {won
                    ? `You matched all pairs in ${moves} moves and ${formatTime(seconds)}!`
                    : `${matched.length} of 8 pairs found`}
            </div>

            <div className="memoryGrid">
                {(deck ?? Array(16).fill(null)).map((key, i) => {
                    const Icon = key && ICONS[key];
                    const isMatched = key !== null && matched.includes(key);
                    const faceUp = isMatched || flipped.includes(i);
                    return (
                        <button
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            type="button"
                            className={`memoryCard ${faceUp ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
                            onClick={() => flip(i)}
                            disabled={!deck || faceUp}
                            aria-label={faceUp ? `Card ${i + 1}, ${key}` : `Card ${i + 1}, face down`}
                        >
                            <span className="inner">
                                <span className="face back" />
                                <span className="face front">{Icon && <Icon aria-hidden="true" />}</span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <button type="button" className="gameBtn" onClick={reset}>
                <RotateCcw aria-hidden="true" /> {won ? 'Play again' : 'Restart'}
            </button>
        </div>
    );
};

export default MemoryMatch;
