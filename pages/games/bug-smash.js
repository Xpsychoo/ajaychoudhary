import GameLayout from '@/Components/Games/GameLayout';
import BugSmash from '@/Components/Games/BugSmash';

export default function BugSmashPage() {
  return (
    <GameLayout
      title="Bug Smash"
      description="Squash the bugs before they escape, but leave the features alone."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Bug</span> Smash
          </h1>
          <h5 className="sub_head text-center">
            Ship it <span className="text-green text-cursive">bug-free</span>
          </h5>
        </div>
        <BugSmash />
      </section>
    </GameLayout>
  );
}
