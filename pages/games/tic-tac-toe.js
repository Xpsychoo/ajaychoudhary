import GameLayout from '@/Components/Games/GameLayout';
import TicTacToe from '@/Components/Games/TicTacToe';

export default function TicTacToePage() {
  return (
    <GameLayout
      title="Tic Tac Toe"
      description="Play Tic Tac Toe against the computer or a friend."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Tic Tac</span> Toe
          </h1>
          <h5 className="sub_head text-center">
            Three in a row <span className="text-green text-cursive">wins</span>
          </h5>
        </div>
        <TicTacToe />
      </section>
    </GameLayout>
  );
}
