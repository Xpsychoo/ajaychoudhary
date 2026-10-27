import React, { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, Play, X } from 'lucide-react';

/** Floating bottom-right button that invites visitors to the /games page. */
const GamesFab = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="gamesFab">
            {open && (
                <div className="gamesFabPopup" role="dialog" aria-label="Play games">
                    <button type="button" className="closeBtn" onClick={() => setOpen(false)} aria-label="Close">
                        <X />
                    </button>
                    <div className="title">Got some time?</div>
                    <p>Want to play some games? Take a quick break.</p>
                    <Link href="/games" className="playBtn">
                        <Play aria-hidden="true" /> Let&apos;s play
                    </Link>
                </div>
            )}
            <button
                type="button"
                className={`fabBtn ${open ? 'active' : ''}`}
                onClick={() => setOpen((v) => !v)}
                aria-label="Games"
                aria-expanded={open}
                title="Play games"
            >
                <Gamepad2 />
            </button>
        </div>
    );
};

export default GamesFab;
