import GameLayout from '@/Components/Games/GameLayout';
import PatternRecall from '@/Components/Games/PatternRecall';

export default function PatternRecallPage() {
  return (
    <GameLayout
      title="Pattern Recall"
      description="Watch the pattern of lights and sounds, then repeat it back."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Pattern</span> Recall
          </h1>
          <h5 className="sub_head text-center">
            Remember the <span className="text-green text-cursive">sequence</span>
          </h5>
        </div>
        <PatternRecall />
      </section>
    </GameLayout>
  );
}
