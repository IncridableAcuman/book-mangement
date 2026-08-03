import { BookOpen, LogOut, User } from "lucide-react";
import { UseAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { handleLogout } = UseAuth();


  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
              LibFlow
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm">
              <User className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-300 font-medium">Foydalanuvchi</span>
            </div>
            <button
              title="Chiqish"
              onClick={()=>handleLogout()}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
