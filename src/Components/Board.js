// import React, { useState } from "react";
// import "./style.css";
// import { IoMdClose } from "react-icons/io";
// import { BiRadioCircle, BiRefresh, BiUndo } from "react-icons/bi";

// export default function Board() {
//     const [count, setCount] = useState(0);
//     const [current, setCurrent] = useState("X");
//     const [winner, setWinner] = useState("");
//     const [turnValue, setTurnValue] = useState([]);
//     const initialWinValues = [
//         [false, false, false],
//         [false, false, false],
//         [false, false, false],
//     ];
//     const [winValues, setWinValues] = useState(initialWinValues);
//     const initialValues = Array.from({ length: 3 }, () => Array(3).fill(""));
//     const [values, setValues] = useState(initialValues);

//     function reset() {
//         setCount(0);
//         setWinner("");
//         setCurrent("X");
//         setValues(initialValues);
//         setWinValues(initialWinValues);
//     }

//     function undo() {
//         if (count <= 0) return;
//         setCount((prev) => prev - 1);
//         const [x, y] = turnValue[turnValue.length - 1];
//         setValues((prevValues) => {
//             const newValues = [...prevValues];
//             newValues[x][y] = "";
//             return newValues;
//         });
//         setTurnValue((prev) => prev.slice(0, prev.length - 1));
//         setCurrent((prev) => (prev === "X" ? "O" : "X"));
//         setWinner("");
//     }

//     function handleClick(x, y) {
//         if (count >= 9 || winner !== "") return;
//         if (values[x][y] === "") {
//             setValues((prevValues) => {
//                 const newValues = [...prevValues];
//                 newValues[x][y] = current;
//                 return newValues;
//             });
//             setCurrent((prev) => (prev === "X" ? "O" : "X"));
//             setTurnValue((prev) => [...prev, [x, y]]);
//             setCount((prev) => prev + 1);
//         }
//         evaluate(x, y);
//     }

//     function evaluate(x, y) {
//         if (
//             values[x][0] !== "" &&
//             values[x][0] === values[x][1] &&
//             values[x][0] === values[x][2]
//         ) {
//             if (values[x][0] === "X") setWinner("X");
//             else setWinner("O");
//             let temp = winValues;
//             temp[x][0] = true;
//             temp[x][1] = true;
//             temp[x][2] = true;
//             setWinValues(temp);
//             return;
//         }
//         if (
//             values[0][y] !== "" &&
//             values[0][y] === values[1][y] &&
//             values[0][y] === values[2][y]
//         ) {
//             if (values[0][y] === "X") setWinner("X");
//             else setWinner("O");
//             let temp = winValues;
//             temp[0][y] = true;
//             temp[1][y] = true;
//             temp[2][y] = true;
//             setWinValues(temp);
//             return;
//         }
//         if (
//             values[0][0] !== "" &&
//             values[0][0] === values[1][1] &&
//             values[2][2] == values[0][0]
//         ) {
//             if (values[0][0] === "X") setWinner("X");
//             else setWinner("O");
//             let temp = winValues;
//             temp[0][0] = true;
//             temp[1][1] = true;
//             temp[2][2] = true;
//             setWinValues(temp);
//             return;
//         }
//         if (
//             values[0][2] !== "" &&
//             values[1][1] === values[0][2] &&
//             values[2][0] == values[0][2]
//         ) {
//             if (values[2][0] === "X") setWinner("X");
//             else setWinner("O");
//             let temp = winValues;
//             temp[2][0] = true;
//             temp[1][1] = true;
//             temp[0][2] = true;
//             setWinValues(temp);
//             return;
//         }
//     }

