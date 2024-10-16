import { useEffect, useState } from 'react';

export default function Home() {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // Fetch the high-probability winner from the API
    fetch('/api/pmu')
      .then((res) => res.json())
      .then((data) => {
        setWinner(data.high_probability_winner);
      });
  }, []);

  return (
    <div>
      <h1>PMU High Probability Winner</h1>
      {winner ? (
        <div>
          <h2>Top Horse: {winner.name}</h2>
          <p>Performance Score: {winner.performance}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
