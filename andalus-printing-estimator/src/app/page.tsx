import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-bold text-center mb-8">
        Welcome to Al Andalus Printing Estimator
      </h1>
      <p className="text-xl text-center mb-12">
        Your professional offset printing estimation and quotation system.
      </p>
      <div className="flex space-x-4">
        <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Go to Dashboard
        </Link>
        <Link href="/auth" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-50 transition duration-300">
          Login / Register
        </Link>
      </div>
    </main>
  );
}