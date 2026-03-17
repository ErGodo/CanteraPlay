/* eslint-disable @typescript-eslint/no-explicit-any */

export default function SponsorCard({ sponsor }: { sponsor: any }) {
  // Ultra-safe extraction of logo URL from many common patterns (Sanity, Direct, API)
  const getLogo = (s: any) => {
    if (typeof s?.logo === 'string' && s.logo.length > 0) return s.logo;
    if (typeof s?.url === 'string' && s.url.length > 0) return s.url;
    if (typeof s?.imageUrl === 'string' && s.imageUrl.length > 0) return s.imageUrl;
    
    // Nested patterns
    return s?.logo?.url || 
           s?.logo?.asset?.url || 
           s?.image?.asset?.url || 
           s?.imageUrl || 
           s?.image?.url || 
           null;
  };

  const logoUrl = getLogo(sponsor);
  const website = sponsor?.website || sponsor?.description;
  const name = sponsor?.name || sponsor?.title || "Sponsor";
  const key = sponsor?._id || sponsor?.id || name;

  return (
    <div key={key} className="relative group rounded-3xl bg-slate-900 overflow-hidden border border-slate-800 transition-all duration-500 hover:border-[#e91e63]/40 hover:-translate-y-1 h-full min-h-[120px] sm:min-h-[150px] flex items-center justify-center p-6 shadow-2xl">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-white z-0" />
      
      {/* Glossy overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e91e63]/10 to-[#0F8DBF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
      
      {/* Sublte inner shadow on hover */}
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Logo Container */}
      <div className="relative z-20 w-full h-full max-w-[75%] max-h-[75%] flex items-center justify-center transition-all duration-500 group-hover:scale-105">
        {logoUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center">
            {website ? (
              <a href={website} target="_blank" rel="noopener noreferrer" className="block w-full h-full flex items-center justify-center">
                <img
                  src={logoUrl}
                  alt={name}
                  className="max-w-full max-h-full object-contain transition-all duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLDivElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div style={{ display: 'none' }} className="text-sm font-bold text-slate-500">
                  {name}
                </div>
              </a>
            ) : (
              <>
                <img
                  src={logoUrl}
                  alt={name}
                  className="max-w-full max-h-full object-contain transition-all duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLDivElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div style={{ display: 'none' }} className="text-sm font-bold text-slate-500">
                  {name}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-base text-slate-400 font-black uppercase tracking-widest">{name}</div>
          </div>
        )}
      </div>

      {/* Brand accent line on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#e91e63] group-hover:w-full transition-all duration-700" />
    </div>
  );
}
