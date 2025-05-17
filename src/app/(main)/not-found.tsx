'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">we can’t find the page you’re looking for.</p>
      <Link href="/">
        <button className="px-5 py-3 bg-primary text-white rounded">
          back to home
        </button>
      </Link>
    </main>
  );
}
