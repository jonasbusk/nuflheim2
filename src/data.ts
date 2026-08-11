// Types

/** The overall state of a team draft list. */
// Note: Should be as small as possible
export interface TeamState {
  name: string; // Team name
  coach: string; // Coach name
  roster: string; // Key to the selected roster
  league: number; // Key to the selected league in the roster
  favouredOf?: number; // Key to the selected alignment in the roster
  players: (Player | null)[]; // Array of players, null if the player slot is empty
  budget: number; // Team Draft Budget
  reRolls: number; // Number of re-rolls
  assistantCoaches: number; // Number of assistant coaches
  cheerleaders: number; // Number of cheerleaders
  apothecary: number; // Whether the team has an apothecary
  dedicatedFans: number; // Number of dedicated fans
}

/** A player in the team draft list.
 *
 * Base characteristics are stored in a player profile.
 * The player object only stores indiviudal modifiers.
 */
// Note: Should be as small as possible
export interface Player {
  key: string; // Key to the player profile
  name?: string; // Player name
}

/** A team roster. */
export interface Roster {
  key: string; // Unique key of the roster, used for lookup
  name: string; // Roster name
  leagues: string[]; // Array of league options
  specialRules: string[]; // Array of special rules
  favouredOf: string[]; // Favoured of special rule options
  playerProfiles: PlayerProfile[]; // Array of player profiles
  costOfReRolls: number; // Cost of re-rolls
  apothecaryAllowed: boolean; // Whether apothecary is allowed
}

/** Base characteristics of a normal player or star player. */
export interface PlayerProfile {
  key: string; // Unique key of the player profile, used for lookup
  position: string;
  keywords: string[];
  cost: number;
  ma: number;
  st: number;
  ag: number;
  pa?: number;
  av: number;
  skills: string[];
  // Normal players
  primary?: string; // Primary skill access
  secondary?: string; // Secondary skill access
  qty?: number; // Allowed quantity
  // Star players
  name?: string;
  playsFor?: string[]; // List of leagues and special rules the star player plays for
  specialRule?: string; // Star player special rule
}

// Constants

/** A constant used to indicate a star player plays for any team. */
export const ANY_TEAM: string = "Any Team";
/** A constant used as position in star player profiles. */
export const STAR_PLAYER: string = "Star Player";

// Data

/** Player keywords. */
const keywords = {
  animal: "Animal",
  beastman: "Beastman",
  bigGuy: "Big Guy",
  blocker: "Blocker",
  blitzer: "Blitzer",
  catcher: "Catcher",
  construct: "Construct",
  dwarf: "Dwarf",
  elf: "Elf",
  ghoul: "Ghoul",
  gnoblar: "Gnoblar",
  gnome: "Gnome",
  goblin: "Goblin",
  halfling: "Halfling",
  human: "Human",
  lineman: "Lineman",
  lizardman: "Lizardman",
  minotaur: "Minotaur",
  ogre: "Ogre",
  orc: "Orc",
  runner: "Runner",
  skaven: "Skaven",
  skeleton: "Skeleton",
  snotling: "Snotling",
  spawn: "Spawn",
  special: "Special",
  thrall: "Thrall",
  thrower: "Thrower",
  treeman: "Treeman",
  troll: "Troll",
  undead: "Undead",
  vampire: "Vampire",
  werewolf: "Werewolf",
  wraith: "Wraith",
  yhetee: "Yhetee",
  zombie: "Zombie",
};

/** Player skills and traits. */
const skills = {
  // Agility
  catch: "Catch",
  divingCatch: "Diving Catch",
  divingTackle: "Diving Tackle",
  dodge: "Dodge",
  defensive: "Defensive",
  hitAndRun: "Hit and Run",
  jumpUp: "Jump Up",
  leap: "Leap",
  safePairOfHands: "Safe Pair of Hands",
  sideStep: "Side Step",
  sprint: "Sprint",
  sureFeet: "Sure Feet",
  // Devious
  dirtyPlayer: "Dirty Player",
  eyeGaouge: "Eye Gaouge",
  fumblerooskie: "Fumblerooskie",
  lethalFlight: "Lethal Flight",
  loneFouler: "Lone Fouler",
  pileDriver: "Pile Driver",
  putTheBootIn: "Put the Boot In",
  quickFoul: "Quick Foul",
  saboteur: "Saboteur",
  shadowing: "Shadowing",
  sneakyGit: "Sneaky Git",
  violentInnovator: "Violent Innovator",
  // General
  block: "Block",
  dauntless: "Dauntless",
  fend: "Fend",
  frenzy: "Frenzy",
  kick: "Kick",
  pro: "Pro",
  steadyFooting: "Steady Footing",
  stripBall: "Strip Ball",
  sureHands: "Sure Hands",
  tackle: "Tackle",
  taunt: "Taunt",
  wrestle: "Wrestle",
  // Mutation
  bigHand: "Big Hand",
  claws: "Claws",
  disturbingPresence: "Disturbing Presence",
  extraArms: "Extra Arms",
  foulAppearance: "Foul Appearance",
  horns: "Horns",
  ironHardSkin: "Iron Hard Skin",
  monstrousMouth: "Monstrous Mouth",
  prehensileTail: "Prehensile Tail",
  tentacles: "Tentacles",
  twoHeads: "Two Heads",
  veryLongLegs: "Very Long Legs",
  // Passing
  accurate: "Accurate",
  cannoneer: "Cannoneer",
  cloudBurster: "Cloud Burster",
  dumpOff: "Dump-off",
  giveAndGo: "Give and Go",
  hailMaryPass: "Hail Mary Pass",
  leader: "Leader",
  nervesOfSteel: "Nerves of Steel",
  onTheBall: "On the Ball",
  pass: "Pass",
  punt: "Punt",
  safePass: "Safe Pass",
  // Strength
  armBar: "Arm Bar",
  brawler: "Brawler",
  breakTackle: "Break Tackle",
  bullseye: "Bullseye",
  grab: "Grab",
  guard: "Guard",
  juggernaut: "Juggernaut",
  mightyBlow: "Mighty Blow",
  multipleBlock: "Multiple Block",
  standFirm: "Stand Firm",
  strongArm: "Strong Arm",
  thickSkull: "Thick Skull",
  // Traits
  alwaysHungry: "Always Hungry",
  animalSavagery: "Animal Savagery",
  animosity: (x: string) => "Animosity (" + x + ")",
  ballAndChain: "Ball & Chain",
  bloodlust: (x: number) => "Bloodlust (" + x + "+)",
  bombardier: "Bombardier",
  boneHead: "Bone Head",
  breatheFire: "Breathe Fire",
  chainsaw: "Chainsaw",
  decay: "Decay",
  drunkard: "Drunkard",
  hatred: (x: string) => "Hatred (" + x + ")",
  hypnoticGaze: "Hypnotic Gaze",
  insignificant: "Insignificant",
  kickTeamMate: "Kick Team Mate",
  loner: (x: number) => "Loner (" + x + "+)",
  myBall: "My Ball",
  noBall: "No Ball",
  pickMeUp: "Pick-me-up",
  plagueRidden: "Plague Ridden",
  pogo: "Pogo",
  projectileVomit: "Projectile Vomit",
  reallyStupid: "Really Stupid",
  regeneration: "Regeneration",
  rightStuff: "Right Stuff",
  secretWeapon: "Secret Weapon",
  stab: "Stab",
  stunty: "Stunty",
  swoop: "Swoop",
  takeRoot: "Take Root",
  throwTeamMate: "Throw Team-mate",
  timmmber: "Timmm-ber!",
  titchy: "Titchy",
  trickster: "Trickster",
  unchannelledFury: "Unchannelled Fury",
  unsteady: "Unsteady",
};

