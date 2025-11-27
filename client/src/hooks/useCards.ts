import { useState, useEffect } from "react";
import { getCards } from "../services/services";

const useCards = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedCards = await getCards();
        setCards(fetchedCards);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cards, isLoading, error };
};

export default useCards;
