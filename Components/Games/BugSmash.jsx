import React, { useEffect, useRef, useState } from 'react';
import { Bug, Heart, Play, RotateCcw, Sparkles, Trophy } from 'lucide-react';

const HOLES = 9;
const LIVES = 3;
const BEST_KEY = 'bug-smash-best';

/** How long a target stays up; it shrinks as the score climbs, down to a floor. */
const lifetime = (score) => Math.max(480, 1150 - score * 22);

const readBest = () => {
    try {
        const value = Number(window.localStorage.getItem(BEST_KEY));
        return value > 0 ? value : 0;
    } catch {
        return 0;
    }
};

const BugSmash = () => {
    const [status, setStatus] = useState('idle'); // idle | playing | over
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(LIVES);
    const [best, setBest] = useState(0);
    const [target, setTarget] = useState(null); // { id, hole, kind: 'bug' | 'feature' }
    const [flash, setFlash] = useState(null); // { hole, type: 'hit' | 'oops' }
    const nextId = useRef(0);

    useEffect(() => {
        setBest(readBest());
    }, []);

    // Spawn a target after a short gap, or let the current one escape when its time runs out.
    useEffect(() => {
        if (status !== 'playing') return undefined;
        if (!target) {
            const timer = setTimeout(() => {
                nextId.current += 1;
                setTarget((prev) => {
                    let hole;
                    do hole = Math.floor(Math.random() * HOLES); while (prev && hole === prev.hole);
                    return { id: nextId.current, hole, kind: Math.random() < 0.2 ? 'feature' : 'bug' };
                });
            }, 280);
            return () => clearTimeout(timer);
        }
        const timer = setTimeout(() => {
            if (target.kind === 'bug') setLives((l) => l - 1);
            setTarget(null);
        }, lifetime(score));
        return () => clearTimeout(timer);
    }, [status, target, score]);

    useEffect(() => {
        if (status !== 'playing' || lives > 0) return;
        setStatus('over');
        setTarget(null);
        if (score > best) {
            setBest(score);
            try {
                window.localStorage.setItem(BEST_KEY, String(score));
            } catch {
                // storage unavailable (private mode etc.): keep the best for this visit only
            }
        }
    }, [lives, status, score, best]);

    useEffect(() => {
        if (!flash) return undefined;
        const timer = setTimeout(() => setFlash(null), 250);
        return () => clearTimeout(timer);
    }, [flash]);

    const start = () => {
        setScore(0);
        setLives(LIVES);
        setTarget(null);
        setStatus('playing');
    };

    const tap = (hole) => {
        if (status !== 'playing' || !target || target.hole !== hole) return;
        if (target.kind === 'bug') {
            setScore((s) => s + 1);
            setFlash({ hole, type: 'hit' });
        } else {
            setLives((l) => l - 1);
            setFlash({ hole, type: 'oops' });
        }
        setTarget(null);
    };

    let message = 'Squash the bugs before they escape. Don’t squash the features!';
    if (status === 'playing') message = 'Tap the bugs!';
    if (status === 'over') message = `Game over! You squashed ${score} bug${score === 1 ? '' : 's'}.`;

    return (
        <div className="gameCard bugSmash">
            <div className="scoreBoard">
                <div className="score x"><span>Score</span><strong>{score}</strong></div>
                <div className="score">
                    <span>Lives</span>
                    <strong className="lives" aria-label={`${lives} lives left`}>
                        {Array.from({ length: LIVES }, (_, i) => (
                            <Heart key={i} className={i < lives ? 'full' : ''} aria-hidden="true" />
                        ))}
                    </strong>
                </div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best</span><strong>{best}</strong></div>
            </div>

            <div className={`status ${status === 'over' ? 'done' : ''}`} aria-live="polite">{message}</div>

            <div className="legend">
                <span><Bug aria-hidden="true" /> Bug: tap it</span>
                <span className="feature"><Sparkles aria-hidden="true" /> Feature: leave it</span>
            </div>

            <div className={`holes ${status}`}>
                {Array.from({ length: HOLES }, (_, i) => {
                    const up = target && target.hole === i ? target : null;
                    const Icon = up && (up.kind === 'bug' ? Bug : Sparkles);
                    return (
                        <button
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            type="button"
                            className={`hole ${flash?.hole === i ? flash.type : ''}`}
                            // pointerdown reacts instantly on touch; click with detail 0 is keyboard activation
                            onPointerDown={() => tap(i)}
                            onClick={(e) => e.detail === 0 && tap(i)}
                            disabled={status !== 'playing'}
                            aria-label={up ? `Hole ${i + 1}, ${up.kind}` : `Hole ${i + 1}, empty`}
                        >
                            {up && (
                                <span key={up.id} className={`critter ${up.kind}`}>
                                    <Icon aria-hidden="true" />
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {status !== 'playing' && (
                <button type="button" className="gameBtn" onClick={start}>
                    {status === 'idle' ? <Play aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}
                    {status === 'idle' ? 'Start game' : 'Play again'}
                </button>
            )}
        </div>
    );
};

export default BugSmash;
