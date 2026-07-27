import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  type TeamState,
  type Player,
  type PlayerProfile,
  type Roster,
  ANY_TEAM,
  rosters,
  starPlayers,
} from "./data";
import PlayerTable from "./PlayerTable";
import { useTeamUrlState } from "./useTeamUrlState";

function Team() {
  const defaultTeam: TeamState = {
    name: "",
    coach: "",
    roster: rosters[0].key,
    league: 1,
    favouredOf: rosters[0].favouredOf.length > 0 ? 1 : undefined,
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

  // Store entire team state in an object, persisted in the URL
  const [team, setTeam] = useTeamUrlState(defaultTeam);

  // Store the selected player number, or 0 if no player is selected for swapping
  const [swapPlayerNumber, setSwapPlayerNumber] = useState<number>(0);

  // Get roster from key
  const roster = rosters.find((r) => r.key === team.roster) as Roster;

  /** Check if a player profile is available for the given team state. */
  function playsForTeam(p: PlayerProfile, t: TeamState): boolean {
    return (roster.playerProfiles.includes(p) ||
      p.playsFor?.includes(ANY_TEAM) ||
      p.playsFor?.includes(roster.leagues[t.league - 1]) ||
      p.playsFor?.some((r) => roster.specialRules.includes(r)) ||
      (t.favouredOf && p.playsFor?.includes(roster.favouredOf[t.favouredOf - 1]))) as boolean;
  }

  // Get the available star players for the selected team state
  const availableStarPlayers = starPlayers.filter((p) => playsForTeam(p, team));

  /** Remove players from the team that are not available with given team state. */
  function filterTeamPlayers(team: TeamState): TeamState {
    return {
      ...team,
      players: team.players.map((player) => {
        const profile = getPlayerProfile(player);
        return profile && playsForTeam(profile, team) ? player : null;
      }),
    };
  }

  /** Reset the team state and set the roster. */
  function setRoster(key: string): void {
    if (key !== team.roster) {
      const roster = rosters.find((r) => r.key === key) as Roster;
      const favouredOf = roster.favouredOf.length > 0 ? 1 : undefined;
      setTeam({ ...defaultTeam, roster: key, favouredOf: favouredOf });
    }
  }

  /** Set the team league and filter the team players. */
  function setLeague(key: number): void {
    // Norse is a special case where favouredOf is determined by the league
    const favouredOf = team.roster === "norse" ? (key === 1 ? 1 : undefined) : team.favouredOf;
    setTeam(filterTeamPlayers({ ...team, league: key, favouredOf: favouredOf }));
  }

  /** Set the team favouredOf special rule and filter the team players. */
  function setFavouredOf(favouredOf: number): void {
    setTeam(filterTeamPlayers({ ...team, favouredOf: favouredOf }));
  }

  /** Get the player profile for a given player. */
  function getPlayerProfile(player: Player | null): PlayerProfile | null {
    return (
      [...roster.playerProfiles, ...availableStarPlayers].find((p) => p.key === player?.key) || null
    );
  }

  /** Set the name of the player with the given player number. */
  function setPlayerName(playerNumber: number, playerName: string): void {
    const players = [...team.players];
    const player = players[playerNumber - 1];
    if (player) {
      // Update or delete the name property
      if (playerName.trim()) {
        player.name = playerName;
      } else {
        delete player.name;
      }
      setTeam({ ...team, players: players });
    }
  }

  /** Set the player with the given player number to a player with the given key or null. */
  function setPlayer(playerNumber: number, playerKey: string): void {
    const players = [...team.players];
    // Search for matching player profile in the current roster and available star players
    if (roster.playerProfiles.some((p) => p.key === playerKey)) {
      // Found a match in the roster
      // Keep the player name if it exists
      if (players[playerNumber - 1]?.name) {
        players[playerNumber - 1] = { key: playerKey, name: players[playerNumber - 1]?.name };
      } else {
        players[playerNumber - 1] = { key: playerKey };
      }
    } else if (availableStarPlayers.some((p) => p.key === playerKey)) {
      // Found a match among the available star players
      players[playerNumber - 1] = { key: playerKey };
    } else {
      // Clear the player if no match is found
      players[playerNumber - 1] = null;
    }
    setTeam({ ...team, players: players });
  }

  /** Select a player to swap or swap two players if a player is already selected */
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

  /** Format a number as a cost string. */
  function formatCost(x: number): string {
    // Format a number into a cost string, example: 10000 -> 10,000 GP
    return `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} GP`;
  }

  /** Get the total value of a player */
  function getPlayerValue(player: Player | null): number {
    const profile = getPlayerProfile(player);
    return profile ? profile.cost : 0;
  }

  /** Get the total team value. */
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

  /** Get the remaining treasury. */
  function getTreasury(): number {
    let treasury = team.budget;
    treasury -= getTeamValue();
    treasury -= team.dedicatedFans * costOfDedicatedFans;
    return treasury;
  }

  return (
    <div className="team">
      <div className="flex flex-wrap gap-5">
        <table id="team-table-1">
          <tbody>
            <tr>
              <td>Team Name:</td>
              <td>
                <Input
                  type="text"
                  value={team.name}
                  maxLength={30}
                  onChange={(e) => setTeam({ ...team, name: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>Coach:</td>
              <td>
                <Input
                  type="text"
                  value={team.coach}
                  maxLength={30}
                  onChange={(e) => setTeam({ ...team, coach: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>Roster:</td>
              <td>
                <Select
                  items={rosters.map((roster) => ({ label: roster.name, value: roster.key }))}
                  value={team.roster}
                  onValueChange={(value) => value && setRoster(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Rosters</SelectLabel>
                      {rosters.map((roster) => (
                        <SelectItem key={roster.key} value={roster.key}>
                          {roster.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </td>
            </tr>
            <tr>
              <td>League:</td>
              <td>
                <Select
                  value={team.league}
                  items={roster.leagues.map((league, index) => ({
                    label: league,
                    value: index + 1,
                  }))}
                  readOnly={roster.leagues.length <= 1}
                  onValueChange={(value) => value && setLeague(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Leagues</SelectLabel>
                      {roster.leagues.map((league, index) => (
                        <SelectItem key={league} value={index + 1}>
                          {league}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </td>
            </tr>
            <tr>
              <td>Favoured of:</td>
              <td>
                <Select
                  // If favouredOf is undefined, set the value to -1 and show "None"
                  value={team.favouredOf === undefined ? -1 : team.favouredOf}
                  items={[
                    { label: "None", value: -1 },
                    ...roster.favouredOf.map((alignment, index) => ({
                      label: alignment,
                      value: index + 1,
                    })),
                  ]}
                  readOnly={roster.favouredOf.length <= 1}
                  onValueChange={(value) => value && setFavouredOf(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Alignments</SelectLabel>
                      {roster.favouredOf.map((alignment, index) => (
                        <SelectItem key={alignment} value={index + 1}>
                          {alignment}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </td>
            </tr>
          </tbody>
        </table>
        <table id="team-table-2">
          <tbody>
            <tr>
              <td>Team Re-Rolls:</td>
              <td>
                <Input
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
                <Input
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
                <Input
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
                <Input
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
                <Input
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
            {/* <tr>
              <td colSpan={5}>&nbsp;</td>
            </tr> */}
          </tbody>
        </table>
        <table id="team-table-3">
          <tbody>
            <tr>
              <td>Treasury:</td>
              <td>
                <Input
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
                <Input
                  type="text"
                  className="text-right"
                  value={formatCost(getTeamValue())}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td colSpan={5}>&nbsp;</td>
            </tr>
            <tr>
              <td colSpan={5}>&nbsp;</td>
            </tr>
            <tr>
              <td colSpan={5}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PlayerTable
        roster={roster}
        players={team.players}
        swapPlayerNumber={swapPlayerNumber}
        availableStarPlayers={availableStarPlayers}
        getPlayerProfile={getPlayerProfile}
        setPlayer={setPlayer}
        setPlayerName={setPlayerName}
        swapPlayer={swapPlayer}
        formatCost={formatCost}
        getPlayerValue={getPlayerValue}
      />
    </div>
  );
}

export default Team;
