/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getPlans() {
  try {
    // Fallback urls in case env vars are not loaded (e.g. pending restart)
    const clubServiceUrl = process.env.NEXT_PUBLIC_CLUB_SERVICE_URL || "https://cp-club-nestjs-605024846890.us-central1.run.app";
    const planServiceUrl = process.env.NEXT_PUBLIC_PLAN_SERVICE_URL || "https://cp-plan-nestjs-605024846890.us-central1.run.app";

    if (!clubServiceUrl || !planServiceUrl) {
      console.warn("Service URLs not configured");
      return [];
    }

    // 1. Get Avidela Club ID
    const clubsRes = await fetch(`${clubServiceUrl}/clubs`, { next: { revalidate: 0 } }); // Force no-cache for debug
    if (!clubsRes.ok) {
        console.error("[getPlans] Failed to fetch clubs:", clubsRes.status, clubsRes.statusText);
        throw new Error("Failed to fetch clubs");
    }

    const clubs = await clubsRes.json();
    
    const avidela = clubs.find((c: any) => (c.name || c.clubName)?.toLowerCase().includes('avidela'));

    if (!avidela) {
      console.warn("[getPlans] Avidela club not found. Clubs visible:", clubs.map((c:any) => c.name || c.clubName));
      return [];
    }

    const clubId = avidela.id || avidela.pkClub;

    // 2. Get Plans
    const plansUrl = `${planServiceUrl}/clubs/${clubId}/plans`;
    
    const plansRes = await fetch(plansUrl, { next: { revalidate: 0 } });

    if (!plansRes.ok) {
        console.error("[getPlans] Failed to fetch plans:", plansRes.status, plansRes.statusText);
        throw new Error("Failed to fetch plans");
    }

    const plans = await plansRes.json();

    // Map to ensure compatibility with frontend components (which expect _id, name, description, price, features)
    // Backend returns id (number), name, description, price, features (string[])
    return plans.map((p: any) => ({
      _id: p.id,
      name: p.name,
      description: p.description,
      price: Number(p.price), // Ensure number
      features: p.features
    })).sort((a: any, b: any) => a.price - b.price); // Order by price asc as before

  } catch (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
}