/** Roster leagues. */
const leagues = {
  badlandsBrawl: "Badlands Brawl",
  chaosClash: "Chaos Clash",
  elvenKingdomsLeague: "Elven Kingdoms League",
  halflingThimbleCup: "Halfling Thimble Cup",
  lustrianSuperleague: "Lustrian Superleague",
  oldWorldClassic: "Old World Classic",
  sylvanianSpotlight: "Sylvanian Spotlight",
  underworldChallenge: "Underworld Challenge",
  woodlandLeague: "Woodland League",
  worldsEdgeSuperleague: "Worlds Edge Superleague",
};

/** Roster special rules. */
const specialRules = {
  brawlinBrutes: "Brawlin' Brutes",
  briberyAndCorruption: "Bribery and Corruption",
  lowCostLinemen: "Low Cost Linemen",
  mastersOfUndeath: "Masters of Undeath",
  swarming: "Swarming",
  teamCaptain: "Team Captain",
};

/** Roster special rule "Favoured of..." */
const favouredOf = {
  hashut: "Hashut",
  khorne: "Khorne",
  nurgle: "Nurgle",
  slaanesh: "Slaanesh",
  tzeentch: "Tzeentch",
  undivided: "Undivided",
};

/** All available rosters. */
export const rosters: Roster[] = [
  {
    key: "amazon",
    name: "Amazon",
    leagues: [leagues.lustrianSuperleague],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Eagle Warrior", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.dodge], primary: "G", secondary: "AS", qty: 16 },
      { key: "b", position: "Python Warrior", keywords: [keywords.human, keywords.thrower], cost: 80_000, ma: 6, st: 3, ag: 3, pa: 3, av: 8, skills: [skills.dodge, skills.onTheBall, skills.pass, skills.safePass], primary: "GP", secondary: "AS", qty: 2 },
      { key: "c", position: "Piranha Warrior", keywords: [keywords.blitzer, keywords.human], cost: 90_000, ma: 7, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.dodge, skills.hitAndRun, skills.jumpUp], primary: "GA", secondary: "S", qty: 2 },
      { key: "d", position: "Jaguar Warrior", keywords: [keywords.blocker, keywords.human], cost: 110_000, ma: 6, st: 4, ag: 3, pa: 4, av: 9, skills: [skills.defensive, skills.dodge], primary: "GS", secondary: "A", qty: 2 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "black-orc",
    name: "Black Orc",
    leagues: [leagues.badlandsBrawl],
    specialRules: [specialRules.brawlinBrutes, specialRules.briberyAndCorruption],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Goblin Bruiser", keywords: [keywords.goblin, keywords.lineman], cost: 45_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.dodge, skills.rightStuff, skills.stunty, skills.thickSkull], primary: "AD", secondary: "GPS", qty: 16 },
      { key: "b", position: "Black Orc", keywords: [keywords.blocker, keywords.orc], cost: 90_000, ma: 4, st: 4, ag: 4, pa: 5, av: 10, skills: [skills.brawler, skills.grab], primary: "GS", secondary: "AD", qty: 6 },
      { key: "c", position: "Trained Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: [skills.alwaysHungry, skills.mightyBlow, skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], primary: "S", secondary: "AGP", qty: 1 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "bretonnian",
    name: "Bretonnian",
    leagues: [leagues.oldWorldClassic],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Bretonnian Squire", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.wrestle], primary: "G", secondary: "AS", qty: 16 },
      { key: "b", position: "Bretonnian Knight Catcher", keywords: [keywords.catcher, keywords.human], cost: 85_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.catch, skills.dauntless, skills.nervesOfSteel], primary: "AG", secondary: "S", qty: 2 },
      { key: "c", position: "Bretonnian Knight Thrower", keywords: [keywords.human, keywords.thrower], cost: 80_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: [skills.dauntless, skills.nervesOfSteel, skills.pass], primary: "GP", secondary: "AS", qty: 2 },
      { key: "d", position: "Grail Knight", keywords: [keywords.blitzer, keywords.human], cost: 95_000, ma: 7, st: 3, ag: 3, pa: 4, av: 10, skills: [skills.block, skills.dauntless, skills.steadyFooting], primary: "GS", secondary: "A", qty: 2 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "chaos-chosen",
    name: "Chaos Chosen",
    leagues: [leagues.chaosClash],
    specialRules: [],
    favouredOf: [favouredOf.undivided, favouredOf.tzeentch, favouredOf.slaanesh, favouredOf.nurgle, favouredOf.khorne, favouredOf.hashut],
    playerProfiles: [
      { key: "a", position: "Beastman Lineman", keywords: [keywords.beastman, keywords.lineman], cost: 55_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: [skills.horns, skills.thickSkull], primary: "GM", secondary: "ADPS", qty: 16 },
      { key: "b", position: "Chaos Chosen", keywords: [keywords.blocker, keywords.human], cost: 100_000, ma: 5, st: 4, ag: 3, pa: 5, av: 10, skills: [skills.armBar], primary: "GMS", secondary: "AD", qty: 4 },
      { key: "c", position: "Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: [skills.alwaysHungry, skills.loner(4), skills.mightyBlow, skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], primary: "MS", secondary: "AGP", qty: 1 },
      { key: "d", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: [skills.boneHead, skills.loner(4), skills.mightyBlow, skills.thickSkull, skills.throwTeamMate], primary: "MS", secondary: "AG", qty: 1 },
      { key: "e", position: "Minotaur", keywords: [keywords.bigGuy, keywords.minotaur], cost: 150_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: [skills.frenzy, skills.horns, skills.loner(4), skills.mightyBlow, skills.thickSkull, skills.unchannelledFury], primary: "MS", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
  {
    key: "chaos-dwarf",
    name: "Chaos Dwarf",
    leagues: [leagues.badlandsBrawl, leagues.chaosClash],
    specialRules: [],
    favouredOf: [favouredOf.hashut],
    playerProfiles: [
      { key: "a", position: "Hobgoblin Lineman", keywords: [keywords.goblin, keywords.lineman], cost: 40_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: [], primary: "D", secondary: "AGS", qty: 16 },
      { key: "b", position: "Sneaky Stabba", keywords: [keywords.goblin, keywords.special], cost: 60_000, ma: 6, st: 3, ag: 3, pa: 5, av: 8, skills: [skills.shadowing, skills.stab], primary: "DG", secondary: "AS", qty: 2 },
      { key: "c", position: "Chaos Dwarf Blocker", keywords: [keywords.blocker, keywords.dwarf], cost: 70_000, ma: 4, st: 3, ag: 4, pa: 6, av: 10, skills: [skills.block, skills.ironHardSkin, skills.thickSkull], primary: "GS", secondary: "ADM", qty: 4 },
      { key: "d", position: "Flamesmith", keywords: [keywords.dwarf, keywords.special], cost: 80_000, ma: 5, st: 3, ag: 4, pa: 6, av: 10, skills: [skills.brawler, skills.breatheFire, skills.disturbingPresence, skills.thickSkull], primary: "GS", secondary: "ADM", qty: 2 },
      { key: "e", position: "Bull Centaur", keywords: [keywords.blitzer, keywords.dwarf], cost: 130_000, ma: 6, st: 4, ag: 4, pa: 6, av: 10, skills: [skills.sprint, skills.sureFeet, skills.thickSkull, skills.unsteady], primary: "GS", secondary: "ADM", qty: 2 },
      { key: "f", position: "Minotaur", keywords: [keywords.bigGuy, keywords.minotaur], cost: 150_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: [skills.frenzy, skills.horns, skills.loner(4), skills.mightyBlow, skills.thickSkull, skills.unchannelledFury], primary: "MS", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 70_000,
    apothecaryAllowed: true,
  },
  {
    key: "chaos-renegade",
    name: "Chaos Renegade",
    leagues: [leagues.chaosClash],
    specialRules: [],
    favouredOf: [favouredOf.undivided, favouredOf.tzeentch, favouredOf.slaanesh, favouredOf.nurgle, favouredOf.khorne],
    playerProfiles: [
      { key: "a", position: "Renegade Human", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.animosity("all")], primary: "DGM", secondary: "AS", qty: 16 },
      { key: "b", position: "Renegade Goblin", keywords: [keywords.goblin, keywords.lineman], cost: 40_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.animosity("all"), skills.dodge, skills.rightStuff, skills.stunty], primary: "ADM", secondary: "GP", qty: 1 },
      { key: "c", position: "Renegade Orc", keywords: [keywords.lineman, keywords.orc], cost: 50_000, ma: 5, st: 3, ag: 3, pa: 4, av: 10, skills: [skills.animosity("all")], primary: "DGM", secondary: "AS", qty: 1 },
      { key: "d", position: "Renegade Skaven", keywords: [keywords.lineman, keywords.skaven], cost: 50_000, ma: 7, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.animosity("all")], primary: "DGM", secondary: "AS", qty: 1 },
      { key: "e", position: "Renegade Dark Elf", keywords: [keywords.elf, keywords.lineman], cost: 65_000, ma: 6, st: 3, ag: 2, pa: 3, av: 9, skills: [skills.animosity("all")], primary: "ADGM", secondary: "S", qty: 1 },
      { key: "f", position: "Renegade Human Thrower", keywords: [keywords.human, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: [skills.animosity("all"), skills.pass, skills.sureHands], primary: "DGMP", secondary: "AS", qty: 1 },
      { key: "g", position: "Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: [skills.alwaysHungry, skills.loner(4), skills.mightyBlow, skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], primary: "S", secondary: "AGMP", qty: 1 },
      // FAQ: Change Loner (4+) to Loner (3+).
      // FAQ: Add the Mighty Blow skill.
      { key: "h", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: [skills.boneHead, skills.loner(3), skills.mightyBlow, skills.thickSkull, skills.throwTeamMate], primary: "S", secondary: "AGM", qty: 1 },
      { key: "i", position: "Minotaur", keywords: [keywords.bigGuy, keywords.minotaur], cost: 150_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: [skills.frenzy, skills.horns, skills.loner(4), skills.mightyBlow, skills.thickSkull, skills.unchannelledFury], primary: "S", secondary: "AGM", qty: 1 },
      { key: "j", position: "Rat Ogre", keywords: [keywords.bigGuy, keywords.skaven], cost: 150_000, ma: 6, st: 5, ag: 4, pa: 6, av: 9, skills: [skills.animalSavagery, skills.frenzy, skills.loner(4), skills.mightyBlow, skills.prehensileTail], primary: "S", secondary: "AGM", qty: 1 },
    ],
    costOfReRolls: 70_000,
    apothecaryAllowed: true,
  },
  {
    key: "dark-elf",
    name: "Dark Elf",
    leagues: [leagues.elvenKingdomsLeague],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Dark Elf Lineman", keywords: [keywords.elf, keywords.lineman], cost: 65_000, ma: 6, st: 3, ag: 2, pa: 3, av: 9, skills: [], primary: "AG", secondary: "DS", qty: 16 },
      { key: "b", position: "Dark Elf Runner", keywords: [keywords.elf, keywords.runner], cost: 80_000, ma: 7, st: 3, ag: 2, pa: 3, av: 8, skills: [skills.dumpOff, skills.punt], primary: "AGP", secondary: "DS", qty: 2 },
      { key: "c", position: "Dark Elf Assassin", keywords: [keywords.elf, keywords.special], cost: 90_000, ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [skills.hitAndRun, skills.shadowing, skills.stab], primary: "AD", secondary: "GS", qty: 2 },
      { key: "d", position: "Dark Elf Blitzer", keywords: [keywords.blitzer, keywords.elf], cost: 105_000, ma: 7, st: 3, ag: 2, pa: 3, av: 9, skills: [skills.block], primary: "AG", secondary: "DPS", qty: 2 },
      { key: "e", position: "Witch Elf", keywords: [keywords.elf, keywords.special], cost: 110_000, ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: [skills.dodge, skills.frenzy, skills.jumpUp], primary: "AG", secondary: "DS", qty: 2 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
  {
    key: "dwarf",
    name: "Dwarf",
    leagues: [leagues.worldsEdgeSuperleague],
    specialRules: [specialRules.brawlinBrutes, specialRules.briberyAndCorruption],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Dwarf Lineman", keywords: [keywords.dwarf, keywords.lineman], cost: 70_000, ma: 4, st: 3, ag: 4, pa: 5, av: 10, skills: [skills.block, skills.defensive, skills.thickSkull], primary: "DG", secondary: "S", qty: 16 },
      // FAQ: Add Agility (A) to secondary skill access.
      { key: "b", position: "Dwarf Runner", keywords: [keywords.dwarf, keywords.runner], cost: 80_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.sprint, skills.sureHands, skills.thickSkull], primary: "GP", secondary: "AS", qty: 2 },
      { key: "c", position: "Dwarf Blitzer", keywords: [keywords.blitzer, keywords.dwarf], cost: 100_000, ma: 5, st: 3, ag: 4, pa: 4, av: 10, skills: [skills.block, skills.divingTackle, skills.tackle, skills.thickSkull], primary: "GS", secondary: "P", qty: 2 },
      { key: "d", position: "Troll Slayer", keywords: [keywords.dwarf, keywords.special], cost: 95_000, ma: 5, st: 3, ag: 4, pa: 5, av: 9, skills: [skills.block, skills.dauntless, skills.frenzy, skills.hatred(keywords.troll), skills.thickSkull], primary: "GS", secondary: "D", qty: 2 },
      { key: "e", position: "Deathroller", keywords: [keywords.bigGuy, keywords.dwarf, keywords.special], cost: 170_000, ma: 5, st: 7, ag: 5, pa: undefined, av: 11, skills: [skills.breakTackle, skills.dirtyPlayer, skills.juggernaut, skills.loner(4), skills.mightyBlow, skills.noBall, skills.secretWeapon, skills.standFirm], primary: "DS", secondary: "G", qty: 1 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "elven-union",
    name: "Elven Union",
    leagues: [leagues.elvenKingdomsLeague],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Elf Lineman", keywords: [keywords.elf, keywords.lineman], cost: 65_000, ma: 6, st: 3, ag: 2, pa: 3, av: 8, skills: [skills.fumblerooskie], primary: "AG", secondary: "S", qty: 16 },
      { key: "b", position: "Elf Thrower", keywords: [keywords.elf, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 2, pa: 2, av: 8, skills: [skills.hailMaryPass, skills.pass], primary: "AGP", secondary: "S", qty: 2 },
      { key: "c", position: "Elf Catcher", keywords: [keywords.catcher, keywords.elf], cost: 100_000, ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: [skills.catch, skills.divingCatch, skills.nervesOfSteel], primary: "AG", secondary: "S", qty: 2 },
      { key: "d", position: "Elf Blitzer", keywords: [keywords.blitzer, keywords.elf], cost: 115_000, ma: 7, st: 3, ag: 2, pa: 3, av: 9, skills: [skills.block, skills.sideStep], primary: "AG", secondary: "PS", qty: 2 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
  {
    key: "gnome",
    name: "Gnome",
    leagues: [leagues.halflingThimbleCup, leagues.woodlandLeague],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Gnome Lineman", keywords: [keywords.gnome, keywords.lineman], cost: 40_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: [skills.jumpUp, skills.rightStuff, skills.stunty, skills.wrestle], primary: "A", secondary: "DGS", qty: 16 },
      { key: "b", position: "Woodland Fox", keywords: [keywords.animal, keywords.runner], cost: 50_000, ma: 7, st: 2, ag: 2, pa: undefined, av: 6, skills: [skills.dodge, skills.myBall, skills.sideStep, skills.stunty], primary: "", secondary: "A", qty: 2 },
      { key: "c", position: "Gnome Illusionist", keywords: [keywords.gnome, keywords.special], cost: 50_000, ma: 5, st: 2, ag: 3, pa: 3, av: 7, skills: [skills.jumpUp, skills.stunty, skills.trickster, skills.wrestle], primary: "AP", secondary: "DG", qty: 2 },
      { key: "d", position: "Gnome Beastmaster", keywords: [keywords.blocker, keywords.gnome], cost: 55_000, ma: 5, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.guard, skills.jumpUp, skills.stunty, skills.wrestle], primary: "A", secondary: "DGS", qty: 2 },
      { key: "e", position: "Altern Forest Treeman", keywords: [keywords.bigGuy, keywords.treeman], cost: 120_000, ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: [skills.mightyBlow, skills.standFirm, skills.strongArm, skills.takeRoot, skills.thickSkull, skills.throwTeamMate, skills.timmmber], primary: "S", secondary: "AGP", qty: 2 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
  {
    key: "goblin",
    name: "Goblin",
    leagues: [leagues.badlandsBrawl, leagues.underworldChallenge],
    specialRules: [specialRules.briberyAndCorruption],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Goblin Lineman", keywords: [keywords.goblin, keywords.lineman], cost: 40_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.dodge, skills.rightStuff, skills.stunty], primary: "AD", secondary: "GPS", qty: 16 },
      { key: "b", position: "Loony", keywords: [keywords.goblin, keywords.special], cost: 40_000, ma: 6, st: 2, ag: 3, pa: undefined, av: 8, skills: [skills.chainsaw, skills.noBall, skills.secretWeapon, skills.stunty], primary: "D", secondary: "AGS", qty: 1 },
      { key: "c", position: "Bomma", keywords: [keywords.goblin, keywords.special], cost: 45_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.bombardier, skills.dodge, skills.secretWeapon, skills.stunty], primary: "DP", secondary: "AGS", qty: 1 },
      { key: "d", position: "'Ooligan", keywords: [keywords.goblin, keywords.special], cost: 60_000, ma: 6, st: 2, ag: 3, pa: 5, av: 8, skills: [skills.dirtyPlayer, skills.disturbingPresence, skills.dodge, skills.rightStuff, skills.stunty, skills.taunt], primary: "AD", secondary: "GS", qty: 1 },
      { key: "e", position: "Doom Diver", keywords: [keywords.goblin, keywords.special], cost: 65_000, ma: 6, st: 2, ag: 3, pa: 6, av: 8, skills: [skills.dodge, skills.rightStuff, skills.stunty, skills.swoop], primary: "A", secondary: "DGS", qty: 1 },
      { key: "f", position: "Fanatic", keywords: [keywords.goblin, keywords.special], cost: 70_000, ma: 3, st: 7, ag: 3, pa: undefined, av: 8, skills: [skills.ballAndChain, skills.noBall, skills.secretWeapon, skills.stunty], primary: "DS", secondary: "AG", qty: 1 },
      { key: "g", position: "Pogoer", keywords: [keywords.goblin, keywords.special], cost: 75_000, ma: 7, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.dodge, skills.pogo, skills.stunty], primary: "A", secondary: "DGS", qty: 1 },
      { key: "h", position: "Trained Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: [skills.alwaysHungry, skills.mightyBlow, skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], primary: "S", secondary: "AGP", qty: 2 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "halfling",
    name: "Halfling",
    leagues: [leagues.halflingThimbleCup, leagues.woodlandLeague],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Halfling Hopeful", keywords: [keywords.halfling, keywords.lineman], cost: 30_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: [skills.dodge, skills.rightStuff, skills.stunty], primary: "A", secondary: "DGS", qty: 16 },
      { key: "b", position: "Halfling Hefty", keywords: [keywords.blocker, keywords.halfling], cost: 50_000, ma: 5, st: 2, ag: 3, pa: 3, av: 8, skills: [skills.dodge, skills.fend, skills.stunty], primary: "AP", secondary: "DGS", qty: 2 },
      { key: "c", position: "Halfling Catcher", keywords: [keywords.catcher, keywords.halfling], cost: 55_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: [skills.catch, skills.dodge, skills.rightStuff, skills.sprint, skills.stunty], primary: "A", secondary: "DGS", qty: 2 },
      { key: "d", position: "Altern Forest Treeman", keywords: [keywords.bigGuy, keywords.treeman], cost: 120_000, ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: [skills.mightyBlow, skills.standFirm, skills.strongArm, skills.takeRoot, skills.thickSkull, skills.throwTeamMate, skills.timmmber], primary: "S", secondary: "AGP", qty: 2 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "high-elf",
    name: "High Elf",
    leagues: [leagues.elvenKingdomsLeague],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "High Elf Lineman", keywords: [keywords.elf, keywords.lineman], cost: 65_000, ma: 6, st: 3, ag: 2, pa: 3, av: 9, skills: [], primary: "AG", secondary: "S", qty: 16 },
      { key: "b", position: "White Lion", keywords: [keywords.blitzer, keywords.elf], cost: 110_000, ma: 7, st: 3, ag: 2, pa: 3, av: 9, skills: [skills.claws, skills.wrestle], primary: "AG", secondary: "PS", qty: 2 },
      { key: "c", position: "Phoenix Warrior", keywords: [keywords.elf, keywords.thrower], cost: 90_000, ma: 6, st: 3, ag: 2, pa: 2, av: 9, skills: [skills.cloudBurster, skills.pass, skills.safePass], primary: "AGP", secondary: "S", qty: 2 },
      { key: "d", position: "Dragon Prince", keywords: [keywords.blitzer, keywords.elf, keywords.runner], cost: 110_000, ma: 8, st: 3, ag: 2, pa: 4, av: 9, skills: [skills.block, skills.myBall, skills.steadyFooting], primary: "AG", secondary: "S", qty: 2 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
  {
    key: "human",
    name: "Human",
    leagues: [leagues.oldWorldClassic],
    specialRules: [specialRules.teamCaptain],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Human Lineman", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [], primary: "G", secondary: "ADS", qty: 16 },
      { key: "b", position: "Halfling Hopeful", keywords: [keywords.halfling, keywords.lineman], cost: 30_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: [skills.dodge, skills.rightStuff, skills.stunty], primary: "A", secondary: "DGS", qty: 3 },
      { key: "c", position: "Human Catcher", keywords: [keywords.catcher, keywords.human], cost: 75_000, ma: 8, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.catch, skills.dodge], primary: "AG", secondary: "DPS", qty: 2 },
      { key: "d", position: "Human Thrower", keywords: [keywords.human, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: [skills.pass, skills.sureHands], primary: "GP", secondary: "ADS", qty: 2 },
      { key: "e", position: "Human Blitzer", keywords: [keywords.blitzer, keywords.human], cost: 85_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.block, skills.tackle], primary: "GS", secondary: "AD", qty: 2 },
      // FAQ: Remove Mutation (M) from secondary skill access.
      { key: "f", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: [skills.boneHead, skills.loner(3), skills.mightyBlow, skills.thickSkull, skills.throwTeamMate], primary: "S", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
  {
    key: "imperial-nobility",
    name: "Imperial Nobility",
    leagues: [leagues.oldWorldClassic],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Imperial Retainer", keywords: [keywords.human, keywords.lineman], cost: 45_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.fend], primary: "G", secondary: "AS", qty: 16 },
      { key: "b", position: "Imperial Thrower", keywords: [keywords.human, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 2, av: 9, skills: [skills.giveAndGo, skills.pass, skills.pro], primary: "GP", secondary: "AS", qty: 2 },
      { key: "c", position: "Bodyguard", keywords: [keywords.blocker, keywords.human], cost: 85_000, ma: 5, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.standFirm, skills.wrestle], primary: "GS", secondary: "A", qty: 4 },
      { key: "d", position: "Noble Blitzer", keywords: [keywords.blitzer, keywords.human], cost: 90_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.block, skills.catch, skills.pro], primary: "AG", secondary: "PS", qty: 2 },
      // FAQ: Remove Mutation (M) from secondary skill access.
      { key: "e", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: [skills.boneHead, skills.loner(3), skills.mightyBlow, skills.thickSkull, skills.throwTeamMate], primary: "S", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "khorne",
    name: "Khorne",
    leagues: [leagues.chaosClash],
    specialRules: [specialRules.brawlinBrutes],
    favouredOf: [favouredOf.khorne],
    playerProfiles: [
      { key: "a", position: "Bloodborn Marauder", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.frenzy], primary: "GM", secondary: "ADS", qty: 16 },
      { key: "b", position: "Khorngor", keywords: [keywords.beastman, keywords.runner], cost: 70_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.horns, skills.juggernaut, skills.jumpUp, skills.thickSkull], primary: "GMS", secondary: "ADP", qty: 2 },
      { key: "c", position: "Bloodseeker", keywords: [keywords.blocker, keywords.human], cost: 105_000, ma: 5, st: 4, ag: 4, pa: 6, av: 10, skills: [skills.frenzy], primary: "GMS", secondary: "AD", qty: 4 },
      { key: "d", position: "Bloodspawn", keywords: [keywords.bigGuy, keywords.spawn], cost: 160_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: [skills.claws, skills.frenzy, skills.loner(4), skills.mightyBlow, skills.unchannelledFury], primary: "MS", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "lizardmen",
    name: "Lizardmen",
    leagues: [leagues.lustrianSuperleague],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Skink Lineman", keywords: [keywords.lineman, keywords.lizardman], cost: 60_000, ma: 8, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.dodge, skills.stunty], primary: "A", secondary: "DGPS", qty: 16 },
      { key: "b", position: "Chameleon Skink", keywords: [keywords.lizardman, keywords.thrower], cost: 70_000, ma: 7, st: 2, ag: 3, pa: 3, av: 8, skills: [skills.dodge, skills.onTheBall, skills.shadowing, skills.stunty], primary: "AP", secondary: "DGS", qty: 2 },
      { key: "c", position: "Saurus Blocker", keywords: [keywords.blocker, keywords.lizardman], cost: 90_000, ma: 6, st: 4, ag: 5, pa: 6, av: 10, skills: [skills.juggernaut, skills.unsteady], primary: "GS", secondary: "A", qty: 6 },
      { key: "d", position: "Kroxigor", keywords: [keywords.bigGuy, keywords.lizardman], cost: 140_000, ma: 6, st: 5, ag: 5, pa: 6, av: 10, skills: [skills.boneHead, skills.loner(4), skills.mightyBlow, skills.prehensileTail, skills.thickSkull], primary: "S", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 70_000,
    apothecaryAllowed: true,
  },
  {
    key: "necromantic",
    name: "Necromantic Horror",
    leagues: [leagues.sylvanianSpotlight],
    specialRules: [specialRules.mastersOfUndeath],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Zombie Lineman", keywords: [keywords.human, keywords.lineman, keywords.undead, keywords.zombie], cost: 40_000, ma: 4, st: 3, ag: 4, pa: 6, av: 9, skills: [skills.eyeGaouge, skills.regeneration, skills.unsteady], primary: "DG", secondary: "AS", qty: 16 },
      { key: "b", position: "Ghoul Runner", keywords: [keywords.ghoul, keywords.runner, keywords.undead], cost: 75_000, ma: 7, st: 3, ag: 3, pa: 3, av: 8, skills: [skills.dodge, skills.regeneration], primary: "AG", secondary: "DPS", qty: 2 },
      { key: "c", position: "Wraith", keywords: [keywords.blocker, keywords.undead, keywords.wraith], cost: 85_000, ma: 6, st: 3, ag: 3, pa: undefined, av: 9, skills: [skills.block, skills.foulAppearance, skills.noBall, skills.regeneration, skills.sideStep], primary: "GS", secondary: "AD", qty: 2 },
      { key: "d", position: "Flesh Golem", keywords: [keywords.blocker, keywords.construct, keywords.undead], cost: 110_000, ma: 4, st: 4, ag: 4, pa: 6, av: 10, skills: [skills.regeneration, skills.standFirm, skills.thickSkull, skills.unsteady], primary: "GS", secondary: "AD", qty: 2 },
      { key: "e", position: "Werewolf", keywords: [keywords.blitzer, keywords.undead, keywords.werewolf], cost: 120_000, ma: 8, st: 3, ag: 3, pa: 3, av: 9, skills: [skills.claws, skills.frenzy, skills.regeneration], primary: "AG", secondary: "DPS", qty: 2 },
    ],
    costOfReRolls: 70_000,
    apothecaryAllowed: false,
  },
  {
    key: "norse",
    name: "Norse",
    leagues: [leagues.chaosClash, leagues.oldWorldClassic],
    specialRules: [],
    favouredOf: [favouredOf.khorne],
    playerProfiles: [
      { key: "a", position: "Norse Raider", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.block, skills.drunkard, skills.thickSkull, skills.unsteady], primary: "G", secondary: "APS", qty: 16 },
      { key: "b", position: "Beer Boar", keywords: [keywords.animal, keywords.special], cost: 20_000, ma: 5, st: 1, ag: 3, pa: undefined, av: 6, skills: [skills.dodge, skills.noBall, skills.pickMeUp, skills.stunty, skills.titchy], primary: "", secondary: "A", qty: 2 },
      { key: "c", position: "Norse Berserker", keywords: [keywords.blitzer, keywords.human], cost: 90_000, ma: 6, st: 3, ag: 3, pa: 5, av: 8, skills: [skills.block, skills.frenzy, skills.jumpUp], primary: "GS", secondary: "AP", qty: 2 },
      { key: "d", position: "Valkyrie", keywords: [keywords.catcher, keywords.human, keywords.thrower], cost: 95_000, ma: 7, st: 3, ag: 3, pa: 3, av: 8, skills: [skills.catch, skills.dauntless, skills.pass, skills.stripBall], primary: "AGP", secondary: "S", qty: 2 },
      { key: "e", position: "Ulfwerener", keywords: [keywords.blocker, keywords.human], cost: 105_000, ma: 6, st: 4, ag: 4, pa: 6, av: 9, skills: [skills.frenzy, skills.unsteady], primary: "GS", secondary: "A", qty: 2 },
      { key: "f", position: "Yhetee", keywords: [keywords.bigGuy, keywords.yhetee], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: [skills.claws, skills.disturbingPresence, skills.frenzy, skills.loner(4), skills.unchannelledFury], primary: "S", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "nurgle",
    name: "Nurgle",
    leagues: [leagues.chaosClash],
    specialRules: [specialRules.brawlinBrutes],
    favouredOf: [favouredOf.nurgle],
    playerProfiles: [
      { key: "a", position: "Rotter Lineman", keywords: [keywords.human, keywords.lineman], cost: 40_000, ma: 5, st: 3, ag: 4, pa: 6, av: 9, skills: [skills.decay, skills.plagueRidden], primary: "DGM", secondary: "AS", qty: 16 },
      { key: "b", position: "Pestigor", keywords: [keywords.beastman, keywords.runner], cost: 70_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.horns, skills.plagueRidden, skills.regeneration, skills.steadyFooting, skills.thickSkull], primary: "GMS", secondary: "ADP", qty: 2 },
      { key: "c", position: "Bloater", keywords: [keywords.blocker, keywords.human], cost: 110_000, ma: 4, st: 4, ag: 4, pa: 6, av: 10, skills: [skills.disturbingPresence, skills.foulAppearance, skills.plagueRidden, skills.regeneration, skills.standFirm, skills.unsteady], primary: "GMS", secondary: "AD", qty: 4 },
      { key: "d", position: "Rotspawn", keywords: [keywords.bigGuy, keywords.spawn], cost: 140_000, ma: 4, st: 5, ag: 5, pa: 6, av: 10, skills: [skills.disturbingPresence, skills.foulAppearance, skills.loner(4), skills.mightyBlow, skills.pickMeUp, skills.plagueRidden, skills.reallyStupid, skills.regeneration, skills.tentacles], primary: "S", secondary: "DGM", qty: 1 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: false,
  },
  {
    key: "ogre",
    name: "Ogre",
    leagues: [leagues.badlandsBrawl, leagues.worldsEdgeSuperleague],
    specialRules: [specialRules.brawlinBrutes, specialRules.lowCostLinemen],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Gnoblar Lineman", keywords: [keywords.gnoblar, keywords.lineman], cost: 15_000, ma: 5, st: 1, ag: 3, pa: 4, av: 6, skills: [skills.dodge, skills.rightStuff, skills.sideStep, skills.stunty, skills.titchy], primary: "AD", secondary: "G", qty: 16 },
      { key: "b", position: "Ogre Blocker", keywords: [keywords.bigGuy, keywords.blocker, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: [skills.boneHead, skills.mightyBlow, skills.thickSkull, skills.throwTeamMate], primary: "S", secondary: "ADGP", qty: 5 },
      { key: "c", position: "Ogre Runt Punter", keywords: [keywords.bigGuy, keywords.ogre, keywords.thrower], cost: 145_000, ma: 5, st: 5, ag: 4, pa: 4, av: 10, skills: [skills.boneHead, skills.kickTeamMate, skills.mightyBlow, skills.thickSkull], primary: "PS", secondary: "ADG", qty: 1 },
    ],
    costOfReRolls: 70_000,
    apothecaryAllowed: true,
  },
  {
    key: "owa",
    name: "Old World Alliance",
    leagues: [leagues.oldWorldClassic],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Human Lineman", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [], primary: "G", secondary: "AS", qty: 16 },
      // FAQ: Change QTY to 3.
      { key: "b", position: "Halfling Hopeful", keywords: [keywords.halfling, keywords.lineman], cost: 30_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: [skills.dodge, skills.rightStuff, skills.stunty], primary: "A", secondary: "GS", qty: 3 },
      { key: "c", position: "Human Catcher", keywords: [keywords.catcher, keywords.human], cost: 75_000, ma: 8, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.catch, skills.dodge], primary: "AG", secondary: "PS", qty: 1 },
      { key: "d", position: "Dwarf Lineman", keywords: [keywords.dwarf, keywords.lineman], cost: 70_000, ma: 4, st: 3, ag: 4, pa: 5, av: 10, skills: [skills.block, skills.defensive, skills.thickSkull], primary: "DG", secondary: "S", qty: 3 },
      { key: "e", position: "Human Thrower", keywords: [keywords.human, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: [skills.pass, skills.sureHands], primary: "GP", secondary: "AS", qty: 1 },
      { key: "f", position: "Dwarf Runner", keywords: [keywords.dwarf, keywords.runner], cost: 80_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.sprint, skills.sureHands, skills.thickSkull], primary: "GP", secondary: "AS", qty: 1 },
      { key: "g", position: "Human Blitzer", keywords: [keywords.blitzer, keywords.human], cost: 85_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.block, skills.tackle], primary: "GS", secondary: "A", qty: 1 },
      { key: "h", position: "Dwarf Blitzer", keywords: [keywords.blitzer, keywords.dwarf], cost: 100_000, ma: 5, st: 3, ag: 4, pa: 4, av: 10, skills: [skills.block, skills.divingTackle, skills.tackle, skills.thickSkull], primary: "GS", secondary: "P", qty: 1 },
      { key: "i", position: "Troll Slayer", keywords: [keywords.dwarf, keywords.special], cost: 95_000, ma: 5, st: 3, ag: 4, pa: 5, av: 9, skills: [skills.block, skills.dauntless, skills.frenzy, skills.hatred(keywords.troll), skills.thickSkull], primary: "GS", secondary: "A", qty: 1 },
      // FAQ: Remove Mutation (M) from secondary skill access.
      { key: "j", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: [skills.boneHead, skills.loner(3), skills.mightyBlow, skills.thickSkull, skills.throwTeamMate], primary: "S", secondary: "AG", qty: 1 },
      // FAQ: Add Loner (4+) trait.
      { key: "k", position: "Altern Forest Treeman", keywords: [keywords.bigGuy, keywords.treeman], cost: 120_000, ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: [skills.loner(4), skills.mightyBlow, skills.standFirm, skills.strongArm, skills.takeRoot, skills.thickSkull, skills.throwTeamMate, skills.timmmber], primary: "S", secondary: "AGP", qty: 1 },
    ],
    costOfReRolls: 70_000,
    apothecaryAllowed: true,
  },
  {
    key: "orc",
    name: "Orc",
    leagues: [leagues.badlandsBrawl],
    specialRules: [specialRules.brawlinBrutes, specialRules.teamCaptain],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Orc Lineman", keywords: [keywords.lineman, keywords.orc], cost: 50_000, ma: 5, st: 3, ag: 3, pa: 4, av: 10, skills: [], primary: "GS", secondary: "AD", qty: 16 },
      // FAQ: Change PA 3+ to PA 4+.
      { key: "b", position: "Goblin Lineman", keywords: [keywords.goblin, keywords.lineman], cost: 40_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.dodge, skills.rightStuff, skills.stunty], primary: "AD", secondary: "GPS", qty: 4 },
      { key: "c", position: "Orc Thrower", keywords: [keywords.orc, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: [skills.pass, skills.sureHands], primary: "GP", secondary: "ADS", qty: 2 },
      { key: "d", position: "Orc Blitzer", keywords: [keywords.blitzer, keywords.orc], cost: 85_000, ma: 6, st: 3, ag: 3, pa: 4, av: 10, skills: [skills.block, skills.breakTackle], primary: "GS", secondary: "AD", qty: 2 },
      { key: "e", position: "Big Un Blocker", keywords: [keywords.blocker, keywords.orc], cost: 95_000, ma: 5, st: 4, ag: 4, pa: 6, av: 10, skills: [skills.mightyBlow, skills.taunt, skills.thickSkull, skills.unsteady], primary: "GS", secondary: "AD", qty: 2 },
      { key: "f", position: "Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: [skills.alwaysHungry, skills.loner(4), skills.mightyBlow, skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], primary: "S", secondary: "AGP", qty: 1 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "undead",
    name: "Shambling Undead",
    leagues: [leagues.sylvanianSpotlight],
    specialRules: [specialRules.mastersOfUndeath],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Skeleton Lineman", keywords: [keywords.human, keywords.lineman, keywords.skeleton, keywords.undead], cost: 40_000, ma: 5, st: 3, ag: 4, pa: 6, av: 8, skills: [skills.regeneration, skills.thickSkull], primary: "G", secondary: "ADS", qty: 16 },
      { key: "b", position: "Zombie Lineman", keywords: [keywords.human, keywords.lineman, keywords.undead, keywords.zombie], cost: 40_000, ma: 4, st: 3, ag: 4, pa: 6, av: 9, skills: [skills.eyeGaouge, skills.regeneration, skills.unsteady], primary: "DG", secondary: "AS", qty: 16 },
      { key: "c", position: "Ghoul Runner", keywords: [keywords.ghoul, keywords.runner, keywords.undead], cost: 75_000, ma: 7, st: 3, ag: 3, pa: 3, av: 8, skills: [skills.dodge, skills.regeneration], primary: "AG", secondary: "DPS", qty: 2 },
      { key: "d", position: "Wight Blitzer", keywords: [keywords.blitzer, keywords.human, keywords.skeleton, keywords.undead], cost: 95_000, ma: 6, st: 3, ag: 3, pa: 5, av: 9, skills: [skills.block, skills.regeneration, skills.tackle, skills.thickSkull], primary: "GS", secondary: "AD", qty: 2 },
      { key: "e", position: "Mummy", keywords: [keywords.bigGuy, keywords.blocker, keywords.human, keywords.undead], cost: 125_000, ma: 3, st: 5, ag: 5, pa: 6, av: 10, skills: [skills.mightyBlow, skills.regeneration], primary: "S", secondary: "AG", qty: 2 },
    ],
    costOfReRolls: 70_000,
    apothecaryAllowed: false,
  },
  {
    key: "skaven",
    name: "Skaven",
    leagues: [leagues.underworldChallenge],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Skaven Clanrat", keywords: [keywords.lineman, keywords.skaven], cost: 50_000, ma: 7, st: 3, ag: 3, pa: 4, av: 8, skills: [], primary: "DG", secondary: "AMS", qty: 16 },
      { key: "b", position: "Skaven Thrower", keywords: [keywords.skaven, keywords.thrower], cost: 80_000, ma: 7, st: 3, ag: 3, pa: 2, av: 8, skills: [skills.pass, skills.sureHands], primary: "GP", secondary: "ADMS", qty: 2 },
      { key: "c", position: "Gutter Runner", keywords: [keywords.runner, keywords.skaven], cost: 85_000, ma: 9, st: 2, ag: 2, pa: 4, av: 8, skills: [skills.dodge, skills.stab], primary: "ADG", secondary: "MS", qty: 2 },
      { key: "d", position: "Skaven Blitzer", keywords: [keywords.blitzer, keywords.skaven], cost: 90_000, ma: 8, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.block, skills.stripBall], primary: "GS", secondary: "ADM", qty: 2 },
      { key: "e", position: "Rat Ogre", keywords: [keywords.bigGuy, keywords.skaven], cost: 150_000, ma: 6, st: 5, ag: 4, pa: 6, av: 9, skills: [skills.animalSavagery, skills.frenzy, skills.loner(4), skills.mightyBlow, skills.prehensileTail], primary: "S", secondary: "AGM", qty: 1 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
  {
    key: "slann",
    name: "Slann",
    leagues: [leagues.lustrianSuperleague],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Slann Lineman", keywords: [keywords.lineman, keywords.lizardman], cost: 60_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.pogo], primary: "G", secondary: "AS", qty: 16 },
      { key: "b", position: "Slann Catcher", keywords: [keywords.catcher, keywords.lizardman], cost: 80_000, ma: 7, st: 2, ag: 2, pa: 3, av: 8, skills: [skills.divingCatch, skills.onTheBall, skills.pogo, skills.veryLongLegs], primary: "AG", secondary: "PS", qty: 2 },
      { key: "c", position: "Slann Blitzer", keywords: [keywords.blitzer, keywords.lizardman], cost: 100_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.divingTackle, skills.hitAndRun, skills.jumpUp, skills.pogo], primary: "AGS", secondary: "P", qty: 2 },
      { key: "d", position: "Kroxigor", keywords: [keywords.bigGuy, keywords.lizardman], cost: 140_000, ma: 6, st: 5, ag: 5, pa: 6, av: 10, skills: [skills.boneHead, skills.loner(4), skills.mightyBlow, skills.prehensileTail, skills.thickSkull], primary: "S", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
  {
    key: "snotling",
    name: "Snotling",
    leagues: [leagues.underworldChallenge],
    specialRules: [specialRules.briberyAndCorruption, specialRules.lowCostLinemen, specialRules.swarming],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Snotling Lineman", keywords: [keywords.lineman, keywords.snotling], cost: 15_000, ma: 5, st: 1, ag: 3, pa: 4, av: 6, skills: [skills.dodge, skills.insignificant, skills.rightStuff, skills.sideStep, skills.stunty, skills.titchy], primary: "AD", secondary: "G", qty: 16 },
      { key: "b", position: "Fun-hoppa", keywords: [keywords.snotling, keywords.special], cost: 20_000, ma: 6, st: 1, ag: 3, pa: 4, av: 6, skills: [skills.dodge, skills.pogo, skills.rightStuff, skills.sideStep, skills.stunty], primary: "AD", secondary: "G", qty: 2 },
      { key: "c", position: "Stilty Runna", keywords: [keywords.runner, keywords.snotling], cost: 20_000, ma: 6, st: 1, ag: 3, pa: 4, av: 6, skills: [skills.dodge, skills.rightStuff, skills.sideStep, skills.sprint, skills.stunty], primary: "AD", secondary: "G", qty: 2 },
      { key: "d", position: "Fungus Flinga", keywords: [keywords.snotling, keywords.special], cost: 30_000, ma: 5, st: 1, ag: 3, pa: 4, av: 6, skills: [skills.bombardier, skills.dodge, skills.rightStuff, skills.secretWeapon, skills.sideStep, skills.stunty, skills.titchy], primary: "ADP", secondary: "G", qty: 2 },
      { key: "e", position: "Pump Wagon", keywords: [keywords.bigGuy, keywords.snotling, keywords.special], cost: 100_000, ma: 5, st: 5, ag: 5, pa: 6, av: 9, skills: [skills.dirtyPlayer, skills.juggernaut, skills.mightyBlow, skills.reallyStupid, skills.standFirm], primary: "DS", secondary: "AG", qty: 2 },
      { key: "f", position: "Trained Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: [skills.alwaysHungry, skills.mightyBlow, skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], primary: "S", secondary: "AGP", qty: 2 },
    ],
    costOfReRolls: 70_000,
    apothecaryAllowed: true,
  },
  {
    key: "tomb-kings",
    name: "Tomb Kings",
    leagues: [leagues.sylvanianSpotlight],
    specialRules: [specialRules.mastersOfUndeath],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Skeleton Lineman", keywords: [keywords.human, keywords.lineman, keywords.skeleton, keywords.undead], cost: 40_000, ma: 5, st: 3, ag: 4, pa: 6, av: 8, skills: [skills.regeneration, skills.thickSkull], primary: "G", secondary: "ADS", qty: 16 },
      { key: "b", position: "Tomb Kings Thrower", keywords: [keywords.human, keywords.skeleton, keywords.thrower, keywords.undead], cost: 65_000, ma: 6, st: 3, ag: 4, pa: 3, av: 9, skills: [skills.pass, skills.regeneration, skills.sureHands, skills.thickSkull], primary: "GP", secondary: "ADS", qty: 2 },
      { key: "c", position: "Tomb Kings Blitzer", keywords: [keywords.blitzer, keywords.human, keywords.skeleton, keywords.undead], cost: 85_000, ma: 6, st: 3, ag: 4, pa: 5, av: 9, skills: [skills.block, skills.regeneration, skills.thickSkull], primary: "GS", secondary: "AD", qty: 2 },
      { key: "d", position: "Tomb Guardian", keywords: [keywords.bigGuy, keywords.blocker, keywords.human, keywords.undead], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 6, av: 10, skills: [skills.brawler, skills.decay, skills.regeneration], primary: "S", secondary: "AG", qty: 4 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: false,
  },
  {
    key: "underworld",
    name: "Underworld Denizens",
    leagues: [leagues.underworldChallenge],
    specialRules: [specialRules.briberyAndCorruption],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Goblin Lineman", keywords: [keywords.goblin, keywords.lineman], cost: 40_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.dodge, skills.rightStuff, skills.stunty], primary: "ADM", secondary: "GPS", qty: 16 },
      { key: "b", position: "Snotling Lineman", keywords: [keywords.lineman, keywords.snotling], cost: 15_000, ma: 5, st: 1, ag: 3, pa: 4, av: 6, skills: [skills.dodge, skills.insignificant, skills.rightStuff, skills.sideStep, skills.stunty, skills.titchy], primary: "ADM", secondary: "G", qty: 6 },
      { key: "c", position: "Skaven Clanrat", keywords: [keywords.lineman, keywords.skaven], cost: 50_000, ma: 7, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.animosity(keywords.goblin)], primary: "DGM", secondary: "AS", qty: 3 },
      { key: "d", position: "Skaven Thrower", keywords: [keywords.skaven, keywords.thrower], cost: 80_000, ma: 7, st: 3, ag: 3, pa: 2, av: 8, skills: [skills.animosity(keywords.goblin), skills.pass, skills.sureHands], primary: "GMP", secondary: "ADS", qty: 1 },
      { key: "e", position: "Gutter Runner", keywords: [keywords.runner, keywords.skaven], cost: 85_000, ma: 9, st: 2, ag: 2, pa: 4, av: 8, skills: [skills.animosity(keywords.goblin), skills.dodge, skills.stab], primary: "ADGM", secondary: "S", qty: 1 },
      { key: "f", position: "Skaven Blitzer", keywords: [keywords.blitzer, keywords.skaven], cost: 90_000, ma: 8, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.animosity(keywords.goblin), skills.block, skills.stripBall], primary: "GMS", secondary: "AD", qty: 1 },
      { key: "g", position: "Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: [skills.alwaysHungry, skills.loner(4), skills.mightyBlow, skills.projectileVomit, skills.reallyStupid, skills.regeneration, skills.throwTeamMate], primary: "MS", secondary: "AGP", qty: 1 },
      { key: "h", position: "Rat Ogre", keywords: [keywords.bigGuy, keywords.skaven], cost: 150_000, ma: 6, st: 5, ag: 4, pa: 6, av: 9, skills: [skills.animalSavagery, skills.frenzy, skills.loner(4), skills.mightyBlow, skills.prehensileTail], primary: "MS", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 70_000,
    apothecaryAllowed: true,
  },
  {
    key: "vampire",
    name: "Vampire",
    leagues: [leagues.sylvanianSpotlight],
    specialRules: [specialRules.mastersOfUndeath],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Thrall Lineman", keywords: [keywords.human, keywords.lineman, keywords.thrall], cost: 40_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: [], primary: "G", secondary: "AS", qty: 16 },
      { key: "b", position: "Vampire Runner", keywords: [keywords.runner, keywords.undead, keywords.vampire], cost: 100_000, ma: 8, st: 3, ag: 2, pa: 3, av: 8, skills: [skills.bloodlust(2), skills.hypnoticGaze, skills.regeneration], primary: "AG", secondary: "PS", qty: 2 },
      { key: "c", position: "Vampire Thrower", keywords: [keywords.thrower, keywords.undead, keywords.vampire], cost: 110_000, ma: 6, st: 4, ag: 2, pa: 2, av: 9, skills: [skills.bloodlust(2), skills.hypnoticGaze, skills.pass, skills.regeneration], primary: "AGP", secondary: "S", qty: 2 },
      { key: "d", position: "Vampire Blitzer", keywords: [keywords.blitzer, keywords.undead, keywords.vampire], cost: 110_000, ma: 6, st: 4, ag: 2, pa: 4, av: 9, skills: [skills.bloodlust(3), skills.hypnoticGaze, skills.juggernaut, skills.regeneration], primary: "AGS", secondary: "", qty: 2 },
      { key: "e", position: "Vargheist", keywords: [keywords.bigGuy, keywords.undead, keywords.vampire], cost: 150_000, ma: 5, st: 5, ag: 4, pa: 6, av: 10, skills: [skills.bloodlust(3), skills.claws, skills.frenzy, skills.loner(4), skills.regeneration], primary: "S", secondary: "AG", qty: 1 },
    ],
    costOfReRolls: 60_000,
    apothecaryAllowed: true,
  },
  {
    key: "wood-elf",
    name: "Wood Elf",
    leagues: [leagues.elvenKingdomsLeague, leagues.woodlandLeague],
    specialRules: [],
    favouredOf: [],
    playerProfiles: [
      { key: "a", position: "Wood Elf Lineman", keywords: [keywords.elf, keywords.lineman], cost: 65_000, ma: 7, st: 3, ag: 2, pa: 3, av: 8, skills: [], primary: "AG", secondary: "S", qty: 16 },
      { key: "b", position: "Wood Elf Thrower", keywords: [keywords.elf, keywords.thrower], cost: 85_000, ma: 7, st: 3, ag: 2, pa: 2, av: 8, skills: [skills.pass, skills.safePairOfHands], primary: "AGP", secondary: "S", qty: 2 },
      { key: "c", position: "Wood Elf Catcher", keywords: [keywords.catcher, keywords.elf], cost: 90_000, ma: 8, st: 2, ag: 2, pa: 3, av: 8, skills: [skills.catch, skills.dodge, skills.sprint], primary: "AG", secondary: "PS", qty: 2 },
      { key: "d", position: "Wardancer", keywords: [keywords.blitzer, keywords.elf], cost: 130_000, ma: 8, st: 3, ag: 2, pa: 3, av: 8, skills: [skills.block, skills.dodge, skills.leap], primary: "AG", secondary: "PS", qty: 2 },
      { key: "e", position: "Loren Forest Treeman", keywords: [keywords.bigGuy, keywords.treeman], cost: 120_000, ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: [skills.loner(4), skills.mightyBlow, skills.standFirm, skills.strongArm, skills.takeRoot, skills.thickSkull, skills.throwTeamMate], primary: "S", secondary: "AGP", qty: 1 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
];

/** All available star players. */
export const starPlayers: PlayerProfile[] = [
  { key: "akhorne", name: "Akhorne the Squirrel", position: STAR_PLAYER, keywords: [keywords.blitzer, "Squirrel"], ma: 7, st: 1, ag: 2, pa: undefined, av: 6, skills: [skills.claws, skills.dauntless, skills.dodge, skills.frenzy, skills.jumpUp, skills.loner(4), skills.noBall, skills.sideStep, skills.stunty, skills.titchy], cost: 80_000, playsFor: [ANY_TEAM], specialRule: "Blind Rage" },
  { key: "griff", name: "Griff Oberwald", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human], ma: 7, st: 4, ag: 2, pa: 3, av: 9, skills: [skills.block, skills.dodge, skills.fend, skills.loner(3), skills.sprint, skills.sureFeet], cost: 300_000, playsFor: [leagues.oldWorldClassic], specialRule: "Consummate Professional" },
  { key: "grashnak", name: "Grashnak Blackhoof", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.minotaur], ma: 6, st: 6, ag: 4, pa: 6, av: 9, skills: [skills.frenzy, skills.horns, skills.loner(4), skills.mightyBlow, skills.thickSkull, skills.unchannelledFury], cost: 240_000, playsFor: [leagues.chaosClash], specialRule: "Gored by the Bull" },
  { key: "scyla", name: "Scyla Anfingrimm", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.spawn], ma: 5, st: 5, ag: 4, pa: 6, av: 10, skills: [skills.claws, skills.frenzy, skills.loner(4), skills.mightyBlow, skills.prehensileTail, skills.thickSkull, skills.unchannelledFury], cost: 200_000, playsFor: [favouredOf.khorne], specialRule: "Fury of the Blood God" },
];
