"use client"
import { BusinessListByCategory } from '@/app/_components/business-list-by-category';
import globalApi from '../../../_services/global-api'
import { BusinessByCategory } from '@/app/_services/types';
import React, { useEffect, useState } from 'react' 


// TODO: services by category page component fix backend fetch
  const ServicesCategory = ({ params }: any) => {

  const [businessListCategories, setBusinessListCategories] = useState<BusinessByCategory[]>([]); 

  useEffect(() => {
    // console.log(params);
    params && getBusinessListByCategory();
  },[params])

  // fetch services by category from backend
  const getBusinessListByCategory = () => {
    globalApi.getBusinessByCategory(params.category)
      .then(response => {
        setBusinessListCategories(response.businessLists);
        // console.log("biz list cat: ", response.businessLists)
    })
  };

  return (
    <div > 
      <BusinessListByCategory
        title={params.category} 
        businessListByCategories={businessListCategories} 
      /> 
    </div>
  )
};
export default ServicesCategory