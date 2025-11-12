import { Profile } from "@/types";
import { api } from "./client";

export const getProfiles = () => api<Profile[]>("/profiles");
