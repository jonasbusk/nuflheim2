import { useState } from "react";

import { type TeamState, type Player, type Roster, rosters } from "./data";
import PlayerTable from "./PlayerTable";

function Team() {
  const defaultTeam: TeamState = {
    name: "",
    coach: "",
    roster: rosters[0].key,
    league: 1,
    players: new Array(16).fill(null),
    budget: 1_000_000,
    reRolls: 0,
    assistantCoaches: 0,
    cheerleaders: 0,
    dedicatedFans: 0,
    apothecary: 0,
  };

  const costOfAssistantCoaches = 10_000;
  const costOfCheerleaders = 10_000;
  const costOfDedicatedFans = 5_000;
  const costOfApothecary = 50_000;

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

  function formatCost(x: number): string {
    // Format a number into a cost string, example: 10000 -> 10,000 GP
    return `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} GP`;
  }

  function getPlayerValue(player: Player | null): number {
    if (player) {
      return roster.playerTypes[player.type - 1].cost;
    } else {
      return 0;
    }
  }

  function getTeamValue(): number {
    let teamValue = 0;
    teamValue += team.players.reduce((sum, player) => sum + getPlayerValue(player), 0);
    teamValue += team.reRolls * roster.costOfReRolls;
    teamValue += team.assistantCoaches * costOfAssistantCoaches;
    teamValue += team.cheerleaders * costOfCheerleaders;
    // Note: Dedicated fans do not add to team value
    teamValue += team.apothecary * costOfApothecary;
    return teamValue;
  }

  function getTreasury(): number {
    let treasury = team.budget;
    treasury -= getTeamValue();
    treasury -= team.dedicatedFans * costOfDedicatedFans;
    return treasury;
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
            <td>Roster:</td>
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
            <td>League:</td>
            <td>
              <select
                value={team.league}
                onChange={(e) => setTeam({ ...team, league: parseInt(e.target.value) })}
              >
                {roster.leagues.map((league, index) => (
                  <option key={league} value={index + 1}>
                    {league}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Treasury:</td>
            <td>
              <input
                type="text"
                className="text-right"
                value={formatCost(getTreasury())}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>Team Value:</td>
            <td>
              <input
                type="text"
                className="text-right"
                value={formatCost(getTeamValue())}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>Team Re-Rolls:</td>
            <td>
              <input
                type="number"
                value={team.reRolls}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    reRolls: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 8),
                  })
                }
              />
            </td>
            <td>x</td>
            <td className="text-right">{formatCost(roster.costOfReRolls)}</td>
            <td className="text-right">{formatCost(roster.costOfReRolls * team.reRolls)}</td>
          </tr>
          <tr>
            <td>Assistant Coaches:</td>
            <td>
              <input
                type="number"
                value={team.assistantCoaches}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    assistantCoaches: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 6),
                  })
                }
              />
            </td>
            <td>x</td>
            <td className="text-right">{formatCost(costOfAssistantCoaches)}</td>
            <td className="text-right">
              {formatCost(costOfAssistantCoaches * team.assistantCoaches)}
            </td>
          </tr>
          <tr>
            <td>Cheerleaders:</td>
            <td>
              <input
                type="number"
                value={team.cheerleaders}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    cheerleaders: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 6),
                  })
                }
              />
            </td>
            <td>x</td>
            <td className="text-right">{formatCost(costOfCheerleaders)}</td>
            <td className="text-right">{formatCost(costOfCheerleaders * team.cheerleaders)}</td>
          </tr>
          <tr>
            <td>Dedicated Fans:</td>
            <td>
              <input
                type="number"
                value={team.dedicatedFans}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    dedicatedFans: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 3),
                  })
                }
              />
            </td>
            <td>x</td>
            <td className="text-right">{formatCost(costOfDedicatedFans)}</td>
            <td className="text-right">{formatCost(costOfDedicatedFans * team.dedicatedFans)}</td>
          </tr>
          <tr>
            <td>Apothecary:</td>
            <td>
              <input
                type="number"
                value={team.apothecary}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    apothecary: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 1),
                  })
                }
                readOnly={!roster.apothecaryAllowed}
              />
            </td>
            <td>x</td>
            <td className="text-right">{formatCost(costOfApothecary)}</td>
            <td className="text-right">{formatCost(costOfApothecary * team.apothecary)}</td>
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
        formatCost={formatCost}
        getPlayerValue={getPlayerValue}
      />
      {/* show the team object for debugging */}
      {/* <pre>{JSON.stringify(team, null, 2)}</pre> */}
    </div>
  );
}

export default Team;
