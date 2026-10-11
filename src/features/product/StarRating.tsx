export default function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "text-base" : "text-xs";
  return (
    <div className={`flex text-star ${cls}`} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-star" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}
