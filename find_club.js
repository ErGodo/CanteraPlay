const https = require('https');

https.get('https://cp-club-nestjs-605024846890.us-central1.run.app/clubs', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    resp.on('end', () => {
        try {
            const clubs = JSON.parse(data);
            const avidela = clubs.find(c => (c.name || c.clubName || '').toLowerCase().includes('avidela'));
            console.log('Avidela Club:', avidela);
            console.log('All Clubs:', JSON.stringify(clubs.map(c => ({ id: c.pkClub || c.id, name: c.name || c.clubName })), null, 2));
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Raw data:', data);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
