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

import { type Player, type PlayerProfile, type Roster, skills, STAR_PLAYER } from "./data";

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
  setShowPlayerDialog,
  setShowPlayerNumber,
  renderChar,
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
  setShowPlayerDialog: (show: boolean) => void;
  setShowPlayerNumber: (playerNumber: number) => void;
  renderChar: (player: Player, char: string) => JSX.Element;
}) {
  /** Render the skills and traits of a player as a formatted list of elements. */
  function renderPlayerSkills(player: Player | null): JSX.Element {
    const profile = getPlayerProfile(player);
    // Add starting skills to the list
    const result =
      profile?.skills.map((s) => (
        <span key={s} className="skill-default">
          {skills[s]}
        </span>
      )) || [];
    // Add primary skill advancements to the list if present
    if (player?.ps) {
      result.push(
        ...player.ps.map((s) => (
          <span key={s} className="skill-advancement">
            {skills[s]}'
          </span>
        )),
      );
    }
    // Add secondary skill advancements to the list if present
    if (player?.ss) {
      result.push(
        ...player.ss.map((s) => (
          <span key={s} className="skill-advancement">
            {skills[s]}"
          </span>
        )),
      );
    }
    // Add special rule to the list if present
    if (profile?.specialRule) {
      result.push(
        <span key="s" className="skill-special">
          {profile.specialRule}
        </span>
      );
    }
    return <>{result.flatMap((s, i) => (i > 0 ? [", ", s] : [s]))}</>;
  }

  function showPlayerDetails(playerNumber: number) {
    setShowPlayerNumber(playerNumber);
    setShowPlayerDialog(true);
  }

  return (
    <table className="player-table">
      <thead>
        <tr>
          <th></th>
          <th className="text-left" title="Player name">
            Name
          </th>
          <th className="text-left" title="Player position">
            Position
          </th>
          <th className="text-center" title="Move Allowance">
            MA
          </th>
          <th className="text-center" title="Strength">
            ST
          </th>
          <th className="text-center" title="Agility">
            AG
          </th>
          <th className="text-center" title="Passing Ability">
            PA
          </th>
          <th className="text-center" title="Armour Value">
            AV
          </th>
          <th className="text-left" title="Skills and Traits">
            Skills & Traits
          </th>
          <th className="text-center" title="Current player value">
            Value
          </th>
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
                    { label: "-", value: "null" },
                    ...roster.playerProfiles.map((p) => ({ label: p.position, value: p.key })),
                    ...availableStarPlayers.map((p) => ({ label: "Star Player", value: p.key })),
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
              <td
                className={"player-char" + (profile ? " cursor-pointer" : "")}
                onClick={() => profile && showPlayerDetails(playerNumber)}
              >
                {player && renderChar(player, "ma")}
              </td>
              <td
                className={"player-char" + (profile ? " cursor-pointer" : "")}
                onClick={() => profile && showPlayerDetails(playerNumber)}
              >
                {player && renderChar(player, "st")}
              </td>
              <td
                className={"player-char" + (profile ? " cursor-pointer" : "")}
                onClick={() => profile && showPlayerDetails(playerNumber)}
              >
                {player && renderChar(player, "ag")}
              </td>
              <td
                className={"player-char" + (profile ? " cursor-pointer" : "")}
                onClick={() => profile && showPlayerDetails(playerNumber)}
              >
                {player && renderChar(player, "pa")}
              </td>
              <td
                className={"player-char" + (profile ? " cursor-pointer" : "")}
                onClick={() => profile && showPlayerDetails(playerNumber)}
              >
                {player && renderChar(player, "av")}
              </td>
              <td
                className={"player-skills" + (profile ? " cursor-pointer" : "")}
                onClick={() => profile && showPlayerDetails(playerNumber)}
              >
                {renderPlayerSkills(player)}
              </td>
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
