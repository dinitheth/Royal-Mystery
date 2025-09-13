'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type SceneContainerProps = {
  backgroundId: string;
  children: ReactNode;
  className?: string;
};

export default function SceneContainer({ backgroundId, children, className }: SceneContainerProps) {
  const image = PlaceHolderImages.find((img) => img.id === backgroundId);

  return (
    <div className="relative h-full w-full">
      {image && (
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={image.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className={cn('relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center', className)}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="bg-background/80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-4xl border border-border"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
