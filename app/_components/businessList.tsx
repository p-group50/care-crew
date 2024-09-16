import Image from 'next/image';
// import { Business, BusinessByCategory } from './../_services/types';

import { Button } from '@/components/ui/button';
import { Business } from '../_services/types';
import Link from 'next/link';


interface BusinessListProps {
  businessList: Business[];
  title?: string;
}

// pass the list of businesses as props
// component to fetch list of businesses from backend api
export const BusinessList = ({ businessList, title }: BusinessListProps) => {
  return (
    <div>
      <p className='text-xl font-bold my-8'>
        {title}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 place-items-center m-1">
        { businessList?.length > 0 ? businessList.map((business, index) => (
          // route to business details page when user clicks on card 
          <Link
            href={'/details/'+business.id}
            key={index} 
            className="rounded-lg shadow hover:shadow-lg hover:shadow-primary shadow-primary transition-all ease-in-out duration-300"
          >
            {/* service ad image */}
            <Image 
              src={business?.images[0].url} 
              alt=''
              width={300}
              height={120}
              className='object-cover h-[150px] md:h-[200px] rounded-lg'
            />

            <div className="px-3">
              <div className="flex justify-between items-center my-2">
                <h3 className='font-bold text-primary'>
                  { business.name }
                </h3>
                <p className='text-sm text-gray-600 bg-orange-300 px-1 py-[1px] rounded-full text-center'>
                  {business.category.name}
                </p>
              </div>

              <p className="text-primary font-semibold">{business.contactPerson}</p>
              <p className="text-gray-500 text-sm">{business.email}</p>
              <p className="text-gray-500 text-sm">{business.address}</p>
            </div>

            <Button className='w-full mt-2 rounded-t-none relative'>
              Book now
            </Button>

          </Link>
        ))
        :
        // skeleton
        [1,2,3,4,5,6,7,8].map((item, index) => (
          <div key={index} className="w-full h-[300px] bg-slate-200 rounded-lg animate-pulse">

          </div>
        ))
      }
      </div>
    </div>
  )
}
