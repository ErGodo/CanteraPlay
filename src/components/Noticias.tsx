/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDMY } from '@/lib/formatDate';
import { sectionTitle } from '@/lib/styles';
import Image from 'next/image';

export default function Noticias({ importantInfo }: { importantInfo: any[] }) {
  return (
    <section id="info" className="py-12 px-4 max-w-[95%] mx-auto">
      <h2 className={`${sectionTitle} mb-8 text-left`}>
        Lo último en Avidela Sport
      </h2>

      <div className="flex flex-col gap-6">
        {importantInfo.map((info: any) => (
          <article
            key={info._id}
            className="group bg-slate-900 rounded-3xl shadow-lg border border-slate-800 flex flex-col sm:flex-row gap-6 p-5 transition-all duration-300 hover:shadow-blue-900/20 hover:border-blue-700 hover:-translate-y-1"
            aria-labelledby={`news-${info._id}`}
          >
            {info.image?.asset?.url && (
              <div className="flex-shrink-0 w-full sm:w-44 md:w-56 rounded-2xl overflow-hidden shadow-sm border border-slate-800">
                <Image
                  src={info.image.asset.url}
                  alt={info.image.alt || info.title}
                  width={420}
                  height={280}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder={info.image.asset.metadata?.lqip ? 'blur' : undefined}
                  blurDataURL={info.image.asset.metadata?.lqip}
                />
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h3
                  id={`news-${info._id}`}
                  className="text-xl md:text-2xl font-extrabold text-white mb-2 group-hover:text-blue-400 transition-colors"
                >
                  {info.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                  {info.content}
                </p>
              </div>
              <time className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1" suppressHydrationWarning>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {formatDMY(info.date)}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
