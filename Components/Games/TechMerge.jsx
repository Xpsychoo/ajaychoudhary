import React, { useEffect, useRef, useState } from 'react';
import {
    AppWindow, Box, Building2, Code, Globe, Lightbulb, Play, Puzzle, Rocket, RotateCcw, Sparkles, Trophy,
} from 'lucide-react';

const N = 5;
const BEST_KEY = 'tech-merge-best';
/** Two tiles of one tier merge into the next. Index + 1 is the tier's level. */
const TIERS = [
    { name: 'Idea', Icon: Lightbulb },
    { name: 'Code', Icon: Code },
    { name: 'Component', Icon: Puzzle },
    { name: 'Feature', Icon: Box },
    { name: 'App', Icon: AppWindow },
    { name: 'Launch', Icon: Rocket },
    { name: 'Startup', Icon: Building2 },
    { name: 'Unicorn', Icon: Sparkles },
    { name: 'Big Tech', Icon: Globe },
];
const MAX = TIERS.length;
const UNICORN = 8;

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

const canMerge = (a, b) => a && b && a.level === b.level && a.level < MAX;

/** Merging two tiles of one level is worth more the higher the tier. */
const points = (level) => 5 * 2 ** level;

const isStuck = (board) => board.every(Boolean)
    && !board.some((tile, i) => neighbours(i).some((j) => canMerge(tile, board[j])));

const readBest = () => {
    try {
        const value = Number(window.localStorage.getItem(BEST_KEY));
        return value > 0 ? value : 0;
    } catch {
        return 0;
    }
};

const TechMerge = () => {
    // Filled after mount so the random tiles don't differ between server and client render.
    const [board, setBoard] = useState(null);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [top, setTop] = useState(1); // highest level reached this game
    const [best, setBest] = useState(0);
    const [note, setNote] = useState(null);
    const nextId = useRef(0);

    /** Drops `count` new Idea/Code tiles into random empty cells of `cells` (mutates it). */
    const spawn = (cells, count) => {
        for (let n = 0; n < count; n += 1) {
            const empty = cells.map((t, i) => (t ? -1 : i)).filter((i) => i >= 0);
            if (!empty.length) return;
            nextId.current += 1;
            cells[empty[Math.floor(Math.random() * empty.length)]] = {
                id: nextId.current,
                level: Math.random() < 0.8 ? 1 : 2,
            };
        }
    };

    const reset = () => {
        const cells = Array(N * N).fill(null);
        spawn(cells, 5);
        setBoard(cells);
        setSelected(null);
        setScore(0);
        setTop(Math.max(...cells.filter(Boolean).map((t) => t.level)));
        setNote(null);
    };

    useEffect(() => {
        reset();
        setBest(readBest());
        // reset only touches refs and setters
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const over = board !== null && isStuck(board);

    useEffect(() => {
        if (!over || score <= best) return;
        setBest(score);
        try {
            window.localStorage.setItem(BEST_KEY, String(score));
        } catch {
            // storage unavailable (private mode etc.): keep the best for this visit only
        }
    }, [over, score, best]);

    const isTarget = (i) => {
        if (selected === null || i === selected) return false;
        if (!board[i]) return true;
        return neighbours(selected).includes(i) && canMerge(board[selected], board[i]);
    };

    const tap = (i) => {
        if (!board || over) return;
        if (selected !== null && isTarget(i)) {
            const cells = [...board];
            const tile = cells[selected];
            cells[selected] = null;
            if (cells[i]) {
                // merge: the pair becomes one tile of the next tier where it landed
                const level = tile.level + 1;
                nextId.current += 1;
                cells[i] = { id: nextId.current, level, merged: true };
                setScore((s) => s + points(level));
                if (level > top) {
                    setTop(level);
                    setNote(level === UNICORN
                        ? 'You built a Unicorn! Keep going for Big Tech.'
                        : `New tier unlocked: ${TIERS[level - 1].name}!`);
                } else {
                    setNote(null);
                }
                spawn(cells, 1);
            } else {
                cells[i] = tile;
                setNote('Moving costs you: 2 new tiles dropped in.');
                spawn(cells, 2);
            }
            setBoard(cells);
            setSelected(null);
            return;
        }
        setSelected(board[i] && i !== selected ? i : null);
    };

    let message = 'Tap a tile, then a matching neighbour to merge it. Or move it to an empty cell (costs 2 new tiles).';
    if (note) message = note;
    if (selected !== null) message = `${TIERS[board[selected].level - 1].name} selected: tap a matching neighbour or an empty cell.`;
    if (over) message = `Board full! You reached ${TIERS[top - 1].name} with ${score} points.`;

    return (
        <div className="gameCard techMerge">
            <div className="scoreBoard">
                <div className="score x"><span>Score</span><strong>{score}</strong></div>
                <div className="score"><span>Top tier</span><strong>{TIERS[top - 1].name}</strong></div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best</span><strong>{best}</strong></div>
            </div>

            <ol className="tierChain" aria-label="Merge chain">
                {TIERS.map(({ name, Icon }, i) => (
                    <li key={name} className={`lvl-${i + 1} ${i < top ? 'unlocked' : ''}`} title={i < top ? name : 'Locked'}>
                        {i < top ? <Icon aria-label={name} /> : <span aria-label="Locked">?</span>}
                    </li>
                ))}
            </ol>

            <div className={`status ${over ? 'done' : ''}`} aria-live="polite">{message}</div>

            <div className={`mergeBoard ${over ? 'over' : ''}`}>
                {(board ?? Array(N * N).fill(null)).map((tile, i) => {
                    const tier = tile && TIERS[tile.level - 1];
                    const target = isTarget(i);
                    return (
                        <button
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            type="button"
                            className={`mergeCell ${selected === i ? 'selected' : ''} ${target ? (tile ? 'mergeTarget' : 'moveTarget') : ''}`}
                            onClick={() => tap(i)}
                            disabled={!board || over}
                            aria-label={tile ? `${tier.name}, level ${tile.level}` : 'Empty cell'}
                        >
                            {tile && (
                                <span key={tile.id} className={`mergeTile lvl-${tile.level} ${tile.merged ? 'merged' : ''}`}>
                                    <tier.Icon aria-hidden="true" />
                                    <small>{tier.name}</small>
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <button type="button" className="gameBtn" onClick={reset}>
                {over ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
                {over ? 'Play again' : 'New game'}
            </button>
        </div>
    );
};

export default TechMerge;
