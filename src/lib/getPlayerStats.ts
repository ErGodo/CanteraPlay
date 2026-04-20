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

    // Create a map for faster and more reliable athlete lookup
    const athleteMap = new Map();
    athletes.forEach((a: any) => {
      athleteMap.set(a.pkAthlete, a);
    });

    const result = stats.reduce((acc: any[], stat: any) => {
      const athlete = athleteMap.get(stat.athleteId);
      
      // CRITICAL: Skip if athlete not found in the official club list
      if (!athlete) return acc;

      const firstName = athlete.firstName || '';
      const lastName = athlete.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();

      // If the name is empty or just whitespace, or suspicious, skip it to avoid "Desconocido"
      if (!fullName || fullName.toLowerCase() === 'desconocido') return acc;

      // Resolve category: Prioritize the athlete's assigned categories in their profile
      let category = 'Sin Serie';
      if (athlete.athleteClubCategories && athlete.athleteClubCategories.length > 0) {
        // Try to find a non-empty category name
        for (const accat of athlete.athleteClubCategories) {
          if (accat.clubCategory && accat.clubCategory.name) {
            category = accat.clubCategory.name;
            break;
          }
        }
      } else if (stat.categoryGlosa) {
        // Fallback to the category from the match stats if profile has no category
        category = stat.categoryGlosa;
      } else if (athlete.position) {
        category = athlete.position;
      }
      
      acc.push({
        _id: stat.athleteId,
        athleteName: fullName,
        position: category,
        photo: athlete.photoUrl || null,
        goals: Number(stat.goals) || 0,
        assists: Number(stat.assists) || 0,
        matches: Number(stat.matches) || 0
      });

      return acc;
    }, []);

    // Final global sort by goals just in case
    return result.sort((a: any, b: any) => (b.goals || 0) - (a.goals || 0));
  } catch (error) {
    console.error('Error fetching backend player stats:', error);
    return [];
  }
}


export type PlayerStat = Awaited<ReturnType<typeof getPlayerStats>>[0]
