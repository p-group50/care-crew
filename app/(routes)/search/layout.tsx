import React from 'react'
import { CategorySideBar } from './_components/categorySideBar';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="grid grid-cols-4 mt-8">

        <div className="">
          <CategorySideBar />
        </div>

        <div className="col-span-3">
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout