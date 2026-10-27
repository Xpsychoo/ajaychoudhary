import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Braces, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Pause, Play, RotateCcw, Trophy } from 'lucide-react';

const SIZE = 15;
const BEST_KEY = 'code-snake-best';
const DIRS = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
const OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' };
const KEYS = {
    ArrowUp: 'up', w: 'up', W: 'up',
    ArrowDown: 'down', s: 'down', S: 'down',
    ArrowLeft: 'left', a: 'left', A: 'left',
    ArrowRight: 'right', d: 'right', D: 'right',
};

/** Milliseconds per step; the snake speeds up as the score climbs, down to a floor. */
const speed = (score) => Math.max(65, 150 - score * 4);

const randomFood = (snake) => {
    let cell;
    do cell = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
    while (snake.some((s) => s.x === cell.x && s.y === cell.y));
    return cell;
};

const newGame = () => {
    const snake = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
    return { snake, food: randomFood(snake), score: 0, over: false };
};

/** One pure step of the game, so it is safe to run inside a state updater. */
const step = (game, dir) => {
    if (game.over) return game;
    const head = { x: game.snake[0].x + DIRS[dir].x, y: game.snake[0].y + DIRS[dir].y };
    const eats = head.x === game.food.x && head.y === game.food.y;
    // The tail moves away this step unless we eat, so it doesn't count as a collision.
    const body = eats ? game.snake : game.snake.slice(0, -1);
    const hitWall = head.x < 0 || head.y < 0 || head.x >= SIZE || head.y >= SIZE;
    if (hitWall || body.some((s) => s.x === head.x && s.y === head.y)) return { ...game, over: true };
    const snake = [head, ...body];
    return eats ? { snake, food: randomFood(snake), score: game.score + 1, over: false } : { ...game, snake };
};

const readBest = () => {
    try {
        const value = Number(window.localStorage.getItem(BEST_KEY));
        return value > 0 ? value : 0;
    } catch {
        return 0;
    }
};

const CodeSnake = () => {
    const [status, setStatus] = useState('idle'); // idle | playing | paused | over
    // Created after mount so the random food doesn't differ between server and client render.
    const [game, setGame] = useState(null);
    const [best, setBest] = useState(0);
    const dir = useRef('right');
    const queue = useRef([]); // turns pressed between ticks, applied one per tick
    const touchStart = useRef(null);

    useEffect(() => {
        setGame(newGame());
        setBest(readBest());
    }, []);

    const score = game ? game.score : 0;

    useEffect(() => {
        if (status !== 'playing') return undefined;
        const timer = setInterval(() => {
            if (queue.current.length) dir.current = queue.current.shift();
            const d = dir.current;
            setGame((g) => step(g, d));
        }, speed(score));
        return () => clearInterval(timer);
    }, [status, score]);

    useEffect(() => {
        if (!game?.over || status !== 'playing') return;
        setStatus('over');
        if (game.score > best) {
            setBest(game.score);
            try {
                window.localStorage.setItem(BEST_KEY, String(game.score));
            } catch {
                // storage unavailable (private mode etc.): keep the best for this visit only
            }
        }
    }, [game, status, best]);

    const start = () => {
        setGame(newGame());
        dir.current = 'right';
        queue.current = [];
        setStatus('playing');
    };

    const turn = useCallback((next) => {
        const last = queue.current[queue.current.length - 1] ?? dir.current;
        if (next === last || next === OPPOSITE[last] || queue.current.length >= 2) return;
        queue.current.push(next);
    }, []);

    const togglePause = useCallback(() => {
        setStatus((s) => {
            if (s === 'playing') return 'paused';
            if (s === 'paused') return 'playing';
            return s;
        });
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (status === 'idle' || status === 'over') return;
            if (KEYS[e.key]) {
                e.preventDefault(); // keep the arrow keys from scrolling the page
                if (status === 'playing') turn(KEYS[e.key]);
            } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
                e.preventDefault();
                togglePause();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [status, turn, togglePause]);

    const onTouchStart = (e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e) => {
        if (!touchStart.current || status !== 'playing') return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStart.current.x;
        const dy = t.clientY - touchStart.current.y;
        touchStart.current = null;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
        if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 'right' : 'left');
        else turn(dy > 0 ? 'down' : 'up');
    };

    const cells = new Map();
    game?.snake.forEach((s, i) => cells.set(s.y * SIZE + s.x, i === 0 ? 'head' : 'body'));
    const foodIndex = game ? game.food.y * SIZE + game.food.x : -1;

    let message = 'Eat the braces, grow your codebase. Don’t hit the walls or yourself!';
    if (status === 'playing') message = 'Arrow keys / WASD or swipe to steer';
    if (status === 'paused') message = 'Paused. Press space or Resume to continue.';
    if (status === 'over') message = `Game over! You collected ${score} brace${score === 1 ? '' : 's'}.`;

    return (
        <div className="gameCard codeSnake">
            <div className="scoreBoard">
                <div className="score x"><span>Score</span><strong>{score}</strong></div>
                <div className="score"><span>Length</span><strong>{game ? game.snake.length : 3}</strong></div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best</span><strong>{best}</strong></div>
            </div>

            <div className={`status ${status === 'over' ? 'done' : ''}`} aria-live="polite">{message}</div>

            <div
                className={`snakeBoard ${status}`}
                style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, gridTemplateRows: `repeat(${SIZE}, 1fr)` }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                role="img"
                aria-label={`Snake board, score ${score}`}
            >
                {Array.from({ length: SIZE * SIZE }, (_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={i} className={`snakeCell ${cells.get(i) ?? ''}`}>
                        {i === foodIndex && <Braces className="food" aria-hidden="true" />}
                    </span>
                ))}
            </div>

            <div className="dPad" aria-label="Direction controls">
                <button type="button" className="up" onPointerDown={() => turn('up')} disabled={status !== 'playing'} aria-label="Up"><ChevronUp /></button>
                <button type="button" className="left" onPointerDown={() => turn('left')} disabled={status !== 'playing'} aria-label="Left"><ChevronLeft /></button>
                <button type="button" className="right" onPointerDown={() => turn('right')} disabled={status !== 'playing'} aria-label="Right"><ChevronRight /></button>
                <button type="button" className="down" onPointerDown={() => turn('down')} disabled={status !== 'playing'} aria-label="Down"><ChevronDown /></button>
            </div>

            {status === 'playing' || status === 'paused' ? (
                <button type="button" className="gameBtn" onClick={togglePause}>
                    {status === 'playing' ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                    {status === 'playing' ? 'Pause' : 'Resume'}
                </button>
            ) : (
                <button type="button" className="gameBtn" onClick={start} disabled={!game}>
                    {status === 'idle' ? <Play aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}
                    {status === 'idle' ? 'Start game' : 'Play again'}
                </button>
            )}
        </div>
    );
};

export default CodeSnake;
