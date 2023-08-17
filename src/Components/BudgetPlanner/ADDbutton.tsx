interface ButtonProps {
  isIncome: Boolean;
}

function AddButton({ isIncome }: ButtonProps) {
  return (
    <button
      type="submut"
      className={`${
        isIncome
          ? `bg-green-950  hover:bg-green-800 active:bg-green-700`
          : `bg-red-950 hover:bg-red-800 active:bg-red-700`
      }self-center mt-4 text-2xl rounded-lg w-14 h-8 `}
    >
      ADD
    </button>
  );
}

export default AddButton;
