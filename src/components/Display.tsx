type DisplayProps = {
  value: string;
};

const Display = ({ value }: DisplayProps) => {
  return (
    <div
      className="form-control text-end mb-3 fs-4 bg-dark text-white"
    >
      {value}
    </div>
  );
};

export default Display;
