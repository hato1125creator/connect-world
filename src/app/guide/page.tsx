"use client";

import { useState } from "react";
import { MapPin, Clock, AlertTriangle, ScrollText, CheckCircle2, User, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<'resident' | 'traveler'>('traveler'); // 初期タブを外部向けに変更

  return (
    <main className="min-h-screen bg-fantasy-bg pt-24 pb-32 md:pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* ヘッダー */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-fantasy-text mb-4 drop-shadow-sm flex justify-center items-center gap-4">
            <ScrollText size={40} className="text-fantasy-accent hidden md:block" />
            冒険のしおり
            <ScrollText size={40} className="text-fantasy-accent hidden md:block transform scale-x-[-1]" />
          </h1>
          <p className="text-fantasy-text/80 tracking-widest text-sm bg-white/50 backdrop-blur-sm shadow-sm rounded-full inline-block py-2 px-6 border border-fantasy-accent/30">
            コネクトワールドを歩むための道標
          </p>
        </header>

        {/* 招待状（開催概要） */}
        <section className="relative bg-white border-2 border-fantasy-accent p-8 md:p-12 rounded-lg shadow-xl">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-fantasy-accent rounded-tl-lg -translate-x-1 -translate-y-1" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-fantasy-accent rounded-tr-lg translate-x-1 -translate-y-1" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-fantasy-accent rounded-bl-lg -translate-x-1 translate-y-1" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-fantasy-accent rounded-br-lg translate-x-1 translate-y-1" />

          <h2 className="text-2xl font-bold font-serif text-fantasy-text text-center border-b border-dashed border-fantasy-accent/60 pb-6 mb-8 tracking-widest">
            王宮からの招待状
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-fantasy-text font-medium leading-relaxed">
            <div className="flex flex-col gap-2 p-6 bg-fantasy-bg/50 rounded-md border border-fantasy-text/10">
              <span className="flex items-center gap-2 text-fantasy-accent font-bold text-lg mb-2">
                <Clock size={20} /> 開門の刻（日時）
              </span>
              <p>第1日（関係者公開）: <br/>2026年 7月17日（金）</p>
              <p>第2日（一般公開）: <br/>2026年 7月18日（土）</p>
              <div className="mt-2 pt-2 border-t border-fantasy-text/20">
                <p className="text-xl font-bold">09:30 - 14:00</p>
                <p className="text-sm text-fantasy-text/70 mt-1">※両日とも最終入場（受付）は 13:30 までとなります</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 p-6 bg-fantasy-bg/50 rounded-md border border-fantasy-text/10">
              <span className="flex items-center gap-2 text-fantasy-accent font-bold text-lg mb-2">
                <MapPin size={20} /> 舞台（アクセス）
              </span>
              <p>私立 梨花高等学校（校内全域）</p>
              <p className="text-sm text-fantasy-text/70 mt-2">※ 鉄の馬や魔法の絨毯（自転車・自動車）でのご来場は固く禁じております。公共交通機関をご利用願います。</p>
            </div>
          </div>
        </section>

        {/* ルール（タブ切り替え） */}
        <section className="bg-white/60 p-6 md:p-8 rounded-xl shadow-md border-t-4 border-t-fantasy-accent">
          <h2 className="text-2xl font-bold font-serif text-fantasy-text text-center mb-8 flex items-center justify-center gap-3">
            <AlertTriangle size={24} className="text-fantasy-accent" />
            おとぎの国でのルール
          </h2>

          <div className="flex justify-center mb-8">
            <div className="bg-fantasy-bg p-1 rounded-full border-2 border-fantasy-accent/30 inline-flex shadow-inner">
              <button
                onClick={() => setActiveTab('traveler')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${activeTab === 'traveler' ? 'bg-fantasy-accent text-white shadow-md' : 'text-fantasy-text/60 hover:text-fantasy-text'}`}
              >
                <Users size={18} /> 旅人向け（来客）
              </button>
              <button
                onClick={() => setActiveTab('resident')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${activeTab === 'resident' ? 'bg-fantasy-accent text-white shadow-md' : 'text-fantasy-text/60 hover:text-fantasy-text'}`}
              >
                <User size={18} /> 住人向け（生徒）
              </button>
            </div>
          </div>

          <div className="relative min-h-[250px] overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'traveler' ? (
                <motion.div
                  key="traveler"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <RuleItem text="魔法の板（スマートフォン）は、写真や動画の撮影、連絡、および当サイトや公式SNSの閲覧にのみご使用いただけます。" />
                  <RuleItem text="お食事は「各飲食団体の活動教室」または「コモンホール」の指定エリアにてお楽しみください。" />
                  <RuleItem text="歩行中の撮影や、通路を塞いでの長時間の滞在は、他の冒険者の妨げとなるためご遠慮ください。" />
                  <RuleItem text="ゴミは所定の分別ダストボックス（魔法陣）へ魔力と共に正確に投棄してください。" />
                </motion.div>
              ) : (
                <motion.div
                  key="resident"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <RuleItem text="コネクトワールドの住人として、旅人をあたたかくおもてなしすること。" />
                  <RuleItem text="シフト中は責任を持って役目を果たし、無断での持ち場離脱は固く禁ず。" />
                  <RuleItem text="終了の鐘（14:15下校時刻）が鳴るまでに、必ず自陣の清掃・現状復帰を完了させること。" />
                </motion.div>
               )}
            </AnimatePresence>
          </div>
        </section>

        {/* フロアマップ */}
        <section className="bg-white/80 p-6 md:p-10 rounded-xl shadow-lg border-2 border-fantasy-text/10">
          <h2 className="text-2xl font-bold font-serif text-fantasy-text text-center mb-6">
            コネクトワールド 世界地図（フロアマップ）
          </h2>
          <p className="text-center text-sm text-fantasy-text/70 mb-8">
            ※マップ画像をタップして拡大表示できます（ピンチアウト対応）
          </p>
          
          <div className="relative w-full aspect-square md:aspect-video rounded-md overflow-hidden bg-fantasy-bg/50 border-4 border-double border-fantasy-accent flex items-center justify-center group cursor-pointer hover:shadow-xl transition-all">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588666305190-482f1eb82855?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
            <div className="relative z-10 bg-white/80 backdrop-blur-sm px-8 py-4 rounded shadow-lg border border-fantasy-accent/50 text-center">
              <MapPin size={32} className="mx-auto mb-2 text-fantasy-text" />
              <span className="font-bold tracking-widest text-fantasy-text font-serif">MAP IMAGE HERE</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function RuleItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-md border border-fantasy-accent/20 shadow-sm">
      <CheckCircle2 size={20} className="text-fantasy-accent shrink-0 mt-0.5" />
      <span className="text-fantasy-text leading-relaxed font-medium">{text}</span>
    </div>
  );
}
