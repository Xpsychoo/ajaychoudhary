import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Timer, Trophy } from 'lucide-react';

const N = 4;
const BEST_KEY = 'number-slide-best';
const SOLVED = [...Array.from({ length: N * N - 1 }, (_, i) => i + 1), 0]; // 0 is the gap

const neighbours = (i) => {
    const row = Math.floor(i / N);
    const col = i % N;
    const list = [];
    if (row > 0) list.push(i - N);
    if (row < N - 1) list.push(i + N);
    if (col > 0) list.push(i - 1);
    if (col < N - 1) list.push(i + 1);
    return list;
};

const isSolved = (board) => board.every((v, i) => v === SOLVED[i]);

/** Shuffle by making random legal slides from the solved board, so the puzzle is always solvable. */
const shuffledBoard = () => {
    let board;
    do {
        board = [...SOLVED];
        let gap = board.length - 1;
        let prev = -1;
        for (let n = 0; n < 250; n += 1) {
            const options = neighbours(gap).filter((i) => i !== prev);
            const pick = options[Math.floor(Math.random() * options.length)];
            [board[gap], board[pick]] = [board[pick], board[gap]];
            prev = gap;
            gap = pick;
        }
    } while (isSolved(board));
    return board;
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

const NumberSlide = () => {
    // Shuffled after mount so the server-rendered HTML matches the first client render.
    const [board, setBoard] = useState(null);
    const [moves, setMoves] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [best, setBest] = useState(null);
    const touchStart = useRef(null);

    const won = board !== null && isSolved(board);

    const reset = () => {
        setBoard(shuffledBoard());
        setMoves(0);
        setSeconds(0);
    };

    useEffect(() => {
        reset();
        setBest(readBest());
    }, []);

    useEffect(() => {
        if (moves === 0 || won) return undefined;
        const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(timer);
    }, [moves, won]);

    useEffect(() => {
        if (!won || moves === 0 || (best !== null && moves >= best)) return;
        setBest(moves);
        try {
            window.localStorage.setItem(BEST_KEY, String(moves));
        } catch {
            // storage unavailable (private mode etc.): keep the best for this visit only
        }
    }, [won, moves, best]);

    const slide = (i) => {
        if (!board || won) return false;
        const gap = board.indexOf(0);
        if (!neighbours(gap).includes(i)) return false;
        const next = [...board];
        [next[gap], next[i]] = [next[i], next[gap]];
        setBoard(next);
        setMoves((m) => m + 1);
        return true;
    };

    /** Index of the tile that would slide in `direction` into the gap, or -1 (e.g. left slides the tile right of the gap). */
    const tileFor = (direction) => {
        const gap = board.indexOf(0);
        const row = Math.floor(gap / N);
        const col = gap % N;
        if (direction === 'left') return col < N - 1 ? gap + 1 : -1;
        if (direction === 'right') return col > 0 ? gap - 1 : -1;
        if (direction === 'up') return row < N - 1 ? gap + N : -1;
        return row > 0 ? gap - N : -1;
    };

    const onTouchStart = (e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
    };

    // A swipe slides a tile; a short tap falls through to the tile's own click.
    const onTouchEnd = (e) => {
        if (!touchStart.current || !board) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStart.current.x;
        const dy = t.clientY - touchStart.current.y;
        touchStart.current = null;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
        e.preventDefault(); // don't also treat the swipe as a tap on the tile under the finger
        if (Math.abs(dx) > Math.abs(dy)) slide(tileFor(dx > 0 ? 'right' : 'left'));
        else slide(tileFor(dy > 0 ? 'down' : 'up'));
    };

    useEffect(() => {
        const onKey = (e) => {
            const direction = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' }[e.key];
            if (!board || !direction) return;
            if (slide(tileFor(direction))) e.preventDefault();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    return (
        <div className="gameCard numberSlide">
            <div className="scoreBoard">
                <div className="score x"><span>Moves</span><strong>{moves}</strong></div>
                <div className="score"><span><Timer aria-hidden="true" /> Time</span><strong>{formatTime(seconds)}</strong></div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best</span><strong>{best ?? '–'}</strong></div>
            </div>

            <div className={`status ${won ? 'done' : ''}`} aria-live="polite">
                {won
                    ? `Solved in ${moves} moves and ${formatTime(seconds)}!`
                    : 'Slide the tiles into order, 1 to 15. Tap or swipe a tile, or use the arrow keys.'}
            </div>

            <div className={`slideBoard ${won ? 'won' : ''}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {board && board.map((value, i) => value !== 0 && (
                    <button
                        key={value}
                        type="button"
                        className={`slideTile ${value === i + 1 ? 'home' : ''}`}
                        style={{ transform: `translate(${(i % N) * 100}%, ${Math.floor(i / N) * 100}%)` }}
                        onClick={() => slide(i)}
                        disabled={won}
                        aria-label={`Tile ${value}`}
                    >
                        <span>{value}</span>
                    </button>
                ))}
            </div>

            <button type="button" className="gameBtn" onClick={reset}>
                <RotateCcw aria-hidden="true" /> {won ? 'Play again' : 'Shuffle'}
            </button>
        </div>
    );
};

export default NumberSlide;
