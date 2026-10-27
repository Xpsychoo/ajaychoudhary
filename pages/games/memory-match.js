import GameLayout from '@/Components/Games/GameLayout';
import MemoryMatch from '@/Components/Games/MemoryMatch';

export default function MemoryMatchPage() {
  return (
    <GameLayout
      title="Memory Match"
      description="Flip the cards and find all the matching pairs."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Memory</span> Match
          </h1>
          <h5 className="sub_head text-center">
            Flip &amp; find <span className="text-green text-cursive">the pairs</span>
          </h5>
        </div>
        <MemoryMatch />
      </section>
    </GameLayout>
  );
}
