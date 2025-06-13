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
    } else if (op === "√") { //Special case for square root, just takes one number
      const result = Math.sqrt(parseFloat(currentInput));
      setExpression(`√(${currentInput}) = ${result}`);
      setCurrentInput(result.toString());
      setPreviousInput(null);
      setOperation(null);
      setEvaluated(true);
      return;
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
        result = prev + current; //Addition
        break;
      case "-":
        result = prev - current; //Subtraction
        break;
      case "*":
        result = prev * current; //Multiplication
        break;
      case "/":
        result = prev / current; //Division
        break;
      case "^":
        result = Math.pow(prev, current); //Power
        break;
      case "%":
        result = prev % current; //Modulo
        break;
      case "//":
        result = Math.floor(prev / current); //Integer division
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
