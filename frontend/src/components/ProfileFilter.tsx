"use client";

import { useEffect, useState } from "react";
import { getProfiles } from "@/lib/api/profiles";
import { Profile } from "@/types";

type Props = {
  value?: string;
  onChange: (profileId?: string) => void;
};

export default function ProfileFilter({ value, onChange }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    getProfiles().then(setProfiles);
  }, []);

  return (
    <select
      className="border p-2 rounded"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || undefined)}
    >
      <option value="">Todos os perfis</option>
      {profiles.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name ?? p.id}
        </option>
      ))}
    </select>
  );
}
