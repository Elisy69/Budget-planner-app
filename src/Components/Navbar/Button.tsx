import { Link } from "react-router-dom";

interface ButtonProps {
  title: string;
  onClick?: (e) => void;
  link?: string;
}

function Button({ title, onClick, link }: ButtonProps) {
  return (
    <Link to={link}>
      <button
        onClick={onClick}
        className="md:w-[7rem] md:h-[3rem] md:text-sm sm:w-20 sm:text-xs w-[69px] h-10 text-black text-[0.67rem] bg-blue-300 rounded-xl hover:bg-blue-400 active:bg-blue-100"
      >
        {title}
      </button>
    </Link>
  );
}

export default Button;
