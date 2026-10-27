import Link from 'next/link';
import { ArrowRight, Hourglass } from 'lucide-react';
import GameLayout from '@/Components/Games/GameLayout';
import { games } from '@/data/games';

export default function Games() {
  return (
    <GameLayout title="Games" description="Take a quick break and play a game on Ajay Choudhary's portfolio.">
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Game</span> Zone
          </h1>
          <h5 className="sub_head text-center">
            Got some time? <span className="text-green text-cursive">Let&apos;s play</span>
          </h5>
        </div>

        <div className="row g-4 gamesGrid">
          {games.map(({ slug, name, Icon, tagline, description }) => (
            <div key={slug} className="col-lg-4 col-md-6 col-12">
              <Link href={`/games/${slug}`} className="gameTile">
                <span className="cardIcon"><Icon aria-hidden="true" /></span>
                <span className="tagline">{tagline}</span>
                <span className="name">{name}</span>
                <span className="desc">{description}</span>
                <span className="play">
                  Play now <ArrowRight aria-hidden="true" />
                </span>
              </Link>
            </div>
          ))}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="gameTile comingSoon" aria-disabled="true">
              <span className="cardIcon"><Hourglass aria-hidden="true" /></span>
              <span className="tagline">Stay tuned</span>
              <span className="name">More games coming soon</span>
              <span className="desc">New games are on the way. Check back later for more ways to take a break.</span>
              <span className="play">Coming soon</span>
            </div>
          </div>
        </div>
      </section>
    </GameLayout>
  );
}
