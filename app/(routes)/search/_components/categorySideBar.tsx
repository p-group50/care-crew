"use client";
import globalApi from '@/app/_services/global-api';
import { Category } from '@/app/_services/types';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const CategorySideBar = () => {

  const [ categoryList, setCategoryList ] = useState<Category[]>([]); 
  const [ selectedCategory, setSelectedCategory ] = useState<any>();

  //fetch category from url
  const params = usePathname();

  //get the last part of the params(the category)
  
  // we are fetching the functions data only once when the component mounts, and not every time it re-renders.
  useEffect(() => {
    getCategoryList(); 
  }, []);
  
  // Update selected category when user clicks on a category
  useEffect(() => {
    // if we get the params(category from url) split it and get the second part  
    params && setSelectedCategory(params.split('/')[2]);
  },[params]);

  // Fetch and populate category data from hyGraph API.
  const getCategoryList = () => {
    globalApi.getCategory().then(response => {
      console.log("resp data", response)
      setCategoryList(response.categories);
    })
  }; 

  return (
    <div className=''>
      <h2 className='font-bold mt-4 mb-2 ml-6 text-lg text-primary'>Category</h2>

      {/* fetch category list from backend */}
        <div className="">
          {categoryList.map((category, index) => (
            <Link
              href={'/search/'+category.name} 
              key={index}
              className={`flex gap-2 items-center p-3 cursor-pointer border-b transition-all ease-in-out md:mr-10 hover:text-primary
                ${selectedCategory === category.name && 'border-primary text-primary'}
              `}
            > 
              <Image 
                src={category.icon?.url} 
                alt=''
                width={18}
                height={16}
                className='w-5 h-auto'
              />
              <p>
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      
    </div>
  )
}
