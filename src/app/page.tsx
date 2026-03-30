"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DoorOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const MESSAGES = [
  "「やぁやぁ、君、ここでは見ない顔だねぇ。」",
  "「え？ ここはどこかって？」",
  "「ふふっ……よくぞ聞いてくれました。」",
  "「ここは童話の世界に繋がる扉が並ぶコネクトワールド」",
  "「悩める者がプリンセスやプリンスからヒントをもらうための世界さ！」",
  "「さぁ、話はここまでだ。迷える若人よ、扉を開いて進みたまえ」",
  "「君のストーリートレジャーに幸あれ！！」",
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={containerRef} className="relative w-full" style={{ height: "900vh" }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A1128]">
        
        {/* 背景のサンプルイラスト */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            // スクロールに合わせて少しズームする演出
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.1])
          }}
        >
          {/* テキストを読みやすくするためのダークオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/80 via-transparent to-[#0A1128]/90 z-10" />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/prologue-sample.jpg" 
            alt="コネクトワールド" 
            className="w-full h-full object-cover opacity-90"
          />
        </motion.div>

        {/* テキストコンテンツ */}
        <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none px-4 py-8">
          {MESSAGES.map((message, index) => {
            const start = index / 8;
            const end = (index + 1) / 8;
            const peak = start + (end - start) / 2;

            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.03, end - 0.03, end],
              [0, 1, 1, 0]
            );

            const translateY = useTransform(
              scrollYProgress,
              [start, peak, end],
              [50, 0, -50]
            );

            return (
              <motion.p
                key={index}
                style={{
                  opacity,
                  y: translateY,
                  textShadow: "0 4px 24px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.3)"
                }}
                className="absolute text-center text-2xl md:text-4xl text-white leading-relaxed max-w-2xl px-4 font-bold tracking-widest pointer-events-auto"
                aria-hidden={true}
              >
                {message}
              </motion.p>
            );
          })}

          {/* 最後のセクション：扉とボタン */}
          <FinalDoorSection scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* スクロールを促すインジケーター */}
      <ScrollIndicator scrollYProgress={scrollYProgress} />
    </main>
  );
}

function FinalDoorSection({ scrollYProgress }: { scrollYProgress: any }) {
  const start = 7 / 8;
  const peak = 8 / 8;

  const opacity = useTransform(scrollYProgress, [start, start + 0.05, peak], [0, 1, 1]);
  const translateY = useTransform(scrollYProgress, [start, peak], [50, 0]);
  const scale = useTransform(scrollYProgress, [start, peak], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity, y: translateY, scale }}
      className="absolute flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="relative mb-8 text-fantasy-accent" style={{ filter: "drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))" }}>
        <DoorOpen size={120} strokeWidth={1} />
      </div>
      
      <Link href="/projects">
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 bg-fantasy-accent text-white text-xl md:text-2xl rounded-sm shadow-xl font-bold border-2 border-yellow-200 overflow-hidden transition-all"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest">
            扉を開く
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </motion.button>
      </Link>
    </motion.div>
  );
}

function ScrollIndicator({ scrollYProgress }: { scrollYProgress: any }) {
  const opacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
    >
      <span className="text-sm tracking-widest text-white/80" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
        スクロールして進む
      </span>
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-[1px] h-12 bg-gradient-to-b from-white/80 to-transparent shadow-lg"
      />
    </motion.div>
  );
}
