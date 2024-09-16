'use client'
import { Button } from '@/components/ui/button'
import { useDescope, useUser } from '@descope/nextjs-sdk/client'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'

export const Header = () => { 

	// useUser retrieves the logged in user information
	const { user } = useUser();

	// useDescope retrieves Descope SDK for further operations related to authentication
	// such as logout
	const sdk = useDescope();

// used to logout user
	const handleLogout = useCallback(() => {
		sdk.logout();
	}, [sdk]);

  useEffect(() => {
    console.log(user)
  },[user]);

  return (
    <div className="flex items-center justify-between py-4 shadow-sm">

      {/* header logo */}
      <Link href={'/'} className="logo flex gap-x-4 items-center">
        <Image 
          src="/logo.svg" 
          alt='logo'
          width={30}
          height={30}
        />
        <h2 className='text-xl font-semibold'>CareCrew</h2>
      </Link>

      {/* menu list */}
      {/* <div className='hidden md:flex gap-4'>
        <Link href='/' className='hover:text-primary hover:scale-105 transition-all duration-300'>Home</Link>
        <Link href="#" className='hover:text-primary hover:scale-105 transition-all duration-300'>Services</Link>
        <Link href="#" className='hover:text-primary hover:scale-105 transition-all duration-300'>About Us</Link>
      </div> */}

      {!user ? // check if user is logged in 
      // if user is not logged in show sign in button
        <Link href={'/sign-in'}>
          <Button>
            Sign in
          </Button>
        </Link>
        :
        // if user is logged in show the profile icon
        <div className=''>
          <DropdownMenu>
            <DropdownMenuTrigger className=' focus:ring-0 ring-0'>
              <div className="flex justify-center items-center gap-x-2">
                <img src={user.picture} 
                alt=''
                className='size-8 rounded-full'
                /> 
                <p className="">{user?.givenName}</p>
                <ChevronDown size={16} className='opacity-50'/>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Link href="/my-booking">
                <DropdownMenuItem className="cursor-pointer hover:bg-primary/40">
                  My bookings
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer hover:bg-primary/40"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> 
      }
    </div>
  )
}