//     return (
//         <div>
//             <h1>Tic Tac Toe</h1>
//             <div className="board-container">
//                 <div className="buttons-container">
//                     <button
//                         className={`buttons ${
//                             count <= 0 && "buttons-disabled"
//                         }`}
//                         onClick={reset}
//                     >
//                         <BiRefresh />
//                     </button>
//                     <button
//                         className={`buttons ${
//                             (count <= 0 || count >= 9 || winner) &&
//                             "buttons-disabled"
//                         }`}
//                         onClick={undo}
//                     >
//                         <BiUndo />
//                     </button>
//                 </div>
//                 <table className="board">
//                     {values.map((row, x) => (
//                         <tr key={x} className="board-row">
//                             {row.map((cellValue, y) => (
//                                 <td
//                                     key={y}
//                                     className={`board-cell ${
//                                         (cellValue && "cell-filled") ||
//                                         (winner && "cell-left")
//                                     } ${winValues[x][y] && "cell-won"}`}
//                                     onClick={() => handleClick(x, y)}
//                                 >
//                                     {cellValue === "X" && (
//                                         <IoMdClose className="icon" />
//                                     )}
//                                     {cellValue === "O" && (
//                                         <BiRadioCircle className="icon" />
//                                     )}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </table>
//             </div>
//             <h2 className={`result ${winner && "result-pop"}`}>
//                 {winner
//                     ? `Player ${((count + 1) % 2) + 1} wins`
//                     : count >= 9
//                     ? "Draw"
//                     : `Player ${(count % 2) + 1} turn`}
//             </h2>
//         </div>
//     );
// }

