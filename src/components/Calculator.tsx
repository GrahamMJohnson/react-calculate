import { useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import { evaluate, floor } from "mathjs";

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [expression, setExpression] = useState<string>("");
  const [justEvaluated, setJustEvaluated] = useState<boolean>(false);

  const handleNumberClick = (digit: string) => {
    if (justEvaluated) {
      setCurrentInput(digit);
      setExpression(digit);
      setJustEvaluated(false);
    } else {
      setCurrentInput((prev) => prev + digit);
      setExpression((prev) => prev + digit);
    }
  };

  const handleOperationClick = (op: string) => {
    if (justEvaluated) {
      setExpression(op === "√" ? `sqrt(` : currentInput + " " + op + " ");
      setCurrentInput("");
      setJustEvaluated(false);
      return;
    }

    if (op === "√") {
      setExpression((prev) => prev + "sqrt(");
      return;
    }

    if (["(", ")", "^", "%", "+", "-", "*", "/", "//"].includes(op)) {
      setExpression((prev) => prev + " " + op + " ");
    }
  };

  const handleEquals = () => {
    try {
      let expr = expression;

      // Auto-close open parentheses
      const openParens = (expr.match(/\(/g) || []).length;
      const closeParens = (expr.match(/\)/g) || []).length;
      if (openParens > closeParens) {
        expr += ")".repeat(openParens - closeParens);
      }

      // Replace integer division (//) with floor(...)
      expr = expr.replace(/(\d+)\s*\/\/\s*(\d+)/g, "floor($1 / $2)");

      const result = evaluate(expr, { floor }); // pass floor into scope
      setCurrentInput(result.toString());
      setExpression(expr + " = " + result.toString());
      setJustEvaluated(true);
    } catch {
      setCurrentInput("Error");
      setExpression("Invalid expression");
    }
  };

  const handleClear = () => {
    setCurrentInput("");
    setExpression("");
    setJustEvaluated(false);
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
