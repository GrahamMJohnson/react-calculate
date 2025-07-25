type DisplayProps = {
  expression: string;
};

//Display for the calculator expression (if expression is null, show 0)
const Display = ({ expression }: DisplayProps) => {
  return (
    <div className="form-control text-end mb-3 fs-4 bg-dark text-white">
      {expression || 0}
    </div>
  );
};

export default Display;
