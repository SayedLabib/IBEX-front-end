function Badge({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <span className={`inline-flex items-center justify-center h-6 min-w-11 px-1.5 border border-gray-200 bg-white ${className}`}>{children}</span>;
}

export function VisaLogo({ className = "" }: { className?: string }) {
  return (
    <Badge className={className}>
      <svg viewBox="0 0 48 16" className="h-3 w-auto" aria-label="Visa" role="img">
        <text x="0" y="13" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontStyle="italic" fontSize="15" fill="#1A1F71">
          VISA
        </text>
      </svg>
    </Badge>
  );
}

export function MastercardLogo({ className = "" }: { className?: string }) {
  return (
    <Badge className={className}>
      <svg viewBox="0 0 34 20" className="h-4 w-auto" aria-label="Mastercard" role="img">
        <circle cx="13" cy="10" r="9" fill="#EB001B" />
        <circle cx="21" cy="10" r="9" fill="#F79E1B" style={{ mixBlendMode: "multiply" }} />
      </svg>
    </Badge>
  );
}

export function BkashLogo({ className = "" }: { className?: string }) {
  return (
    <Badge className={`!bg-[#E2136E] !border-[#E2136E] ${className}`}>
      <span className="text-white text-[10px] font-extrabold tracking-tight italic">bKash</span>
    </Badge>
  );
}

export function NagadLogo({ className = "" }: { className?: string }) {
  return (
    <Badge className={`!bg-[#F7941E] !border-[#F7941E] ${className}`}>
      <span className="text-white text-[10px] font-extrabold tracking-tight">Nagad</span>
    </Badge>
  );
}

export function RocketLogo({ className = "" }: { className?: string }) {
  return (
    <Badge className={`!bg-[#8C1F8C] !border-[#8C1F8C] ${className}`}>
      <span className="text-white text-[10px] font-extrabold tracking-tight">Rocket</span>
    </Badge>
  );
}
