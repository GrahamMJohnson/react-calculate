import Button from "./Button";

type KeypadProps = {
  onNumberClick: (digit: string) => void;
  onOperationClick: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
};

const Keypad = ({
  onNumberClick,
  onOperationClick,
  onEquals,
  onClear,
}: KeypadProps) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operations = ["+", "-", "*", "/"];

  return (
    <div className="d-grid gap-2">
      <div className="row g-2">
        {numbers.map((num) => (
          <div key={num} className="col-3">
            <Button label={num} onClick={() => onNumberClick(num)} />
          </div>
        ))}
      </div>
      <div className="row g-2 mt-2">
        {operations.map((op) => (
          <div key={op} className="col-3">
            <Button
              label={op}
              onClick={() => onOperationClick(op)}
              variant="warning"
            />
          </div>
        ))}
        <div className="col-3">
          <Button label="=" onClick={onEquals} variant="success" />
        </div>
        <div className="col-3">
          <Button label="C" onClick={onClear} variant="danger" />
        </div>
      </div>
    </div>
  );
};

export default Keypad;
