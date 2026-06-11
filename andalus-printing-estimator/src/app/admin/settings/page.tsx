'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Settings {
  id: string;
  profit_margin: number;
  vat_rate: number;
  default_currency: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session) {
        router.push('/auth');
        return;
      }

      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError || profile?.role !== 'admin') {
        router.push('/dashboard'); // Redirect non-admins
        return;
      }

      const { data, error } = await supabase.from('settings').select('*').single();
      if (error) {
        setError(error.message);
      } else {
        setSettings(data);
      }
      setLoading(false);
    };

    fetchSettings();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/auth');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => prev ? { ...prev, [name]: parseFloat(value) } : null);
  };

  const handleSaveSettings = async () => {
    if (!settings) return;

    // Ensure settings.id is correctly passed if it exists
    const { error } = await supabase.from('settings').update(settings).eq('id', settings.id);
    if (error) {
      setError(error.message);
    } else {
      alert('Settings saved successfully!');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Settings not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">General Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="profit_margin" className="block text-sm font-medium text-gray-700 mb-1">
              Default Profit Margin (%)
            </label>
            <input
              type="number"
              id="profit_margin"
              name="profit_margin"
              value={settings.profit_margin}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="vat_rate" className="block text-sm font-medium text-gray-700 mb-1">
              VAT Rate (%)
            </label>
            <input
              type="number"
              id="vat_rate"
              name="vat_rate"
              value={settings.vat_rate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="default_currency" className="block text-sm font-medium text-gray-700 mb-1">
              Default Currency
            </label>
            <input
              type="text"
              id="default_currency"
              name="default_currency"
              value={settings.default_currency}
              onChange={(e) => setSettings(prev => prev ? { ...prev, default_currency: e.target.value } : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}