"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BirthdayAthlete } from "@/lib/getClubBirthdays";
import SectionHeading from "./SectionHeading";
import { IconCake, IconSparkles, IconCalendarEvent, IconCalendarWeek } from "@tabler/icons-react";

interface BirthdaysSectionProps {
  todayBirthdays: BirthdayAthlete[];
  weekBirthdays: BirthdayAthlete[];
  monthBirthdays: BirthdayAthlete[];
}

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function BirthdaysSection({
  todayBirthdays,
  weekBirthdays,
  monthBirthdays
}: BirthdaysSectionProps) {
  // Inicialmente priorizar Esta Semana (si hay) o Este Mes
  const defaultTab = weekBirthdays.length > 0 ? "week" : "month";
  const [activeTab, setActiveTab] = useState<"week" | "month">(defaultTab);

  const currentMonthName = MONTH_NAMES[new Date().getMonth()];

  const displayedList = activeTab === "week" ? weekBirthdays : monthBirthdays;

  return (
    <section id="cumpleanos" className="mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8 mt-12 scroll-mt-24">
      {/* Container principal con estética de Avidela */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Glows de fondo */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-pink-500 font-bold text-sm tracking-wider uppercase mb-1">
              <IconSparkles className="w-5 h-5 animate-spin-slow" />
              <span>Celebraciones del Club</span>
            </div>
            <SectionHeading
              title="Cumpleaños"
              highlight=" Avidela"
              subtitle={`Festejamos a nuestros jugadores y miembros en su día durante ${currentMonthName}`}
            />
          </div>

          {/* Selector de pestañas / Tabs */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 self-stretch md:self-auto">
            <button
              onClick={() => setActiveTab("week")}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === "week"
                  ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <IconCalendarWeek className="w-4 h-4" />
              <span>Esta Semana</span>
              {weekBirthdays.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-white text-pink-600 font-extrabold rounded-full">
                  {weekBirthdays.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("month")}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === "month"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <IconCalendarEvent className="w-4 h-4" />
              <span>Este Mes</span>
              <span className="ml-1 px-2 py-0.5 text-xs bg-slate-800 text-slate-300 font-bold rounded-full">
                {monthBirthdays.length}
              </span>
            </button>
          </div>
        </div>

        {/* Lista de Cumpleañeros */}
        {displayedList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-slate-950/40 rounded-2xl border border-slate-800/60">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 text-slate-500">
              <IconCake className="w-8 h-8 opacity-60" />
            </div>
            <h4 className="text-lg font-bold text-slate-300">
              {activeTab === "week" ? "¡No hay cumpleaños esta semana!" : "No hay cumpleaños este mes."}
            </h4>
            <p className="text-sm text-slate-400 max-w-md mt-1">
              {activeTab === "week"
                ? "Puedes cambiar a la pestaña 'Este Mes' para ver los próximos festejos."
                : "Mantente atento a los próximos eventos del club."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedList.map((athlete) => (
              <div
                key={athlete.id}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b ${
                  athlete.isToday
                    ? "from-slate-900 via-slate-900 to-pink-950/40 border-pink-500/60 shadow-[0_0_25px_rgba(233,30,99,0.2)]"
                    : "from-slate-900 via-slate-900 to-slate-950 border-slate-800"
                } border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-500/40 flex flex-col justify-between`}
              >
                {/* Badge de "¡Hoy!" */}
                {athlete.isToday && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-[10px] tracking-wider uppercase rounded-full shadow-md animate-bounce">
                    🎉 ¡HOY!
                  </div>
                )}

                <div>
                  {/* Header de la tarjeta con Foto o Avatar */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700 group-hover:border-cyan-400 transition-colors shrink-0">
                      {athlete.photo ? (
                        <Image
                          src={athlete.photo}
                          alt={athlete.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-cyan-400 font-extrabold text-xl">
                          {athlete.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                        {athlete.name}
                      </h4>
                      <span className="inline-block text-xs font-semibold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-md mt-1 truncate max-w-full">
                        {athlete.category}
                      </span>
                    </div>
                  </div>

                  {/* Info de fecha y edad */}
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <IconCalendarEvent className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium">
                        {athlete.day} de {MONTH_NAMES[athlete.month]}
                      </span>
                    </div>
                    {athlete.age !== undefined && (
                      <div className="font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                        {athlete.age} años
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
