import { type JSX } from "react";

import { type Char, type Player, type PlayerProfile, skills, STAR_PLAYER } from "./data";

function PlayerDetails({
  players,
  showPlayerNumber: playerNumber,
  maxNumAdvancements,
  getPlayerProfile,
  formatCost,
  getPlayerValue,
  getNumPlayerAdvancements,
  setCharAdvancement,
  setSkillAdvancement,
  renderChar,
}: {
  players: (Player | null)[];
  showPlayerNumber: number;
  maxNumAdvancements: number;
  getPlayerProfile: (player: Player | null) => PlayerProfile | null;
  formatCost: (cost: number) => string;
  getPlayerValue: (player: Player | null) => number;
  getNumPlayerAdvancements: (player: Player) => number;
  setCharAdvancement: (playerNumber: number, char: Char) => void;
  setSkillAdvancement: (playerNumber: number, skill: keyof typeof skills, category: string) => void;
  renderChar: (player: Player, char: Char) => JSX.Element;
}) {
  const player = players[playerNumber - 1];
  const profile = getPlayerProfile(player);
  const isStarPlayer = profile?.position === STAR_PLAYER;

  function renderSkill(skill: keyof typeof skills, category: string): JSX.Element {
    if (profile?.skills.includes(skill)) {
      // Starting skill
      return <span className="skill-starting">{skills[skill]}</span>;
    } else if (player?.ps?.includes(skill) || player?.ss?.includes(skill)) {
      // Selected skill advancement
      return (
        <span
          className="skill-selected"
          onClick={() => setSkillAdvancement(playerNumber, skill, category)}
        >
          {skills[skill]}
        </span>
      );
    } else if (profile?.primary?.includes(category) || profile?.secondary?.includes(category)) {
      // Available skill advancement
      return (
        <span
          className="skill-available"
          onClick={() => setSkillAdvancement(playerNumber, skill, category)}
        >
          {skills[skill]}
        </span>
      );
    } else {
      // Unavailable skill
      return <span className="skill-unavailable">{skills[skill]}</span>;
    }
  }

  return (
    <div id="player-details">
      <span className="font-bold">Player {playerNumber} details</span>
      <table>
        <thead>
          <tr>
            <th className="w-50 text-left" title="Player name">
              Name
            </th>
            <th className="text-left" title="Player position">
              Position
            </th>
            <th className="w-8" title="Move Allowance">
              MA
            </th>
            <th className="w-8" title="Strength">
              ST
            </th>
            <th className="w-8" title="Agility">
              AG
            </th>
            <th className="w-8" title="Passing Ability">
              PA
            </th>
            <th className="w-10" title="Armour Value">
              AV
            </th>
            <th className="w-10" title="Primary skill access">
              P
            </th>
            <th className="w-10" title="Secondary skill access">
              S
            </th>
            <th className="w-10" title="Player level">
              Level
            </th>
            <th className="w-25" title="Current player value">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left">{player?.name || profile?.name || "-"}</td>
            <td className="text-left">
              {profile?.position}
              <div className="keywords">{profile?.keywords.join(", ")}</div>
            </td>
            <td
              className={isStarPlayer ? "" : "cursor-pointer"}
              onClick={() => !isStarPlayer && setCharAdvancement(playerNumber, "ma")}
            >
              {player && renderChar(player, "ma")}
            </td>
            <td
              className={isStarPlayer ? "" : "cursor-pointer"}
              onClick={() => !isStarPlayer && setCharAdvancement(playerNumber, "st")}
            >
              {player && renderChar(player, "st")}
            </td>
            <td
              className={isStarPlayer ? "" : "cursor-pointer"}
              onClick={() => !isStarPlayer && setCharAdvancement(playerNumber, "ag")}
            >
              {player && renderChar(player, "ag")}
            </td>
            <td
              className={isStarPlayer ? "" : "cursor-pointer"}
              onClick={() => !isStarPlayer && setCharAdvancement(playerNumber, "pa")}
            >
              {player && renderChar(player, "pa")}
            </td>
            <td
              className={isStarPlayer ? "" : "cursor-pointer"}
              onClick={() => !isStarPlayer && setCharAdvancement(playerNumber, "av")}
            >
              {player && renderChar(player, "av")}
            </td>
            <td>{profile?.primary || "-"}</td>
            <td>{profile?.secondary || "-"}</td>
            <td>
              {isStarPlayer
                ? "★"
                : (player ? getNumPlayerAdvancements(player) : 0) + "/" + maxNumAdvancements}
            </td>
            <td className="text-right">{player ? formatCost(getPlayerValue(player)) : ""}</td>
          </tr>
        </tbody>
      </table>
      <table className="skills-table">
        <thead>
          <tr>
            <th title="Agility skills">Agility</th>
            <th title="Devious skills">Devious</th>
            <th title="General skills">General</th>
            <th title="Mutation skills">Mutation</th>
            <th title="Passing skills">Passing</th>
            <th title="Strength skills">Strength</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{renderSkill("catch", "A")}</td>
            <td>{renderSkill("dirtyPlayer", "D")}</td>
            <td>{renderSkill("block", "G")}</td>
            <td>{renderSkill("bigHand", "M")}</td>
            <td>{renderSkill("accurate", "P")}</td>
            <td>{renderSkill("armBar", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("divingCatch", "A")}</td>
            <td>{renderSkill("eyeGouge", "D")}</td>
            <td>{renderSkill("dauntless", "G")}</td>
            <td>{renderSkill("claws", "M")}</td>
            <td>{renderSkill("cannoneer", "P")}</td>
            <td>{renderSkill("brawler", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("divingTackle", "A")}</td>
            <td>{renderSkill("fumblerooskie", "D")}</td>
            <td>{renderSkill("fend", "G")}</td>
            <td>{renderSkill("disturbingPresence", "M")}</td>
            <td>{renderSkill("cloudBurster", "P")}</td>
            <td>{renderSkill("breakTackle", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("dodge", "A")}</td>
            <td>{renderSkill("lethalFlight", "D")}</td>
            <td>{renderSkill("frenzy", "G")}</td>
            <td>{renderSkill("extraArms", "M")}</td>
            <td>{renderSkill("dumpOff", "P")}</td>
            <td>{renderSkill("bullseye", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("defensive", "A")}</td>
            <td>{renderSkill("loneFouler", "D")}</td>
            <td>{renderSkill("kick", "G")}</td>
            <td>{renderSkill("foulAppearance", "M")}</td>
            <td>{renderSkill("giveAndGo", "P")}</td>
            <td>{renderSkill("grab", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("hitAndRun", "A")}</td>
            <td>{renderSkill("pileDriver", "D")}</td>
            <td>{renderSkill("pro", "G")}</td>
            <td>{renderSkill("horns", "M")}</td>
            <td>{renderSkill("hailMaryPass", "P")}</td>
            <td>{renderSkill("guard", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("jumpUp", "A")}</td>
            <td>{renderSkill("putTheBootIn", "D")}</td>
            <td>{renderSkill("steadyFooting", "G")}</td>
            <td>{renderSkill("ironHardSkin", "M")}</td>
            <td>{renderSkill("leader", "P")}</td>
            <td>{renderSkill("juggernaut", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("leap", "A")}</td>
            <td>{renderSkill("quickFoul", "D")}</td>
            <td>{renderSkill("stripBall", "G")}</td>
            <td>{renderSkill("monstrousMouth", "M")}</td>
            <td>{renderSkill("nervesOfSteel", "P")}</td>
            <td>{renderSkill("mightyBlow", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("safePairOfHands", "A")}</td>
            <td>{renderSkill("saboteur", "D")}</td>
            <td>{renderSkill("sureHands", "G")}</td>
            <td>{renderSkill("prehensileTail", "M")}</td>
            <td>{renderSkill("onTheBall", "P")}</td>
            <td>{renderSkill("multipleBlock", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("sidestep", "A")}</td>
            <td>{renderSkill("shadowing", "D")}</td>
            <td>{renderSkill("tackle", "G")}</td>
            <td>{renderSkill("tentacles", "M")}</td>
            <td>{renderSkill("pass", "P")}</td>
            <td>{renderSkill("standFirm", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("sprint", "A")}</td>
            <td>{renderSkill("sneakyGit", "D")}</td>
            <td>{renderSkill("taunt", "G")}</td>
            <td>{renderSkill("twoHeads", "M")}</td>
            <td>{renderSkill("punt", "P")}</td>
            <td>{renderSkill("strongArm", "S")}</td>
          </tr>
          <tr>
            <td>{renderSkill("sureFeet", "A")}</td>
            <td>{renderSkill("violentInnovator", "D")}</td>
            <td>{renderSkill("wrestle", "G")}</td>
            <td>{renderSkill("veryLongLegs", "M")}</td>
            <td>{renderSkill("safePass", "P")}</td>
            <td>{renderSkill("thickSkull", "S")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PlayerDetails;
