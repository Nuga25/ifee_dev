"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Slide = {
  src: string;
  caption?: string;
};

type Props = {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  variant?: "landscape" | "portrait";
};

export default function Carousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 3000,
  showIndicators = true,
  showArrows = true,
  variant = "landscape",
}: Props) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const imageIndex = ((page % slides.length) + slides.length) % slides.length;
  const timerRef = useRef<number | null>(null);
  const isPaused = useRef(false);

  // autoplay logic
  const startAutoPlay = () => {
    if (autoPlay && !timerRef.current && !isPaused.current) {
      timerRef.current = window.setInterval(() => {
        setPage(([p]) => [p + 1, 1]);
      }, autoPlayInterval);
    }
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [autoPlay, autoPlayInterval]);

  // swipe threshold
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  function paginate(newDirection: number) {
    setPage(([p]) => [p + newDirection, newDirection]);
  }

  function handleDragStart() {
    isPaused.current = true;
    stopAutoPlay();
  }

  function handleDragEnd(offset: number, velocity: number) {
    const swipe = swipePower(offset, velocity);
    if (swipe < -swipeConfidenceThreshold) paginate(1);
    else if (swipe > swipeConfidenceThreshold) paginate(-1);

    isPaused.current = false;
    startAutoPlay();
  }

  // strictly horizontal motion
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <div className="relative w-full select-none">
      <div
        className={`relative w-full overflow-hidden ${
          variant === "portrait"
            ? "aspect-[8.9/18.7] max-w-[240px] mx-auto rounded-[2rem] border-[7px] border-slate-800/80 bg-gradient-to-b from-gray-200 to-gray-400 shadow-[0_0_25px_rgba(0,0,0,0.3)]"
            : "h-[180px] sm:h-[450px] rounded-md"
        }`}
        onMouseEnter={() => {
          isPaused.current = true;
          stopAutoPlay();
        }}
        onMouseLeave={() => {
          isPaused.current = false;
          startAutoPlay();
        }}
      >
        {/* Notch, only for portrait */}
        {variant === "portrait" && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20" />
        )}

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.5 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={(e, { offset, velocity }) =>
              handleDragEnd(offset.x, velocity.x)
            }
          >
            <Image
              src={slides[imageIndex].src}
              alt={`slide-${imageIndex}`}
              fill
              className={`w-full h-full ${
                variant === "portrait" ? "object-contain" : "object-cover"
              }`}
              priority
            />

            {/* Caption only overlays for landscape */}
            {variant === "landscape" && slides[imageIndex].caption && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/10 backdrop-blur-[2px] text-white w-[90%] px-2 py-1 md:px-4 md:py-2 rounded-md text-[7px] md:text-sm text-center">
                {slides[imageIndex].caption}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption below the frame for portrait — already outside the frame div now */}
      {variant === "portrait" && slides[imageIndex].caption && (
        <p className="text-center text-gray-300 text-[12px] mt-3">
          {slides[imageIndex].caption}
        </p>
      )}


      {/* Arrows */}
      {showArrows && (
        <>
          <button
            aria-label="prev"
            onClick={() => {
              paginate(-1);
              startAutoPlay();
            }}
            className={`absolute -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all ${
              variant === "portrait"
                ? "left-[-14px] top-1/2 w-7 h-7 text-sm"
                : "left-2 top-1/2 w-9 h-9"
            }`}
          >
            ‹
          </button>
          <button
            aria-label="next"
            onClick={() => {
              paginate(1);
              startAutoPlay();
            }}
            className={`absolute -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all ${
              variant === "portrait"
                ? "right-[-14px] top-1/2 w-7 h-7 text-sm"
                : "right-2 top-1/2 w-9 h-9"
            }`}
          >
            ›
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div
          className={`flex gap-2 left-1/2 -translate-x-1/2 z-20 ${
            variant === "portrait"
              ? "relative mt-3 justify-center"
              : "absolute bottom-3"
          }`}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPage([i, i > imageIndex ? 1 : -1]);
                startAutoPlay();
              }}
              className={`h-2 w-8 rounded-full transition-all ${
                i === imageIndex ? "bg-my-primary" : "bg-gray-600/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}