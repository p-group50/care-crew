'use client';
import { useEffect, useState } from "react";
import { CategoryList } from "./_components/category-list";
import { Hero } from "./_components/hero";
import globalApi from "./_services/global-api";
import { Business, Category } from "./_services/types";
import { BusinessList } from "./_components/businessList";

export default function Home() {
  // State to hold fetched category data
  // useState is used to create a state variable and a setter function
  // Here, we initialize the categoryList state with an empty array.
  // The setCategoryList function will be used to update this state.
  const [ categoryList, setCategoryList ] = useState<Category[]>([]);
  const [ businessList, setBusinessList ] = useState<Business[]>([]);

  // we call the fetch function in a useEffect to control the the number of times it will be rendered
  // This is useful for optimizing performance by avoiding unnecessary re-renders
  // Here, we are fetching the functions data only once when the component mounts, and not every time it re-renders.
  useEffect(() => {
    getCategoryList();
    getAllBusinessList(); // fetch all services/BusinessList from backend
  }, []);

  // Fetch and populate category data from hyGraph API
  // This function is defined in the global-api.ts file and imported here.
  const getCategoryList = () => {
    globalApi.getCategory().then(response => {
      setCategoryList(response.categories);
    })
  };

  // fetch all services/ BusinessList from backend
  const getAllBusinessList = () => {
    globalApi.getBusinessList().then(response => {
      setBusinessList(response.businessLists);
    })
  }

  return (
    <main className=""> 
      <Hero />
      <CategoryList categoryList={categoryList} />

      <BusinessList 
        businessList={businessList}
        title="Popular Services"
      />
    </main>
  );
}
