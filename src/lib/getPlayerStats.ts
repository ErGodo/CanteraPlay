const CLUB_ID = 'f61c9d6c-63a0-4815-a847-912cf2785702';
const COMPETITION_API_URL = process.env.NEXT_PUBLIC_COMPETITION_SERVICE_URL || 'https://cp-competition-nestjs-605024846890.us-central1.run.app';
const ATHLETE_API_URL = process.env.NEXT_PUBLIC_ATHLETE_SERVICE_URL || 'https://cp-atleta-nestjs-605024846890.us-central1.run.app';

export async function getPlayerStats() {
  try {
    const [statsRes, athletesRes] = await Promise.all([
      fetch(`${COMPETITION_API_URL}/api/callups/stats/club/${CLUB_ID}`, { cache: 'no-store' }),
      fetch(`${ATHLETE_API_URL}/athletes/club/${CLUB_ID}`, { cache: 'no-store' })
    ]);

    if (!statsRes.ok || !athletesRes.ok) {
      console.error('Failed to fetch player stats from backend');
      return [];
    }

    const stats = await statsRes.json();
    const athletes = await athletesRes.json();

    const result = stats.reduce((acc: any[], stat: any) => {
      const athlete = athletes.find((a: any) => a.pkAthlete === stat.athleteId);
      
      // Si el atleta no se encuentra, lo omitimos para que no aparezca como Desconocido
      if (!athlete) return acc;

      // Obtener la categoría del atleta desde su perfil (prioridad), sino usamos el del stat, sino Sin Serie
      const athleteCategory = athlete.athleteClubCategories?.[0]?.clubCategory?.name;
      
      acc.push({
        _id: stat.athleteId,
        athleteName: `${athlete.firstName} ${athlete.lastName}`,
        position: athleteCategory || stat.categoryGlosa || athlete.position || 'Sin Serie',
        photo: athlete.photoUrl || null,
        goals: stat.goals,
        assists: stat.assists,
        matches: stat.matches
      });

      return acc;
    }, []);

    return result;
  } catch (error) {
    console.error('Error fetching backend player stats:', error);
    return [];
  }
}

export type PlayerStat = Awaited<ReturnType<typeof getPlayerStats>>[0]
