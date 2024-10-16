import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Get the current date in format DDMMYYYY
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const currentDate = `${dd}${mm}${yyyy}`;
    
    // API URL with the current date
    const apiUrl = `https://offline.turfinfo.api.pmu.fr/rest/client/7/programme/${currentDate}/R1/C1/participants`;

    // Fetch data from the PMU API
    const response = await axios.get(apiUrl);

    // Process data to determine high probability winner (basic logic here)
    const participants = response.data.participants;

    // Sort participants based on some probability factor (e.g., past performance)
    const sortedParticipants = participants.sort((a, b) => {
      return b.performance - a.performance; // Sort by some performance factor
    });

    // Return the highest probability horse
    res.status(200).json({ high_probability_winner: sortedParticipants[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching PMU data' });
  }
}
