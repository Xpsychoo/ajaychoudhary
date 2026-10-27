import { Brain, Bug, CircleHelp, Combine, Grid3x3, Keyboard, Lightbulb, Puzzle, Shuffle, Worm, Zap } from 'lucide-react';

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
    {
        slug: 'code-snake',
        name: 'Code Snake',
        Icon: Worm,
        tagline: 'Eat, grow, survive',
        description: 'Steer with the arrow keys or swipe. Gobble the braces to grow, and don’t crash into the walls or yourself.',
    },
    {
        slug: 'speed-typer',
        name: 'Speed Typer',
        Icon: Keyboard,
        tagline: '30-second sprint',
        description: 'Type as many coding keywords as you can before the clock runs out. How high can your WPM go?',
    },
    {
        slug: 'pattern-recall',
        name: 'Pattern Recall',
        Icon: Lightbulb,
        tagline: 'Test your memory',
        description: 'Watch the pads light up, then repeat the pattern. It grows by one step every round.',
    },
    {
        slug: 'reaction-time',
        name: 'Reaction Time',
        Icon: Zap,
        tagline: 'Test your reflexes',
        description: 'Wait for the screen to turn green, then tap as fast as you can. Tap too early and you start over.',
    },
    {
        slug: 'number-slide',
        name: 'Number Slide',
        Icon: Puzzle,
        tagline: 'Sliding puzzle',
        description: 'Slide the numbered tiles back into order from 1 to 15 in as few moves as you can.',
    },
    {
        slug: 'dev-quiz',
        name: 'Dev Quiz',
        Icon: CircleHelp,
        tagline: '10 quick questions',
        description: 'Test what you know about JavaScript, React, CSS and the web. Each round picks a fresh set of questions.',
    },
    {
        slug: 'word-unscramble',
        name: 'Word Unscramble',
        Icon: Shuffle,
        tagline: '60-second word hunt',
        description: 'Unscramble coding words against the clock. Stuck? Grab a hint or skip to the next one.',
    },
    {
        slug: 'tech-merge',
        name: 'Tech Merge',
        Icon: Combine,
        tagline: 'Idea to unicorn',
        description: 'Merge matching neighbours to climb from Idea to Big Tech. Moving a tile drops in two more, so plan ahead.',
    },
];
