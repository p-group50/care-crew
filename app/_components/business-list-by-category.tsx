import Image from 'next/image';
// import { Business, BusinessByCategory } from './../_services/types';

import { Button } from '@/components/ui/button';
import { BusinessByCategory } from '../_services/types';
import Link from 'next/link';

interface BusinessListProps {
  businessListByCategories: BusinessByCategory[];
  title?: string;
}

// pass the list of businesses as props
// component to fetch list of businesses from backend api
export const BusinessListByCategory = ({ businessListByCategories, title }: BusinessListProps) => {
  return (
    <div>
      <p className='text-xl text-primary font-bold my-8'>
        {title}
      </p>

      <div className="grid grid-cols-2 gap-[8rem] md:grid-cols-3 lg:grid-cols-4 mt-5 place-items-center">
        { businessListByCategories?.length > 0 ? businessListByCategories.map((businessCategory, index) => (
          <Link 
            href={'/details/'+businessCategory.id} 
            key={index} 
            className="rounded-lg shadow hover:shadow-lg hover:shadow-primary shadow-primary transition-all ease-in-out"
          >
            { /* service and image */ }
            <Image 
              src={businessCategory?.images[0].url} 
              alt=''
              width={300}
              height={120}
              className='object-cover h-[150px] md:h-[200px] rounded-lg'
            />

            <div className="px-3 ">
              <div className="flex justify-between items-center gap-x-4 my-2">
                <h3 className='font-bold text-primary'>
                  { businessCategory.email } 
                </h3>

                <p className='text-sm text-gray-600 bg-orange-300 px-3 py-1 rounded-full text-center'>
                  {businessCategory.category.name}
                </p>
              </div>

              <p className="text-primary font-semibold">
                <a href={`tel:${businessCategory.contactPerson}`}>
                  {businessCategory.contactPerson}
                  </a>
                </p>
              <p className="text-gray-500 text-sm">{businessCategory.email}</p>
              <p className="text-gray-500 text-sm">{businessCategory.address}</p>
              
            </div>

            <Button 
              className='w-full mt-2 rounded-t-none relative'
            >
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
      };
      </div>
    </div>
  )
}
