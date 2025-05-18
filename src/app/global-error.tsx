'use client'

import Link from "next/link"

 
export default function GlobalError({
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
      <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6 capitalize">we can’t find the page you’re looking for.</p>
      <Link href="/">
        <button className="px-5 py-3 bg-primary text-white rounded uppercase">
          back to home
        </button>
      </Link>
    </main>
      </body>
    </html>
  )
}