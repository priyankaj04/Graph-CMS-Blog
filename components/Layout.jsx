import React from 'react'
import { NavBar } from './';

const Layout = ({ children }) => {
      return (
            <>
                  <NavBar />
                  {children}
            </>
      )
}

export default Layout;