import React, { useState } from "react";
import "./style.css";
import { IoMdClose } from "react-icons/io";
import { BsCircle } from "react-icons/bs";
import { BiCircle, BiRadioCircle, BiRefresh, BiUndo } from "react-icons/bi";
export default function Board() {
    const [count, setCount] = useState(0);
    const [current, setCurrent] = useState("X");
    const [winner, setWinner] = useState("");
    const [turnValue, setTurnValue] = useState([[]]);

    const [winValues, setWinValues] = useState([
        [false, false, false],
        [false, false, false],
        [false, false, false],
    ]);
    const [values, setValues] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    function reset() {
        setCount(0);
        setWinner("");
        setCurrent("X");
        setValues([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);
        setWinValues([
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ]);
    }
    function undo() {
        if (count <= 0) return;
        setCount((prev) => prev - 1);
        let [x, y] = turnValue[turnValue.length - 1];
        setValues((prev) => [...prev, (prev[x][y] = "")]);
        let temp = turnValue;
        temp.pop();
        setTurnValue(temp);
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
        if (
            values[x][0] !== "" &&
            values[x][0] === values[x][1] &&
            values[x][0] === values[x][2]
        ) {
            if (values[x][0] === "X") setWinner("X");
            else setWinner("O");
            let temp = winValues;
            temp[x][0] = true;
            temp[x][1] = true;
            temp[x][2] = true;
            setWinValues(temp);
            return;
        }
        if (
            values[0][y] !== "" &&
            values[0][y] === values[1][y] &&
            values[0][y] === values[2][y]
        ) {
            if (values[0][y] === "X") setWinner("X");
            else setWinner("O");
            let temp = winValues;
            temp[0][y] = true;
            temp[1][y] = true;
            temp[2][y] = true;
            setWinValues(temp);
            return;
        }
        if (
            values[0][0] !== "" &&
            values[0][0] === values[1][1] &&
            values[2][2] == values[0][0]
        ) {
            if (values[0][0] === "X") setWinner("X");
            else setWinner("O");
            let temp = winValues;
            temp[0][0] = true;
            temp[1][1] = true;
            temp[2][2] = true;
            setWinValues(temp);
            return;
        }
        if (
            values[0][2] !== "" &&
            values[1][1] === values[0][2] &&
            values[2][0] == values[0][2]
        ) {
            if (values[2][0] === "X") setWinner("X");
            else setWinner("O");
            let temp = winValues;
            temp[2][0] = true;
            temp[1][1] = true;
            temp[0][2] = true;
            setWinValues(temp);
            return;
        }
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
                    <tr className="board-row">
                        <td
                            className={`board-cell ${
                                (values[0][0] !== "" && "cell-filled") ||
                                (winner !== "" && "cell-left")
                            } ${winValues[0][0] && "cell-won"}`}
                            onClick={() => handleClick(0, 0)}
                        >
                            {values[0][0] === "X" && (
                                <IoMdClose className="icon" />
                            )}
                            {values[0][0] === "O" && (
                                <BiRadioCircle className="icon" />
                            )}
                        </td>
                        <td
                            className={`board-cell ${
                                (values[0][1] !== "" && "cell-filled") ||
                                (winner !== "" && "cell-left")
                            } ${winValues[0][1] && "cell-won"}`}
                            onClick={() => handleClick(0, 1)}
                        >
                            {values[0][1] === "X" && (
                                <IoMdClose className="icon" />
                            )}
                            {values[0][1] === "O" && (
                                <BiRadioCircle className="icon" />
                            )}
                        </td>
                        <td
                            className={`board-cell ${
                                (values[0][2] !== "" && "cell-filled") ||
                                (winner !== "" && "cell-left")
                            } ${winValues[0][2] && "cell-won"}`}
                            onClick={() => handleClick(0, 2)}
                        >
                            {values[0][2] === "X" && (
                                <IoMdClose className="icon" />
                            )}
                            {values[0][2] === "O" && (
                                <BiRadioCircle className="icon" />
                            )}
                        </td>
                    </tr>
                    <tr className="board-row">
                        <td
                            className={`board-cell ${
                                (values[1][0] !== "" && "cell-filled") ||
                                (winner !== "" && "cell-left")
                            } ${winValues[1][0] && "cell-won"}`}
                            onClick={() => handleClick(1, 0)}
                        >
                            {values[1][0] === "X" && (
                                <IoMdClose className="icon" />
                            )}
                            {values[1][0] === "O" && (
                                <BiRadioCircle className="icon" />
                            )}
                        </td>
                        <td
                            className={`board-cell ${
                                (values[1][1] !== "" && "cell-filled") ||
                                (winner !== "" && "cell-left")
                            } ${winValues[1][1] && "cell-won"}`}
                            onClick={() => handleClick(1, 1)}
                        >
                            {values[1][1] === "X" && (
                                <IoMdClose className="icon" />
                            )}
                            {values[1][1] === "O" && (
                                <BiRadioCircle className="icon" />
                            )}
                        </td>
                        <td
                            className={`board-cell ${
                                (values[1][2] !== "" && "cell-filled") ||
                                (winner !== "" && "cell-left")
                            } ${winValues[1][2] && "cell-won"}`}
                            onClick={() => handleClick(1, 2)}
                        >
                            {values[1][2] === "X" && (
                                <IoMdClose className="icon" />
                            )}
                            {values[1][2] === "O" && (
                                <BiRadioCircle className="icon" />
                            )}
                        </td>
                    </tr>
                    <tr className="board-row">
                        <td
                            className={`board-cell ${
                                (values[2][0] !== "" && "cell-filled") ||
                                (winner !== "" && "cell-left")
                            } ${winValues[2][0] && "cell-won"}`}
                            onClick={() => handleClick(2, 0)}
                        >
                            {values[2][0] === "X" && (
                                <IoMdClose className="icon" />
                            )}
                            {values[2][0] === "O" && (
                                <BiRadioCircle className="icon" />
                            )}
                        </td>
                        <td
                            className={`board-cell ${
                                (values[2][1] !== "" && "cell-filled") ||
                                (winner !== "" && "cell-left")
                            } ${winValues[2][1] && "cell-won"}`}
                            onClick={() => handleClick(2, 1)}
                        >
                            {values[2][1] === "X" && (
                                <IoMdClose className="icon" />
                            )}
                            {values[2][1] === "O" && (
                                <BiRadioCircle className="icon" />
                            )}
                        </td>
                        <td
                            className={`board-cell ${
                                (values[2][2] !== "" && "cell-filled") ||
                                (winner !== "" && "cell-left")
                            } ${winValues[2][2] && "cell-won"}`}
                            onClick={() => handleClick(2, 2)}
                        >
                            {values[2][2] === "X" && (
                                <IoMdClose className="icon" />
                            )}
                            {values[2][2] === "O" && (
                                <BiRadioCircle className="icon" />
                            )}
                        </td>
                    </tr>
                </table>
            </div>
            <h2 className={`result ${winner !== "" && "result-pop"}`}>
                {winner !== ""
                    ? `Player ${((count + 1) % 2) + 1} wins`
                    : count >= 9
                    ? "Draw"
                    : `Player ${(count % 2) + 1} turn`}
            </h2>
        </div>
    );
}
