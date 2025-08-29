import { sectionTitle } from '@/lib/styles';

export default function Contacto() {
  return (
    <section id="contact" className="py-12 px-4 max-w-5xl mx-auto">
  <h2 className={`${sectionTitle} mb-6 text-blue-900`}>Contacto</h2>
      <form className="bg-white rounded shadow p-6 flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-blue-900 mb-1">Nombre</label>
          <input type="text" id="name" name="name" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-1">Correo electrónico</label>
          <input type="email" id="email" name="email" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-blue-900 mb-1">Mensaje</label>
          <textarea id="message" name="message" rows={4} required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"></textarea>
        </div>
        <button type="submit" className="bg-blue-900 text-white px-6 py-2 rounded font-semibold shadow hover:bg-blue-800 transition">Enviar</button>
      </form>
    </section>
  );
}
