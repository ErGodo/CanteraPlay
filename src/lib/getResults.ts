const CLUB_ID = 'f61c9d6c-63a0-4815-a847-912cf2785702';
const COMPETITION_API_URL = process.env.NEXT_PUBLIC_COMPETITION_SERVICE_URL || 'https://cp-competition-nestjs-605024846890.us-central1.run.app';

export async function getResults() {
  try {
    // 1. Intentar obtener resultados recientes del Servicio de Competencia (CanteraPlay)
    const url = `${COMPETITION_API_URL}/api/matches/recent/club/${CLUB_ID}`;
    console.log(`[getResults] Calling competition API: ${url}`);
    const res = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (res.ok) {
      const matches = await res.json();
      console.log(`[getResults] SUCCESS: Found ${matches.length} matches`);
      // Mapear el formato de Match de CanteraPlay al formato que espera ResultsCarousel
      return (matches || []).map((m: any) => ({
        ...m, // Pasar todo el objeto por si acaso
        _id: m.id,
        date: m.dateTime,
        homeScore: m.homeScore ?? 0,
        awayScore: m.awayScore ?? 0,
        categoryGlosa: m.category?.name || m.league?.name || 'Oficial',
        competition: m.league?.name,
        homeTeam: {
          ...m.homeTeam,
          name: m.homeTeam?.name || 'Local',
          logo: m.homeTeam?.logoUrl
        },
        awayTeam: {
          ...m.awayTeam,
          name: m.awayTeam?.name || 'Visitante',
          logo: m.awayTeam?.logoUrl
        }
      }));
    }
  } catch (err) {
    console.error("Error fetching results from Competition Service:", err);
  }

  // Fallback vacío si falla la conexión
  return [];
}
