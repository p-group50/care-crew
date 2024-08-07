import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react' 

export const Hero = () => {
  return (
    <div className='flex items-center justify-center flex-col pt-12 pb-6'>
      <h2 className=' test font-bold text-5xl text-center'>Find the best services</h2>
      <p className='text-center opacity-45'>Explore services and repairs</p>

      {/* hero search */}
      <div className="flex items-center mt-4">
        <Input 
          placeholder='Search'
          className='md:w-80 focus-visible:ring-0 rounded-r-none border-primary'
        />

        <Button className='rounded-l-none'>
          <Search className='size-4'/>
        </Button>
      </div>
    </div>
  )
}
