import { User } from "@/types";
import { api } from "./client";

export const getUsers = (profileId?: string) =>
  api<User[]>(`/users${profileId ? `?profileId=${profileId}` : ""}`);

export const getUser = (id: string) => api<User>(`/users/${id}`);

export const createUser = (data: Partial<User>) =>
  api<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateUser = (id: string, data: Partial<User>) =>
  api<User>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteUser = (id: string) =>
  api(`/users/${id}`, { method: "DELETE" });

export const activateUser = (id: string) =>
  api<User>(`/users/${id}/activate`, { method: "PATCH" });

export const deactivateUser = (id: string) =>
  api<User>(`/users/${id}/deactivate`, { method: "PATCH" });
