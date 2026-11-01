export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#FDFBF7]">
      <div className="flex items-center gap-3 text-sm text-[#8B7A6B]">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#EAE3DA] border-t-[#A88B72]" />
        Loading…
      </div>
    </div>
  );
}
