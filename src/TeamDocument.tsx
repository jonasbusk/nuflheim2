import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import {
  type AvailableInducement,
  type Char,
  type Player,
  type PlayerProfile,
  type Roster,
  type TeamState,
  inducements,
  rosters,
  skills,
} from "./data";

const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontSize: 9,
  },
  title: {
    fontSize: 16,
    fontStyle: "italic",
  },
  fontSmall: {
    fontSize: 7,
  },
  // Layout
  container: {
    width: "100%",
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    border: "1pt solid #000",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    width: "100%",
    flexDirection: "column",
    marginRight: 5,
    padding: 5,
    border: "1pt solid #000",
  },
  // Table
  table: {},
  tableHead: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
  tableBody: {},
  tableRow: {
    flexDirection: "row",
  },
  borderBottom: {
    borderBottom: "1pt solid #000",
  },
  borderBottomLight: {
    borderBottom: "1pt solid #eee",
  },
  tableData: {
    padding: 2,
  },
  // Team tables
  tt1c1: {
    width: "30%",
    fontWeight: "bold",
  },
  tt1c2: {
    width: "70%",
    textAlign: "left",
  },
  tt2c1: {
    width: "40%",
    fontWeight: "bold",
  },
  tt2c2: {
    width: "5%",
    textAlign: "right",
  },
  tt2c3: {
    width: "5%",
    textAlign: "center",
  },
  tt2c4: {
    width: "25%",
    textAlign: "right",
  },
  tt2c5: {
    width: "25%",
    textAlign: "right",
  },
  tt3c1: {
    width: "30%",
    fontWeight: "bold",
  },
  tt3c2: {
    width: "70%",
    textAlign: "right",
  },
  // Player table
  playerNumber: {
    width: ".5cm",
    textAlign: "center",
    fontStyle: "italic",
  },
  playerName: {
    width: "5cm",
    paddingLeft: 4,
  },
  playerPosition: {
    width: "4.5cm",
  },
  playerKeywords: {
    width: "2.5cm",
  },
  playerChar: {
    width: ".7cm",
    textAlign: "center",
  },
  playerSkills: {
    width: "10cm",
    paddingLeft: 4,
  },
  playerValue: {
    width: "2.5cm",
    textAlign: "right",
  },
  // Inducements
  inducement1: {
    width: "55%",
    textAlign: "left",
  },
  inducement2: {
    width: "5%",
    textAlign: "right",
  },
  inducement3: {
    width: "6%",
    textAlign: "center",
  },
  inducement4: {
    width: "17%",
    textAlign: "right",
  },
  inducement5: {
    width: "17%",
    textAlign: "right",
  },
  // Misc
  italic: {
    fontStyle: "italic",
  },
});

function renderPosition(profile: PlayerProfile | null): string {
  // TODO: Render keywords
  return profile?.position || "";
}

function renderChar(player: Player, profile: PlayerProfile, char: Char): string {
  let ticks = "";
  ticks = player[char] === 1 ? "'" : ticks;
  ticks = player[char] === 2 ? '"' : ticks;
  if (char === "ma") {
    return profile.ma + (player.ma || 0) + ticks;
  } else if (char === "st") {
    return profile.st + (player.st || 0) + ticks;
  } else if (char === "ag") {
    return profile.ag - (player.ag || 0) + "+" + ticks;
  } else if (char === "pa") {
    return profile.pa ? profile.pa - (player.pa || 0) + "+" + ticks : "-";
  } else if (char === "av") {
    return profile.av + (player.av || 0) + "+" + ticks;
  }
  return "";
}

/** Replace regular spaces with non-breaking spaces. */
function noWrap(text: string): string {
  return text.replace(/ /g, "\u00A0");
}

/** Disable hyphenation so words are never split across lines. */
function noHyphenation(word: string): string[] {
  return [word];
}

function renderKeywords(profile: PlayerProfile): React.ReactNode {
  const keywords = profile.keywords.map((k) => noWrap(k)).join(", ");
  return keywords;
}

function renderSkills(player: Player, profile: PlayerProfile): React.ReactNode {
  // react-pdf treats the boundary between two <Text> element as a hyphenation point,
  // so keep each skill and comma in the same element to prevent bad hyphenation.
  const skills_list = [
    // Starting skills
    ...profile.skills.map((s) => skills[s]),
    // Primary skill advancements
    ...(player.ps?.map((s) => skills[s] + "'") || []),
    // Secondary skill advancements
    ...(player.ss?.map((s) => skills[s] + '"') || []),
  ];
  const skills_string = skills_list.map(noWrap).join(", ");
  // Add special rule (italic) to the list if present
  if (profile?.specialRule) {
    return (
      <>
        {skills_string ? skills_string + ", " : ""}
        <Text style={styles.italic}>{noWrap(profile.specialRule)}</Text>
      </>
    );
  }
  return skills_string;
}

