const CLUB_ID = 'f61c9d6c-63a0-4815-a847-912cf2785702';
const ATHLETE_API_URL = process.env.NEXT_PUBLIC_ATHLETE_SERVICE_URL || 'https://cp-atleta-nestjs-605024846890.us-central1.run.app';

export interface BirthdayAthlete {
  id: string;
  name: string;
  photo?: string | null;
  category: string;
  birthDate: string; // ISO date string (YYYY-MM-DD)
  day: number;
  month: number; // 0-indexed (0=Enero, 11=Diciembre)
  age?: number;
  isToday: boolean;
  isThisWeek: boolean;
  isThisMonth: boolean;
}

export interface ClubBirthdaysData {
  todayBirthdays: BirthdayAthlete[];
  weekBirthdays: BirthdayAthlete[];
  monthBirthdays: BirthdayAthlete[];
}

export async function getClubBirthdays(): Promise<ClubBirthdaysData> {
  try {
    const response = await fetch(`${ATHLETE_API_URL}/athletes/club/${CLUB_ID}`, { cache: 'no-store' });

    if (!response.ok) {
      console.error('Failed to fetch athletes for birthdays from backend');
      return { todayBirthdays: [], weekBirthdays: [], monthBirthdays: [] };
    }

    const athletes = await response.json();
    const today = new Date();
    const currentMonth = today.getMonth(); // 0 - 11
    const currentDate = today.getDate();

    // Calcular inicio y fin de la semana actual (de Lunes a Domingo)
    const dayOfWeek = today.getDay(); // 0: Dom, 1: Lun, ... 6: Sáb
    const distanceToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const todayBirthdays: BirthdayAthlete[] = [];
    const weekBirthdays: BirthdayAthlete[] = [];
    const monthBirthdays: BirthdayAthlete[] = [];

    athletes.forEach((athlete: any) => {
      if (!athlete.birthDate) return;

      const birthDateObj = new Date(athlete.birthDate);
      if (isNaN(birthDateObj.getTime())) return;

      const bMonth = birthDateObj.getUTCMonth();
      const bDay = birthDateObj.getUTCDate();

      const isThisMonth = bMonth === currentMonth;
      const isToday = isThisMonth && bDay === currentDate;

      // Fecha del cumpleaños en el año actual
      const birthdayThisYear = new Date(today.getFullYear(), bMonth, bDay);
      const isThisWeek = birthdayThisYear >= monday && birthdayThisYear <= sunday;

      let age: number | undefined = undefined;
      if (birthDateObj.getFullYear()) {
        age = today.getFullYear() - birthDateObj.getFullYear();
        if (currentMonth < bMonth || (currentMonth === bMonth && currentDate < bDay)) {
          age--;
        }
      }

      let category = 'Categoría General';
      if (athlete.athleteClubCategories && athlete.athleteClubCategories.length > 0) {
        for (const accat of athlete.athleteClubCategories) {
          if (accat.clubCategory && accat.clubCategory.name) {
            category = accat.clubCategory.name;
            break;
          }
        }
      } else if (athlete.position) {
        category = athlete.position;
      }

      const firstName = athlete.firstName || '';
      const lastName = athlete.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();
      if (!fullName) return;

      const bAthlete: BirthdayAthlete = {
        id: athlete.pkAthlete,
        name: fullName,
        photo: athlete.photoUrl || null,
        category,
        birthDate: athlete.birthDate,
        day: bDay,
        month: bMonth,
        age,
        isToday,
        isThisWeek,
        isThisMonth
      };

      if (isToday) {
        todayBirthdays.push(bAthlete);
      }
      if (isThisWeek) {
        weekBirthdays.push(bAthlete);
      }
      if (isThisMonth) {
        monthBirthdays.push(bAthlete);
      }
    });

    // Ordenar por día ascendente
    weekBirthdays.sort((a, b) => a.day - b.day);
    monthBirthdays.sort((a, b) => a.day - b.day);

    return { todayBirthdays, weekBirthdays, monthBirthdays };
  } catch (error) {
    console.error('Error fetching club birthdays:', error);
    return { todayBirthdays: [], weekBirthdays: [], monthBirthdays: [] };
  }
}
