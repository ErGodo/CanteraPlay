/**
 * SectionHeading — consistent section title style across the landing page.
 * Vertical accent bar uses a pink → blue gradient (Avidela brand colors).
 * Optional `highlight` word renders in pink, optional subtitle below.
 */
export default function SectionHeading({
  title,
  highlight,
  subtitle,
  as: Tag = 'h2',
  className = '',
}: {
  title: string;
  /** Word or phrase inside the title to render highlighted in pink */
  highlight?: string;
  subtitle?: string;
  as?: 'h2' | 'h3';
  className?: string;
}) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className={`flex flex-col mb-6 ${className}`}>
      <div className="flex items-center gap-3 mb-1">
        {/* Brand accent bar: pink → blue */}
        <span className="w-1 h-8 rounded-full bg-gradient-to-b from-[#e91e63] to-[#0F8DBF] shrink-0" />
        <Tag className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {highlight ? (
            <>
              {parts[0]}
              <span className="text-[#e91e63]">{highlight}</span>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </Tag>
      </div>
      {subtitle && (
        <p className="text-slate-500 text-sm ml-4">{subtitle}</p>
      )}
    </div>
  );
}
