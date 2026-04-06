
const COMMS_API_URL = process.env.NEXT_PUBLIC_COMMUNICATIONS_AGENT_URL || 'http://localhost:8086';

export interface WelcomeAthleteDto {
    athleteName: string;
    rut: string;
    age: number;
    birthDate: string;
    athleteEmail: string;
}

export const communicationService = {
    async sendWelcomeAthlete(dto: WelcomeAthleteDto): Promise<{ success: boolean }> {
        try {
            const response = await fetch(`${COMMS_API_URL}/public/welcome-athlete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto),
            });

            if (!response.ok) {
                console.error('Failed to send welcome email via comms agent');
                return { success: false };
            }

            return await response.json();
        } catch (error) {
            console.error('Error calling communications agent:', error);
            return { success: false };
        }
    }
};
