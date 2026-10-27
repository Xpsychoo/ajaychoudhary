import React, { useEffect, useState } from 'react';
import { Bot, RotateCcw, Users } from 'lucide-react';

const LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

const emptyBoard = () => Array(9).fill(null);

const findWinner = (board) => {
    for (const line of LINES) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return { player: board[a], line };
    }
    return null;
};

/** A cell that completes a line for `player`, or -1. */
const finishingMove = (board, player) => {
    for (const [a, b, c] of LINES) {
        const cells = [a, b, c];
        const mine = cells.filter((i) => board[i] === player).length;
        const empty = cells.filter((i) => !board[i]);
        if (mine === 2 && empty.length === 1) return empty[0];
    }
    return -1;
};

/** Win if possible, otherwise block, then centre, corners, sides. Beatable but not careless. */
const computerMove = (board) => {
    const win = finishingMove(board, 'O');
    if (win !== -1) return win;
    const block = finishingMove(board, 'X');
    if (block !== -1) return block;
    if (!board[4]) return 4;
    const pick = (cells) => {
        const free = cells.filter((i) => !board[i]);
        return free.length ? free[Math.floor(Math.random() * free.length)] : -1;
    };
    const corner = pick([0, 2, 6, 8]);
    return corner !== -1 ? corner : pick([1, 3, 5, 7]);
};

const MODES = [
    { key: 'cpu', label: 'vs Computer', Icon: Bot },
    { key: 'pvp', label: '2 Players', Icon: Users },
];

const TicTacToe = () => {
    const [board, setBoard] = useState(emptyBoard);
    const [xIsNext, setXIsNext] = useState(true);
    const [mode, setMode] = useState('cpu');
    const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });

    const result = findWinner(board);
    const isDraw = !result && board.every(Boolean);
    const gameOver = Boolean(result) || isDraw;
    const computerTurn = mode === 'cpu' && !xIsNext && !gameOver;

    useEffect(() => {
        if (result) setScores((s) => ({ ...s, [result.player]: s[result.player] + 1 }));
        else if (isDraw) setScores((s) => ({ ...s, draw: s.draw + 1 }));
        // only count each finished round once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameOver]);

    useEffect(() => {
        if (!computerTurn) return undefined;
        const timer = setTimeout(() => play(computerMove(board)), 450);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [computerTurn, board]);

    function play(i) {
        if (board[i] || gameOver) return;
        const next = [...board];
        next[i] = xIsNext ? 'X' : 'O';
        setBoard(next);
        setXIsNext(!xIsNext);
    }

    const newRound = () => {
        setBoard(emptyBoard());
        setXIsNext(true);
    };

    const switchMode = (key) => {
        setMode(key);
        setScores({ X: 0, O: 0, draw: 0 });
        newRound();
    };

    const oName = mode === 'cpu' ? 'Computer' : 'Player O';
    const xName = mode === 'cpu' ? 'You' : 'Player X';
    let status;
    if (result) status = `${result.player === 'X' ? xName : oName} ${result.player === 'X' && mode === 'cpu' ? 'win' : 'wins'}!`;
    else if (isDraw) status = "It's a draw!";
    else if (computerTurn) status = 'Computer is thinking…';
    else if (mode === 'cpu') status = 'Your turn (X)';
    else status = `${xIsNext ? xName : oName}'s turn (${xIsNext ? 'X' : 'O'})`;

    return (
        <div className="gameCard ticTacToe">
            <div className="modeSwitch" role="group" aria-label="Game mode">
                {MODES.map(({ key, label, Icon }) => (
                    <button
                        key={key}
                        type="button"
                        className={mode === key ? 'active' : ''}
                        onClick={() => switchMode(key)}
                        aria-pressed={mode === key}
                    >
                        <Icon aria-hidden="true" /> {label}
                    </button>
                ))}
            </div>

            <div className="scoreBoard">
                <div className="score x"><span>{xName} (X)</span><strong>{scores.X}</strong></div>
                <div className="score"><span>Draws</span><strong>{scores.draw}</strong></div>
                <div className="score o"><span>{oName} (O)</span><strong>{scores.O}</strong></div>
            </div>

            <div className={`status ${gameOver ? 'done' : ''}`} aria-live="polite">{status}</div>

            <div className="board">
                {board.map((value, i) => (
                    <button
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        type="button"
                        className={`cell ${value ? value.toLowerCase() : ''} ${result?.line.includes(i) ? 'win' : ''}`}
                        onClick={() => play(i)}
                        disabled={Boolean(value) || gameOver || computerTurn}
                        aria-label={value ? `Cell ${i + 1}, ${value}` : `Cell ${i + 1}, empty`}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <button type="button" className="gameBtn" onClick={newRound}>
                <RotateCcw aria-hidden="true" /> {gameOver ? 'Play again' : 'Restart round'}
            </button>
        </div>
    );
};

export default TicTacToe;
