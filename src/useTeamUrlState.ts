import { useCallback, useState } from "react";

import { type TeamState, type Player, rosters } from "./data";

const PARAM_NAME = "t";

/** Encode a team as a URL-safe base64 string. */
function encodeTeam(team: TeamState): string {
  const bytes = new TextEncoder().encode(JSON.stringify(team));
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Decode a URL-safe base64 string back into a team, or null if invalid. */
function decodeTeam(encoded: string): TeamState | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    return validateTeam(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Check that a decoded value is a well-formed TeamState that's safe to use. */
function validateTeam(value: unknown): value is TeamState {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;

  if (typeof v.name !== "string" || typeof v.coach !== "string") return false;
  if (typeof v.roster !== "string") return false;

  const roster = rosters.find((r) => r.key === v.roster);
  if (!roster) return false;

  if (typeof v.league !== "number" || !Number.isInteger(v.league)) return false;
  if (v.league < 1 || v.league > roster.leagues.length) return false;

  if (!Array.isArray(v.players) || v.players.length !== 16) return false;
  if (
    !v.players.every(
      (p) =>
        p === null ||
        (typeof p === "object" && p !== null && typeof (p as Player).key === "string"),
    )
  )
    return false;

  const numericFields = [
    "budget",
    "reRolls",
    "assistantCoaches",
    "cheerleaders",
    "apothecary",
    "dedicatedFans",
  ];
  if (!numericFields.every((f) => typeof v[f] === "number" && Number.isFinite(v[f] as number)))
    return false;

  return true;
}

/** Get the initial team from the URL, falling back to defaultTeam if absent or invalid. */
function getInitialTeam(defaultTeam: TeamState): TeamState {
  try {
    const raw = new URLSearchParams(window.location.search).get(PARAM_NAME);
    if (!raw) return defaultTeam;
    return decodeTeam(raw) ?? defaultTeam;
  } catch {
    return defaultTeam;
  }
}

/** Update the URL to reflect the current team state. */
function updateUrl(team: TeamState): void {
  // Preserve any other query params that might exist.
  const params = new URLSearchParams(window.location.search);
  params.set(PARAM_NAME, encodeTeam(team));
  const url = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
  // Update the URL and history for back/forward support.
  window.history.replaceState(team, "", url);
}

/** Like useState<TeamState>, but persists the team into the URL query string. */
export function useTeamUrlState(
  defaultTeam: TeamState,
): [TeamState, (value: TeamState | ((prev: TeamState) => TeamState)) => void] {
  // Define an internal team state variable and setter function with useState.
  // The internal state variable is the current state used by React and is mirrorred in the URL.
  // The internal setter function updates the state and triggers react to render.
  // Passing a function to useState is a lazy initializer ensuring getInitialTeam only runs once.
  const [team, setTeamInternal] = useState<TeamState>(() => getInitialTeam(defaultTeam));
  // Define a setter function that wraps the internal setter and updates the URL.
  // The setter can be called with either a value or an update function.
  // Use a callback so it is safe to use like a normal setState function.
  const setTeam = useCallback((value: TeamState | ((prev: TeamState) => TeamState)) => {
    // Call the internal setter with an update function with the side effect of updating the URL.
    setTeamInternal((prev) => {
      // Determine the next state based on whether value is a function or a direct value.
      const next = typeof value === "function" ? value(prev) : value;
      // Update the URL to reflect the new state.
      updateUrl(next);
      // Return the next state to update the internal state variable.
      return next;
    });
  }, []);
  return [team, setTeam];
}
