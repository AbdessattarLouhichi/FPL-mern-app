import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function ClientLayout() {
  return (
    <>
        <Header />
        <div className='container'>
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default ClientLayout