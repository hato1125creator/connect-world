import { getProjects } from "@/lib/google-sheets";
import ProjectList from "@/components/ProjectList";

export const revalidate = false; // SSGを強制し動的レンダリングを防ぐ

// メタデータの設定 (SEO)
export const metadata = {
  title: '企画一覧 | コネクトワールド',
  description: '童話の世界に繋がる扉が並ぶ、コネクトワールドの企画一覧',
};

export default async function ProjectsPage() {
  // ビルド時にGASのデータを一回だけFetch
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-fantasy-bg pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-fantasy-text mb-4 drop-shadow-sm">
            コネクトワールドの扉
          </h1>
          <p className="text-fantasy-text border-t-2 border-b-2 border-fantasy-accent inline-block py-2 px-8 tracking-widest text-sm bg-white/30 backdrop-blur-sm shadow-sm rounded-sm">
            〜迷える若人よ、導きの羅針盤を使いたまえ〜
          </p>
        </header>

        {/* クライアント側で状態管理・フィルタリングを行うコンポーネント */}
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
