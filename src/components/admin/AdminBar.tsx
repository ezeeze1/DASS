import { ShieldCheck, Settings, LogOut, Edit3 } from 'lucide-react';
import { useWebsiteContent } from '../../context/WebsiteContext';

interface AdminBarProps {
  onOpenAdmin: () => void;
}

export default function AdminBar({ onOpenAdmin }: AdminBarProps) {
  const { isAdmin, adminEmail, isLiveEditMode, setIsLiveEditMode, logout } = useWebsiteContent();

  if (!isAdmin) return null;

  return (
    <aside
      aria-label="Administrator control panel"
      className="sticky top-0 z-50 bg-navy-950/95 border-b border-amber-500/50 text-white backdrop-blur-md px-4 py-2 shadow-xl"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-amber-400">Admin Mode Active</span>
            <span className="hidden sm:inline text-slate-400 ml-2">
              ({adminEmail || 'Administrator'})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Edit Mode Toggle */}
          <button
            onClick={() => setIsLiveEditMode(!isLiveEditMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors ${
              isLiveEditMode
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-navy-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isLiveEditMode ? 'Visual Edit: ON' : 'Visual Edit: OFF'}</span>
          </button>

          {/* Admin Dashboard */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Admin Center (/#admin)</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/80 text-[11px] font-semibold transition-colors"
            title="Log Out of Administrator Mode"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
