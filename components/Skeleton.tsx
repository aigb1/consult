
import React from 'react';

// Enhanced base with higher visibility for dark mode backgrounds
export const SkeletonBase: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-white/[0.08] rounded-2xl ${className}`} />
);

export const CardSkeleton = () => (
  <div className="flex flex-col px-1 w-full animate-in fade-in duration-500">
    <SkeletonBase className="aspect-[4/5] rounded-[2.5rem] mb-6 shadow-xl" />
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3 flex-1">
          <SkeletonBase className="h-8 w-[90%] rounded-xl" />
          <SkeletonBase className="h-4 w-[50%] rounded-lg opacity-40" />
        </div>
        <SkeletonBase className="h-10 w-16 rounded-xl shrink-0 opacity-60" />
      </div>
      <div className="flex justify-between items-center pt-5 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-baseline gap-2">
          <SkeletonBase className="h-9 w-28 rounded-xl" />
          <SkeletonBase className="h-4 w-12 rounded-lg opacity-30" />
        </div>
        <SkeletonBase className="h-4 w-20 rounded-lg opacity-30" />
      </div>
    </div>
  </div>
);

export const DossierIdentitySkeleton = () => (
  <div className="grid md:grid-cols-[180px_1fr] gap-10 items-start pb-10 border-b border-slate-100 dark:border-white/5 animate-in fade-in duration-500">
    <div className="space-y-5">
      <SkeletonBase className="aspect-square rounded-[2.25rem]" />
      <div className="space-y-2">
        <SkeletonBase className="h-8 w-full rounded-xl" />
        <SkeletonBase className="h-8 w-full rounded-xl" />
      </div>
    </div>
    <div className="space-y-6">
      <div className="space-y-3">
        <SkeletonBase className="h-3 w-40 rounded-full" />
        <SkeletonBase className="h-16 w-3/4 rounded-2xl" />
        <SkeletonBase className="h-6 w-1/2 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <SkeletonBase key={i} className="h-16 rounded-[1.75rem]" />)}
      </div>
    </div>
  </div>
);

export const BentoBlockSkeleton = () => (
  <div className="p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[3rem] space-y-5">
    <SkeletonBase className="h-4 w-32 rounded-full" />
    <div className="space-y-3">
      <SkeletonBase className="h-6 w-full rounded-lg" />
      <SkeletonBase className="h-6 w-full rounded-lg" />
      <SkeletonBase className="h-6 w-[70%] rounded-lg" />
    </div>
  </div>
);

export const ExperienceItemSkeleton = () => (
  <div className="flex gap-6 p-6 border border-slate-100 dark:border-white/5 rounded-[2.5rem]">
    <SkeletonBase className="w-12 h-12 rounded-2xl shrink-0" />
    <div className="space-y-3 flex-1">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <SkeletonBase className="h-6 w-1/2 rounded-lg" />
          <SkeletonBase className="h-3 w-1/4 rounded-lg opacity-40" />
        </div>
        <SkeletonBase className="h-6 w-20 rounded-lg" />
      </div>
      <SkeletonBase className="h-16 w-full rounded-2xl opacity-60" />
    </div>
  </div>
);

export const TerminalSkeleton = () => (
  <div className="p-6 space-y-10">
    <div className="flex justify-between items-center">
      <SkeletonBase className="h-8 w-24 rounded-full" />
      <SkeletonBase className="h-8 w-24 rounded-lg" />
    </div>
    <SkeletonBase className="h-12 w-3/4 rounded-xl" />
    <SkeletonBase className="h-40 w-full rounded-[2.5rem]" />
    <div className="space-y-4">
      <SkeletonBase className="h-4 w-32 rounded-full" />
      <div className="grid grid-cols-2 gap-3">
        <SkeletonBase className="h-24 rounded-[1.5rem]" />
        <SkeletonBase className="h-24 rounded-[1.5rem]" />
      </div>
    </div>
    <SkeletonBase className="h-16 w-full rounded-[1.5rem] mt-auto" />
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center justify-between p-8 border border-slate-100 dark:border-white/5 rounded-3xl">
    <div className="flex items-center gap-6">
      <SkeletonBase className="w-12 h-12 rounded-2xl" />
      <div className="space-y-2">
        <SkeletonBase className="h-5 w-32 rounded-lg" />
        <SkeletonBase className="h-3 w-40 rounded-lg opacity-40" />
      </div>
    </div>
    <SkeletonBase className="h-6 w-20 rounded-lg" />
  </div>
);

export const StatCardSkeleton = () => (
  <div className="p-10 border border-slate-200 dark:border-white/10 rounded-[40px] space-y-4 h-[180px]">
    <SkeletonBase className="h-3 w-24 rounded-full" />
    <SkeletonBase className="h-12 w-40 rounded-xl" />
    <SkeletonBase className="h-3 w-32 rounded-full opacity-30 mt-auto" />
  </div>
);

export const NodeInventoryItemSkeleton = () => (
  <div className="p-5 border border-slate-200 dark:border-white/5 rounded-[2rem] space-y-3 opacity-60">
    <div className="flex justify-between">
      <SkeletonBase className="h-4 w-32 rounded-lg" />
      <SkeletonBase className="h-4 w-12 rounded-lg" />
    </div>
    <SkeletonBase className="h-3 w-24 rounded-full opacity-40" />
  </div>
);
