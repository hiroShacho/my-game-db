import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export type FeaturedCarouselSlide = {
  href?: string | null;
  image: string;
  title: string;
  description?: string;
};

type FeaturedCarouselProps = {
  slides: FeaturedCarouselSlide[];
  autoPlayMs?: number;
  className?: string;
  imagePriority?: boolean;
};

export function FeaturedCarousel({
  slides,
  autoPlayMs = 5000,
  className = "",
  imagePriority = true,
}: FeaturedCarouselProps) {
  const router = useRouter();

  const normalizedSlides = useMemo(() => slides ?? [], [slides]);
  const loopSlides = useMemo(() => {
    if (normalizedSlides.length === 0) return [];
    if (normalizedSlides.length === 1) return normalizedSlides;
    return [
      normalizedSlides[normalizedSlides.length - 1],
      ...normalizedSlides,
      normalizedSlides[0],
    ];
  }, [normalizedSlides]);

  const hasLoop = normalizedSlides.length > 1;

  const [current, setCurrent] = useState(hasLoop ? 1 : 0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const lastPointerX = useRef<number | null>(null);
  const lastPointerTime = useRef<number | null>(null);
  const velocityX = useRef(0);

  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const autoPlayTimerRef = useRef<number | null>(null);

  const SWIPE_THRESHOLD = 60;
  const DRAG_START_THRESHOLD = 8;
  const CLICK_SUPPRESS_RESET_MS = 80;
  const VELOCITY_TRIGGER = 0.25;
  const INERTIA_DISTANCE = 140;

  useEffect(() => {
    if (!hasLoop) {
      setCurrent(0);
      return;
    }

    if (current === 0 || current === loopSlides.length - 1) return;
    if (current < 0 || current > loopSlides.length - 1) {
      setCurrent(1);
    }
  }, [current, hasLoop, loopSlides.length]);

  const clearAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current !== null) {
      window.clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  const resetAutoPlay = useCallback(() => {
    clearAutoPlay();

    if (!hasLoop || isHovered || isDragging) return;

    autoPlayTimerRef.current = window.setInterval(() => {
      setIsAnimating(true);
      setCurrent((prev) => prev + 1);
    }, autoPlayMs);
  }, [autoPlayMs, clearAutoPlay, hasLoop, isHovered, isDragging]);

  useEffect(() => {
    resetAutoPlay();
    return () => clearAutoPlay();
  }, [resetAutoPlay, clearAutoPlay]);

  const resetDragState = () => {
    pointerStartX.current = null;
    pointerStartY.current = null;
    lastPointerX.current = null;
    lastPointerTime.current = null;
    velocityX.current = 0;
    setIsDragging(false);
    setDragOffsetX(0);
  };

  const handleManualMove = (nextIndex: number) => {
    setIsAnimating(true);
    setCurrent(nextIndex);
    clearAutoPlay();
    resetAutoPlay();
  };

  const handlePrev = () => {
    handleManualMove(current - 1);
  };

  const handleNext = () => {
    handleManualMove(current + 1);
  };

  const handleDotClick = (index: number) => {
    if (!hasLoop) return;
    handleManualMove(index + 1);
  };

  const applyRubberBand = (offset: number) => {
    if (!hasLoop) return offset;

    const isAtLeftClone = current === 0;
    const isAtRightClone = current === loopSlides.length - 1;

    if (!isAtLeftClone && !isAtRightClone) return offset;

    const draggingFurtherOutLeft = isAtLeftClone && offset > 0;
    const draggingFurtherOutRight = isAtRightClone && offset < 0;

    if (!draggingFurtherOutLeft && !draggingFurtherOutRight) return offset;

    const abs = Math.abs(offset);
    const reduced = abs * 0.55 * (1 / (1 + abs / 240));

    return Math.sign(offset) * reduced;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (normalizedSlides.length <= 1) return;

    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    velocityX.current = 0;

    movedRef.current = false;
    suppressClickRef.current = false;

    clearAutoPlay();
    setIsDragging(true);
    setIsAnimating(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      normalizedSlides.length <= 1 ||
      pointerStartX.current === null ||
      pointerStartY.current === null
    ) {
      return;
    }

    const now = performance.now();
    const diffX = e.clientX - pointerStartX.current;
    const diffY = e.clientY - pointerStartY.current;

    if (
      Math.abs(diffX) > DRAG_START_THRESHOLD ||
      Math.abs(diffY) > DRAG_START_THRESHOLD
    ) {
      movedRef.current = true;
    }

    if (Math.abs(diffX) > Math.abs(diffY)) {
      const adjustedOffset = applyRubberBand(diffX);
      setDragOffsetX(adjustedOffset);

      if (Math.abs(diffX) > DRAG_START_THRESHOLD) {
        suppressClickRef.current = true;
      }

      if (lastPointerX.current !== null && lastPointerTime.current !== null) {
        const deltaX = e.clientX - lastPointerX.current;
        const deltaTime = now - lastPointerTime.current;

        if (deltaTime > 0) {
          velocityX.current = deltaX / deltaTime;
        }
      }

      lastPointerX.current = e.clientX;
      lastPointerTime.current = now;
    }
  };

  const handlePointerUp = () => {
    if (normalizedSlides.length <= 1) {
      resetDragState();
      return;
    }

    const diffX = dragOffsetX;
    const projectedX = diffX + velocityX.current * INERTIA_DISTANCE;

    if (
      Math.abs(diffX) >= SWIPE_THRESHOLD ||
      Math.abs(projectedX) >= SWIPE_THRESHOLD ||
      Math.abs(velocityX.current) >= VELOCITY_TRIGGER
    ) {
      setIsAnimating(true);

      if (projectedX > 0) {
        setCurrent((prev) => prev - 1);
      } else {
        setCurrent((prev) => prev + 1);
      }

      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, CLICK_SUPPRESS_RESET_MS);
    }

    resetDragState();
    resetAutoPlay();
  };

  const handlePointerLeave = () => {
    if (isDragging) {
      handlePointerUp();
    }
  };

  const handleClick = () => {
    if (movedRef.current || suppressClickRef.current) return;

    const realIndex = hasLoop ? current - 1 : current;
    const activeSlide = normalizedSlides[realIndex];

    if (activeSlide?.href) {
      router.push(activeSlide.href);
    }
  };

  const handleTransitionEnd = () => {
    if (!hasLoop) return;

    if (current === 0) {
      setIsAnimating(false);
      setCurrent(normalizedSlides.length);
      return;
    }

    if (current === loopSlides.length - 1) {
      setIsAnimating(false);
      setCurrent(1);
    }
  };

  useEffect(() => {
    if (!isAnimating) {
      const id = window.requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      return () => window.cancelAnimationFrame(id);
    }
  }, [isAnimating]);

  if (normalizedSlides.length === 0) return null;

  const trackTranslatePercent = -(current * 100);
  const trackTranslatePx = dragOffsetX;
  const activeDotIndex = hasLoop
    ? ((current - 1 + normalizedSlides.length) % normalizedSlides.length)
    : 0;

  return (
    <div
      className={`relative sm:col-span-2 ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        clearAutoPlay();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isDragging) {
          resetAutoPlay();
        }
      }}
    >
      <div
        className={`
          relative rounded-lg shadow-lg h-48 sm:h-64 overflow-hidden
          border-4 border-cyan-400 select-none
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={resetDragState}
        onClick={handleClick}
        onDragStart={(e) => e.preventDefault()}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="flex h-full"
          onTransitionEnd={handleTransitionEnd}
          style={{
            width: `${loopSlides.length * 100}%`,
            transform: `translateX(calc(${trackTranslatePercent}% / ${loopSlides.length} + ${trackTranslatePx}px))`,
            transition: isAnimating ? "transform 320ms ease" : "none",
          }}
        >
          {loopSlides.map((slide, idx) => (
            <div
              key={`${slide.title}-${idx}`}
              className="relative h-full shrink-0"
              style={{ width: `${100 / loopSlides.length}%` }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                className="object-cover w-full h-full pointer-events-none"
                style={{ objectPosition: "center" }}
                priority={imagePriority && idx === current}
                draggable={false}
              />

              <div className="absolute inset-0 bg-black/30 pointer-events-none" />

              <div className="absolute inset-0 pointer-events-none">
                {[...Array(32)].map((_, lineIdx) => (
                  <div
                    key={lineIdx}
                    className="absolute left-0 w-full h-[2px] bg-white/30"
                    style={{ top: `${(100 / 33) * (lineIdx + 1)}%` }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
                <span className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg bg-black/75 px-6 py-3 rounded-lg border border-pink-300">
                  {slide.title}
                </span>
                {slide.description && (
                  <p className="mt-3 text-sm sm:text-base text-white drop-shadow">
                    {slide.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {normalizedSlides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="前のトピック"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white w-10 h-10 hover:bg-black/70"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="次のトピック"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white w-10 h-10 hover:bg-black/70"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {normalizedSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`トピック ${idx + 1} を表示`}
                onClick={() => handleDotClick(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === activeDotIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}