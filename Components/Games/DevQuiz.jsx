import React, { useEffect, useState } from 'react';
import { ArrowRight, CircleCheck, CircleX, Play, RotateCcw, Trophy } from 'lucide-react';

const ROUND = 10;
const BEST_KEY = 'dev-quiz-best';

/** The first option is always the right one; options are shuffled before they are shown. */
const QUESTIONS = [
    { q: 'What does typeof null return in JavaScript?', options: ['"object"', '"null"', '"undefined"', '"number"'] },
    { q: 'Which React hook runs side effects after a render?', options: ['useEffect', 'useState', 'useMemo', 'useContext'] },
    { q: 'Which CSS declaration turns an element into a flex container?', options: ['display: flex', 'position: flex', 'flex: 1', 'align: flex'] },
    { q: 'Which array method returns a new array with every item transformed?', options: ['map()', 'forEach()', 'find()', 'some()'] },
    { q: 'What makes === different from == in JavaScript?', options: ['It does not convert types', 'It is faster to type', 'It compares only numbers', 'It deep-compares objects'] },
    { q: 'What does JSON stand for?', options: ['JavaScript Object Notation', 'Java Standard Output Network', 'JavaScript Online Node', 'Joined Syntax Object Name'] },
    { q: 'Which keyword declares a block-scoped variable that cannot be reassigned?', options: ['const', 'let', 'var', 'static'] },
    { q: 'Which HTTP status code means “Not Found”?', options: ['404', '200', '500', '301'] },
    { q: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Styled Sections', 'Colorful Sheet Syntax'] },
    { q: 'How does a React parent usually pass data to a child component?', options: ['Props', 'Cookies', 'Global CSS', 'The URL hash'] },
    { q: 'Which git command sends your local commits to a remote?', options: ['git push', 'git pull', 'git fetch', 'git clone'] },
    { q: 'What is 0.1 + 0.2 === 0.3 in JavaScript?', options: ['false', 'true', 'undefined', 'It throws an error'] },
    { q: 'Which CSS unit is relative to the root element’s font size?', options: ['rem', 'em', 'px', 'vh'] },
    { q: 'Which method turns a JSON string into a JavaScript object?', options: ['JSON.parse()', 'JSON.stringify()', 'Object.from()', 'String.toJSON()'] },
    { q: 'Which React hook keeps a mutable value without causing a re-render?', options: ['useRef', 'useState', 'useReducer', 'useEffect'] },
    { q: 'What does \'5\' + 3 evaluate to in JavaScript?', options: ['"53"', '8', 'NaN', 'It throws an error'] },
    { q: 'Which HTTP method is typically used to create a new resource?', options: ['POST', 'GET', 'HEAD', 'OPTIONS'] },
    { q: 'Which CSS position keeps an element in place while the page scrolls?', options: ['fixed', 'relative', 'static', 'absolute'] },
    { q: 'Which operator returns the right side only when the left is null or undefined?', options: ['??', '||', '&&', '?.'] },
    { q: 'What is NaN === NaN in JavaScript?', options: ['false', 'true', 'NaN', 'undefined'] },
    { q: 'What is the default display value of a <div>?', options: ['block', 'inline', 'flex', 'inline-block'] },
    { q: 'Which HTML tag is used for the most important heading?', options: ['<h1>', '<head>', '<h6>', '<header>'] },
    { q: 'What does Array.isArray([]) return?', options: ['true', 'false', '"array"', 'undefined'] },
    { q: 'In the Next.js pages router, which folder defines the routes?', options: ['pages', 'routes', 'public', 'components'] },
    { q: 'Which method waits for all promises and rejects if any one fails?', options: ['Promise.all()', 'Promise.any()', 'Promise.race()', 'Promise.allSettled()'] },
];

const shuffle = (list) => {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
};

const newRound = () => shuffle(QUESTIONS).slice(0, ROUND).map(({ q, options }) => ({
    q,
    answer: options[0],
    options: shuffle(options),
}));

const readBest = () => {
    try {
        const value = Number(window.localStorage.getItem(BEST_KEY));
        return value > 0 ? value : 0;
    } catch {
        return 0;
    }
};

const DevQuiz = () => {
    const [status, setStatus] = useState('idle'); // idle | playing | over
    const [round, setRound] = useState([]);
    const [index, setIndex] = useState(0);
    const [picked, setPicked] = useState(null);
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);

    useEffect(() => {
        setBest(readBest());
    }, []);

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
        setRound(newRound());
        setIndex(0);
        setPicked(null);
        setScore(0);
        setStatus('playing');
    };

    const question = round[index];

    const pick = (option) => {
        if (picked !== null) return;
        setPicked(option);
        if (option === question.answer) setScore((s) => s + 1);
    };

    const next = () => {
        if (index + 1 === round.length) {
            setStatus('over');
            return;
        }
        setIndex(index + 1);
        setPicked(null);
    };

    let message = `${ROUND} quick questions on JavaScript, React, CSS and the web. How many can you get?`;
    if (status === 'playing') message = question.q;
    if (status === 'over') {
        message = `You scored ${score} out of ${ROUND}. ${score >= 8 ? 'Senior dev material!' : score >= 5 ? 'Solid work!' : 'Time to hit the docs!'}`;
    }

    return (
        <div className="gameCard devQuiz">
            <div className="scoreBoard">
                <div className="score x"><span>Score</span><strong>{score}</strong></div>
                <div className="score"><span>Question</span><strong>{status === 'playing' ? `${index + 1}/${ROUND}` : '–'}</strong></div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best</span><strong>{best}</strong></div>
            </div>

            {status === 'playing' && (
                <div className="timeBar" aria-hidden="true">
                    <span style={{ width: `${((index + (picked !== null ? 1 : 0)) / ROUND) * 100}%` }} />
                </div>
            )}

            <div className={`status question ${status === 'over' ? 'done' : ''}`} aria-live="polite">{message}</div>

            {status === 'playing' && (
                <div className="quizOptions">
                    {question.options.map((option) => {
                        let state = '';
                        if (picked !== null && option === question.answer) state = 'right';
                        else if (option === picked) state = 'wrong';
                        return (
                            <button
                                key={option}
                                type="button"
                                className={`quizOption ${state}`}
                                onClick={() => pick(option)}
                                disabled={picked !== null}
                            >
                                <span>{option}</span>
                                {state === 'right' && <CircleCheck aria-label="Correct" />}
                                {state === 'wrong' && <CircleX aria-label="Wrong" />}
                            </button>
                        );
                    })}
                </div>
            )}

            {status === 'playing' && picked !== null && (
                <button type="button" className="gameBtn" onClick={next}>
                    {index + 1 === round.length ? 'See score' : 'Next question'} <ArrowRight aria-hidden="true" />
                </button>
            )}

            {status !== 'playing' && (
                <button type="button" className="gameBtn" onClick={start}>
                    {status === 'idle' ? <Play aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}
                    {status === 'idle' ? 'Start quiz' : 'Play again'}
                </button>
            )}
        </div>
    );
};

export default DevQuiz;
