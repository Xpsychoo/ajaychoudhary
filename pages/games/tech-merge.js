import GameLayout from '@/Components/Games/GameLayout';
import TechMerge from '@/Components/Games/TechMerge';

export default function TechMergePage() {
  return (
    <GameLayout
      title="Tech Merge"
      description="Merge ideas into code, code into apps, and grow all the way to Big Tech."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Tech</span> Merge
          </h1>
          <h5 className="sub_head text-center">
            From idea to <span className="text-green text-cursive">unicorn</span>
          </h5>
        </div>
        <TechMerge />
      </section>
    </GameLayout>
  );
}
