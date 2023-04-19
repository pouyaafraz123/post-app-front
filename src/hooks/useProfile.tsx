import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/auth";

export function useProfile(enabled = true) {
  return useQuery([getProfile.name], getProfile, {
    enabled,
    keepPreviousData:true,
    staleTime:0,
  });
}
