import { forwardRef } from "react";

const Month = forwardRef(function Month({ text, isActive, onSelect }, ref) {
  return (
    <div
      ref={ref}
      className={`${
        isActive
          ? `z-10 transition translate-x-5 backdrop-blur opacity-95 bg-slate-800 border-gray-900`
          : `z-0 cursor-pointer transition duration-200 ease-in-out hover:-translate-y-5`
      } backdrop-blur-2xl border border-gray-600 rounded-lg shadow-2xl drop-shadow-2xl  opacity-90 bg-slate-700 relative  ml-[0.6rem] mt-[-9rem] w-[14rem] h-[13rem] `}
      onClick={() => {
        onSelect();
      }}
    >
      {text}
    </div>
  );
});

export default Month;
