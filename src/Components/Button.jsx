function Button({ title, classNames, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`${classNames} bg-gray-700 rounded-lg mt-4 h-8 px-2 hover:bg-gray-600 active:bg-gray-500 `}
    >
      {title}
    </button>
  );
}

export default Button;
