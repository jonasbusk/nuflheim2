import { type JSX } from "react";
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
                <input
                  type="text"
                  value={player?.name || profile?.name || ""}
                  readOnly={player === null || profile?.position === STAR_PLAYER}
                  onChange={(e) => setPlayerName(playerNumber, e.target.value)}
                ></input>
              </td>
              <td className="player-position">
                <select
                  value={player?.key || "null"}
                  onChange={(e) => setPlayer(playerNumber, e.target.value)}
                >
                  <option key="null" value="null">
                    -
                  </option>
                  {roster.playerProfiles.map((p: PlayerProfile) => (
                    <option key={p.key} value={p.key}>
                      {p.position}
                    </option>
                  ))}
                  {availableStarPlayers.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.name}
                    </option>
                  ))}
                </select>
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
