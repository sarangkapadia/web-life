import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';


// class Square extends React.Component {
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => {
//                     this.props.onClick();
//                 }}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

// function component

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button >
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const temp = this.state.squares.slice();
        temp[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares: temp,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i) {
        return (<Square value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
        );
    }

    calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const line of lines) {
            let [x, y, z] = line;
            if (this.state.squares[x] === this.state.squares[y] &&
                this.state.squares[y] === this.state.squares[z]) {
                return this.state.squares[x];
            }
        }

        return null;
    }

    render() {
        let result = this.calculateWinner();

        const status = (result !== null) ? 'Winner: ' + result : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        if (result !== null)
            this.state.squares.fill(null);

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div >
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>

                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
