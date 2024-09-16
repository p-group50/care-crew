import Image from 'next/image';
import { Category } from '../_services/types'; // Import the Category type 
import Link from 'next/link';

interface CategoryListProps {
  categoryList: Category[]; // Specify the type of the categories prop
}

// pass te list of categories as props 
export const CategoryList = ({ categoryList }: CategoryListProps) => {
  return (
    <div className='w-full flex gap-3 justify-center flex-wrap my-8'>

      {/* fetching the categories from the backend and passing it to the ui */}
      {categoryList.length > 0 ? categoryList.map((category, index ) => (
        <Link 
          href={'/search/'+category.name} 
          key={index} 
          className="flex flex-col flex-wrap items-center justify-center gap-2 bg-[#F1F1F1] p-5 rounded-lg w-32 hover:scale-105 hover:border-primary hover:border transition-all ease-in-out shadow cursor-pointer"
        >
          <Image
            src={category.icon?.url} 
            alt={category.name}
            width={200} 
            height={200} 
            className="object-cover"
          />
          <h3 className='text-lg text-primary text-center pt-2'>{category.name}</h3>
        </Link>
      ))
      : [1,2,3,4,5,6].map((item, index) => (
        <div key={index} className="h-36 w-full bg-slate-300 rounded-lg animate-pulse"> 
        </div>
      ))
    } 
    </div>
  )
}




export const Test = () => {
  return(
    <div>
      test ui
    </div>
  )
}