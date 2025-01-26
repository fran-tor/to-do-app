import { useEffect, useState } from "react";
import { Todo } from "../types";

const useFetch = (url: string) => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((tasks) => setTasks(tasks))
      .catch(() => setError('Error fetching data'));
  }, []);

  return { tasks, error };
}

export default useFetch;