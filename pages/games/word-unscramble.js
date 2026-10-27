import GameLayout from '@/Components/Games/GameLayout';
import WordUnscramble from '@/Components/Games/WordUnscramble';

export default function WordUnscramblePage() {
  return (
    <GameLayout
      title="Word Unscramble"
      description="Unscramble as many coding words as you can in 60 seconds."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Word</span> Unscramble
          </h1>
          <h5 className="sub_head text-center">
            Untangle the <span className="text-green text-cursive">letters</span>
          </h5>
        </div>
        <WordUnscramble />
      </section>
    </GameLayout>
  );
}
