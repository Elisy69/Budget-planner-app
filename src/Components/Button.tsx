interface ButtonProps {
  title: string;
  classNames?: string;
  onClick?: () => void;
}

function Button({ title, classNames, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-20 h-10 text-black text-xs bg-blue-300 rounded-xl hover:bg-blue-400 active:bg-blue-100"
    >
      {title}
    </button>
  );
}

export default Button;
