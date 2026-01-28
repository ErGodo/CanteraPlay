/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getUpcomingMatches() {
    console.log('[getUpcomingMatches] Starting...');
    try {
        const clubServiceUrl = process.env.NEXT_PUBLIC_CLUB_SERVICE_URL;
        const competitionServiceUrl = process.env.NEXT_PUBLIC_COMPETITION_SERVICE_URL;

        console.log('[getUpcomingMatches] Config:', { clubServiceUrl, competitionServiceUrl });

        if (!clubServiceUrl || !competitionServiceUrl) {
            console.warn('[getUpcomingMatches] Service URLs not configured correctly.');
            return [];
        }

        // 1. Get Avidela Club ID
        console.log('[getUpcomingMatches] Fetching clubs...');
        const clubsRes = await fetch(`${clubServiceUrl}/clubs`, { next: { revalidate: 3600 } });

        if (!clubsRes.ok) {
            console.error('[getUpcomingMatches] Failed to fetch clubs:', clubsRes.status, clubsRes.statusText);
            throw new Error('Failed to fetch clubs');
        }

        const clubs = await clubsRes.json();
        const avidela = clubs.find((c: any) => (c.name || c.clubName)?.toLowerCase().includes('avidela'));

        if (!avidela) {
            console.warn('[getUpcomingMatches] Avidela club not found in club list.');
            return [];
        }

        const clubId = avidela.id || avidela.pkClub;
        console.log('[getUpcomingMatches] Found Avidela ID:', clubId);

        // 2. Get Matches
        const matchesUrl = `${competitionServiceUrl}/api/matches/upcoming/club/${clubId}`;

        const matchesRes = await fetch(matchesUrl, {
            next: { revalidate: 60 },
        });

        if (!matchesRes.ok) {
            console.warn('[getUpcomingMatches] Failed to fetch matches:', matchesRes.status, matchesRes.statusText);
            // Try reading body for error details
            const errText = await matchesRes.text().catch(() => 'No body');
            console.warn('[getUpcomingMatches] Error body:', errText);
            return [];
        }

        const matches = await matchesRes.json();
        console.log('[getUpcomingMatches] Matches found:', matches?.length || 0);
        return matches;

    } catch (err) {
        console.error('[getUpcomingMatches] Critical Error:', err);
        return [];
    }
}
