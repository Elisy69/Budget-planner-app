import { useRef } from "react";
import { changeCurrency } from "../../store/features/currencies/currenciesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ModalToAddCategories from "../Categories/ModalToAddCategories.js";
import Button from "./Button";

function Navbar() {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  const myModal = useRef<HTMLDialogElement>(null);
  function nextCurrency() {
    dispatch(changeCurrency());
  }

  function handleModal() {
    myModal.current?.showModal();
  }
  return (
    <nav className="flex w-full my-4 text-center sm:gap-4 gap-2 place-content-center items-center flex-wrap">
      <span className="text-yellow-300 text-3xl sm:mr-[0.7rem] mr-[0rem] sm:text-4xl md:text-5xl lg:text-6xl">
        {currency}
      </span>
      <Button onClick={nextCurrency} title={"Change currency"} link={"#"} />
      <Button
        title={"Add Categories"}
        onClick={handleModal}
        link={"#"}
      ></Button>
      <Button title={"Budget Planner"} link={"/"} />
      <Button title={"Budget Analysis"} link={"/analysis"} />
      <Button title={"Budget Goals"} link={"/goals"} />
      <ModalToAddCategories ref={myModal} />
    </nav>
  );
}

export default Navbar;
