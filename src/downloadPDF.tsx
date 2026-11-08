import { pdf } from "@react-pdf/renderer";

import type { AvailableInducement, Player, PlayerProfile, TeamState } from "./data";
import TeamDocument from "./TeamDocument";

export async function downloadPDF(
  team: TeamState,
  costOfReRolls: number,
  costOfAssistantCoaches: number,
  costOfCheerleaders: number,
  costOfDedicatedFans: number,
  costOfApothecary: number,
  treasury: number,
  teamValue: number,
  availableInducements: AvailableInducement[],
  getPlayerProfile: (player: Player | null) => PlayerProfile | null,
  getPlayerValue: (player: Player | null) => number,
  formatCost: (cost: number) => string,
) {
  const blob = await pdf(
    <TeamDocument
      team={team}
      costOfReRolls={costOfReRolls}
      costOfAssistantCoaches={costOfAssistantCoaches}
      costOfCheerleaders={costOfCheerleaders}
      costOfDedicatedFans={costOfDedicatedFans}
      costOfApothecary={costOfApothecary}
      treasury={treasury}
      teamValue={teamValue}
      availableInducements={availableInducements}
      getPlayerProfile={getPlayerProfile}
      getPlayerValue={getPlayerValue}
      formatCost={formatCost}
    />,
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "team.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
