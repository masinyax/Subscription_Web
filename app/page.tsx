'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSubscription } from '../hooks/useSubscription';
import { MOVIES } from '../data/movies';
import Link from 'next/link';

export default function HomePage() {
  const { isConnected, has4KAccess, expiryDateFormatted } = useSubscription();

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans pb-20">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            STREAM3 FLIX
          </Link>
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-white border-b-2 border-red-500 pb-1">
              🏠 HOMEPAGE
            </Link>
            <Link href="/subscription" className="text-neutral-400 hover:text-white transition">
              💳 MEMBERSHIP
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isConnected && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                has4KAccess
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-orange-500/10 text-orange-400 border-orange-500/30'
              }`}
            >
              {has4KAccess ? 'Premium Active' : 'Free Account (nonActive Premium)'}
            </span>
          )}

          <ConnectButton />
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 py-16 px-6 border-b border-neutral-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold rounded-full">
              WEB3 DECENTRALIZED STREAMING
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              ชมภาพยนตร์ & อนิเมะระดับ <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">FHD</span> บน IPFS
            </h1>
            {isConnected && (
              <p className="text-xs text-neutral-400 pt-2">
                สถานะของคุณ: <span className="text-neutral-200 font-semibold">{expiryDateFormatted}</span>
              </p>
            )}
          </div>

          {!has4KAccess && (
            <div className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-xl">
              <span className="text-3xl">🍿</span>
              <h3 className="font-bold text-lg">ปลดล็อก FHD Streaming</h3>
              <p className="text-xs text-neutral-400 max-w-xs">
                สมัครแพ็กเกจ Premium เพื่อรับชมคอนเทนต์ทั้งหมดแบบไม่สะดุด
              </p>
              <Link
                href="/subscription"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition"
              >
                สมัคร Premium เริ่มต้น 0.1 ETH
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Movie Cards Grid Section */}
      <section className="max-w-6xl mx-auto px-6 pt-12 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold">หนังและอนิเมะแนะนำ</h2>
            <p className="text-xs text-neutral-400 mt-1">คลิกเพื่อรับชมวิดีโอ</p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOVIES.map((movie) => (
            <Link key={movie.id} href={`/watch/${movie.id}`}>
              <div className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800/80 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-lg flex flex-col h-full cursor-pointer">
                {/* Cover Image Container */}
                <div className="relative aspect-[2/3] overflow-hidden bg-neutral-950">
                  <img
                    src={movie.coverImage}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Badge 4K */}
                  {movie.is4K && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      Premium
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-neutral-300 text-[11px] px-2.5 py-1 rounded-md font-medium">
                    {movie.category}
                  </span>
                </div>

                {/* Card Info */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    <h3 className="font-bold text-base line-clamp-1 group-hover:text-red-400 transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-neutral-400 text-xs line-clamp-2 mt-1">
                      {movie.description}
                    </p>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs text-neutral-400 border-t border-neutral-800/60">
                    <span>{movie.rating}</span>
                    <span className="text-red-500 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      รับชมเลย ▶
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}