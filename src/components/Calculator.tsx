import { useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";

//The full calculator, the logic and integration with display and keypad
const Calculator = () => {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [previousInput, setPreviousInput] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [expression, setExpression] = useState<string>("");
  const [justEvaluated, setEvaluated] = useState(false);

  //If a number is clicked, add to expression/input
  const handleNumberClick = (digit: string) => {
    if (justEvaluated) {
      //If just was evaluated, start a new expression
      setCurrentInput(digit);
      setExpression(digit);
      setEvaluated(false);
    } else {
      //else, just add to the current one
      setCurrentInput((prev) => prev + digit);
      setExpression((prev) => prev + digit);
    }
  };

  //If a operation is clicked, add to expression/input
  const handleOperationClick = (op: string) => {
    if (expression.includes("=") || justEvaluated) {
      //resets expression after a equals sign
      setExpression(op === "√" ? op : currentInput + " " + op + " ");
      setPreviousInput(op === "√" ? null : currentInput);
      setCurrentInput("");
      setOperation(op);
      setEvaluated(false);
      return;
    }

    if (op === "√") {
      //Special case for square root, just takes one number
      setOperation("√");
      setPreviousInput(null);
      setExpression((prev) => prev + "√");
      return;
    }

    if (currentInput === "") return;

    //normal
    setPreviousInput(currentInput);
    setCurrentInput("");
    setOperation(op);
    setExpression((prev) => prev + " " + op + " ");
  };

  //If equals is clicked, perform logic
  const handleEquals = () => {
    if (!operation || currentInput === "") return;

    const current = parseFloat(currentInput);
    let result: number;

    if (operation === "√") {
      //check for square root, only needs current
      result = Math.sqrt(current);
      setExpression(`√${current} = ${result}`);
    } else {
      //needs previous and current
      if (!previousInput) return;
      const prev = parseFloat(previousInput);

      switch (operation) {
        case "+": //Addition
          result = prev + current;
          break;
        case "-": //Subtraction
          result = prev - current;
          break;
        case "*": //Multiplication
          result = prev * current;
          break;
        case "/": //Division
          result = prev / current;
          break;
        case "^": //Power
          result = Math.pow(prev, current);
          break;
        case "%": //Modulo
          result = prev % current;
          break;
        case "//": //Integer Division
          result = Math.floor(prev / current);
          break;
        default:
          return;
      }

      setExpression((prevExp) => prevExp + " = " + result.toString());
    }

    setCurrentInput(result.toString());
    setPreviousInput(null);
    setOperation(null);
  };

  const handleClear = () => {
    setCurrentInput("");
    setPreviousInput(null);
    setOperation(null);
    setExpression("");
  };

  //set up the full calculator
  return (
    <div
      className="container mt-4 p-3 border rounded shadow-sm"
      style={{ maxWidth: 300 }}
    >
      <Display expression={expression} />
      <Keypad //Set button listeners to the handlers
        onNumberClick={handleNumberClick}
        onOperationClick={handleOperationClick}
        onEquals={handleEquals}
        onClear={handleClear}
      />
    </div>
  );
};

export default Calculator;
