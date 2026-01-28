
export interface Athlete {
    pkAthlete: string;
    fkClub: string;
    fkUser?: string;
    firstName: string;
    lastName: string;
    birthDate?: string;
    gender: string;
    athleteStatus: string;
    photoUrl?: string;
    position?: string;
    sportProfile?: {
        primaryPosition?: string;
        secondaryPosition?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    createdAt: string;
    updatedAt: string;
}

export type CreateAthleteDto = Partial<Athlete>;

export interface AthleteClubCategory {
    pkAthleteClubCategory?: string;
    fkAthlete?: string;
    fkClubCategory: string; // This is the linking ID
    clubCategoryId?: number; // Legacy support if needed
    clubCategory?: {
        pkCategory: string;
        name: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_ATHLETE_SERVICE_URL || '/api/athletes';

export const athleteService = {
    async create(athleteData: CreateAthleteDto): Promise<Athlete> {
        console.log('Creating athlete with data:', athleteData);
        // Note: The base URL usually includes /api/v1 or similar. Ensure env var is correct.
        // If API_BASE_URL is 'http://localhost:3000', then final is 'http://localhost:3000/athletes'

        try {
            const response = await fetch(`${API_BASE_URL}/athletes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(athleteData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', errorData);
                throw new Error(errorData.message || `Error ${response.status}: Failed to create athlete`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },

    // Other methods can be added as needed, keeping it minimal for now based on requirement
    // to just create account.
};
