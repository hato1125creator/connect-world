"use client";

import { Project } from "@/lib/google-sheets";
import { DoorClosed, Sparkles, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface DoorCardProps {
  project: Project;
}

const CategoryTheme: Record<string, string> = {
  'fairy-tale': 'border-fairy-tale/40',
  'magic': 'border-magic/40',
  'adventure': 'border-adventure/40',
};

const CategoryBadge: Record<string, string> = {
  'fairy-tale': 'bg-fairy-tale text-white',
  'magic': 'bg-magic text-white',
  'adventure': 'bg-adventure text-white',
};

const CategoryLabel: Record<string, string> = {
  'fairy-tale': '童話',
  'magic': '魔法',
  'adventure': '冒険',
};

export default function DoorCard({ project }: DoorCardProps) {
  const borderTheme = CategoryTheme[project.category] || 'border-fantasy-accent/40';
  const badge = CategoryBadge[project.category] || 'bg-fantasy-accent text-white';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative group flex flex-col h-full bg-white rounded-t-full rounded-b-md shadow-lg overflow-hidden border-x-4 border-t-8 border-b-[16px] transition-shadow hover:shadow-2xl ${borderTheme}`}
    >
      {/* 扉の装飾となる内側の枠線 */}
      <div className="absolute inset-2 border-2 border-dashed border-fantasy-accent/40 rounded-t-full pointer-events-none z-10" />

      {/* ドアノブ（装飾） */}
      <div className="absolute right-5 top-[55%] w-4 h-4 rounded-full bg-fantasy-accent shadow-md border border-yellow-600 z-10 opacity-70 group-hover:opacity-100 group-hover:bg-yellow-400 object-cover transition-all duration-300" />

      {/* トップの画像エリア（扉の窓や絵本の表紙をイメージ） */}
      <div className="relative w-full h-48 bg-fantasy-bg/50 border-b-2 border-fantasy-accent/20 overflow-hidden">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-fantasy-text/30 group-hover:text-fantasy-accent transition-colors duration-500">
            <DoorClosed size={48} strokeWidth={1} />
            <span className="text-xs mt-2 tracking-widest font-serif">NO IMAGE</span>
          </div>
        )}
        
        {/* カテゴリバッジ */}
        <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-1 text-xs font-bold tracking-widest rounded-full shadow-md whitespace-nowrap z-20 ${badge}`}>
          {CategoryLabel[project.category] || '未分類'}
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 p-6 pt-8 flex flex-col bg-gradient-to-b from-white to-fantasy-bg/30">
        <div className="text-center mb-5">
          <h3 className="font-bold text-xl md:text-2xl text-fantasy-text font-serif leading-tight">
            {project.title}
          </h3>
          <p className="text-sm text-fantasy-text/70 mt-2 font-medium tracking-widest">
            {project.group}
          </p>
        </div>

        <div className="text-sm border-y border-fantasy-accent/20 py-3 mb-4 flex items-center justify-center gap-2 text-fantasy-text/80 bg-white/50">
          <MapPin size={16} className="text-fantasy-accent" />
          <span className="font-bold">{project.location}</span>
        </div>

        <p className="text-sm text-fantasy-text/90 flex-1 leading-relaxed text-left relative z-20">
          {project.description}
        </p>

        {/* 案内人のメッセージ（フッター部分） */}
        {project.guideMessage && (
          <div className="mt-6 pt-4 border-t border-fantasy-accent/30 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2">
              <Sparkles className="text-fantasy-accent animate-pulse" size={18} />
            </div>
            <p className="text-xs italic text-fantasy-text/80 font-serif leading-relaxed text-center px-2">
              「{project.guideMessage.replace(/^「|」$/g, '')}」
            </p>
          </div>
        )}
      </div>
      
      {/* ホバー時の光の反射エフェクト */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-30" />
    </motion.div>
  );
}
