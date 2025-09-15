import Image from 'next/image'

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold">Testimonios</h3>
        <p className="mt-3 text-sm text-slate-600">Aún no hay testimonios publicados.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold">Testimonios</h3>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {testimonials.map((t: any) => (
          <div key={t._id} className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
              {t.photo?.asset?.url ? (
                <Image
                  src={t.photo.asset.url}
                  alt={t.photo?.alt || t.athleteName}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm text-slate-800 font-semibold">
                {t.athleteName}{t.position ? ` • ${t.position}` : ''}
              </div>
              <div className="mt-1 text-sm text-slate-600">{t.quote}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
