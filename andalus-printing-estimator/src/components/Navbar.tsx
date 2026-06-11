'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (localStorage-based)
    const sessionEmail = localStorage.getItem('userEmail');
    if (sessionEmail) {
      setIsLoggedIn(true);
      setUserEmail(sessionEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    setIsLoggedIn(false);
    setUserEmail(null);
    router.push('/auth');
  };

  return (
    <nav className="bg-blue-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gold-300">
          Al Andalus Printing Estimator
        </Link>
        <div className="flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hover:text-gold-300 transition duration-300">
                Dashboard
              </Link>
              <Link href="/quotations" className="hover:text-gold-300 transition duration-300">
                Quotations
              </Link>
              <Link href="/customers" className="hover:text-gold-300 transition duration-300">
                Customers
              </Link>
              <Link href="/products" className="hover:text-gold-300 transition duration-300">
                Products
              </Link>
              <Link href="/admin" className="hover:text-gold-300 transition duration-300">
                Admin
              </Link>
              <span className="text-sm text-gray-200">{userEmail}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth" className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}