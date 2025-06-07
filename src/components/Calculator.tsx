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
    if (expression.includes("=")) {
      //resets expression after a equals sign
      setExpression(currentInput + " " + op + " ");
      setPreviousInput(currentInput);
      setCurrentInput("");
      setOperation(op);
      setEvaluated(false);
    } else {
      //normal
      if (currentInput === "") return;
      setPreviousInput(currentInput);
      setCurrentInput("");
      setOperation(op);
      setExpression((prev) => prev + " " + op + " ");
    }
  };
  //If equals is clicked, perform logic
  const handleEquals = () => {
    if (!previousInput || !operation || currentInput === "") return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result: number;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
      default:
        return;
    }

    setCurrentInput(result.toString());
    setExpression((prev) => prev + " = " + result.toString());
    setPreviousInput(null);
    setOperation(null);
    setEvaluated(true);
  };

  const handleClear = () => {
    setCurrentInput("");
    setPreviousInput(null);
    setOperation(null);
    setExpression("");
  };

  return (
    <div
      className="container mt-4 p-3 border rounded shadow-sm"
      style={{ maxWidth: 300 }}
    >
      <Display expression={expression} />
      <Keypad
        onNumberClick={handleNumberClick}
        onOperationClick={handleOperationClick}
        onEquals={handleEquals}
        onClear={handleClear}
      />
    </div>
  );
};

export default Calculator;
