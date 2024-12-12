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
            alt="ini gambar"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 truncate" title={title}>
              {title}
            </h3>
            <div className="flex justify-between text-sm text-white mb-2">
              <span>{eps}</span>
              <span>{uploadDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-white text-violet-700 px-2 py-1 rounded-full text-xs">
                {type}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
