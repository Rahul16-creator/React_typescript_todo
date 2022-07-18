import "./button.css";

interface ButtonProps {
  label: string;
  styleClassName: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  styleClassName,
}: ButtonProps) => {
  return (
    <>
      <button className={`btn ${styleClassName}`}>{label}</button>
    </>
  );
};

export default Button;
