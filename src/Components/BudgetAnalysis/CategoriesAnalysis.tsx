import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectBudgetCategories,
  selectBudgetItemsWithCategory,
} from "../../store/selectors";
import CategoryItem from "./CategoryItem";

export interface FilteredBudgetItem {
  RUB: number;
  USD: number;
  EUR: number;
  categoryId: string;
  commentary: string;
}

interface CategoriesAnalysisProps {
  type: string;
  isIncome: boolean;
}
interface CategoryItem {
  id: string;
  title: string;
}

type Total = {
  RUB: number;
  USD: number;
  EUR: number;
};

interface filteredTotalByCategory {
  total: Total;
  categoryId: string;
}

interface Category {
  total: Total;
  categoryId: string;
  share?: number;
}

interface AnalysedData {
  dataOnEachCategory: Category[];
  totalAmount: Total;
}

function sortAndAddShareValue(
  data: filteredTotalByCategory[],
  totalAmount: Total
) {
  return data
    .map((category: Category) => {
      const shareValue = Math.round(
        (category.total.RUB / totalAmount.RUB) * 100
      );
      return {
        ...category,
        share: isNaN(shareValue) ? 0 : shareValue,
      };
    })
    .sort((a, b) => b.total.RUB - a.total.RUB);
}

function analyseData(data: FilteredBudgetItem[], categories: CategoryItem[]) {
  const filteredTotalByCategoryId = categories
    .map((category) => {
      return {
        categoryId: category.id,
        categoryItems: data.filter((item) => item.categoryId === category.id),
      };
    })
    .map((category) => {
      return {
        total: category.categoryItems.reduce(
          (total, currentObj) => {
            return {
              ...total,
              RUB: total.RUB + Number(currentObj.RUB),
              USD: total.USD + Number(currentObj.USD),
              EUR: total.EUR + Number(currentObj.EUR),
            };
          },
          { RUB: 0, USD: 0, EUR: 0 }
        ),
        categoryId: category.categoryId,
      };
    });

  const totalAmount = filteredTotalByCategoryId.reduce(
    (total, currentObj) => {
      return {
        ...total,
        RUB: total.RUB + currentObj.total.RUB,
        USD: total.USD + currentObj.total.USD,
        EUR: total.EUR + currentObj.total.EUR,
      };
    },
    { RUB: 0, USD: 0, EUR: 0 }
  );

  const dataOnEachCategory = sortAndAddShareValue(
    filteredTotalByCategoryId,
    totalAmount
  );

  return { dataOnEachCategory, totalAmount };
}

function CategoriesAnalysis({ type, isIncome }: CategoriesAnalysisProps) {
  const selectedCategories = useSelector((state) =>
    selectBudgetCategories(state, type)
  );

  const budgetItemsFiltered = useSelector((state) =>
    selectBudgetItemsWithCategory(state, type)
  );

  const [analysedData, setAnalysedData] = useState<AnalysedData>(
    analyseData(budgetItemsFiltered, selectedCategories)
  );

  useEffect(() => {
    setAnalysedData(analyseData(budgetItemsFiltered, selectedCategories));
  }, [selectedCategories]);

  return (
    <div className="px-6 flex flex-col justify-center items-center w-full my-6">
      <h2
        className={`${
          isIncome ? `text-green-500` : `text-red-500`
        } text-3xl first-letter:uppercase text-left  w-[80%] xl:w-[50%] `}
      >
        {type}
      </h2>
      <div className="flex flex-col gap-6 mt-4  w-[80%] xl:w-[50%] ">
        {analysedData.dataOnEachCategory.map((item) => (
          <CategoryItem
            key={nanoid()}
            total={item.total}
            id={item.categoryId}
            share={item.share}
            isIncome={isIncome}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoriesAnalysis;
