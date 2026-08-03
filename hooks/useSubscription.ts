'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import MovieSubscriptionABI from '../contracts/MovieSubscriptionABI.json';

const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x6e388b0bca7f0fdcf6469005709de5f78e9d84da') as `0x${string}`;

export function useSubscription() {
  const { address, isConnected } = useAccount();

  const [submittingPackage, setSubmittingPackage] = useState<1 | 2 | null>(null);

  const { data: rawTimestamp, isLoading: isExpiryLoading, refetch: refetchExpiry } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MovieSubscriptionABI,
    functionName: 'getExpirationDate',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const { data: hasFHDAccess, isLoading: isFHDLoading, refetch: refetchFHD } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MovieSubscriptionABI,
    functionName: 'hasFHDAccess',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

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

  const { data: hash, isPending: isWriting, isError: isWriteError, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

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
    hasFHDAccess: Boolean(hasFHDAccess),
    expiryDateFormatted: getFormattedExpiryDate(),
    isLoading: isExpiryLoading || isFHDLoading,
    submittingPackage,
    isSubmitting: isWriting || isConfirming,
    isSuccess: isConfirmed,
    handleSubscribe,
    refreshData: () => {
      refetchExpiry();
      refetchFHD();
    },
  };
} 