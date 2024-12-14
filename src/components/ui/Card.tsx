"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CardProps {
  title: string | undefined;
  image: string | undefined;
  eps: string | undefined;
  type: string | undefined;
  uploadDate: string | undefined;
  slug: string | undefined;
}

export function CardSkeleton() {
  return (
    <div className="bg-violet-700 shadow-md rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 sm:h-64 bg-violet-600"></div>
      <div className="p-3 sm:p-4 space-y-2">
        <div className="h-4 bg-violet-600 rounded w-3/4"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-violet-600 rounded w-1/4"></div>
          <div className="h-3 bg-violet-600 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-violet-600 rounded w-1/3"></div>
      </div>
    </div>
  );
}

export default function Card({
  title,
  image,
  eps,
  type,
  uploadDate,
  slug,
}: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <Link
        href={`/anime/${slug}`}
        className="bg-violet-700 shadow-md rounded-lg overflow-hidden block"
      >
        <div className="relative">
          <img
            src={image}
            alt={title || "Anime Image"}
            className="w-full h-48 sm:h-64 object-cover"
            loading="lazy"
          />
          <div className="p-3 sm:p-4">
            <h3
              className="text-base sm:text-lg font-bold mb-1 sm:mb-2 truncate"
              title={title}
            >
              {title}
            </h3>
            <div className="flex justify-between text-xs sm:text-sm text-white mb-1 sm:mb-2">
              <span>{eps}</span>
              <span>{uploadDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-white text-violet-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs">
                {type}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
