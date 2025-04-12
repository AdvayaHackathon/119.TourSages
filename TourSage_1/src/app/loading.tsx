'use client';

import LoadingAnimation from '@/components/animation';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50">
      <LoadingAnimation />
    </div>
  );
} 