'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.push('/auth');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Dashboard</h1>
      {user && <p className="text-lg mb-4">Welcome, {user.email}!</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Quotations */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Quotations</h3>
          <p className="text-3xl font-bold text-blue-600">120</p> {/* Placeholder */}
        </div>

        {/* Pending Quotations */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Pending Quotations</h3>
          <p className="text-3xl font-bold text-yellow-600">15</p> {/* Placeholder */}
        </div>

        {/* Approved Quotations */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Approved Quotations</h3>
          <p className="text-3xl font-bold text-green-600">90</p> {/* Placeholder */}
        </div>

        {/* Monthly Sales Estimate */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Monthly Sales Estimate</h3>
          <p className="text-3xl font-bold text-purple-600">50,000 QAR</p> {/* Placeholder */}
        </div>

        {/* Most Used Products */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Most Used Products</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Business Cards (25%)</li> {/* Placeholder */}
            <li>Flyers (20%)</li> {/* Placeholder */}
            <li>Brochures (15%)</li> {/* Placeholder */}
          </ul>
        </div>

        {/* Recent Quotations */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Recent Quotations</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>#Q00120 - John Doe (Approved)</li> {/* Placeholder */}
            <li>#Q00119 - Jane Smith (Pending)</li> {/* Placeholder */}
            <li>#Q00118 - ABC Corp (Approved)</li> {/* Placeholder */}
          </ul>
        </div>
      </div>
    </div>
  );
}