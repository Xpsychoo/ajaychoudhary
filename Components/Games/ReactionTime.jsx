import React, { useEffect, useRef, useState } from 'react';
import { Hourglass, MousePointerClick, RotateCcw, TriangleAlert, Trophy, Zap } from 'lucide-react';

const BEST_KEY = 'reaction-time-best';
const KEEP = 5; // the average covers this many recent tries

const rating = (ms) => {
    if (ms < 200) return 'Lightning fast!';
    if (ms < 250) return 'Great reflexes!';
    if (ms < 300) return 'Nice and quick.';
    if (ms < 400) return 'Not bad.';
    return 'Keep practising!';
};

const readBest = () => {
    try {
        const value = Number(window.localStorage.getItem(BEST_KEY));
        return value > 0 ? value : null;
    } catch {
        return null;
    }
};

const ReactionTime = () => {
    const [phase, setPhase] = useState('idle'); // idle | waiting | ready | result | early
    const [times, setTimes] = useState([]); // most recent first
    const [best, setBest] = useState(null);
    const readyAt = useRef(0);

    useEffect(() => {
        setBest(readBest());
    }, []);

    // Turn green after a random wait so the moment can't be guessed.
    useEffect(() => {
        if (phase !== 'waiting') return undefined;
        const timer = setTimeout(() => {
            readyAt.current = performance.now();
            setPhase('ready');
        }, 1500 + Math.random() * 2500);
        return () => clearTimeout(timer);
    }, [phase]);

    const tap = () => {
        if (phase === 'waiting') {
            setPhase('early');
            return;
        }
        if (phase !== 'ready') {
            setPhase('waiting');
            return;
        }
        const ms = Math.round(performance.now() - readyAt.current);
        setTimes((t) => [ms, ...t].slice(0, KEEP));
        setPhase('result');
        if (best === null || ms < best) {
            setBest(ms);
            try {
                window.localStorage.setItem(BEST_KEY, String(ms));
            } catch {
                // storage unavailable (private mode etc.): keep the best for this visit only
            }
        }
    };

    const last = times[0];
    const average = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null;

    const screens = {
        idle: { Icon: MousePointerClick, title: 'Tap to start', text: 'Wait for green, then tap as fast as you can.' },
        waiting: { Icon: Hourglass, title: 'Wait for green…', text: 'Don’t tap yet!' },
        ready: { Icon: Zap, title: 'TAP!', text: '' },
        result: { Icon: RotateCcw, title: `${last} ms`, text: `${rating(last ?? 0)} Tap to go again.` },
        early: { Icon: TriangleAlert, title: 'Too soon!', text: 'You tapped before it turned green. Tap to try again.' },
    };
    const { Icon, title, text } = screens[phase];

    return (
        <div className="gameCard reactionTime">
            <div className="scoreBoard">
                <div className="score x"><span>Last</span><strong>{last ? `${last}ms` : '–'}</strong></div>
                <div className="score"><span>Avg of {KEEP}</span><strong>{average ? `${average}ms` : '–'}</strong></div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best</span><strong>{best ? `${best}ms` : '–'}</strong></div>
            </div>

            <button
                type="button"
                className={`reactionPad ${phase}`}
                // pointerdown reacts the instant a finger lands; click with detail 0 is keyboard activation
                onPointerDown={tap}
                onClick={(e) => e.detail === 0 && tap()}
                aria-live="polite"
            >
                <Icon aria-hidden="true" />
                <strong>{title}</strong>
                {text && <span>{text}</span>}
            </button>

            {times.length > 0 && (
                <div className="recentTimes" aria-label="Recent times">
                    {times.map((ms, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={i} className={ms === best ? 'best' : ''}>{ms}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReactionTime;
