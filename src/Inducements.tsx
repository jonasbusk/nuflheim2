import { Input } from "@/components/ui/input";

import { type AvailableInducement, inducements } from "./data";

function Inducements({
  teamInducements,
  availableInducements,
  setInducement,
  formatCost,
}: {
  teamInducements: Record<keyof typeof inducements, number>;
  availableInducements: AvailableInducement[];
  setInducement: (key: string, value: number) => void;
  formatCost: (cost: number) => string;
}) {
  //   function renderTeamInducementsTableRow(inducement: Inducement) {
  //     if (inducement.key in teamInducements) {
  //       return (
  //         <tr key={inducement.key}>
  //           <td>{inducementNames[inducement.key]}</td>
  //           <td>{teamInducements[inducement.key]}</td>
  //           <td>x</td>
  //           <td>{formatCost(inducement.cost)}</td>
  //           <td>{formatCost(teamInducements[inducement.key] * inducement.cost)}</td>
  //         </tr>
  //       );
  //     }
  //   }

  function renderAvailableInducementsTableRow(inducement: AvailableInducement) {
    return (
      <tr key={inducement.key}>
        <td>
          {inducements[inducement.key]} (0-{inducement.max}):
        </td>
        <td>
          <Input
            type="number"
            value={teamInducements[inducement.key] || 0}
            onChange={(e) =>
              setInducement(
                inducement.key,
                Math.min(Math.max(parseInt(e.target.value) || 0, 0), inducement.max),
              )
            }
          />
        </td>
        <td>x</td>
        <td>{formatCost(inducement.cost)}</td>
        <td>{formatCost((teamInducements[inducement.key] || 0) * inducement.cost)}</td>
      </tr>
    );
  }

  return (
    <div className="inducements">
      <table id="available-inducements-table">
        <thead>
          <tr>
            <th className="text-left">Inducements:</th>
          </tr>
        </thead>
        <tbody>
          {availableInducements.map((i) => {
            return renderAvailableInducementsTableRow(i);
          })}
        </tbody>
      </table>
      {/* <table id="team-inducements-table">
        <tbody>
          {availableInducements.map((i) => {
            return renderTeamInducementsTableRow(i);
          })}
        </tbody>
      </table> */}
    </div>
  );
}

export default Inducements;
