import globalApi from "@/app/_services/global-api";
import { BusinessByCategory } from "@/app/_services/types";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Booking } from "./booking";

interface SuggestedBusinessListProps {
  suggestedBusinesses?: BusinessByCategory;
}

export const SuggestedBusinessList = ({ suggestedBusinesses }: SuggestedBusinessListProps) => {

  const [businessListCategories, setBusinessListCategories] = useState<BusinessByCategory[]>([]); 

  useEffect(() => {
    console.log( );
    suggestedBusinesses && getBusinessListByCategory();
  },[suggestedBusinesses])

  // fetch services by category by from backend
  const getBusinessListByCategory = () => {
    globalApi.getBusinessByCategory(suggestedBusinesses?.category?.name)
      .then(response => {
        setBusinessListCategories(response.businessLists);
        console.log("biz list cat: ", response.businessLists)
    })
  };

  return(
    <div className="md:pl-8">
      <Booking business={suggestedBusinesses}>
        <Button className="flex gap-2 w-full mb-2">
          <CalendarCheck/> 
          Book now
        </Button>
      </Booking>

      <div className="hidden md:block">
        <p className="font-bold text-lg mt-6 mb-4 ">Similar businesses</p>
          {businessListCategories && businessListCategories.map((suggestedBusinesses, index) => (
            // route to business details page when user clicks on sug gested card
            <Link 
              href={'/details/' + suggestedBusinesses.id} 
              className="flex gap-4 mb-4 rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out duration-500 cursor-pointer"
            >
              <Image 
                src={suggestedBusinesses.images[0].url}
                alt=""
                width={80}
                height={80}
                className="object-cover size-[80px] rounded-lg"
              />

              <div className="">
                <p className="font-semibold">{suggestedBusinesses.name}</p>
                <p className="text-primary">{suggestedBusinesses.contactPerson}</p>
                <p className="text-gray-500">{suggestedBusinesses.address}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}