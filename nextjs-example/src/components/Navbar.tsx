'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="font-[family-name:var(--font-geist-sans)] text-xl font-semibold">
              Voice Bot Examples
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 dark:text-neutral-200"
            >
              Home
            </Link>
            <Link
              href="/red"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-red-600 border-b-2 border-transparent hover:border-red-300"
            >
              Red
            </Link>
            <Link
              href="/blue"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-blue-600 border-b-2 border-transparent hover:border-blue-300"
            >
              Blue
            </Link>
            <Link
              href="/green"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-green-600 border-b-2 border-transparent hover:border-green-300"
            >
              Green
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 