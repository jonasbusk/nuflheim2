import { useState } from "react";

import { type TeamState, type Roster, rosters } from "./data";
import PlayerTable from "./PlayerTable";

function Team() {
  const defaultTeam: TeamState = {
    name: "",
    coach: "",
    roster: rosters[0].key,
    league: 1,
    players: new Array(16).fill(null),
  };

  // Store entire team state in an object
  // TODO: Store state in the URL
  const [team, setTeam] = useState<TeamState>(defaultTeam);

  // Store the selected player number, or 0 if no player is selected for swapping
  const [swapPlayerNumber, setSwapPlayerNumber] = useState<number>(0);

  // Get roster from name
  const roster = rosters.find((r) => r.key === team.roster) as Roster;

  function setPlayerName(playerNumber: number, playerName: string): void {
    const players = [...team.players];
    if (players[playerNumber - 1]) {
      players[playerNumber - 1]!.name = playerName;
      setTeam({ ...team, players: players });
    }
  }

  function setPlayer(playerNumber: number, positionNumber: number): void {
    if (positionNumber === 0) {
      // Clear the player
      const players = [...team.players];
      players[playerNumber - 1] = null;
      setTeam({ ...team, players: players });
    } else {
      // Set new player
      const players = [...team.players];
      players[playerNumber - 1] = {
        name: players[playerNumber - 1]?.name || "",
        type: positionNumber,
      };
      setTeam({ ...team, players: players });
    }
  }

  function swapPlayer(playerNumber: number): void {
    if (swapPlayerNumber === 0) {
      // Select the player to swap
      setSwapPlayerNumber(playerNumber);
    } else {
      // Swap the players and reset the swap state
      const players = [...team.players];
      const player = players[swapPlayerNumber - 1];
      players[swapPlayerNumber - 1] = players[playerNumber - 1];
      players[playerNumber - 1] = player;
      setTeam({ ...team, players: players });
      setSwapPlayerNumber(0);
    }
  }

  return (
    <div className="team">
      <table className="team-table">
        <tbody>
          <tr>
            <td>Team Name:</td>
            <td>
              <input
                type="text"
                value={team.name}
                onChange={(e) => setTeam({ ...team, name: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>Coach:</td>
            <td>
              <input
                type="text"
                value={team.coach}
                onChange={(e) => setTeam({ ...team, coach: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>Team Roster:</td>
            <td>
              <select
                value={team.roster}
                onChange={(e) =>
                  setTeam({
                    ...defaultTeam,
                    roster: e.target.value,
                    league: 1,
                  })
                }
              >
                {rosters.map((roster) => (
                  <option key={roster.key} value={roster.key}>
                    {roster.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Team League:</td>
            <td>
              <select
                value={team.league}
                onChange={(e) =>
                  setTeam({ ...team, league: parseInt(e.target.value) })
                }
              >
                {roster.leagues.map((league, index) => (
                  <option key={league} value={index + 1}>
                    {league}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <PlayerTable
        roster={roster}
        players={team.players}
        swapPlayerNumber={swapPlayerNumber}
        setPlayer={setPlayer}
        setPlayerName={setPlayerName}
        swapPlayer={swapPlayer}
      />
      {/* show the team object for debugging */}
      {/* <pre>{JSON.stringify(team, null, 2)}</pre> */}
    </div>
  );
}

export default Team;
