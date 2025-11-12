"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  activateUser,
  deactivateUser,
} from "@/lib/api/users";
import Link from "next/link";
import ProfileFilter from "./ProfileFilter";
import { User } from "@/types";
import toast from "react-hot-toast";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const load = () => {
    getUsers(filter).then(setUsers);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      toast.success("Usuário excluído com sucesso!");
      setUserToDelete(null);
      load();
    } catch {
      toast.error("Erro ao excluir usuário.");
    }
  };

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
      {/* Cabeçalho com filtro e botão */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <ProfileFilter value={filter} onChange={setFilter} />

        <Link
          href="/users/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md shadow-sm"
        >
          Novo usuário
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-indigo-100 text-indigo-700">
              <th className="p-3 text-left font-semibold rounded-tl-xl">
                Nome
              </th>
              <th className="p-3 text-left font-semibold">Email</th>
              <th className="p-3 text-left font-semibold">Perfil</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold rounded-tr-xl">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className={`transition-colors border-b border-gray-100 last:border-none ${
                  u.isActive
                    ? "bg-green-50 hover:bg-green-100"
                    : "bg-red-50 hover:bg-red-100"
                }`}
              >
                <td className="p-3 font-medium text-gray-800 whitespace-nowrap">
                  {u.firstName} {u.lastName}
                </td>
                <td className="p-3 whitespace-nowrap">{u.email}</td>
                <td className="p-3 whitespace-nowrap">
                  {u.profile?.name ?? u.profileId}
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                      u.isActive
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {u.isActive ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="p-3 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() =>
                      (u.isActive ? deactivateUser(u.id) : activateUser(u.id))
                        .then(load)
                        .catch(() => toast.error("Erro ao atualizar status."))
                    }
                    className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md cursor-pointer transition"
                  >
                    {u.isActive ? "Desativar" : "Ativar"}
                  </button>

                  <Link
                    href={`/users/${u.id}`}
                    className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md cursor-pointer transition"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => setUserToDelete(u)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Confirmar exclusão
            </h3>
            <p className="text-gray-600 mb-4">
              Tem certeza que deseja excluir{" "}
              <strong>
                {userToDelete.firstName} {userToDelete.lastName}
              </strong>
              ?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              >
                Cancelar
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
