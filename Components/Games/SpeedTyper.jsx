import React, { useEffect, useRef, useState } from 'react';
import { Gauge, Play, RotateCcw, Target, Timer, Trophy } from 'lucide-react';

const DURATION = 30;
const BEST_KEY = 'speed-typer-best';
const WORDS = [
    'const', 'let', 'return', 'async', 'await', 'import', 'export', 'default', 'function', 'class',
    'useState', 'useEffect', 'useRef', 'props', 'render', 'component', 'promise', 'fetch', 'json', 'array',
    'object', 'string', 'boolean', 'null', 'undefined', 'console', 'debug', 'deploy', 'commit', 'merge',
    'branch', 'rebase', 'refactor', 'callback', 'closure', 'module', 'package', 'npm', 'yarn', 'webpack',
    'router', 'redux', 'reducer', 'dispatch', 'selector', 'context', 'hook', 'state', 'filter', 'reduce',
    'map', 'switch', 'typeof', 'void', 'scss', 'flexbox', 'grid', 'media', 'query', 'pixel',
    'server', 'client', 'api', 'token', 'cache', 'bundle', 'lint', 'build', 'test', 'next',
];

const randomWords = (n) => Array.from({ length: n }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);

const readBest = () => {
    try {
        const value = Number(window.localStorage.getItem(BEST_KEY));
        return value > 0 ? value : 0;
    } catch {
        return 0;
    }
};

const SpeedTyper = () => {
    const [status, setStatus] = useState('idle'); // idle | playing | over
    // Generated after mount so the server-rendered HTML matches the first client render.
    const [words, setWords] = useState([]);
    const [input, setInput] = useState('');
    const [done, setDone] = useState({ words: 0, chars: 0 });
    const [keys, setKeys] = useState({ total: 0, wrong: 0 });
    const [timeLeft, setTimeLeft] = useState(DURATION);
    const [best, setBest] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        setWords(randomWords(40));
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

    const wpm = Math.round(done.chars / 5 / (DURATION / 60));
    const accuracy = keys.total ? Math.round(((keys.total - keys.wrong) / keys.total) * 100) : 100;

    useEffect(() => {
        if (status !== 'over' || wpm <= best) return;
        setBest(wpm);
        try {
            window.localStorage.setItem(BEST_KEY, String(wpm));
        } catch {
            // storage unavailable (private mode etc.): keep the best for this visit only
        }
    }, [status, wpm, best]);

    const reset = () => {
        setWords(randomWords(40));
        setInput('');
        setDone({ words: 0, chars: 0 });
        setKeys({ total: 0, wrong: 0 });
        setTimeLeft(DURATION);
        setStatus('idle');
        inputRef.current?.focus();
    };

    const onChange = (e) => {
        if (status === 'over') return;
        const value = e.target.value.trim();
        const word = words[0];
        if (status === 'idle' && value) setStatus('playing');
        if (value.length > input.length) {
            setKeys((k) => ({ total: k.total + 1, wrong: k.wrong + (word.startsWith(value) ? 0 : 1) }));
        }
        if (value === word) {
            setDone((d) => ({ words: d.words + 1, chars: d.chars + word.length + 1 }));
            setWords((w) => [...w.slice(1), ...randomWords(1)]);
            setInput('');
            return;
        }
        setInput(value);
    };

    const current = words[0] ?? '';
    let message = 'Type the highlighted word. The clock starts on your first key.';
    if (status === 'playing') message = `${done.words} word${done.words === 1 ? '' : 's'} so far. Keep going!`;
    if (status === 'over') message = `Time! ${wpm} WPM with ${accuracy}% accuracy.`;

    return (
        <div className="gameCard speedTyper">
            <div className="scoreBoard">
                <div className="score x"><span><Timer aria-hidden="true" /> Time</span><strong>{timeLeft}s</strong></div>
                <div className="score"><span><Target aria-hidden="true" /> Accuracy</span><strong>{accuracy}%</strong></div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best WPM</span><strong>{best}</strong></div>
            </div>

            <div className={`status ${status === 'over' ? 'done' : ''}`} aria-live="polite">{message}</div>

            <div className="timeBar" aria-hidden="true">
                <span style={{ width: `${(timeLeft / DURATION) * 100}%` }} />
            </div>

            <div className={`wordBox ${status}`}>
                <span className="current" aria-label={`Current word: ${current}`}>
                    {current.split('').map((ch, i) => {
                        let state = '';
                        if (i < input.length) state = input[i] === ch ? 'ok' : 'bad';
                        else if (i === input.length) state = 'caret';
                        // eslint-disable-next-line react/no-array-index-key
                        return <span key={i} className={state}>{ch}</span>;
                    })}
                </span>
                <span className="upcoming" aria-hidden="true">{words.slice(1, 5).join(' ')}</span>
            </div>

            <input
                ref={inputRef}
                className={`typeInput ${input && !current.startsWith(input) ? 'wrong' : ''}`}
                value={input}
                onChange={onChange}
                disabled={status === 'over' || !words.length}
                placeholder={status === 'idle' ? 'Start typing…' : ''}
                aria-label="Type the current word"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
            />

            {status === 'over' && (
                <div className="resultRow">
                    <span><Gauge aria-hidden="true" /> {wpm} WPM</span>
                    <span>{done.words} words</span>
                    <span>{keys.wrong} typos</span>
                </div>
            )}

            <button type="button" className="gameBtn" onClick={reset}>
                {status === 'over' ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
                {status === 'over' ? 'Play again' : 'New words'}
            </button>
        </div>
    );
};

export default SpeedTyper;
