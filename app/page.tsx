import { EditorRoot } from '@/components/editor/EditorRoot';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b-3 border-[var(--brutal-border-color)] bg-[var(--page-bg)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="brutal-border bg-brand-yellow text-brand-ink font-black uppercase px-3 py-2 text-sm"
            style={{ fontFamily: 'var(--font-archivo-black), sans-serif' }}
          >
            DUEROHUB THUMB
          </div>
          <p className="text-[10px] font-black uppercase opacity-60 hidden md:block">
            In-browser thumbnail maker
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 py-4 flex-1">
        <EditorRoot />
      </main>

      <footer className="border-t-3 border-[var(--brutal-border-color)] mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 text-[10px] font-black uppercase opacity-60 text-center">
          DueroHub Thumbnail Maker
        </div>
      </footer>
    </div>
  );
}
