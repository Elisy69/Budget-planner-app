import { useEffect } from "react";
import { useGetRatesQuery } from "../api/currenciesApi";
import {
  changeCurrency,
  loadRates,
} from "../store/features/currencies/currenciesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Button from "./Button";
import ModalToAddCategories from "./Categories/ModalToAddCategories.jsx";

function Navbar() {
  const { data } = useGetRatesQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data?.data) {
      dispatch(loadRates({ USD: data.data.USD, EUR: data.data.EUR }));
    }
  }, [data, dispatch]);
  const currency = useAppSelector((state) => state.currency.currentCurrency);
  function nextCurrency() {
    dispatch(changeCurrency());
  }

  function handleModal() {
    window.my_modal_1.showModal();
  }
  return (
    <nav className="flex w-full my-4 text-warm-gray-900 text-center sm:gap-4 gap-2 place-content-center items-center">
      <span className="text-yellow-300 text-3xl sm:mr-[0.7rem] mr-[0rem]">
        {currency}
      </span>
      <Button onClick={nextCurrency} title={"Change currency"} />
      <Button
        className="btn"
        title={"Add Categories"}
        onClick={handleModal}
      ></Button>
      <Button title={"Budget Analysis"} />
      <Button title={"Budget Goals"} />
      <ModalToAddCategories />
    </nav>
  );
}

export default Navbar;
