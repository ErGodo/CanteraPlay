/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getUpcomingMatches() {
    try {
        const clubServiceUrl = process.env.NEXT_PUBLIC_CLUB_SERVICE_URL;
        const competitionServiceUrl = process.env.NEXT_PUBLIC_COMPETITION_SERVICE_URL;

        if (!clubServiceUrl || !competitionServiceUrl) {
            console.warn('Service URLs not configured');
            return [];
        }

        // 1. Get Avidela Club ID
        const clubsRes = await fetch(`${clubServiceUrl}/clubs`, { next: { revalidate: 3600 } });
        if (!clubsRes.ok) throw new Error('Failed to fetch clubs');
        const clubs = await clubsRes.json();
        const avidela = clubs.find((c: any) => (c.name || c.clubName)?.toLowerCase().includes('avidela'));

        if (!avidela) {
            console.warn('Avidela club not found');
            return [];
        }

        const clubId = avidela.id || avidela.pkClub;

        // 2. Get Matches
        const matchesRes = await fetch(`${competitionServiceUrl}/matches/upcoming/club/${clubId}`, { next: { revalidate: 60 } });
        if (!matchesRes.ok) {
            console.warn('Failed to fetch matches');
            return [];
        }
        const matches = await matchesRes.json();
        return matches;

    } catch (err) {
        console.error('Error fetching upcoming matches:', err);
        return [];
    }
}
