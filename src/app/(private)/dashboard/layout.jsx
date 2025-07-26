import React from 'react'
import DashBoardSideBar from '@/components/DashBoardSideBar'

const Layout = ({ children }) => {
  return (
    <section className="flex min-h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <DashBoardSideBar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </section>
  )
}

export default Layout
