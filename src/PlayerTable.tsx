import { type JSX } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type Player, type PlayerProfile, type Roster, STAR_PLAYER } from "./data";

function PlayerTable({
  roster,
  players,
  swapPlayerNumber,
  availableStarPlayers,
  getPlayerProfile,
  setPlayer,
  setPlayerName,
  swapPlayer,
  formatCost,
  getPlayerValue,
}: {
  roster: Roster;
  players: (Player | null)[];
  swapPlayerNumber: number;
  availableStarPlayers: PlayerProfile[];
  getPlayerProfile: (player: Player | null) => PlayerProfile | null;
  setPlayer: (playerNumber: number, playerKey: string) => void;
  setPlayerName: (playerNumber: number, playerName: string) => void;
  swapPlayer: (playerNumber: number) => void;
  formatCost: (cost: number) => string;
  getPlayerValue: (player: Player | null) => number;
}) {
  /** Render the skills and traits of a player as a formatted list of elements. */
  function renderPlayerSkills(player: Player | null): JSX.Element {
    const profile = getPlayerProfile(player);
    const result =
      profile?.skills.map((s) => (
        <span key={s} className="skill-default">
          {s}
        </span>
      )) || [];
    if (profile?.specialRule) {
      result.push(
        <span key="s" className="skill-special">
          {profile.specialRule}
        </span>,
      );
    }
    return <>{result.flatMap((s, i) => (i > 0 ? [", ", s] : [s]))}</>;
  }

  return (
    <table className="player-table">
      <thead>
        <tr>
          <th></th>
          <th className="text-left">Name</th>
          <th className="text-left">Position</th>
          <th className="text-center">MA</th>
          <th className="text-center">ST</th>
          <th className="text-center">AG</th>
          <th className="text-center">PA</th>
          <th className="text-center">AV</th>
          <th className="text-left">Skills & Traits</th>
          <th className="text-center">Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {players.map((player: Player | null, i: number) => {
          const playerNumber = i + 1;
          const profile = getPlayerProfile(player);
          return (
            <tr key={playerNumber}>
              <td className="player-number">{playerNumber}</td>
              <td className="player-name">
                <Input
                  type="text"
                  value={player?.name || profile?.name || ""}
                  maxLength={30}
                  readOnly={player === null || profile?.position === STAR_PLAYER}
                  onChange={(e) => setPlayerName(playerNumber, e.target.value)}
                />
              </td>
              <td className="player-position">
                <Select
                  items={[
                    {label: "-", value: "null"},
                    ...roster.playerProfiles.map((p) => ({ label: p.position, value: p.key })),
                    ...availableStarPlayers.map((p) => ({ label: "Star Player", value: p.key }))
                  ]}
                  value={player?.key || "null"}
                  onValueChange={(value) => value && setPlayer(playerNumber, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-60">
                    <SelectGroup>
                      <SelectItem key="null" value="null">
                        None
                      </SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Players</SelectLabel>
                      {roster.playerProfiles.map((p: PlayerProfile) => (
                        <SelectItem key={p.key} value={p.key}>
                          {p.position} (0-{p.qty})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Star Players</SelectLabel>
                      {availableStarPlayers.map((p) => (
                        <SelectItem key={p.key} value={p.key}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="keywords">{profile?.keywords.join(", ")}</div>
              </td>
              <td className="player-char">{profile?.ma}</td>
              <td className="player-char">{profile?.st}</td>
              <td className="player-char">{profile ? profile.ag + "+" : ""}</td>
              <td className="player-char">
                {profile ? (profile.pa ? profile.pa + "+" : "-") : ""}
              </td>
              <td className="player-char">{profile ? profile.av + "+" : ""}</td>
              <td className="player-skills">{renderPlayerSkills(player)}</td>
              <td className="player-value">{player ? formatCost(getPlayerValue(player)) : ""}</td>
              <td
                className={
                  "swap-player" + (swapPlayerNumber === playerNumber ? " swap-player-selected" : "")
                }
                onClick={() => swapPlayer(playerNumber)}
              >
                &#8597;
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PlayerTable;
