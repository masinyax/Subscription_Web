'use client';

import { useState } from 'react'; // <-- เพิ่ม useState
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSubscription } from '../../../hooks/useSubscription';
import { MOVIES } from '../../../data/movies';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function WatchPage() {
  const params = useParams();
  const movieId = params.id as string;
  const movie = MOVIES.find((m) => m.id === movieId) || MOVIES[0];

  const { isConnected, hasFHDAccess, expiryDateFormatted } = useSubscription();

  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans pb-20">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            STREAM3 FLIX
          </Link>
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-neutral-400 hover:text-white transition">
              ← กลับหน้าแรก
            </Link>
          </nav>
        </div>

        <ConnectButton />
      </header>

      {/* Video Player Section */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
              {movie.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{movie.title}</h1>
          </div>

          <Link
            href="/subscription"
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            ⚙️ MANAGE MEMBERSHIP
          </Link>
        </div>

        {/* 🎛️ ปุ่มเลือก Server / เครื่องเล่นวิดีโอ (Player Switcher) */}
        <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium px-2">เลือกเซิร์ฟเวอร์:</span>
            
            {/* ปุ่ม Player 1 (ความละเอียดปกติ) */}
            <button
              onClick={() => setActivePlayer(1)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                activePlayer === 1
                  ? 'bg-neutral-700 text-white shadow'
                  : 'bg-neutral-800/60 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>📺 Server 1 (720p / Free)</span>
            </button>

            {/* ปุ่ม Player 2 (VIP Full HD) */}
            <button
              onClick={() => setActivePlayer(2)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 border ${
                activePlayer === 2
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 border-amber-500/50 text-white shadow-lg'
                  : 'bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>🔥 Server 2 ( FHD Premium IPFS)</span>
              {hasFHDAccess ? (
                <span className="bg-emerald-500 text-black text-[9px] px-1.5 py-0.5 rounded font-black">ACTIVE</span>
              ) : (
                <span className="text-amber-400 text-xs">🔒</span>
              )}
            </button>
          </div>

          <div className="text-xs text-neutral-400 px-2">
            กำลังรับชมผ่าน: <span className="text-white font-semibold">{activePlayer === 1 ? 'Server 1 (ความละเอียดปกติ)' : 'Server 2 (Premium FHD)'}</span>
          </div>
        </div>

        {/* 🎬 Video Player Box */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
          {/* กรณีเลือก Player 1 (ฟรี) */}
          {activePlayer === 1 && (
            movie.freeVideoUrl.includes('youtube.com') ? (
              <iframe
                className="w-full h-full"
                src={`${movie.freeVideoUrl}?autoplay=1`}
                title="Free Player"
                allowFullScreen
              />
            ) : (
              <video className="w-full h-full object-contain" controls autoPlay src={movie.freeVideoUrl}>
                เบราว์เซอร์ไม่รองรับ
              </video>
            )
          )}

          {/* กรณีเลือก Player 2 (VIP Full HD) */}
          {activePlayer === 2 && (
            hasFHDAccess ? (
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                controlsList="nodownload"
                src={movie.ipfsUrl}
              >
                เบราว์เซอร์ไม่รองรับ
              </video>
            ) : (
              /* Overlay ล็อก ถ้ายังไม่มีพรีเมียม */
              <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500 text-2xl font-bold">
                  🔒
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Server 2 (FHD IPFS Stream) สำหรับสมาชิก Premium เท่านั้น
                </h3>
                <p className="text-neutral-400 text-sm max-w-md">
                  ยกระดับภาพยนตร์คมชัดระดับ FHD ไร้โฆษณาด้วยแพ็กเกจ Premium หรือสลับกลับไปใช้ Server 1 เพื่อดูฟรีในความละเอียดปกติ
                </p>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setActivePlayer(1)}
                    className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded-xl text-xs transition"
                  >
                    สลับไป Server 1 (ดูฟรี)
                  </button>
                  <Link
                    href="/subscription"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition transform hover:scale-105"
                  >
                    สมัครสมาชิก VIP 0.1 ETH
                  </Link>
                </div>
              </div>
            )
          )}
        </div>

        {/* Movie Info Details */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-3">
          <h3 className="font-bold text-lg">เรื่องย่อ</h3>
          <p className="text-neutral-300 text-sm leading-relaxed">{movie.description}</p>
          {isConnected && (
            <p className="text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
              สถานะสมาชิกของคุณ: <span className="text-neutral-200">{expiryDateFormatted}</span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}