import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'


const NavBar = () => {

      const [categories, setCategories] = useState([]);
      
            useEffect(() => {
                  getCategories()
                  .then((newCategories) => setCategories(newCategories))
            }, []);
      
      return (
            <div className='container mx-auto px-10 mb-8'>
                  <div className='border-b w-full inline-block border-green-200 py-8'>
                        <div className='block'>
                              <Link href='/'>
                                    <span className="md:float-left cursor-pointer font-bold text-4xl text-white">
                                          BaLanced!
                                    </span>
                              </Link>
                              <div className='md:float-right md:contents'>
                                    {categories.map((category) => (
                                          <Link key={category.slug} href={`/category/${category.slug}`}>
                                                <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                                      {category.name}
                                                </span>
                                          </Link>
                                    ))}
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default NavBar;