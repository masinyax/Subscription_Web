'use client';

import { useState, useEffect } from 'react'; // <-- เพิ่ม useState, useEffect
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import MovieSubscriptionABI from '../contracts/MovieSubscriptionABI.json';

const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '972aef7b686a9fca412e695ed9c7e719') as `0x${string}`;

export function useSubscription() {
  const { address, isConnected } = useAccount();
  
  // เพิ่ม State เก็บเลขแพ็กเกจที่กำลังกดสมัคร (1 = Monthly, 2 = Yearly, null = ไม่ได้กด)
  const [submittingPackage, setSubmittingPackage] = useState<1 | 2 | null>(null);

  // 1. ดึงวันหมดอายุ
  const { data: rawTimestamp, isLoading: isExpiryLoading, refetch: refetchExpiry } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MovieSubscriptionABI,
    functionName: 'getExpirationDate',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  // 2. เช็กสิทธิ์ 4K
  const { data: has4KAccess, isLoading: is4KLoading, refetch: refetch4K } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MovieSubscriptionABI,
    functionName: 'has4KAccess',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  // 3. ดึงค่าธรรมเนียม
  const { data: monthlyFee } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MovieSubscriptionABI,
    functionName: 'monthlyFee',
  });

  const { data: yearlyFee } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MovieSubscriptionABI,
    functionName: 'yearlyFee',
  });

  // 4. การทำธุรกรรม
  const { data: hash, isPending: isWriting, isError: isWriteError, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // ถ้าทำรายการเสร็จ หรือเกิด Error / กดยกเลิกใน MetaMask ให้เคลียร์สถานะปุ่ม
  useEffect(() => {
    if (isConfirmed || isWriteError) {
      setSubmittingPackage(null);
    }
  }, [isConfirmed, isWriteError]);

  const handleSubscribe = (packageType: 1 | 2) => {
    const fee = packageType === 1 ? monthlyFee : yearlyFee;

    if (!fee) {
      alert('ไม่สามารถดึงข้อมูลราคาจาก Contract ได้');
      return;
    }

    // บันทึกว่ากำลังทำรายการของแพ็กเกจไหน
    setSubmittingPackage(packageType);

    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: MovieSubscriptionABI,
        functionName: 'subscribe',
        args: [packageType],
        value: fee as bigint,
      },
      {
        // หากผู้ใช้กดยกเลิกใน MetaMask ให้รีเซ็ตปุ่มทันที
        onError: () => setSubmittingPackage(null),
      }
    );
  };

  const getFormattedExpiryDate = () => {
    if (!isConnected) return 'กรุณาเชื่อมต่อ Wallet';
    if (isExpiryLoading) return 'กำลังโหลด...';
    
    const timestampNumber = Number(rawTimestamp || 0);
    if (timestampNumber === 0) return 'ยังไม่ได้เป็นสมาชิก';

    const dateObj = new Date(timestampNumber * 1000);
    return dateObj.toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return {
    isConnected,
    userAddress: address,
    has4KAccess: Boolean(has4KAccess),
    expiryDateFormatted: getFormattedExpiryDate(),
    isLoading: isExpiryLoading || is4KLoading,
    submittingPackage, // <-- ส่งตัวแประบุแพ็กเกจออกไป
    isSubmitting: isWriting || isConfirming,
    isSuccess: isConfirmed,
    handleSubscribe,
    refreshData: () => {
      refetchExpiry();
      refetch4K();
    },
  };
}