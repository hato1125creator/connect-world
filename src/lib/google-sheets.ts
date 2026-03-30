export interface Project {
  id: string;          // 管理番号 (例: "101")
  title: string;       // 企画名 (最大15文字)
  group: string;       // 団体名 (例: "3年A組")
  category: 'fairy-tale' | 'magic' | 'adventure'; // 属性
  location: string;    // 場所 (例: "3F 301教室")
  description: string; // 紹介文 (40〜80文字)
  guideMessage: string; // 案内人の一言コメント
  imageUrl: string;    // 16:9の画像URL
  isPublic: boolean;   // trueのものだけビルド時に取得される
}

export async function getProjects(): Promise<Project[]> {
  const url = process.env.NEXT_PUBLIC_GAS_URL; // 本番・ビルド時向けの環境変数
  
  if (!url) {
    // API URLが未設定の場合は、UI開発用にモックデータを返す
    return [
      {
        id: "101",
        title: "シンデレラカフェ",
        group: "3年A組",
        category: "fairy-tale",
        location: "3F 301教室",
        description: "ガラスの靴を探すお手伝いをしませんか？絶品パンケーキでおもてなしします。",
        guideMessage: "「おや、甘い香りがするねぇ。12時を過ぎても魔法は解けないそうだよ。」",
        imageUrl: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop",
        isPublic: true,
      },
      {
        id: "102",
        title: "魔法の実験室",
        group: "2年B組",
        category: "magic",
        location: "1F 理科室",
        description: "あやしい薬草から不思議なスライムを作ろう！体験型の魔法実験コーナー。",
        guideMessage: "「フフフ、そこは危険な香りがするねぇ。好奇心は魔法の第一歩さ。」",
        imageUrl: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=800&auto=format&fit=crop",
        isPublic: true,
      },
      {
        id: "103",
        title: "ドラゴン迷宮",
        group: "1年C組",
        category: "adventure",
        location: "体育館",
        description: "君は暗闇の迷路から脱出できるか？巨大なドラゴンが待ち受ける超本格迷路！",
        guideMessage: "「さぁ、勇気を示したまえ。迷宮の先に真の宝が眠っているかもしれないよ？」",
        imageUrl: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop",
        isPublic: true,
      }
    ];
  }

  // Next.js標準の fetch でSSG (force-cache) を行う。
  // GASのAPIから全データをビルド時に静的生成するため、サーバーダウンのリスクがない
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error('Failed to fetch projects data from GAS');
  }
  
  const data: Project[] = await res.json();
  return data;
}
