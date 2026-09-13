import { type JSX } from "react";

import { type Player, type PlayerProfile, skills } from "./data";

function PlayerDetails({
  players,
  showPlayerNumber: playerNumber,
  getPlayerProfile,
  formatCost,
  getPlayerValue,
  setPlayerAdvancement,
}: {
  players: (Player | null)[];
  showPlayerNumber: number;
  getPlayerProfile: (player: Player | null) => PlayerProfile | null;
  formatCost: (cost: number) => string;
  getPlayerValue: (player: Player | null) => number;
  setPlayerAdvancement: (playerNumber: number, advancement: string) => void;
}) {
  const player = players[playerNumber - 1];
  const profile = getPlayerProfile(player);
  // const isStarPlayer = profile?.position === STAR_PLAYER;

  function renderSkill(skill: keyof typeof skills, category: string): JSX.Element {
    // TODO: Create lookup for skill category.
    if (profile?.skills.includes(skills[skill] as string)) {
      return <span className="font-bold">{skills[skill] as string}</span>;
    } else if (!profile?.primary?.includes(category) && !profile?.secondary?.includes(category)) {
      return <span className="text-gray-400">{skills[skill] as string}</span>;
    } else {
      return (
        <span onClick={() => setPlayerAdvancement(playerNumber, skill)}>
          {skills[skill] as string}
        </span>
      );
    }
  }

  return (
    <div id="player-details">
      <span className="font-bold">Player {playerNumber} details</span>
      <table>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Position</th>
            <th>MA</th>
            <th>ST</th>
            <th>AG</th>
            <th>PA</th>
            <th>AV</th>
            <th>Primary</th>
            <th>Secondary</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left">{player?.name || profile?.name || "-"}</td>
            <td className="text-left">
              {profile?.position}
              <div className="keywords">{profile?.keywords.join(", ")}</div>
            </td>
            <td>{profile?.ma}</td>
            <td>{profile?.st}</td>
            <td>{profile ? profile.ag + "+" : ""}</td>
            <td>{profile ? (profile.pa ? profile.pa + "+" : "-") : ""}</td>
            <td>{profile ? profile.av + "+" : ""}</td>
            <td>{profile?.primary || "-"}</td>
            <td>{profile?.secondary || "-"}</td>
            <td>{player ? formatCost(getPlayerValue(player)) : ""}</td>
          </tr>
        </tbody>
      </table>
      <table className="skills-table">
        <thead>
          <tr>
            <th>Agility</th>
            <th>Devious</th>
            <th>General</th>
            <th>Mutation</th>
            <th>Passing</th>
            <th>Strength</th>
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
