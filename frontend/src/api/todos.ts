import { Todo } from "../types";

export const BASE_URL = 'http://localhost:9090/';
const endpoint = "todos";
const headers = {
  "Content-Type": "application/json",
};

export const todos = {
  async getAll() {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return await response.json();
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
}