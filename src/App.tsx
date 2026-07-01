import TicTacToe from './TicTacToe'
import Tabs from './Tabs';

export default function App() {
    const tabs = [
      {
        name: "Tic Tac Toe",
        value: "tic-tac-toe",
        content: <TicTacToe />,
      },
      {
        name: "CSS FlexBox",
        value: "css-flexbox",
        content: "Coming Soon...",
      },
    ];

    return (
        <>        
            <Tabs tabs={tabs} />
        </>
    );
}
