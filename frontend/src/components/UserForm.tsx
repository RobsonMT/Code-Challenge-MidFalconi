"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUser, createUser, updateUser } from "@/lib/api/users";
import { getProfiles } from "@/lib/api/profiles";
import { Profile, User } from "@/types";
import toast from "react-hot-toast";

export default function UserForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [form, setForm] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    email: "",
    profileId: "",
    isActive: true,
  });

  // carrega profiles
  useEffect(() => {
    (async () => {
      try {
        const p = await getProfiles();
        setProfiles(p);
        // se estiver criando e não tiver profile selecionado, seta o primeiro disponível
        if (!id && p.length > 0 && !form.profileId) {
          setForm((s) => ({ ...s, profileId: p[0].id }));
        }
      } catch (err) {
        toast.error("Erro ao carregar perfis.");
        console.error(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // carrega usuário quando for editar
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const user = await getUser(id);
        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profileId: user.profileId,
          isActive: user.isActive,
        });
        // se profiles já carregaram e profileId for vazio, setar
        if (profiles.length > 0 && !user.profileId) {
          setForm((s) => ({ ...s, profileId: profiles[0].id }));
        }
      } catch (err) {
        toast.error("Erro ao carregar usuário.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // validações mínimas
      if (!form.firstName || !form.lastName || !form.email || !form.profileId) {
        toast.error("Preencha todos os campos obrigatórios.");
        return;
      }

      if (id) {
        await updateUser(id, form as Partial<User>);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await createUser(form as Partial<User>);
        toast.success("Usuário criado com sucesso!");
      }
      router.push("/users");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 max-w-2xl mx-auto mt-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Nome"
          value={form.firstName ?? ""}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Sobrenome"
          value={form.lastName ?? ""}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded col-span-1 sm:col-span-2"
          placeholder="E-mail"
          type="email"
          value={form.email ?? ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* SELECT de Profiles */}
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Perfil</label>
          <select
            className="w-full border rounded p-2"
            value={form.profileId ?? ""}
            onChange={(e) => setForm({ ...form, profileId: e.target.value })}
          >
            <option value="" disabled>
              {profiles.length === 0
                ? "Carregando perfis..."
                : "Selecione um perfil"}
            </option>

            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name ?? p.id}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2 flex items-center gap-3 mt-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            Ativo
          </label>

          <button
            type="submit"
            disabled={loading}
            className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded transition disabled:opacity-50"
          >
            {loading
              ? "Salvando..."
              : id
              ? "Salvar alterações"
              : "Criar usuário"}
          </button>
        </div>
      </div>
    </form>
  );
}
