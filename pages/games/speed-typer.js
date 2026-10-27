import GameLayout from '@/Components/Games/GameLayout';
import SpeedTyper from '@/Components/Games/SpeedTyper';

export default function SpeedTyperPage() {
  return (
    <GameLayout
      title="Speed Typer"
      description="Type as many coding keywords as you can in 30 seconds."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Speed</span> Typer
          </h1>
          <h5 className="sub_head text-center">
            How fast are your <span className="text-green text-cursive">fingers</span>?
          </h5>
        </div>
        <SpeedTyper />
      </section>
    </GameLayout>
  );
}
