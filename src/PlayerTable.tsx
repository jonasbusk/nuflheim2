import { type Player, type PlayerType, type Roster } from "./data";

function PlayerTable({
  roster,
  players,
  swapPlayerNumber,
  setPlayer,
  setPlayerName,
  swapPlayer,
}: {
  roster: Roster;
  players: (Player | null)[];
  swapPlayerNumber: number;
  setPlayer: (playerNumber: number, positionNumber: number) => void;
  setPlayerName: (playerNumber: number, playerName: string) => void;
  swapPlayer: (playerNumber: number) => void;
}) {
  function renderPlayerSkills(player: Player | null): string {
    if (player) {
      return roster.playerTypes[player.type - 1].skills.join(", ");
    } else {
      return "";
    }
  }

  function renderPlayerValue(player: Player | null): string {
    if (player) {
      return formatCost(roster.playerTypes[player.type - 1].cost);
    } else {
      return "";
    }
  }

  function formatCost(x: number): string {
    // Format a number into a cost string, example: 10000 -> 10,000 GP
    return `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} GP`;
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
          <th className="text-left">Skills</th>
          <th className="text-center">Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {players.map((p: Player | null, i: number) => (
          <tr key={i}>
            <td className="player-number">{i + 1}</td>
            <td className="player-name">
              <input
                type="text"
                readOnly={p === null}
                value={p?.name || ""}
                onChange={(e) => setPlayerName(i + 1, e.target.value)}
              ></input>
            </td>
            <td className="player-position">
              <select
                value={p?.type || 0}
                onChange={(e) => setPlayer(i + 1, parseInt(e.target.value))}
              >
                <option key="0" value="0">
                  -
                </option>
                {roster.playerTypes.map((p: PlayerType, i: number) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {p.position}
                    </option>
                  );
                })}
              </select>
              <div className="keywords">
                {p?.type
                  ? roster.playerTypes[p.type - 1].keywords.join(", ")
                  : ""}
              </div>
            </td>
            <td className="player-char">
              {p?.type ? roster.playerTypes[p.type - 1].ma : ""}
            </td>
            <td className="player-char">
              {p?.type ? roster.playerTypes[p.type - 1].st : ""}
            </td>
            <td className="player-char">
              {p?.type ? roster.playerTypes[p.type - 1].ag + "+" : ""}
            </td>
            <td className="player-char">
              {p?.type ? roster.playerTypes[p.type - 1].pa + "+" : ""}
            </td>
            <td className="player-char">
              {p?.type ? roster.playerTypes[p.type - 1].av + "+" : ""}
            </td>
            <td className="player-skills">{renderPlayerSkills(p)}</td>
            <td className="player-value">{renderPlayerValue(p)}</td>
            <td
              className={
                "swap-player " +
                (swapPlayerNumber === i + 1 ? "swap-player-selected" : "")
              }
              onClick={() => swapPlayer(i + 1)}
            >
              &#8597;
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlayerTable;
