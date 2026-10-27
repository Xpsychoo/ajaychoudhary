import React, { useEffect, useRef, useState } from 'react';
import { Bug, Code, Coffee, Play, Rocket, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';

const PADS = [
    { name: 'code', Icon: Code, tone: 330 },
    { name: 'bug', Icon: Bug, tone: 392 },
    { name: 'coffee', Icon: Coffee, tone: 494 },
    { name: 'rocket', Icon: Rocket, tone: 587 },
];
const BEST_KEY = 'pattern-recall-best';

/** How long each pad stays lit while the pattern plays; longer patterns play faster. */
const stepTime = (length) => Math.max(320, 680 - length * 30);

const randomPad = () => Math.floor(Math.random() * PADS.length);

const readBest = () => {
    try {
        const value = Number(window.localStorage.getItem(BEST_KEY));
        return value > 0 ? value : 0;
    } catch {
        return 0;
    }
};

const PatternRecall = () => {
    const [status, setStatus] = useState('idle'); // idle | showing | input | over
    const [sequence, setSequence] = useState([]);
    const [position, setPosition] = useState(0);
    const [lit, setLit] = useState(null);
    const [pressed, setPressed] = useState(null); // { pad, ok }
    const [best, setBest] = useState(0);
    const [sound, setSound] = useState(true);
    const soundRef = useRef(true);
    const audio = useRef(null);

    useEffect(() => {
        setBest(readBest());
    }, []);

    useEffect(() => {
        soundRef.current = sound;
    }, [sound]);

    /** Phones only allow audio that starts from a tap, so this runs in the tap handlers before any beep. */
    const unlockAudio = () => {
        try {
            audio.current = audio.current || new (window.AudioContext || window.webkitAudioContext)();
            if (audio.current.state === 'suspended') audio.current.resume();
        } catch {
            // no Web Audio support: play silently
        }
    };

    const beep = (frequency, duration = 0.18, type = 'sine') => {
        if (!soundRef.current || !audio.current) return;
        try {
            const ctx = audio.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.value = frequency;
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain).connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch {
            // no Web Audio support: play silently
        }
    };

    // Play the pattern back one pad at a time, then hand over to the player.
    useEffect(() => {
        if (status !== 'showing') return undefined;
        const time = stepTime(sequence.length);
        const timers = [];
        sequence.forEach((pad, i) => {
            const at = 700 + i * time;
            timers.push(setTimeout(() => {
                setLit(pad);
                beep(PADS[pad].tone);
            }, at));
            timers.push(setTimeout(() => setLit(null), at + time * 0.65));
        });
        timers.push(setTimeout(() => {
            setPosition(0);
            setStatus('input');
        }, 700 + sequence.length * time));
        return () => timers.forEach(clearTimeout);
        // beep only reads refs, so it doesn't need to restart the playback
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, sequence]);

    useEffect(() => {
        if (!pressed) return undefined;
        const timer = setTimeout(() => setPressed(null), 220);
        return () => clearTimeout(timer);
    }, [pressed]);

    const level = Math.max(0, status === 'over' ? sequence.length - 1 : sequence.length);

    useEffect(() => {
        if (status !== 'over' || level <= best) return;
        setBest(level);
        try {
            window.localStorage.setItem(BEST_KEY, String(level));
        } catch {
            // storage unavailable (private mode etc.): keep the best for this visit only
        }
    }, [status, level, best]);

    const start = () => {
        unlockAudio();
        setSequence([randomPad()]);
        setPosition(0);
        setStatus('showing');
    };

    const press = (pad) => {
        if (status !== 'input') return;
        unlockAudio();
        if (pad !== sequence[position]) {
            beep(110, 0.45, 'square');
            setPressed({ pad, ok: false });
            setStatus('over');
            return;
        }
        beep(PADS[pad].tone);
        setPressed({ pad, ok: true });
        if (position + 1 === sequence.length) {
            setSequence((s) => [...s, randomPad()]);
            setStatus('showing');
        } else {
            setPosition(position + 1);
        }
    };

    let message = 'Watch the pattern, then repeat it. It grows by one each round.';
    if (status === 'showing') message = 'Watch closely…';
    if (status === 'input') message = `Your turn: ${position} of ${sequence.length}`;
    if (status === 'over') message = `Wrong pad! You remembered ${level} step${level === 1 ? '' : 's'}.`;

    return (
        <div className="gameCard patternRecall">
            <div className="scoreBoard">
                <div className="score x"><span>Level</span><strong>{level}</strong></div>
                <div className="score">
                    <span>Sound</span>
                    <button
                        type="button"
                        className="soundBtn"
                        onClick={() => setSound((s) => !s)}
                        aria-label={sound ? 'Mute sound' : 'Turn sound on'}
                        aria-pressed={sound}
                    >
                        {sound ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
                    </button>
                </div>
                <div className="score"><span><Trophy aria-hidden="true" /> Best</span><strong>{best}</strong></div>
            </div>

            <div className={`status ${status === 'over' ? 'done' : ''}`} aria-live="polite">{message}</div>

            <div className={`pads ${status}`}>
                {PADS.map(({ name, Icon }, i) => {
                    const flash = pressed?.pad === i ? (pressed.ok ? 'lit' : 'wrong') : '';
                    return (
                        <button
                            key={name}
                            type="button"
                            className={`pad ${name} ${lit === i ? 'lit' : flash}`}
                            onPointerDown={() => press(i)}
                            onClick={(e) => e.detail === 0 && press(i)}
                            disabled={status !== 'input'}
                            aria-label={name}
                        >
                            <Icon aria-hidden="true" />
                        </button>
                    );
                })}
            </div>

            {(status === 'idle' || status === 'over') && (
                <button type="button" className="gameBtn" onClick={start}>
                    {status === 'idle' ? <Play aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}
                    {status === 'idle' ? 'Start game' : 'Play again'}
                </button>
            )}
        </div>
    );
};

export default PatternRecall;
