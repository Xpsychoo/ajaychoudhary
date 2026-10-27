import GameLayout from '@/Components/Games/GameLayout';
import ReactionTime from '@/Components/Games/ReactionTime';

export default function ReactionTimePage() {
  return (
    <GameLayout
      title="Reaction Time"
      description="Wait for green, then tap as fast as you can. How fast are your reflexes?"
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Reaction</span> Time
          </h1>
          <h5 className="sub_head text-center">
            Are you <span className="text-green text-cursive">quick</span> enough?
          </h5>
        </div>
        <ReactionTime />
      </section>
    </GameLayout>
  );
}
