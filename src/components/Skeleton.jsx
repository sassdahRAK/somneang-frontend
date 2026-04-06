export function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-40 glass-card rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-white/5" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-white/5 rounded-full w-3/4" />
        <div className="h-2.5 bg-white/5 rounded-full w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 animate-pulse">
      <div className="w-11 h-11 rounded-lg bg-white/5 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-white/5 rounded-full w-2/3" />
        <div className="h-2.5 bg-white/5 rounded-full w-1/3" />
      </div>
      <div className="h-2.5 bg-white/5 rounded-full w-10" />
    </div>
  );
}

export function SkeletonArtist() {
  return (
    <div className="flex-shrink-0 w-36 text-center animate-pulse">
      <div className="w-28 h-28 rounded-full bg-white/5 mx-auto mb-3" />
      <div className="h-3 bg-white/5 rounded-full w-3/4 mx-auto mb-2" />
      <div className="h-2.5 bg-white/5 rounded-full w-1/2 mx-auto" />
    </div>
  );
}
