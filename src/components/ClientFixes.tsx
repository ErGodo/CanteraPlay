"use client";

if (typeof window !== "undefined") {
    // Solución para suprimir errores de hidratación causados por extensiones del navegador
    // (como Bitwarden, AdBlock, etc.) que inyectan el atributo 'bis_skin_checked'.
    // Esto evita que aparezca la pantalla roja de error en desarrollo.
    const originalError = console.error;
    console.error = (...args) => {
        // Convertir argumentos a string para verificar el contenido
        const msg = args.map(arg => typeof arg === 'string' ? arg : '').join(' ');

        if (msg.includes("bis_skin_checked") || (args[0] && typeof args[0] === 'string' && args[0].includes("bis_skin_checked"))) {
            return;
        }

        originalError.apply(console, args);
    };
}

export default function ClientFixes() {
    return null;
}
