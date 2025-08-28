export default function Noticias({ importantInfo }: { importantInfo: any[] }) {
  return (
    <section id="info" className="py-8 px-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-900">Lo último en Avidela Sports</h2>
      <div className="flex flex-col gap-6">
        {importantInfo.map((info: any) => (
          <div key={info._id} className="bg-white rounded shadow flex flex-col sm:flex-row gap-4 p-4 items-center">
            {info.image?.asset?.url && (
              <img
                src={info.image.asset.url}
                alt={info.image.alt || info.title}
                className="w-32 h-32 object-cover rounded-md border"
                style={{ minWidth: 128, minHeight: 128 }}
                loading="lazy"
              />
            )}
            <div className="flex-1">
              <div className="font-semibold text-blue-800 text-lg mb-1">{info.title}</div>
              <div className="text-gray-700 text-sm mb-2">{info.content}</div>
              <div className="text-xs text-gray-400">{new Date(info.date).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
