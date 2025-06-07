type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: string;
};

//Button to use in the keypad
const Button = ({ label, onClick, variant = "secondary" }: ButtonProps) => {
  return (
    <button className={`btn btn-${variant} fw-bold`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
