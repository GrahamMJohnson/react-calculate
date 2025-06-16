import Button from "./Button";

type KeypadProps = {
  onNumberClick: (digit: string) => void;
  onOperationClick: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
};

//Keypad on the calculator with buttons for numbers and operators
const Keypad = ({
  onNumberClick,
  onOperationClick,
  onEquals,
  onClear,
}: KeypadProps) => {
  return (
    <div className="d-grid gap-2">
      <div className="row g-2">
        {/* 1-3 number buttons */}
        <div className="col-4">
          <Button label="1" onClick={() => onNumberClick("1")} />
        </div>
        <div className="col-4">
          <Button label="2" onClick={() => onNumberClick("2")} />
        </div>
        <div className="col-4">
          <Button label="3" onClick={() => onNumberClick("3")} />
        </div>
      </div>
      <div className="row g-2">
        {/* 4-6 number buttons */}
        <div className="col-4">
          <Button label="4" onClick={() => onNumberClick("4")} />
        </div>
        <div className="col-4">
          <Button label="5" onClick={() => onNumberClick("5")} />
        </div>
        <div className="col-4">
          <Button label="6" onClick={() => onNumberClick("6")} />
        </div>
      </div>
      <div className="row g-2">
        {/* 7-9 number buttons */}
        <div className="col-4">
          <Button label="7" onClick={() => onNumberClick("7")} />
        </div>
        <div className="col-4">
          <Button label="8" onClick={() => onNumberClick("8")} />
        </div>
        <div className="col-4">
          <Button label="9" onClick={() => onNumberClick("9")} />
        </div>
      </div>
      <div className="row g-2">
        {/* 0, clear and equals buttons */}
        <div className="col-4">
          <Button label="0" onClick={() => onNumberClick("0")} />
        </div>
        <div className="col-4">
          <Button label="C" onClick={onClear} variant="danger" />
        </div>
        <div className="col-4">
          <Button label="=" onClick={onEquals} variant="success" />
        </div>
      </div>
      <div className="row g-2">
        {/* parentheses buttons */}
        <div className="col-6">
          <Button
            label="("
            onClick={() => onOperationClick("(")}
            variant="primary"
          />
        </div>
        <div className="col-6">
          <Button
            label=")"
            onClick={() => onOperationClick(")")}
            variant="primary"
          />
        </div>
      </div>
      <div className="row g-2 mt-2">
        {/* +, -, * and / operator buttons */}
        <div className="col-3">
          <Button
            label="+"
            onClick={() => onOperationClick("+")}
            variant="warning"
          />
        </div>
        <div className="col-3">
          <Button
            label="-"
            onClick={() => onOperationClick("-")}
            variant="warning"
          />
        </div>
        <div className="col-3">
          <Button
            label="*"
            onClick={() => onOperationClick("*")}
            variant="warning"
          />
        </div>
        <div className="col-3">
          <Button
            label="/"
            onClick={() => onOperationClick("/")}
            variant="warning"
          />
        </div>
      </div>
      <div className="row g-2 mt-2">
        {/* ^, √, % and // operator buttons */}
        <div className="col-3">
          <Button
            label="^"
            onClick={() => onOperationClick("^")}
            variant="primary"
          />
        </div>
        <div className="col-3">
          <Button
            label="√"
            onClick={() => onOperationClick("√")}
            variant="primary"
          />
        </div>
        <div className="col-3">
          <Button
            label="%"
            onClick={() => onOperationClick("%")}
            variant="primary"
          />
        </div>
        <div className="col-3">
          <Button
            label="//"
            onClick={() => onOperationClick("//")}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Keypad;
