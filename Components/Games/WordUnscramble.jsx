import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Lightbulb, Play, RotateCcw, SkipForward, Timer, Trophy } from 'lucide-react';

const DURATION = 60;
const BEST_KEY = 'word-unscramble-best';
const WORDS = [
    'react', 'javascript', 'component', 'function', 'variable', 'promise', 'array', 'object',
    'string', 'boolean', 'closure', 'callback', 'frontend', 'backend', 'database', 'server',
    'browser', 'compiler', 'debugger', 'keyboard', 'network', 'package', 'router', 'github',
    'python', 'deploy', 'framework', 'library', 'element', 'display', 'render', 'terminal',
    'syntax', 'method', 'module', 'console', 'website', 'laptop', 'developer', 'android',
];

const scramble = (word) => {
    let out;
    do {
        const letters = word.split('');
        for (let i = letters.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        out = letters.join('');
    } while (out === word);
    return out;
};

/** Next word, never the same as the one just played. */
const pickWord = (prev) => {
    let word;
    do word = WORDS[Math.floor(Math.random() * WORDS.length)]; while (word === prev);
    return { word, letters: scramble(word), hints: 0 };
};

const readBest = () => {
    try {
        const value = Number(window.localStorage.getItem(BEST_KEY));
        return value > 0 ? value : 0;
    } catch {
        return 0;
    }
};

const WordUnscramble = () => {
    const [status, setStatus] = useState('idle'); // idle | playing | over
    const [current, setCurrent] = useState(null);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [solved, setSolved] = useState(0);
    const [timeLeft, setTimeLeft] = useState(DURATION);
    const [best, setBest] = useState(0);
    const [missed, setMissed] = useState(null); // the answer to the word that was skipped or timed out
    const inputRef = useRef(null);

    useEffect(() => {
        setBest(readBest());
    }, []);

    // Counted from the start time rather than by ticks, so a busy tab can't stretch the round.
    useEffect(() => {
        if (status !== 'playing') return undefined;
        const startedAt = Date.now();
        const timer = setInterval(() => {
            const left = Math.max(0, DURATION - Math.floor((Date.now() - startedAt) / 1000));
            setTimeLeft(left);
            if (left === 0) setStatus('over');
        }, 200);
        return () => clearInterval(timer);
    }, [status]);

    useEffect(() => {
        if (status !== 'over' || score <= best) return;
        setBest(score);
        try {
            window.localStorage.setItem(BEST_KEY, String(score));
        } catch {
            // storage unavailable (private mode etc.): keep the best for this visit only
        }
    }, [status, score, best]);

    const start = () => {
        setCurrent(pickWord());
        setInput('');
        setScore(0);
        setSolved(0);
        setMissed(null);
        setTimeLeft(DURATION);
        // Render the input now and focus it inside the tap itself: iOS only opens the keyboard for a focus made during a tap.
        flushSync(() => setStatus('playing'));
        inputRef.current?.focus();
    };

    const onChange = (e) => {
        if (status !== 'playing') return;
        const value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
        if (value === current.word) {
            setScore((s) => s + (current.hints ? 1 : 2));
            setSolved((n) => n + 1);
            setMissed(null);
            setCurrent(pickWord(current.word));
            setInput('');
            return;
        }
        setInput(value);
    };

    const hint = () => {
        if (current.hints >= current.word.length - 1) return;
        setCurrent({ ...current, hints: current.hints + 1 });
        inputRef.current?.focus();
    };

    const skip = () => {
        setMissed(current.word);
        setCurrent(pickWord(current.word));
        setInput('');
        inputRef.current?.focus();
    };

    let message = 'Unscramble as many coding words as you can in 60 seconds. 2 points each, 1 if you use a hint.';
    if (status === 'playing') message = missed ? `Skipped: it was “${missed}”` : `${solved} solved so far`;
    if (status === 'over') message = `Time! You solved ${solved} word${solved === 1 ? '' : 's'} for ${score} points. The last one was “${current.word}”.`;

    return (
        <div className="gameCard wordUnscramble">
            <div className="scoreBoard">
                <div className="score x"><span>Score</span><strong>{score}</strong></div>
                <div className="score"><span><Timer aria-hidden="true" /> Time</span><strong>{timeLeft}s</strong></div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best</span><strong>{best}</strong></div>
            </div>

            <div className={`status ${status === 'over' ? 'done' : ''}`} aria-live="polite">{message}</div>

            {status !== 'idle' && (
                <>
                    <div className="timeBar" aria-hidden="true">
                        <span style={{ width: `${(timeLeft / DURATION) * 100}%` }} />
                    </div>

                    <div className={`letterTiles ${status}`} aria-label={`Scrambled letters: ${current.letters}`}>
                        {current.letters.split('').map((ch, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <span key={`${current.letters}-${i}`} style={{ animationDelay: `${i * 30}ms` }}>{ch}</span>
                        ))}
                    </div>

                    {current.hints > 0 && (
                        <div className="hintLine">
                            Starts with <strong>{current.word.slice(0, current.hints)}</strong>
                        </div>
                    )}

                    <input
                        ref={inputRef}
                        className="typeInput"
                        value={input}
                        onChange={onChange}
                        disabled={status !== 'playing'}
                        placeholder="Type the word…"
                        aria-label="Your answer"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                    />
                </>
            )}

            {status === 'playing' ? (
                <div className="btnRow">
                    {/* preventDefault on mousedown keeps focus in the input, so the phone keyboard stays up */}
                    <button type="button" className="gameBtn ghost" onMouseDown={(e) => e.preventDefault()} onClick={hint} disabled={current.hints >= current.word.length - 1}>
                        <Lightbulb aria-hidden="true" /> Hint
                    </button>
                    <button type="button" className="gameBtn ghost" onMouseDown={(e) => e.preventDefault()} onClick={skip}>
                        <SkipForward aria-hidden="true" /> Skip
                    </button>
                </div>
            ) : (
                <button type="button" className="gameBtn" onClick={start}>
                    {status === 'idle' ? <Play aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}
                    {status === 'idle' ? 'Start game' : 'Play again'}
                </button>
            )}
        </div>
    );
};

export default WordUnscramble;
