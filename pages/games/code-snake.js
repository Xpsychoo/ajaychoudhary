import GameLayout from '@/Components/Games/GameLayout';
import CodeSnake from '@/Components/Games/CodeSnake';

export default function CodeSnakePage() {
  return (
    <GameLayout
      title="Code Snake"
      description="Eat the braces and grow your snake without crashing into the walls."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Code</span> Snake
          </h1>
          <h5 className="sub_head text-center">
            Grow your <span className="text-green text-cursive">codebase</span>
          </h5>
        </div>
        <CodeSnake />
      </section>
    </GameLayout>
  );
}
