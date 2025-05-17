
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Sorry, the page you’re looking for doesn’t exist.</p>
      <Link href="/">
        <a className="px-4 py-2 bg-blue-600 text-white rounded">Go home</a>
      </Link>
    </div>
  );
}
