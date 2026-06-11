'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserAndRole = async () => {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session) {
        router.push('/auth');
        return;
      }

      setUser(session.user);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError || profile?.role !== 'admin') {
        router.push('/dashboard'); // Redirect non-admins
      } else {
        setIsAdmin(true);
      }
      setLoading(false);
    };

    checkUserAndRole();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/auth');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading admin panel...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Should redirect, but render nothing in case of delay
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Materials */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Manage Materials</h3>
          <p className="text-gray-600 mb-4">Add, edit, or delete paper types, die materials, foil types, etc.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
            Go to Materials
          </button>
        </div>

        {/* Manage Labour Charges */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Manage Labour Charges</h3>
          <p className="text-gray-600 mb-4">Set and update labour costs for various printing processes.</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
            Go to Labour
          </button>
        </div>

        {/* Manage Machines */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Manage Machines</h3>
          <p className="text-gray-600 mb-4">Configure machine running costs, speeds, and setup waste.</p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300">
            Go to Machines
          </button>
        </div>

        {/* Manage Finishing Options */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Manage Finishing Options</h3>
          <p className="text-gray-600 mb-4">Define costs for lamination, binding, embossing, etc.</p>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-300">
            Go to Finishing
          </button>
        </div>

        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">General Settings</h3>
          <p className="text-gray-600 mb-4">Adjust profit margins, VAT settings, and other global parameters.</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
            Go to Settings
          </button>
        </div>

        {/* User Management (Placeholder) */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">User Management</h3>
          <p className="text-gray-600 mb-4">Manage user roles and permissions.</p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
            Go to Users
          </button>
        </div>
      </div>
    </div>
  );
}