'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

const DashboardPage = (req) => {
  const router = useRouter();


  useEffect(() => {
     

    // if (!token) {
    //   router.push("/login");
    // }
  }, []);

  return <div>Dashboard</div>;
};

export default DashboardPage;
