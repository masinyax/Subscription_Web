'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSubscription } from '../../hooks/useSubscription';
import { useEffect } from 'react';
import Link from 'next/link';

export default function SubscriptionPage() {
  const {
    isConnected,
    hasFHDAccess,
    expiryDateFormatted,
    submittingPackage,
    isSubmitting,
    isSuccess,
    handleSubscribe,
    refreshData,
  } = useSubscription();

  useEffect(() => {
    if (isSuccess) {
      alert('ทำรายการสำเร็จเรียบร้อย!');
      refreshData();
    }
  }, [isSuccess]);

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            STREAM3 FLIX
          </Link>
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-neutral-400 hover:text-white transition">
              🎬 Dashboard
            </Link>
            <Link href="/subscription" className="text-white border-b-2 border-red-500 pb-1">
              💳 Subscription
            </Link>
          </nav>
        </div>

        <ConnectButton />
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Status Card */}
        <section className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-4 text-neutral-300">ข้อมูลสมาชิกปัจจุบัน</h2>
          {isConnected ? (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-950 p-6 rounded-2xl border border-neutral-800/80">
              <div>
                <p className="text-sm text-neutral-400">สถานะแพ็กเกจปัจจุบัน</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-bold">
                    {hasFHDAccess ? 'VIP Full HD Access' : 'Free Plan (ไม่มีสิทธิ์ Premiun)'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      hasFHDAccess
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                    }`}
                  >
                    {hasFHDAccess ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  หมดอายุวันที่: <span className="text-neutral-200">{expiryDateFormatted}</span>
                </p>
              </div>

              {/* ปุ่มกลับไปดูหนัง เมื่อมีสิทธิ์แล้ว */}
              {hasFHDAccess && (
                <Link
                  href="/"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition"
                >
                  ไปที่หน้าดูหนัง Full HD 🍿
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-neutral-400">
              กรุณาเชื่อมต่อ Wallet เพื่อตรวจสอบและจัดการแพ็กเกจของคุณ
            </div>
          )}
        </section>

        {/* Pricing Plans */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">เลือกแพ็กเกจหรือต่ออายุสมาชิก</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-300">Monthly Package</h3>
                <p className="text-3xl font-bold mt-2">0.1 ETH <span className="text-sm font-normal text-neutral-400">/ 30 วัน</span></p>
                <ul className="mt-4 text-xs text-neutral-400 space-y-2">
                  <li>✅ ชมภาพยนตร์ระดับความคมชัด Full HD</li>
                  <li>✅ รองรับ IPFS Stream ความเร็วสูง</li>
                  <li>✅ ต่ออายุอัตโนมัติเมื่อกดสมัครเพิ่ม</li>
                </ul>
              </div>
              <button
                disabled={!isConnected || isSubmitting}
                onClick={() => handleSubscribe(1)}
                className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 text-white font-semibold rounded-xl transition"
              >
                {submittingPackage === 1 ? 'กำลังทำรายการ...' : 'Subscribe / ต่ออายุ Monthly'}
              </button>
            </div>

            {/* Yearly */}
            <div className="bg-neutral-900 border-2 border-amber-500/50 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <span className="absolute top-4 right-4 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                Best Value / Save 17%
              </span>
              <div>
                <h3 className="text-lg font-semibold text-neutral-300">Yearly Package</h3>
                <p className="text-3xl font-bold mt-2">1.0 ETH <span className="text-sm font-normal text-neutral-400">/ 365 วัน</span></p>
                <ul className="mt-4 text-xs text-neutral-400 space-y-2">
                  <li>✅ สิทธิ์ดูความระเอียดระดับ Full HD ทั้งปี 365 วัน</li>
                  <li>✅ ประหยัดกว่าแบบรายเดือน 17%</li>
                  <li>✅ สิทธิ์เข้าถึงก่อนใครตลอดทั้งปี</li>
                </ul>
              </div>
              <button
                disabled={!isConnected || isSubmitting}
                onClick={() => handleSubscribe(2)}
                className="mt-6 w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:bg-neutral-800 text-black font-bold rounded-xl transition"
              >
                {submittingPackage === 2 ? 'กำลังทำรายการ...' : 'Subscribe / ต่ออายุ Yearly'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}