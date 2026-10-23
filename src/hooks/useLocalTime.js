import { useEffect, useState } from 'react';

// Current time in the owner's time zone, e.g. "3:42 PM". Updates every 30s.
export function useLocalTime(timeZone) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}
