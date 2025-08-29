import { sectionTitle } from '@/lib/styles';
import Image from 'next/image';

export default function Noticias({ importantInfo }: { importantInfo: any[] }) {
  return (
    <section id="info" className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className={`${sectionTitle} mb-8 text-left`}>
        Lo último en Avidela Sport
      </h2>

      <div className="flex flex-col gap-6">
        {importantInfo.map((info: any) => (
          <article
            key={info._id}
            className="group bg-white rounded-2xl shadow-md border border-slate-200 flex flex-col sm:flex-row gap-6 p-5 transition-all duration-200 hover:shadow-xl hover:border-blue-300"
            aria-labelledby={`news-${info._id}`}
          >
            {info.image?.asset?.url && (
              <div className="flex-shrink-0 w-full sm:w-44 md:w-56 rounded-xl overflow-hidden">
                <Image
                  src={info.image.asset.url}
                  alt={info.image.alt || info.title}
                  width={420}
                  height={280}
                  className="w-full h-full object-cover"
                  placeholder={info.image.asset.metadata?.lqip ? 'blur' : undefined}
                  blurDataURL={info.image.asset.metadata?.lqip}
                />
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3
                  id={`news-${info._id}`}
                  className="text-lg md:text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-700"
                >
                  {info.title}
                </h3>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-3">
                  {info.content}
                </p>
              </div>
              <time className="text-xs text-slate-500">
                {new Date(info.date).toLocaleDateString()}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
