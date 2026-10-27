import GameLayout from '@/Components/Games/GameLayout';
import DevQuiz from '@/Components/Games/DevQuiz';

export default function DevQuizPage() {
  return (
    <GameLayout
      title="Dev Quiz"
      description="Ten quick questions on JavaScript, React, CSS and the web."
      back={{ href: '/games', label: 'All games' }}
    >
      <section className="homeSecHead">
        <div className="main-head">
          <h1 className="head text-center">
            <span className="text-green">Dev</span> Quiz
          </h1>
          <h5 className="sub_head text-center">
            Test your <span className="text-green text-cursive">dev knowledge</span>
          </h5>
        </div>
        <DevQuiz />
      </section>
    </GameLayout>
  );
}
