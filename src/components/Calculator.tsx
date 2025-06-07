import { useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [previousInput, setPreviousInput] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumberClick = (digit: string) => {
    setCurrentInput((prev) => prev + digit);
  };

  const handleOperationClick = (op: string) => {
    if (currentInput === "") return;
    setPreviousInput(currentInput);
    setCurrentInput("");
    setOperation(op);
  };

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
    setPreviousInput(null);
    setOperation(null);
  };

  const handleClear = () => {
    setCurrentInput("");
    setPreviousInput(null);
    setOperation(null);
  };

  return (
    <div
      className="container mt-4 p-3 border rounded shadow-sm"
      style={{ maxWidth: 300 }}
    >
      <Display value={currentInput || "0"} />
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
