import { useState } from 'react';

type SquareProps = {
    text: string;
    handleClick: () => void;
    winningCombination: number[];
    id: number;
};

type HistoryStepProps = {
    text: string;
    handleClick: () => void;
};

type GameBoardProps = {
    boardValues: string[];
    handleClick: (id: number) => void;
    winningCombination: number[];
};

function Square({ text, handleClick, winningCombination, id }: SquareProps) {
    return <button style={{ backgroundColor: winningCombination.includes(id) ? 'lightgreen' : 'white' }} className="square" onClick={handleClick}>{text}</button>;
}

function HistoryStep({ text, handleClick}: HistoryStepProps) {
    return (
        <button 
            onClick={handleClick}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            {text}
        </button>
    );
}

function GameBoard({ boardValues, handleClick, winningCombination }: GameBoardProps) {
    return (
        <>
            <div className="board-row">
                <Square winningCombination={winningCombination} id={0} key={0} text={boardValues[0]} handleClick={() => handleClick(0)} />
                <Square winningCombination={winningCombination} id={1} key={1} text={boardValues[1]} handleClick={() => handleClick(1)} />
                <Square winningCombination={winningCombination} id={2} key={2} text={boardValues[2]} handleClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square winningCombination={winningCombination} id={3} key={3} text={boardValues[3]} handleClick={() => handleClick(3)} />
                <Square winningCombination={winningCombination} id={4} key={4} text={boardValues[4]} handleClick={() => handleClick(4)} />
                <Square winningCombination={winningCombination} id={5} key={5} text={boardValues[5]} handleClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square winningCombination={winningCombination} id={6} key={6} text={boardValues[6]} handleClick={() => handleClick(6)} />
                <Square winningCombination={winningCombination} id={7} key={7} text={boardValues[7]} handleClick={() => handleClick(7)} />
                <Square winningCombination={winningCombination} id={8} key={8} text={boardValues[8]} handleClick={() => handleClick(8)} />
            </div>
        </>
    );
}

export default function TicTacToe() {
    const [boardValues, setBoardValues] = useState(['', '', '', '', '', '', '', '', '']);
    const [nextPlayer, setNextPlayer] = useState("X");
    const [winner, setWinner] = useState("");
    // 0th place is player who played current step, rest are board values after playing current step
    const [history, setHistory] = useState([['X', '', '', '', '', '', '', '', '', '']]);
    const [winningCombination, setWinningCombination] = useState<number[]>([]);

    const checkWinnner = (board: string[]) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (const combination in winningCombinations) {
            const indices = winningCombinations[combination];
            if (board[indices[0]] !== '' && board[indices[0]] === board[indices[1]] && board[indices[1]] === board[indices[2]]) {
                setWinner(nextPlayer);
                setWinningCombination([...indices]);
                return;
            }
        }
    }

    const handleClick = (id: number) => {
        // If square already clicked, ignore
        if (winner !== '' || boardValues[id] !== '') {
            return;
        }

        // Set the current player's icon in the clicked square on the board
        let newBoardValues = [...boardValues];
        newBoardValues[id] = nextPlayer;
        setBoardValues(newBoardValues);

        // Add the new board values to the history
        let newHistory = [...history];
        const currentPlayer = nextPlayer;
        newHistory.push([currentPlayer, ...newBoardValues]);
        setHistory(newHistory);

        // Check Winner
        checkWinnner(newBoardValues);

        // Switch player
        setNextPlayer(nextPlayer === "X" ? "O" : "X");
    }

    const goToStep = (step: number) => {
        // Update board values to the selected step in history
        let newBoardValues = [...boardValues];
        newBoardValues = history[step].slice(1);
        setBoardValues(newBoardValues);
        // Delete later steps from history
        setHistory(history.slice(0, step + 1));
        // Update next player to opposite of the player who played in the selected step
        setNextPlayer(history[step][0] === "X" ? "O" : "X");
        // If restarting game
        if (step === 0) {
            setNextPlayer("X");
        }
        // If user moves back in history, reset winner
        setWinner("");
        setWinningCombination([]);

    }

    const historySteps = history.map((_, index) => {
        const text = index === 0 ? 'Restart Game' : `Go to Step ${index}`;
        const isLatestStep = index === history.length - 1;
        return (
            <div key={index} style={{ marginBottom: '10px' }}>
                <h3>
                    {isLatestStep ? `You are at step ${index}` : <HistoryStep text={text} handleClick={() => goToStep(index)} />}
                </h3>
            </div>
        );
    });

    return (
        <>
            {winner && <h2>Winner: {winner}</h2>}
            {!winner && <h3>Next Player: {nextPlayer}</h3>}
            <GameBoard boardValues={boardValues} handleClick={handleClick} winningCombination={winningCombination} />
            <div style={{ marginTop: '20px' }}>{ historySteps }</div>
        </>
    );
}
