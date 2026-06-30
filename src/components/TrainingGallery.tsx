"use client";

import { useState } from "react";

export default function TrainingGallery({ photos }: { photos: any[] }) {
    const [filter, setFilter] = useState("Todas");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const filteredPhotos = filter === "Todas" 
        ? photos 
        : photos.filter(p => p.location === filter);

    return (
        <div className="w-full">
            {/* Filter */}
            <div className="flex justify-center gap-4 mb-8">
                {["Todas", "Francisco Meneses", "Estadio Nacional"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                            filter === f 
                            ? "bg-pink-600 text-white shadow-[0_0_15px_rgba(233,30,99,0.5)]" 
                            : "bg-white/10 text-slate-300 hover:bg-white/20"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {filteredPhotos.length === 0 ? (
                <div className="p-16 bg-slate-950/40 rounded-[32px] border border-slate-800/60 text-center w-full">
                    <div className="text-4xl opacity-20 mb-4">📸</div>
                    <div className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">
                        No hay fotos para mostrar en esta sede
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPhotos.map((photo, i) => (
                        <div 
                            key={photo._id || i} 
                            onClick={() => setSelectedImage(photo.imageUrl)}
                            className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 hover:border-pink-500/50 transition-all duration-500 shadow-xl"
                        >
                            <img 
                                src={photo.imageUrl} 
                                alt={photo.caption || "Entrenamiento Avidela"} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <span className="px-3 py-1 bg-pink-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-2 inline-block">
                                    {photo.location}
                                </span>
                                {photo.caption && (
                                    <p className="text-white text-sm font-medium line-clamp-2">{photo.caption}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img 
                        src={selectedImage} 
                        alt="Zoom" 
                        className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    )
}
