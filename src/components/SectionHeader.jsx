import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SectionHeader({ title, subtitle, link }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="font-display font-bold text-xl text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {link && (
        <button
          onClick={() => navigate(link)}
          className="flex items-center gap-1 text-sm text-purple-400 hover:text-pink-400 transition-colors"
        >
          See all <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
