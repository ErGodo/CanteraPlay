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
    const clubsRes = await fetch(`${clubServiceUrl}/clubs`, { next: { revalidate: 3600 } });
    if (!clubsRes.ok) throw new Error("Failed to fetch clubs");

    const clubs = await clubsRes.json();
    const avidela = clubs.find((c: any) => (c.name || c.clubName)?.toLowerCase().includes('avidela'));

    if (!avidela) {
      console.warn("Avidela club not found");
      return [];
    }

    const clubId = avidela.id || avidela.pkClub;

    // 2. Get Plans
    // Using revalidate: 0 or low value because usually plans don't change often but we want to see updates during dev. 
    // Actually, stick to 3600 or less.
    const plansRes = await fetch(`${planServiceUrl}/clubs/${clubId}/plans`, { next: { revalidate: 60 } });

    if (!plansRes.ok) throw new Error("Failed to fetch plans");

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
