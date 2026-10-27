import GameLayout from '@/Components/Games/GameLayout';
import NumberSlide from '@/Components/Games/NumberSlide';

export default function NumberSlidePage() {
  return (
    <GameLayout
      title="Number Slide"
      description="Slide the numbered tiles back into order in as few moves as you can."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Number</span> Slide
          </h1>
          <h5 className="sub_head text-center">
            Put things in <span className="text-green text-cursive">order</span>
          </h5>
        </div>
        <NumberSlide />
      </section>
    </GameLayout>
  );
}
