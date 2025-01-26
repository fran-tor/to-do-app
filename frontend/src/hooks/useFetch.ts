import { useEffect, useState } from "react";
import { Task } from "../types";

const useFetch = (url: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  // const error = "error";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((tasks) => setTasks(tasks))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      });
  }, []);

  return { tasks, error };
}

export default useFetch;