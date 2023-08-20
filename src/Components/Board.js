import React, { useState } from "react";
import "./style.css";
import { IoMdClose } from "react-icons/io";
import { BiRadioCircle, BiRefresh, BiUndo } from "react-icons/bi";
export default function Board() {
    const [count, setCount] = useState(0);
    const [current, setCurrent] = useState("X");
    const [winner, setWinner] = useState("");
    const [turnValue, setTurnValue] = useState([[]]);
    const initialWinValues = [
        [false, false, false],
        [false, false, false],
        [false, false, false],
    ];
    const initialValues = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    const [winValues, setWinValues] = useState(initialWinValues);
    const [values, setValues] = useState(initialValues);
    function reset() {
        setCount(0);
        setWinner("");
        setCurrent("X");
        setValues(initialValues);
        setWinValues(initialWinValues);
    }
    function undo() {
        if (count <= 0) return;
        setCount((prev) => prev - 1);
        let [x, y] = turnValue[turnValue.length - 1];
        setValues((prev) => [...prev, (prev[x][y] = "")]);
        let temp = turnValue;
        temp.pop();
        setTurnValue(temp);
        setWinValues(initialWinValues);
        setCurrent((prev) => (prev === "X" ? "O" : "X"));
        setWinner("");
    }
    async function handleClick(x, y) {
        if (count >= 9) return;
        if (winner !== "") return;
        if (values[x][y] === "") {
            await setValues((prev) => [...prev, (prev[x][y] = current)]);
            await setCurrent((prev) => (prev === "X" ? "O" : "X"));
            setTurnValue((prev) => [...prev, [x, y]]);
            setCount((prev) => prev + 1);
        }
        evaluate(x, y);
    }
    function evaluate(x, y) {
        let temp = winValues;
        if (values[x][0] === values[x][1] && values[x][0] === values[x][2]) {
            values[x][0] === "X" ? setWinner("X") : setWinner("O");
            temp[x][0] = true;
            temp[x][1] = true;
            temp[x][2] = true;
        } else if (
            values[0][y] === values[1][y] &&
            values[0][y] === values[2][y]
        ) {
            values[0][y] === "X" ? setWinner("X") : setWinner("O");
            temp[0][y] = true;
            temp[1][y] = true;
            temp[2][y] = true;
        } else if (
            values[0][0] !== "" &&
            values[0][0] === values[1][1] &&
            values[2][2] == values[0][0]
        ) {
            values[0][0] === "X" ? setWinner("X") : setWinner("O");
            temp[0][0] = true;
            temp[1][1] = true;
            temp[2][2] = true;
        } else if (
            values[0][2] !== "" &&
            values[1][1] === values[0][2] &&
            values[2][0] == values[0][2]
        ) {
            values[2][0] === "X" ? setWinner("X") : setWinner("O");
            temp[2][0] = true;
            temp[1][1] = true;
            temp[0][2] = true;
        }
        setWinValues(temp);
    }
    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <div className="board-container">
                <div className="buttons-container">
                    <button
                        className={`buttons ${
                            count <= 0 && "buttons-disabled"
                        } `}
                        onClick={reset}
                    >
                        <BiRefresh />
                    </button>
                    <button
                        className={`buttons ${
                            (count <= 0 || count >= 9 || winner !== "") &&
                            "buttons-disabled"
                        }`}
                        onClick={undo}
                    >
                        <BiUndo />
                    </button>
                </div>
                <table className="board">
                    {Array.from({ length: 3 }, (_, x) => (
                        <tr key={x} className="board-row">
                            {Array.from({ length: 3 }, (_, y) => (
                                <td
                                    key={y}
                                    className={`board-cell ${
                                        values[x][y] !== "" && "cell-filled"
                                    } ${
                                        winner !== "" &&
                                        !winValues[x][y] &&
                                        "cell-lost"
                                    }`}
                                    onClick={() => handleClick(x, y)}
                                >
                                    {values[x][y] === "X" && (
                                        <IoMdClose className="icon" />
                                    )}
                                    {values[x][y] === "O" && (
                                        <BiRadioCircle className="icon" />
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </table>
            </div>
            <h2
                className={`result ${
                    (winner !== "" || count >= 9) && "result-pop"
                }`}
            >
                {winner !== ""
                    ? `Player ${((count + 1) % 2) + 1} wins`
                    : count >= 9
                    ? "Draw"
                    : `Player ${(count % 2) + 1} turn`}
            </h2>
        </div>
    );
}
