import { sectionTitle } from '@/lib/styles';
import { IconId, IconSoccerField } from "@tabler/icons-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Plans({ plans }: { plans: any[] }) {
  return (
    <section id="plans" className="py-12 px-4 max-w-5xl mx-auto">
  <h2 className={`${sectionTitle} mb-6`}>Nuestros Planes</h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
        {plans.length === 0 && (
          <div className="bg-white rounded shadow p-6 text-center col-span-3">No hay planes disponibles aún.</div>
        )}
        {plans.map((plan: any) => {
           // Selección de icono y color según el nombre del plan
           let Icon = IconSoccerField;
           const iconColor = "#0a1a3c"; // azul oscuro para todos
          const name = plan.name?.toLowerCase() || "";
          if (name.includes("matricula")) {
            Icon = IconId;
          } else {
            Icon = IconSoccerField;
          }
          return (
            <div key={plan._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col h-full">
              <div className="mb-2 flex items-center justify-center w-10 h-10 rounded-md bg-white">
                <Icon size={22} color={iconColor} stroke={1.5} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-900">{plan.name}</h3>
              <p className="mb-2 text-gray-700">{plan.description}</p>
              <div className="mt-auto font-bold text-blue-900 text-xl mb-2">
                {plan.price?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}
                {(() => {
                  const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                  return !name.includes('matricula') && !normalized.includes('matricula') ? (
                    <span className="text-sm">/mes</span>
                  ) : null;
                })()}
              </div>
              {plan.features && plan.features.length > 0 && (
                <ul className="text-sm text-gray-600 list-disc list-inside text-left w-full mt-2">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
