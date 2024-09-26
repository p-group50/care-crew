import Image from 'next/image';
// import { Business, BusinessByCategory } from './../_services/types';

import { Button } from '@/components/ui/button';
import { BusinessByCategory } from '../_services/types';
import Link from 'next/link';
import { Phone } from 'lucide-react';
// UPDATED
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

      <div className="w-full flex gap-6 flex-wrap">
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
                <p className='font-bold text-primary'>
                  { businessCategory.name } 
                </p>

                <p className='text-sm text-gray-600 bg-orange-300 px-3 py-1 rounded-full text-center'>
                  {businessCategory.category.name}
                </p>
              </div>

              <p className="text-primary font-semibold ">
                <a href={`tel:${businessCategory.contactPerson}`}
                  className='flex gap-x-2'>
                  <Phone/>
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
        [1,2].map((item, index) => (
          <div key={index} className="w-full h-[300px] bg-slate-200 rounded-lg animate-pulse flex items-center justify-center">
            No service available
          </div>
        ))
      }
      </div>
    </div>
  )
}
