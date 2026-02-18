import { useState, useEffect } from "react";
import { StarFill } from "react-bootstrap-icons";

function RatingTimer({ rating }) {
  const [time, setTime] = useState(5);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) {
    return <p className="text-muted">Rating hidden</p>;
  }

  return (
    <p className="text-warning">
      <StarFill /> {rating} (disappears in {time}s)
    </p>
  );
}

export default RatingTimer;
