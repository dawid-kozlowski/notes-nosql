import { useState, useEffect } from "react";
import { getCards } from "../services/services";

export interface Card {
  id: string;
  content: string;
}

const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    try {
      setLoading(true);
      const { keys, results } = await getCards();
      setCards(
        keys
          .map((key: string, i: number) => ({
            id: key,
            content: results[i] || "",
          }))
          .filter((c: Card) => c.content)
      );
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return { cards, isLoading, error, reload, setCards };
};
export default useCards;
