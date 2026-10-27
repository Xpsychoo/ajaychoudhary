import { Brain, Bug, Grid3x3 } from 'lucide-react';

/** Each game lives at /games/<slug>. Add a page in pages/games/ and an entry here to list a new one. */
export const games = [
    {
        slug: 'tic-tac-toe',
        name: 'Tic Tac Toe',
        Icon: Grid3x3,
        tagline: 'Classic X vs O',
        description: 'Line up three in a row. Play against the computer or a friend on the same screen.',
    },
    {
        slug: 'memory-match',
        name: 'Memory Match',
        Icon: Brain,
        tagline: 'Flip & find pairs',
        description: 'Flip the cards and match all eight pairs in as few moves as you can.',
    },
    {
        slug: 'bug-smash',
        name: 'Bug Smash',
        Icon: Bug,
        tagline: 'Quick reflexes',
        description: 'Tap the bugs before they escape, but don’t squash the features. It gets faster as you go.',
    },
];
