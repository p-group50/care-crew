import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { getBusinessList } from '@/app/_services/global-api';
import { Business } from '../_services/types';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [businessList, setBusinessList] = useState<Business[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (term: string) => {
    try {
      if (term.trim()) {
        const result = await getBusinessList(term);
        setBusinessList(result.businessLists);
      } else {
        setBusinessList([]); // Clear the list if the input is empty
      }
    } catch (error) {
      console.error('Error fetching business list:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  // Hide results when clicking outside the container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setBusinessList([]); // Clear the results
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center justify-center flex-col pt-12 pb-6'>
      <h2 className='font-bold text-5xl text-center'>Find the best services</h2>
      <p className='text-center opacity-45'>Explore services and repairs</p>

      {/* hero search */}
      <div className="flex items-center mt-4">
        <Input 
          placeholder='Search'
          value={searchTerm}
          onChange={handleChange}
          className='md:w-80 focus-visible:ring-0 rounded-r-none border-primary'
        />
        <Button className='rounded-l-none'>
          <Search className='size-4'/>
        </Button>
      </div>

      {/* Display search results */}
      <div className="mt-6 w-full md:w-80" ref={resultsRef}>
        {businessList.length > 0 ? (
          businessList.map((business) => (
            <Link 
              href={'/details/'+business.id} 
              key={business.id} 
              className="mb-4 hover:scale-105 cursor-pointer"
            >
              <div className="flex justify-between items-center my-2">
                <p className="">{business.name}</p>
                <Image 
                  alt={business.name} 
                  src={business.images[0]?.url} 
                  width={100} 
                  height={100} 
                  className="rounded-md object-cover size-8"
                />
              </div>
              <hr /> 
            </Link>
          ))
        ) : (
          searchTerm && <p>No results found.</p>
        )}
      </div>
    </div>
  );
};
