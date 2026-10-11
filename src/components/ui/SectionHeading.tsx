export default function SectionHeading({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-10 bg-brand" />
      <h2 className="text-2xl md:text-3xl font-bold text-ink uppercase tracking-wide">{title}</h2>
      <span className="h-px w-10 bg-brand" />
    </div>
  );
}