function renderInducements(
  team: TeamState,
  availableInducements: AvailableInducement[],
  formatCost: (cost: number) => string,
): React.ReactNode {
  if (Object.keys(team.inducements).length > 0) {
    return (
      <>
        <View style={styles.column}>
          <View style={styles.table}>
            {availableInducements.map((i) => {
              if (i.key in team.inducements) {
                return (
                  <View style={styles.tableBody}>
                    <View style={[styles.tableRow, styles.borderBottomLight]}>
                      <Text style={[styles.tableData, styles.inducement1]}>
                        {inducements[i.key]}
                      </Text>
                      <Text style={[styles.tableData, styles.inducement2]}>
                        {team.inducements[i.key]}
                      </Text>
                      <Text style={[styles.tableData, styles.inducement3]}>x</Text>
                      <Text style={[styles.tableData, styles.inducement4]}>
                        {formatCost(i.cost)}
                      </Text>
                      <Text style={[styles.tableData, styles.inducement5]}>
                        {formatCost(team.inducements[i.key] * i.cost)}
                      </Text>
                    </View>
                  </View>
                );
              }
            })}
          </View>
        </View>
        <View style={styles.column}></View>
      </>
    );
  } else {
    return null;
  }
}

function TeamDocument({
  team,
  costOfReRolls,
  costOfAssistantCoaches,
  costOfCheerleaders,
  costOfDedicatedFans,
  costOfApothecary,
  treasury,
  teamValue,
  availableInducements,
  getPlayerProfile,
  getPlayerValue,
  formatCost,
}: {
  team: TeamState;
  costOfReRolls: number;
  costOfAssistantCoaches: number;
  costOfCheerleaders: number;
  costOfDedicatedFans: number;
  costOfApothecary: number;
  treasury: number;
  teamValue: number;
  availableInducements: AvailableInducement[];
  getPlayerProfile: (player: Player | null) => PlayerProfile | null;
  getPlayerValue: (player: Player | null) => number;
  formatCost: (cost: number) => string;
}) {
  const roster = rosters.find((r) => r.key === team.roster) as Roster;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.title}>Nuflheim Team Draft List</Text>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.table}>
                <View style={styles.tableBody}>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt1c1]}>Team Name:</Text>
                    <Text style={[styles.tableData, styles.tt1c2]}>{team.name}</Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt1c1]}>Coach:</Text>
                    <Text style={[styles.tableData, styles.tt1c2]}>{team.coach}</Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt1c1]}>Roster:</Text>
                    <Text style={[styles.tableData, styles.tt1c2]}>{roster.name}</Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt1c1]}>League:</Text>
                    <Text style={[styles.tableData, styles.tt1c2]}>
                      {roster.leagues[team.league - 1]}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt1c1]}>Favoured of:</Text>
                    <Text style={[styles.tableData, styles.tt1c2]}>
                      {team.favouredOf ? roster.favouredOf[team.favouredOf - 1] : ""}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.table}>
                <View style={styles.tableBody}>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt2c1]}>Team Re-Rolls:</Text>
                    <Text style={[styles.tableData, styles.tt2c2]}>{team.reRolls}</Text>
                    <Text style={[styles.tableData, styles.tt2c3]}>x</Text>
                    <Text style={[styles.tableData, styles.tt2c4]}>
                      {formatCost(costOfReRolls)}
                    </Text>
                    <Text style={[styles.tableData, styles.tt2c5]}>
                      {formatCost(team.reRolls * costOfReRolls)}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt2c1]}>Assistant Coaches:</Text>
                    <Text style={[styles.tableData, styles.tt2c2]}>{team.assistantCoaches}</Text>
                    <Text style={[styles.tableData, styles.tt2c3]}>x</Text>
                    <Text style={[styles.tableData, styles.tt2c4]}>
                      {formatCost(costOfAssistantCoaches)}
                    </Text>
                    <Text style={[styles.tableData, styles.tt2c5]}>
                      {formatCost(team.assistantCoaches * costOfAssistantCoaches)}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt2c1]}>Cheerleaders:</Text>
                    <Text style={[styles.tableData, styles.tt2c2]}>{team.cheerleaders}</Text>
                    <Text style={[styles.tableData, styles.tt2c3]}>x</Text>
                    <Text style={[styles.tableData, styles.tt2c4]}>
                      {formatCost(costOfCheerleaders)}
                    </Text>
                    <Text style={[styles.tableData, styles.tt2c5]}>
                      {formatCost(team.cheerleaders * costOfCheerleaders)}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt2c1]}>Dedicated Fans:</Text>
                    <Text style={[styles.tableData, styles.tt2c2]}>{team.dedicatedFans}</Text>
                    <Text style={[styles.tableData, styles.tt2c3]}>x</Text>
                    <Text style={[styles.tableData, styles.tt2c4]}>
                      {formatCost(costOfDedicatedFans)}
                    </Text>
                    <Text style={[styles.tableData, styles.tt2c5]}>
                      {formatCost(team.dedicatedFans * costOfDedicatedFans)}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt2c1]}>Apothecary:</Text>
                    <Text style={[styles.tableData, styles.tt2c2]}>{team.apothecary}</Text>
                    <Text style={[styles.tableData, styles.tt2c3]}>x</Text>
                    <Text style={[styles.tableData, styles.tt2c4]}>
                      {formatCost(costOfApothecary)}
                    </Text>
                    <Text style={[styles.tableData, styles.tt2c5]}>
                      {formatCost(team.apothecary * costOfApothecary)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.table}>
                <View style={styles.tableBody}>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt3c1]}>Treasury:</Text>
                    <Text style={[styles.tableData, styles.tt3c2]}>{formatCost(treasury)}</Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt3c1]}>Team Value:</Text>
                    <Text style={[styles.tableData, styles.tt3c2]}>{formatCost(teamValue)}</Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt3c1]}>Special rules:</Text>
                    <Text style={[styles.tableData, styles.tt3c2]}>
                      {roster.specialRules.length > 0 ? roster.specialRules[0] : ""}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt3c1]}> </Text>
                    <Text style={[styles.tableData, styles.tt3c2]}>
                      {roster.specialRules.length > 1 ? roster.specialRules[1] : ""}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.borderBottomLight]}>
                    <Text style={[styles.tableData, styles.tt3c1]}> </Text>
                    <Text style={[styles.tableData, styles.tt3c2]}>
                      {roster.specialRules.length > 2 ? roster.specialRules[2] : ""}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.table}>
                <View style={styles.tableHead}>
                  <View style={[styles.tableRow, styles.borderBottom]} key={0}>
                    <Text style={[styles.tableData, styles.playerNumber]}></Text>
                    <Text style={[styles.tableData, styles.playerName]}>Name</Text>
                    <Text style={[styles.tableData, styles.playerPosition]}>Position</Text>
                    <Text style={[styles.tableData, styles.playerKeywords]}>Keywords</Text>
                    <Text style={[styles.tableData, styles.playerChar]}>MA</Text>
                    <Text style={[styles.tableData, styles.playerChar]}>ST</Text>
                    <Text style={[styles.tableData, styles.playerChar]}>AG</Text>
                    <Text style={[styles.tableData, styles.playerChar]}>PA</Text>
                    <Text style={[styles.tableData, styles.playerChar]}>AV</Text>
                    <Text style={[styles.tableData, styles.playerSkills]}>Skills & Traits</Text>
                    <Text style={[styles.tableData, styles.playerValue]}>Value</Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  {team.players.map((player, i) => {
                    const playerNumber = i + 1;
                    const profile = getPlayerProfile(player);
                    return (
                      <View style={[styles.tableRow, styles.borderBottomLight]} key={playerNumber}>
                        <Text style={[styles.tableData, styles.playerNumber]}>{playerNumber}</Text>
                        <Text style={[styles.tableData, styles.playerName]}>
                          {player?.name || profile?.name || ""}
                        </Text>
                        <Text style={[styles.tableData, styles.playerPosition]}>
                          {renderPosition(profile)}
                        </Text>
                        <Text
                          style={[styles.tableData, styles.playerKeywords, styles.fontSmall]}
                          hyphenationCallback={noHyphenation}
                        >
                          {player && profile && renderKeywords(profile)}
                        </Text>
                        <Text style={[styles.tableData, styles.playerChar]}>
                          {player && profile && renderChar(player, profile, "ma")}
                        </Text>
                        <Text style={[styles.tableData, styles.playerChar]}>
                          {player && profile && renderChar(player, profile, "st")}
                        </Text>
                        <Text style={[styles.tableData, styles.playerChar]}>
                          {player && profile && renderChar(player, profile, "ag")}
                        </Text>
                        <Text style={[styles.tableData, styles.playerChar]}>
                          {player && profile && renderChar(player, profile, "pa")}
                        </Text>
                        <Text style={[styles.tableData, styles.playerChar]}>
                          {player && profile && renderChar(player, profile, "av")}
                        </Text>
                        <Text
                          style={[styles.tableData, styles.playerSkills]}
                          hyphenationCallback={noHyphenation}
                        >
                          {player && profile && renderSkills(player, profile)}
                        </Text>
                        <Text style={[styles.tableData, styles.playerValue]}>
                          {player && formatCost(getPlayerValue(player))}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            {renderInducements(team, availableInducements, formatCost)}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default TeamDocument;
