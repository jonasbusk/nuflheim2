import { useState, type JSX } from "react";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@/components/ui/combobox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import {
  type TeamState,
  type Player,
  type PlayerProfile,
  type Roster,
  type Char,
  ANY_TEAM,
  variants,
  rosters,
  skills,
  eliteSkills,
  starPlayers,
  getAvailableInducements,
  STAR_PLAYER,
} from "./data";
import { useTeamUrlState } from "./useTeamUrlState";
import PlayerDetails from "./PlayerDetails";
import PlayerTable from "./PlayerTable";
import Inducements from "./Inducements";
import { downloadPDF } from "./downloadPDF";
import { PDFViewer } from "@react-pdf/renderer";
import TeamDocument from "./TeamDocument";

function Team() {
  const defaultTeam: TeamState = {
    variant: "standard",
    budget: 1_000_000,
    valueIncrease: true,
    name: "",
    coach: "",
    roster: rosters[0].key,
    league: 1,
    favouredOf: rosters[0].favouredOf.length > 0 ? 1 : undefined,
    players: new Array(16).fill(null),
    reRolls: 0,
    assistantCoaches: 0,
    cheerleaders: 0,
    dedicatedFans: 0,
    apothecary: 0,
    inducements: {},
  };

  // Store entire team state in an object, persisted in the URL
  const [team, setTeam] = useTeamUrlState(defaultTeam);

  // Store the state of the player details dialog and the selected player number
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [showPlayerNumber, setShowPlayerNumber] = useState<number>(0);

  // Store the selected player number, or 0 if no player is selected for swapping
  const [swapPlayerNumber, setSwapPlayerNumber] = useState<number>(0);

  // Get roster from key
  const roster = rosters.find((r) => r.key === team.roster) as Roster;

  // Define constants based on the rules variant and roster
  const costOfReRolls = team.variant === "sevens" ? 100_000 : roster.costOfReRolls;
  const costOfAssistantCoaches = team.variant === "sevens" ? 20_000 : 10_000;
  const costOfCheerleaders = team.variant === "sevens" ? 20_000 : 10_000;
  const costOfDedicatedFans = team.variant === "sevens" ? 20_000 : 5_000;
  const costOfApothecary = team.variant === "sevens" ? 80_000 : 50_000;
  const maxReRolls = 8;
  const maxAssistantCoaches = team.variant === "sevens" ? 3 : 6;
  const maxCheerleaders = team.variant === "sevens" ? 3 : 6;
  const maxApothecary = 1;
  // TODO: Check Sevens Matched Play rules
  const maxDedicatedFans = 3;

  // Define costs for player advancements
  const costOfPrimarySkill = 20_000;
  const costOfSecondarySkill = 40_000;
  const costOfEliteSkill = 10_000;
  const costOfMA = 20_000;
  const costOfST = 60_000;
  const costOfAG = 30_000;
  const costOfPA = 20_000;
  const costOfAV = 10_000;
  /** Maximum number of allowed player advancements. */
  const maxNumAdvancements = 6;

  const availableInducements = getAvailableInducements(team);

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

  /** Set the team variant and values that depend on the variant. */
  function setVariant(variant: keyof typeof variants): void {
    if (variant !== team.variant) {
      const budget = variant === "sevens" ? 600_000 : 1_000_000;
      setTeam({
        ...team,
        variant: variant,
        budget: budget,
        reRolls: 0,
        assistantCoaches: 0,
        cheerleaders: 0,
        dedicatedFans: 0,
        apothecary: 0,
        inducements: {},
      });
    }
  }

  /** Reset the team state and set the roster. */
  function setRoster(key: string): void {
    if (key !== team.roster) {
      const roster = rosters.find((r) => r.key === key) as Roster;
      const favouredOf = roster.favouredOf.length > 0 ? 1 : undefined;
      setTeam({
        ...defaultTeam,
        variant: team.variant,
        budget: team.budget,
        name: team.name,
        coach: team.coach,
        roster: key,
        favouredOf: favouredOf,
      });
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
    setTeam(filterTeamPlayers({ ...team, favouredOf: favouredOf, inducements: {} }));
  }

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

  /** Select a player to swap or swap two players if a player is already selected. */
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

  /** Get the total value of a player. */
  function getPlayerValue(player: Player | null): number {
    const profile = getPlayerProfile(player);
    let value = 0;
    if (player && profile) {
      value += profile.cost;
      if (team.valueIncrease) {
        // Primary skills
        player.ps?.forEach((skill) => {
          value += costOfPrimarySkill + (eliteSkills.includes(skill) ? costOfEliteSkill : 0);
        });
        // Secondary skills
        player.ss?.forEach((skill) => {
          value += costOfSecondarySkill + (eliteSkills.includes(skill) ? costOfEliteSkill : 0);
        });
        // Characteristic improvements
        value += (player.ma || 0) * costOfMA;
        value += (player.st || 0) * costOfST;
        value += (player.ag || 0) * costOfAG;
        value += (player.pa || 0) * costOfPA;
        value += (player.av || 0) * costOfAV;
      }
    }
    return value;
  }

  /** Get the total team value. */
  function getTeamValue(): number {
    let teamValue = 0;
    teamValue += team.players.reduce((sum, player) => sum + getPlayerValue(player), 0);
    teamValue += team.reRolls * costOfReRolls;
    teamValue += team.assistantCoaches * costOfAssistantCoaches;
    teamValue += team.cheerleaders * costOfCheerleaders;
    // Note: Dedicated fans do not add to team value
    teamValue += team.apothecary * costOfApothecary;
    teamValue += availableInducements.reduce((sum, inducement) => {
      return sum + (team.inducements[inducement.key] || 0) * inducement.cost;
    }, 0);
    return teamValue;
  }

  /** Get the remaining treasury. */
  function getTreasury(): number {
    let treasury = team.budget;
    treasury -= getTeamValue();
    treasury -= team.dedicatedFans * costOfDedicatedFans;
    return treasury;
  }

  /** Set a team inducement. */
  function setInducement(key: string, value: number): void {
    const inducements = { ...team.inducements };
    if (value > 0) {
      inducements[key] = value;
    } else {
      delete inducements[key];
    }
    setTeam({ ...team, inducements: inducements });
  }

  /** Calculate the number of selected advancements for a given player. */
  function getNumPlayerAdvancements(player: Player): number {
    return (
      (player.ps?.length || 0) +
      (player.ss?.length || 0) +
      (player.ma || 0) +
      (player.st || 0) +
      (player.ag || 0) +
      (player.pa || 0) +
      (player.av || 0)
    );
  }

  /** Set a player skill advancement. */
  function setSkillAdvancement(
    playerNumber: number,
    skill: keyof typeof skills,
    category: string,
  ): void {
    const players = [...team.players];
    const player = players[playerNumber - 1];
    const profile = getPlayerProfile(player);
    if (player && profile) {
      const numAdvancements = getNumPlayerAdvancements(player);
      // Handle primary skill
      if (profile.primary?.includes(category)) {
        player.ps = player.ps || [];
        if (!player.ps.includes(skill) && numAdvancements < maxNumAdvancements) {
          player.ps.push(skill); // Add the skill
          player.ps.sort();
        } else {
          player.ps = player.ps.filter((s) => s !== skill); // Remove the skill
        }
        if (player.ps.length === 0) {
          delete player.ps; // Remove the property if empty
        }
      }
      // Handle secondary skill
      if (profile.secondary?.includes(category)) {
        player.ss = player.ss || [];
        if (!player.ss.includes(skill) && numAdvancements < maxNumAdvancements) {
          player.ss.push(skill); // Add the skill
          player.ss.sort();
        } else {
          player.ss = player.ss.filter((s) => s !== skill); // Remove the skill
        }
        if (player.ss.length === 0) {
          delete player.ss; // Remove the property if empty
        }
      }
      setTeam({ ...team, players: players });
    }
  }

  /** Set a player characteristic advancement. */
  function setCharAdvancement(playerNumber: number, char: Char): void {
    const players = [...team.players];
    const player = players[playerNumber - 1];
    const profile = getPlayerProfile(player);
    if (player && profile && profile.position !== STAR_PLAYER) {
      const numAdvancements = getNumPlayerAdvancements(player);
      // Increment or reset the characteristic improvement modifier if it is allowed to be improved
      // TODO: Handle PA value of -
      if (
        (player[char] || 0) < 2 &&
        numAdvancements < maxNumAdvancements &&
        ((char === "ma" && profile.ma + (player.ma || 0) < 9) ||
          (char === "st" && profile.st + (player.st || 0) < 8) ||
          (char === "ag" && profile.ag - (player.ag || 0) > 1) ||
          (char === "pa" && (profile.pa || 0) - (player.pa || 0) > 1) ||
          (char === "av" && profile.av + (player.av || 0) < 11))
      ) {
        player[char] = (player[char] || 0) + 1;
      } else {
        delete player[char];
      }
      setTeam({ ...team, players: players });
    }
  }

  /** Render a player characteristic. */
  function renderChar(player: Player, char: Char): JSX.Element {
    const profile = getPlayerProfile(player);
    let className = "";
    if (player[char] === 1) {
      className = "char-improved char-improved-once";
    } else if (player[char] === 2) {
      className = "char-improved char-improved-twice";
    }
    if (profile && char === "ma") {
      return <span className={className}>{profile.ma + (player.ma || 0)}</span>;
    } else if (profile && char === "st") {
      return <span className={className}>{profile.st + (player.st || 0)}</span>;
    } else if (profile && char === "ag") {
      return <span className={className}>{profile.ag - (player.ag || 0) + "+"}</span>;
    } else if (profile && char === "pa") {
      return (
        <span className={className}>{profile.pa ? profile.pa - (player.pa || 0) + "+" : "-"}</span>
      );
    } else if (profile && char === "av") {
      return <span className={className}>{profile.av + (player.av || 0) + "+"}</span>;
    }
    return <span></span>;
  }

  return (
    <div className="team flex flex-col gap-5">
      <Separator />
      <div className="flex flex-wrap gap-5">
        <FieldLabel className="text-md font-bold">Settings:</FieldLabel>
        <FieldGroup className="grid max-w-xl grid-cols-3">
          <Field orientation="horizontal">
            <FieldLabel className="text-md">Variant:</FieldLabel>
            <Select
              items={Object.entries(variants).map(([key, label]) => ({ label, value: key }))}
              value={team.variant}
              onValueChange={(value) => value && setVariant(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Variants</SelectLabel>
                  {Object.entries(variants).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field orientation="horizontal">
            <FieldLabel className="text-md">Budget:</FieldLabel>
            <Input
              type="number"
              className="text-right w-32"
              value={team.budget}
              onChange={(e) =>
                setTeam({
                  ...team,
                  budget: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 10_000_000),
                })
              }
            />
            <FieldLabel className="text-md">GP</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <FieldLabel className="text-md">Player value increase:</FieldLabel>
            <Switch
              id="advancements-cost-gold"
              checked={team.valueIncrease}
              onCheckedChange={(checked) => setTeam({ ...team, valueIncrease: checked })}
            />
          </Field>
        </FieldGroup>
        <Button
          className="cursor-pointer"
          onClick={() =>
            downloadPDF(
              team,
              costOfReRolls,
              costOfAssistantCoaches,
              costOfCheerleaders,
              costOfDedicatedFans,
              costOfApothecary,
              getTreasury(),
              getTeamValue(),
              availableInducements,
              getPlayerProfile,
              getPlayerValue,
              formatCost,
            )
          }
        >
          Download PDF
        </Button>
      </div>
      <Separator />
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
                <Combobox
                  items={rosters.map((roster) => ({ label: roster.name, value: roster.key }))}
                  value={{ label: roster.name, value: roster.key }}
                  onValueChange={(item) => item && setRoster(item.value)}
                  isItemEqualToValue={(a, b) => a.value === b.value}
                  itemToStringValue={(item) => item.label}
                  autoHighlight
                >
                  <ComboboxInput placeholder="Select a roster" />
                  <ComboboxContent>
                    <ComboboxEmpty>No roster found</ComboboxEmpty>
                    <ComboboxList>
                      <ComboboxGroup>
                        <ComboboxLabel>Rosters</ComboboxLabel>
                        <ComboboxCollection>
                          {(item) => (
                            <ComboboxItem key={item.value} value={item}>
                              {item.label}
                            </ComboboxItem>
                          )}
                        </ComboboxCollection>
                      </ComboboxGroup>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
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
                      reRolls: Math.min(Math.max(parseInt(e.target.value) || 0, 0), maxReRolls),
                    })
                  }
                />
              </td>
              <td>x</td>
              <td className="text-right">{formatCost(costOfReRolls)}</td>
              <td className="text-right">{formatCost(costOfReRolls * team.reRolls)}</td>
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
                      assistantCoaches: Math.min(
                        Math.max(parseInt(e.target.value) || 0, 0),
                        maxAssistantCoaches,
                      ),
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
                      cheerleaders: Math.min(
                        Math.max(parseInt(e.target.value) || 0, 0),
                        maxCheerleaders,
                      ),
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
                      dedicatedFans: Math.min(
                        Math.max(parseInt(e.target.value) || 0, 0),
                        maxDedicatedFans,
                      ),
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
                      apothecary: Math.min(
                        Math.max(parseInt(e.target.value) || 0, 0),
                        maxApothecary,
                      ),
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
              <td colSpan={2}>&nbsp;</td>
            </tr>
            <tr>
              <td colSpan={2}>&nbsp;</td>
            </tr>
            <tr>
              <td colSpan={2}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-5">
        <Dialog open={showPlayerDetails} onOpenChange={setShowPlayerDetails}>
          <DialogContent className="player-details-dialog">
            <PlayerDetails
              players={team.players}
              showPlayerNumber={showPlayerNumber}
              maxNumAdvancements={maxNumAdvancements}
              getPlayerProfile={getPlayerProfile}
              formatCost={formatCost}
              getPlayerValue={getPlayerValue}
              getNumPlayerAdvancements={getNumPlayerAdvancements}
              setCharAdvancement={setCharAdvancement}
              setSkillAdvancement={setSkillAdvancement}
              renderChar={renderChar}
            />
          </DialogContent>
        </Dialog>
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
          setShowPlayerDialog={setShowPlayerDetails}
          setShowPlayerNumber={setShowPlayerNumber}
          renderChar={renderChar}
        />
      </div>
      <div className="flex flex-wrap gap-5">
        <Inducements
          teamInducements={team.inducements}
          availableInducements={availableInducements}
          setInducement={setInducement}
          formatCost={formatCost}
        />
      </div>
      {import.meta.env.DEV && (
        <PDFViewer width="100%" height={800}>
          <TeamDocument
            team={team}
            costOfReRolls={costOfReRolls}
            costOfAssistantCoaches={costOfAssistantCoaches}
            costOfCheerleaders={costOfCheerleaders}
            costOfDedicatedFans={costOfDedicatedFans}
            costOfApothecary={costOfApothecary}
            treasury={getTreasury()}
            teamValue={getTeamValue()}
            availableInducements={availableInducements}
            getPlayerProfile={getPlayerProfile}
            getPlayerValue={getPlayerValue}
            formatCost={formatCost}
          />
        </PDFViewer>
      )}
      {import.meta.env.DEV && <pre>{JSON.stringify(team, null, 2)}</pre>}
    </div>
  );
}

export default Team;
