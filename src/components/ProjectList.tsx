"use client";

import { useState, useMemo } from "react";
import { Project } from "@/lib/google-sheets";
import { Search, Compass, MapPin } from "lucide-react";
// フェーズ4で実装するDoorCardのプレースホルダーをインポート
import DoorCard from "./DoorCard";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  // プロジェクト情報から存在する場所のリストを一意に抽出（ドロップダウン用）
  const locations = useMemo(() => {
    const locs = new Set(projects.map(p => p.location));
    return Array.from(locs);
  }, [projects]);

  // 全てのフィルター条件を適用してインクリメンタルに結果を算出
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // 1. キーワード検索（タイトル または 団体名）
      const matchQuery = 
        project.title.includes(searchQuery) || 
        project.group.includes(searchQuery);
      
      // 2. カテゴリ絞り込み
      const matchCategory = selectedCategory === "all" || project.category === selectedCategory;
      
      // 3. 場所絞り込み
      const matchLocation = selectedLocation === "all" || project.location === selectedLocation;

      return matchQuery && matchCategory && matchLocation;
    });
  }, [projects, searchQuery, selectedCategory, selectedLocation]);

  return (
    <div className="w-full">
      {/* 魔法の羅針盤フィルタリングUI Section */}
      <section className="bg-white/40 backdrop-blur border-2 border-fantasy-accent/60 shadow-xl rounded-xl p-6 mb-12 relative overflow-hidden">
        {/* 背景の羅針盤風装飾 */}
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none -translate-y-1/4 translate-x-1/4">
          <Compass size={400} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-6">
          {/* 検索バー */}
          <div className="flex-1">
            <label className="block text-sm text-fantasy-text font-bold mb-2 flex items-center gap-2">
              <Search size={16} /> キーワードで探す
            </label>
            <input
              type="text"
              placeholder="企画名・団体名を入力..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/80 border-b-2 border-fantasy-accent p-3 text-fantasy-text focus:outline-none focus:bg-white rounded-t-sm transition-colors"
            />
          </div>

          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            {/* カテゴリ */}
            <div className="flex-1">
              <label className="block text-sm text-fantasy-text font-bold mb-2">属性</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1 text-sm rounded border ${selectedCategory === "all" ? 'bg-fantasy-text text-white' : 'bg-white/50 text-fantasy-text border-fantasy-text/30'}`}
                >
                  すべて
                </button>
                <button
                  onClick={() => setSelectedCategory("fairy-tale")}
                  className={`px-3 py-1 text-sm rounded border ${selectedCategory === "fairy-tale" ? 'bg-fairy-tale text-white' : 'bg-white/50 text-fairy-tale border-fairy-tale/30'}`}
                >
                  童話
                </button>
                <button
                  onClick={() => setSelectedCategory("magic")}
                  className={`px-3 py-1 text-sm rounded border ${selectedCategory === "magic" ? 'bg-magic text-white' : 'bg-white/50 text-magic border-magic/30'}`}
                >
                  魔法
                </button>
                <button
                  onClick={() => setSelectedCategory("adventure")}
                  className={`px-3 py-1 text-sm rounded border ${selectedCategory === "adventure" ? 'bg-adventure text-white' : 'bg-white/50 text-adventure border-adventure/30'}`}
                >
                  冒険
                </button>
              </div>
            </div>

            {/* 場所 */}
            <div className="flex-1">
              <label className="block text-sm text-fantasy-text font-bold mb-2 flex items-center gap-1">
                <MapPin size={16} /> 場所
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-white/80 border-b-2 border-fantasy-accent p-3 text-fantasy-text focus:outline-none rounded-t-sm"
              >
                <option value="all">すべてのフロア</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* プロジェクト表示グリッド */}
      <section>
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-fantasy-text/60">
            <Compass className="mx-auto mb-4 opacity-50 block animate-pulse" size={48} />
            <p className="text-lg">条件に合う扉が見つかりません...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <DoorCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
