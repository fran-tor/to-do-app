import { Todo, TodosFilterAttributes } from "../types";

export const BASE_URL = 'http://localhost:9090/';
const endpoint = "todos";
const headers = {
  "Content-Type": "application/json",
};

export const todos = {
  // async getAll(page = 0, size = 10, sortBy = '', sortOrder = '', done: boolean | null = null, name = '', priority = '') {
  async getAll(todosFilterAttributes: TodosFilterAttributes) {
    // const params = new URLSearchParams({
    //   page: page.toString(),
    //   size: size.toString(),
    //   sortBy,
    //   sortOrder,
    //   done: done?.toString() || '',
    //   name,
    //   priority,
    // });

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(todosFilterAttributes)) {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    }

    const response = await fetch(`${BASE_URL}${endpoint}?${params.toString()}`);
    const data = await response.json();
    return data;
  },
  async create(todo: Todo) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(todo),
    });
    return await response.json();
  },
  async update(todo: Todo) {
    const response = await fetch(`${BASE_URL}${endpoint}/${todo.id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(todo),
    });
    return await response.json();
  },
  async delete(id: number) {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  },
  getFormattedDate(date: string) {
    return new Date(date).toLocaleDateString();
  }
}