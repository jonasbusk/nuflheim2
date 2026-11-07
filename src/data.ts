// Types

/** The overall state of a team draft list. */
// Note: Should be as small as possible
export interface TeamState {
  variant: keyof typeof variants; // The selected rules variant
  budget: number; // The total team budget
  valueIncrease: boolean; // Whether player advancements increase value
  name: string; // Team name
  coach: string; // Coach name
  roster: string; // Key to the selected roster
  league: number; // Key to the selected league in the roster
  favouredOf?: number; // Key to the selected alignment in the roster
  players: (Player | null)[]; // Array of players, null if the player slot is empty
  reRolls: number; // Number of re-rolls
  assistantCoaches: number; // Number of assistant coaches
  cheerleaders: number; // Number of cheerleaders
  apothecary: number; // Whether the team has an apothecary
  dedicatedFans: number; // Number of dedicated fans
  inducements: Record<string, number>; // Number of each inducement
}

/** A player in the team draft list.
 *
 * Base characteristics are stored in a player profile.
 * The player object only stores indiviudal modifiers.
 */
// Note: Should be as small as possible
export interface Player {
  /** Key to look up the player profile. */
  key: string;
  /** Player name. */
  name?: string;
  /** Movement Allowance improvement modifier. */
  ma?: number;
  /** Strength improvement modifier. */
  st?: number;
  /** Agility improvement modifier. */
  ag?: number;
  /** Passing Ability improvement modifier. */
  pa?: number;
  /** Armour Value improvement modifier. */
  av?: number;
  /** Primary skill advancements. */
  ps?: (keyof typeof skills)[];
  /** Secondary skill advancements. */
  ss?: (keyof typeof skills)[];
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
  /** Unique key of the player profile, used for lookup. */
  key: string;
  /** Position nameof the player. */
  position: string;
  /** Keywords the player has. */
  keywords: string[];
  /** Cost to hire the player. */
  cost: number;
  /** Movement Allowance. */
  ma: number;
  /** Strength. */
  st: number;
  /** Agility. */
  ag: number;
  /** Passing Ability. */
  pa?: number;
  /** Armour Value. */
  av: number;
  /** Skills and traits. */
  skills: (keyof typeof skills)[];
  // Properties for normal playes
  /** Primary skill access. */
  primary?: string;
  /** Secondary skill access. */
  secondary?: string;
  /** Allowed quantity. */
  qty?: number;
  // Properties for star players
  /** Star player name. */
  name?: string;
  /** List of leagues and special rules the star player plays for. */
  playsFor?: string[];
  /** Star player special rule. */
  specialRule?: string;
}

// Constants

/** A constant used to indicate a star player plays for any team. */
export const ANY_TEAM: string = "Any Team";
/** A constant used as position in star player profiles. */
export const STAR_PLAYER: string = "Star Player";

// Data

/** Rules variants for the team draft list. */
export const variants = {
  standard: "Standard",
  sevens: "Sevens",
};

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
  dryad: "Dryad",
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
  skink: "Skink",
  snakeman: "Snakeman",
  snotling: "Snotling",
  spawn: "Spawn",
  special: "Special",
  spite: "Spite",
  squirrel: "Squirrel",
  thrall: "Thrall",
  thrower: "Thrower",
  treeman: "Treeman",
  troll: "Troll",
  undead: "Undead",
  vampire: "Vampire",
  werewolf: "Werewolf",
  wraith: "Wraith",
  yhetee: "Yhetee",
  zoat: "Zoat",
  zombie: "Zombie",
};

/** Player skills and traits. */
export const skills = {
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
  sidestep: "Sidestep",
  sprint: "Sprint",
  sureFeet: "Sure Feet",
  // Devious
  dirtyPlayer: "Dirty Player",
  eyeGouge: "Eye Gouge",
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
  animosityAll: "Animosity (all)",
  animosityGoblin: "Animosity (Goblin)",
  ballAndChain: "Ball & Chain",
  bloodlust2: "Bloodlust (2+)",
  bloodlust3: "Bloodlust (3+)",
  bombardier: "Bombardier",
  boneHead: "Bone Head",
  breatheFire: "Breathe Fire",
  chainsaw: "Chainsaw",
  decay: "Decay",
  drunkard: "Drunkard",
  hatredTroll: "Hatred (Troll)",
  hatredUndead: "Hatred (Undead)",
  hatredBigGuy: "Hatred (Big Guy)",
  hatredDwarf: "Hatred (Dwarf)",
  hypnoticGaze: "Hypnotic Gaze",
  insignificant: "Insignificant",
  kickTeamMate: "Kick Team Mate",
  loner3: "Loner (3+)",
  loner4: "Loner (4+)",
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

export const eliteSkills: (keyof typeof skills)[] = ["block", "dodge", "guard", "mightyBlow"];

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
      { key: "a", position: "Eagle Warrior", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: ["dodge"], primary: "G", secondary: "AS", qty: 16 },
      { key: "b", position: "Python Warrior", keywords: [keywords.human, keywords.thrower], cost: 80_000, ma: 6, st: 3, ag: 3, pa: 3, av: 8, skills: ["dodge", "onTheBall", "pass", "safePass"], primary: "GP", secondary: "AS", qty: 2 },
      { key: "c", position: "Piranha Warrior", keywords: [keywords.blitzer, keywords.human], cost: 90_000, ma: 7, st: 3, ag: 3, pa: 4, av: 8, skills: ["dodge", "hitAndRun", "jumpUp"], primary: "GA", secondary: "S", qty: 2 },
      { key: "d", position: "Jaguar Warrior", keywords: [keywords.blocker, keywords.human], cost: 110_000, ma: 6, st: 4, ag: 3, pa: 4, av: 9, skills: ["defensive", "dodge"], primary: "GS", secondary: "A", qty: 2 },
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
      { key: "a", position: "Goblin Bruiser", keywords: [keywords.goblin, keywords.lineman], cost: 45_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: ["dodge", "rightStuff", "stunty", "thickSkull"], primary: "AD", secondary: "GPS", qty: 16 },
      { key: "b", position: "Black Orc", keywords: [keywords.blocker, keywords.orc], cost: 90_000, ma: 4, st: 4, ag: 4, pa: 5, av: 10, skills: ["brawler", "grab"], primary: "GS", secondary: "AD", qty: 6 },
      { key: "c", position: "Trained Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: ["alwaysHungry", "mightyBlow", "projectileVomit", "reallyStupid", "regeneration", "throwTeamMate"], primary: "S", secondary: "AGP", qty: 1 },
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
      { key: "a", position: "Bretonnian Squire", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: ["wrestle"], primary: "G", secondary: "AS", qty: 16 },
      { key: "b", position: "Bretonnian Knight Catcher", keywords: [keywords.catcher, keywords.human], cost: 85_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: ["catch", "dauntless", "nervesOfSteel"], primary: "AG", secondary: "S", qty: 2 },
      { key: "c", position: "Bretonnian Knight Thrower", keywords: [keywords.human, keywords.thrower], cost: 80_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: ["dauntless", "nervesOfSteel", "pass"], primary: "GP", secondary: "AS", qty: 2 },
      { key: "d", position: "Grail Knight", keywords: [keywords.blitzer, keywords.human], cost: 95_000, ma: 7, st: 3, ag: 3, pa: 4, av: 10, skills: ["block", "dauntless", "steadyFooting"], primary: "GS", secondary: "A", qty: 2 },
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
      { key: "a", position: "Beastman Lineman", keywords: [keywords.beastman, keywords.lineman], cost: 55_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: ["horns", "thickSkull"], primary: "GM", secondary: "ADPS", qty: 16 },
      { key: "b", position: "Chaos Chosen", keywords: [keywords.blocker, keywords.human], cost: 100_000, ma: 5, st: 4, ag: 3, pa: 5, av: 10, skills: ["armBar"], primary: "GMS", secondary: "AD", qty: 4 },
      { key: "c", position: "Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: ["alwaysHungry", "loner4", "mightyBlow", "projectileVomit", "reallyStupid", "regeneration", "throwTeamMate"], primary: "MS", secondary: "AGP", qty: 1 },
      { key: "d", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: ["boneHead", "loner4", "mightyBlow", "thickSkull", "throwTeamMate"], primary: "MS", secondary: "AG", qty: 1 },
      { key: "e", position: "Minotaur", keywords: [keywords.bigGuy, keywords.minotaur], cost: 150_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: ["frenzy", "horns", "loner4", "mightyBlow", "thickSkull", "unchannelledFury"], primary: "MS", secondary: "AG", qty: 1 },
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
      { key: "b", position: "Sneaky Stabba", keywords: [keywords.goblin, keywords.special], cost: 60_000, ma: 6, st: 3, ag: 3, pa: 5, av: 8, skills: ["shadowing", "stab"], primary: "DG", secondary: "AS", qty: 2 },
      { key: "c", position: "Chaos Dwarf Blocker", keywords: [keywords.blocker, keywords.dwarf], cost: 70_000, ma: 4, st: 3, ag: 4, pa: 6, av: 10, skills: ["block", "ironHardSkin", "thickSkull"], primary: "GS", secondary: "ADM", qty: 4 },
      { key: "d", position: "Flamesmith", keywords: [keywords.dwarf, keywords.special], cost: 80_000, ma: 5, st: 3, ag: 4, pa: 6, av: 10, skills: ["brawler", "breatheFire", "disturbingPresence", "thickSkull"], primary: "GS", secondary: "ADM", qty: 2 },
      { key: "e", position: "Bull Centaur", keywords: [keywords.blitzer, keywords.dwarf], cost: 130_000, ma: 6, st: 4, ag: 4, pa: 6, av: 10, skills: ["sprint", "sureFeet", "thickSkull", "unsteady"], primary: "GS", secondary: "ADM", qty: 2 },
      { key: "f", position: "Minotaur", keywords: [keywords.bigGuy, keywords.minotaur], cost: 150_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: ["frenzy", "horns", "loner4", "mightyBlow", "thickSkull", "unchannelledFury"], primary: "MS", secondary: "AG", qty: 1 },
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
      { key: "a", position: "Renegade Human", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: ["animosityAll"], primary: "DGM", secondary: "AS", qty: 16 },
      { key: "b", position: "Renegade Goblin", keywords: [keywords.goblin, keywords.lineman], cost: 40_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: ["animosityAll", "dodge", "rightStuff", "stunty"], primary: "ADM", secondary: "GP", qty: 1 },
      { key: "c", position: "Renegade Orc", keywords: [keywords.lineman, keywords.orc], cost: 50_000, ma: 5, st: 3, ag: 3, pa: 4, av: 10, skills: ["animosityAll"], primary: "DGM", secondary: "AS", qty: 1 },
      { key: "d", position: "Renegade Skaven", keywords: [keywords.lineman, keywords.skaven], cost: 50_000, ma: 7, st: 3, ag: 3, pa: 4, av: 8, skills: ["animosityAll"], primary: "DGM", secondary: "AS", qty: 1 },
      { key: "e", position: "Renegade Dark Elf", keywords: [keywords.elf, keywords.lineman], cost: 65_000, ma: 6, st: 3, ag: 2, pa: 3, av: 9, skills: ["animosityAll"], primary: "ADGM", secondary: "S", qty: 1 },
      { key: "f", position: "Renegade Human Thrower", keywords: [keywords.human, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: ["animosityAll", "pass", "sureHands"], primary: "DGMP", secondary: "AS", qty: 1 },
      { key: "g", position: "Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: ["alwaysHungry", "loner4", "mightyBlow", "projectileVomit", "reallyStupid", "regeneration", "throwTeamMate"], primary: "S", secondary: "AGMP", qty: 1 },
      // FAQ: Change Loner (4+) to Loner (3+).
      // FAQ: Add the Mighty Blow skill.
      { key: "h", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: ["boneHead", "loner3", "mightyBlow", "thickSkull", "throwTeamMate"], primary: "S", secondary: "AGM", qty: 1 },
      { key: "i", position: "Minotaur", keywords: [keywords.bigGuy, keywords.minotaur], cost: 150_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: ["frenzy", "horns", "loner4", "mightyBlow", "thickSkull", "unchannelledFury"], primary: "S", secondary: "AGM", qty: 1 },
      { key: "j", position: "Rat Ogre", keywords: [keywords.bigGuy, keywords.skaven], cost: 150_000, ma: 6, st: 5, ag: 4, pa: 6, av: 9, skills: ["animalSavagery", "frenzy", "loner4", "mightyBlow", "prehensileTail"], primary: "S", secondary: "AGM", qty: 1 },
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
      { key: "b", position: "Dark Elf Runner", keywords: [keywords.elf, keywords.runner], cost: 80_000, ma: 7, st: 3, ag: 2, pa: 3, av: 8, skills: ["dumpOff", "punt"], primary: "AGP", secondary: "DS", qty: 2 },
      { key: "c", position: "Dark Elf Assassin", keywords: [keywords.elf, keywords.special], cost: 90_000, ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["hitAndRun", "shadowing", "stab"], primary: "AD", secondary: "GS", qty: 2 },
      { key: "d", position: "Dark Elf Blitzer", keywords: [keywords.blitzer, keywords.elf], cost: 105_000, ma: 7, st: 3, ag: 2, pa: 3, av: 9, skills: ["block"], primary: "AG", secondary: "DPS", qty: 2 },
      { key: "e", position: "Witch Elf", keywords: [keywords.elf, keywords.special], cost: 110_000, ma: 7, st: 3, ag: 2, pa: 4, av: 8, skills: ["dodge", "frenzy", "jumpUp"], primary: "AG", secondary: "DS", qty: 2 },
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
      { key: "a", position: "Dwarf Lineman", keywords: [keywords.dwarf, keywords.lineman], cost: 70_000, ma: 4, st: 3, ag: 4, pa: 5, av: 10, skills: ["block", "defensive", "thickSkull"], primary: "DG", secondary: "S", qty: 16 },
      // FAQ: Add Agility (A) to secondary skill access.
      { key: "b", position: "Dwarf Runner", keywords: [keywords.dwarf, keywords.runner], cost: 80_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: ["sprint", "sureHands", "thickSkull"], primary: "GP", secondary: "AS", qty: 2 },
      { key: "c", position: "Dwarf Blitzer", keywords: [keywords.blitzer, keywords.dwarf], cost: 100_000, ma: 5, st: 3, ag: 4, pa: 4, av: 10, skills: ["block", "divingTackle", "tackle", "thickSkull"], primary: "GS", secondary: "P", qty: 2 },
      { key: "d", position: "Troll Slayer", keywords: [keywords.dwarf, keywords.special], cost: 95_000, ma: 5, st: 3, ag: 4, pa: 5, av: 9, skills: ["block", "dauntless", "frenzy", "hatredTroll", "thickSkull"], primary: "GS", secondary: "D", qty: 2 },
      { key: "e", position: "Deathroller", keywords: [keywords.bigGuy, keywords.dwarf, keywords.special], cost: 170_000, ma: 5, st: 7, ag: 5, pa: undefined, av: 11, skills: ["breakTackle", "dirtyPlayer", "juggernaut", "loner4", "mightyBlow", "noBall", "secretWeapon", "standFirm"], primary: "DS", secondary: "G", qty: 1 },
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
      { key: "a", position: "Elf Lineman", keywords: [keywords.elf, keywords.lineman], cost: 65_000, ma: 6, st: 3, ag: 2, pa: 3, av: 8, skills: ["fumblerooskie"], primary: "AG", secondary: "S", qty: 16 },
      { key: "b", position: "Elf Thrower", keywords: [keywords.elf, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 2, pa: 2, av: 8, skills: ["hailMaryPass", "pass"], primary: "AGP", secondary: "S", qty: 2 },
      { key: "c", position: "Elf Catcher", keywords: [keywords.catcher, keywords.elf], cost: 100_000, ma: 8, st: 3, ag: 2, pa: 4, av: 8, skills: ["catch", "divingCatch", "nervesOfSteel"], primary: "AG", secondary: "S", qty: 2 },
      { key: "d", position: "Elf Blitzer", keywords: [keywords.blitzer, keywords.elf], cost: 115_000, ma: 7, st: 3, ag: 2, pa: 3, av: 9, skills: ["block", "sidestep"], primary: "AG", secondary: "PS", qty: 2 },
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
      { key: "a", position: "Gnome Lineman", keywords: [keywords.gnome, keywords.lineman], cost: 40_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: ["jumpUp", "rightStuff", "stunty", "wrestle"], primary: "A", secondary: "DGS", qty: 16 },
      { key: "b", position: "Woodland Fox", keywords: [keywords.animal, keywords.runner], cost: 50_000, ma: 7, st: 2, ag: 2, pa: undefined, av: 6, skills: ["dodge", "myBall", "sidestep", "stunty"], primary: "", secondary: "A", qty: 2 },
      { key: "c", position: "Gnome Illusionist", keywords: [keywords.gnome, keywords.special], cost: 50_000, ma: 5, st: 2, ag: 3, pa: 3, av: 7, skills: ["jumpUp", "stunty", "trickster", "wrestle"], primary: "AP", secondary: "DG", qty: 2 },
      { key: "d", position: "Gnome Beastmaster", keywords: [keywords.blocker, keywords.gnome], cost: 55_000, ma: 5, st: 2, ag: 3, pa: 4, av: 8, skills: ["guard", "jumpUp", "stunty", "wrestle"], primary: "A", secondary: "DGS", qty: 2 },
      { key: "e", position: "Altern Forest Treeman", keywords: [keywords.bigGuy, keywords.treeman], cost: 120_000, ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: ["mightyBlow", "standFirm", "strongArm", "takeRoot", "thickSkull", "throwTeamMate", "timmmber"], primary: "S", secondary: "AGP", qty: 2 },
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
      { key: "a", position: "Goblin Lineman", keywords: [keywords.goblin, keywords.lineman], cost: 40_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: ["dodge", "rightStuff", "stunty"], primary: "AD", secondary: "GPS", qty: 16 },
      { key: "b", position: "Loony", keywords: [keywords.goblin, keywords.special], cost: 40_000, ma: 6, st: 2, ag: 3, pa: undefined, av: 8, skills: ["chainsaw", "noBall", "secretWeapon", "stunty"], primary: "D", secondary: "AGS", qty: 1 },
      { key: "c", position: "Bomma", keywords: [keywords.goblin, keywords.special], cost: 45_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: ["bombardier", "dodge", "secretWeapon", "stunty"], primary: "DP", secondary: "AGS", qty: 1 },
      { key: "d", position: "'Ooligan", keywords: [keywords.goblin, keywords.special], cost: 60_000, ma: 6, st: 2, ag: 3, pa: 5, av: 8, skills: ["dirtyPlayer", "disturbingPresence", "dodge", "rightStuff", "stunty", "taunt"], primary: "AD", secondary: "GS", qty: 1 },
      { key: "e", position: "Doom Diver", keywords: [keywords.goblin, keywords.special], cost: 65_000, ma: 6, st: 2, ag: 3, pa: 6, av: 8, skills: ["dodge", "rightStuff", "stunty", "swoop"], primary: "A", secondary: "DGS", qty: 1 },
      { key: "f", position: "Fanatic", keywords: [keywords.goblin, keywords.special], cost: 70_000, ma: 3, st: 7, ag: 3, pa: undefined, av: 8, skills: ["ballAndChain", "noBall", "secretWeapon", "stunty"], primary: "DS", secondary: "AG", qty: 1 },
      { key: "g", position: "Pogoer", keywords: [keywords.goblin, keywords.special], cost: 75_000, ma: 7, st: 2, ag: 3, pa: 4, av: 8, skills: ["dodge", "pogo", "stunty"], primary: "A", secondary: "DGS", qty: 1 },
      { key: "h", position: "Trained Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: ["alwaysHungry", "mightyBlow", "projectileVomit", "reallyStupid", "regeneration", "throwTeamMate"], primary: "S", secondary: "AGP", qty: 2 },
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
      { key: "a", position: "Halfling Hopeful", keywords: [keywords.halfling, keywords.lineman], cost: 30_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: ["dodge", "rightStuff", "stunty"], primary: "A", secondary: "DGS", qty: 16 },
      { key: "b", position: "Halfling Hefty", keywords: [keywords.blocker, keywords.halfling], cost: 50_000, ma: 5, st: 2, ag: 3, pa: 3, av: 8, skills: ["dodge", "fend", "stunty"], primary: "AP", secondary: "DGS", qty: 2 },
      { key: "c", position: "Halfling Catcher", keywords: [keywords.catcher, keywords.halfling], cost: 55_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: ["catch", "dodge", "rightStuff", "sprint", "stunty"], primary: "A", secondary: "DGS", qty: 2 },
      { key: "d", position: "Altern Forest Treeman", keywords: [keywords.bigGuy, keywords.treeman], cost: 120_000, ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: ["mightyBlow", "standFirm", "strongArm", "takeRoot", "thickSkull", "throwTeamMate", "timmmber"], primary: "S", secondary: "AGP", qty: 2 },
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
      { key: "b", position: "White Lion", keywords: [keywords.blitzer, keywords.elf], cost: 110_000, ma: 7, st: 3, ag: 2, pa: 3, av: 9, skills: ["claws", "wrestle"], primary: "AG", secondary: "PS", qty: 2 },
      { key: "c", position: "Phoenix Warrior", keywords: [keywords.elf, keywords.thrower], cost: 90_000, ma: 6, st: 3, ag: 2, pa: 2, av: 9, skills: ["cloudBurster", "pass", "safePass"], primary: "AGP", secondary: "S", qty: 2 },
      { key: "d", position: "Dragon Prince", keywords: [keywords.blitzer, keywords.elf, keywords.runner], cost: 110_000, ma: 8, st: 3, ag: 2, pa: 4, av: 9, skills: ["block", "myBall", "steadyFooting"], primary: "AG", secondary: "S", qty: 2 },
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
      { key: "b", position: "Halfling Hopeful", keywords: [keywords.halfling, keywords.lineman], cost: 30_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: ["dodge", "rightStuff", "stunty"], primary: "A", secondary: "DGS", qty: 3 },
      { key: "c", position: "Human Catcher", keywords: [keywords.catcher, keywords.human], cost: 75_000, ma: 8, st: 3, ag: 3, pa: 4, av: 8, skills: ["catch", "dodge"], primary: "AG", secondary: "DPS", qty: 2 },
      { key: "d", position: "Human Thrower", keywords: [keywords.human, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: ["pass", "sureHands"], primary: "GP", secondary: "ADS", qty: 2 },
      { key: "e", position: "Human Blitzer", keywords: [keywords.blitzer, keywords.human], cost: 85_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: ["block", "tackle"], primary: "GS", secondary: "AD", qty: 2 },
      // FAQ: Remove Mutation (M) from secondary skill access.
      { key: "f", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: ["boneHead", "loner3", "mightyBlow", "thickSkull", "throwTeamMate"], primary: "S", secondary: "AG", qty: 1 },
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
      { key: "a", position: "Imperial Retainer", keywords: [keywords.human, keywords.lineman], cost: 45_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: ["fend"], primary: "G", secondary: "AS", qty: 16 },
      { key: "b", position: "Imperial Thrower", keywords: [keywords.human, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 2, av: 9, skills: ["giveAndGo", "pass", "pro"], primary: "GP", secondary: "AS", qty: 2 },
      { key: "c", position: "Bodyguard", keywords: [keywords.blocker, keywords.human], cost: 85_000, ma: 5, st: 3, ag: 3, pa: 4, av: 9, skills: ["standFirm", "wrestle"], primary: "GS", secondary: "A", qty: 4 },
      { key: "d", position: "Noble Blitzer", keywords: [keywords.blitzer, keywords.human], cost: 90_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: ["block", "catch", "pro"], primary: "AG", secondary: "PS", qty: 2 },
      // FAQ: Remove Mutation (M) from secondary skill access.
      { key: "e", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: ["boneHead", "loner3", "mightyBlow", "thickSkull", "throwTeamMate"], primary: "S", secondary: "AG", qty: 1 },
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
      { key: "a", position: "Bloodborn Marauder", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: ["frenzy"], primary: "GM", secondary: "ADS", qty: 16 },
      { key: "b", position: "Khorngor", keywords: [keywords.beastman, keywords.runner], cost: 70_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: ["horns", "juggernaut", "jumpUp", "thickSkull"], primary: "GMS", secondary: "ADP", qty: 2 },
      { key: "c", position: "Bloodseeker", keywords: [keywords.blocker, keywords.human], cost: 105_000, ma: 5, st: 4, ag: 4, pa: 6, av: 10, skills: ["frenzy"], primary: "GMS", secondary: "AD", qty: 4 },
      { key: "d", position: "Bloodspawn", keywords: [keywords.bigGuy, keywords.spawn], cost: 160_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: ["claws", "frenzy", "loner4", "mightyBlow", "unchannelledFury"], primary: "MS", secondary: "AG", qty: 1 },
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
      { key: "a", position: "Skink Lineman", keywords: [keywords.lineman, keywords.lizardman], cost: 60_000, ma: 8, st: 2, ag: 3, pa: 4, av: 8, skills: ["dodge", "stunty"], primary: "A", secondary: "DGPS", qty: 16 },
      { key: "b", position: "Chameleon Skink", keywords: [keywords.lizardman, keywords.thrower], cost: 70_000, ma: 7, st: 2, ag: 3, pa: 3, av: 8, skills: ["dodge", "onTheBall", "shadowing", "stunty"], primary: "AP", secondary: "DGS", qty: 2 },
      { key: "c", position: "Saurus Blocker", keywords: [keywords.blocker, keywords.lizardman], cost: 90_000, ma: 6, st: 4, ag: 5, pa: 6, av: 10, skills: ["juggernaut", "unsteady"], primary: "GS", secondary: "A", qty: 6 },
      { key: "d", position: "Kroxigor", keywords: [keywords.bigGuy, keywords.lizardman], cost: 140_000, ma: 6, st: 5, ag: 5, pa: 6, av: 10, skills: ["boneHead", "loner4", "mightyBlow", "prehensileTail", "thickSkull"], primary: "S", secondary: "AG", qty: 1 },
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
      { key: "a", position: "Zombie Lineman", keywords: [keywords.human, keywords.lineman, keywords.undead, keywords.zombie], cost: 40_000, ma: 4, st: 3, ag: 4, pa: 6, av: 9, skills: ["eyeGouge", "regeneration", "unsteady"], primary: "DG", secondary: "AS", qty: 16 },
      { key: "b", position: "Ghoul Runner", keywords: [keywords.ghoul, keywords.runner, keywords.undead], cost: 75_000, ma: 7, st: 3, ag: 3, pa: 3, av: 8, skills: ["dodge", "regeneration"], primary: "AG", secondary: "DPS", qty: 2 },
      { key: "c", position: "Wraith", keywords: [keywords.blocker, keywords.undead, keywords.wraith], cost: 85_000, ma: 6, st: 3, ag: 3, pa: undefined, av: 9, skills: ["block", "foulAppearance", "noBall", "regeneration", "sidestep"], primary: "GS", secondary: "AD", qty: 2 },
      { key: "d", position: "Flesh Golem", keywords: [keywords.blocker, keywords.construct, keywords.undead], cost: 110_000, ma: 4, st: 4, ag: 4, pa: 6, av: 10, skills: ["regeneration", "standFirm", "thickSkull", "unsteady"], primary: "GS", secondary: "AD", qty: 2 },
      { key: "e", position: "Werewolf", keywords: [keywords.blitzer, keywords.undead, keywords.werewolf], cost: 120_000, ma: 8, st: 3, ag: 3, pa: 3, av: 9, skills: ["claws", "frenzy", "regeneration"], primary: "AG", secondary: "DPS", qty: 2 },
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
      { key: "a", position: "Norse Raider", keywords: [keywords.human, keywords.lineman], cost: 50_000, ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: ["block", "drunkard", "thickSkull", "unsteady"], primary: "G", secondary: "APS", qty: 16 },
      { key: "b", position: "Beer Boar", keywords: [keywords.animal, keywords.special], cost: 20_000, ma: 5, st: 1, ag: 3, pa: undefined, av: 6, skills: ["dodge", "noBall", "pickMeUp", "stunty", "titchy"], primary: "", secondary: "A", qty: 2 },
      { key: "c", position: "Norse Berserker", keywords: [keywords.blitzer, keywords.human], cost: 90_000, ma: 6, st: 3, ag: 3, pa: 5, av: 8, skills: ["block", "frenzy", "jumpUp"], primary: "GS", secondary: "AP", qty: 2 },
      { key: "d", position: "Valkyrie", keywords: [keywords.catcher, keywords.human, keywords.thrower], cost: 95_000, ma: 7, st: 3, ag: 3, pa: 3, av: 8, skills: ["catch", "dauntless", "pass", "stripBall"], primary: "AGP", secondary: "S", qty: 2 },
      { key: "e", position: "Ulfwerener", keywords: [keywords.blocker, keywords.human], cost: 105_000, ma: 6, st: 4, ag: 4, pa: 6, av: 9, skills: ["frenzy", "unsteady"], primary: "GS", secondary: "A", qty: 2 },
      { key: "f", position: "Yhetee", keywords: [keywords.bigGuy, keywords.yhetee], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: ["claws", "disturbingPresence", "frenzy", "loner4", "unchannelledFury"], primary: "S", secondary: "AG", qty: 1 },
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
      { key: "a", position: "Rotter Lineman", keywords: [keywords.human, keywords.lineman], cost: 40_000, ma: 5, st: 3, ag: 4, pa: 6, av: 9, skills: ["decay", "plagueRidden"], primary: "DGM", secondary: "AS", qty: 16 },
      { key: "b", position: "Pestigor", keywords: [keywords.beastman, keywords.runner], cost: 70_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: ["horns", "plagueRidden", "regeneration", "steadyFooting", "thickSkull"], primary: "GMS", secondary: "ADP", qty: 2 },
      { key: "c", position: "Bloater", keywords: [keywords.blocker, keywords.human], cost: 110_000, ma: 4, st: 4, ag: 4, pa: 6, av: 10, skills: ["disturbingPresence", "foulAppearance", "plagueRidden", "regeneration", "standFirm", "unsteady"], primary: "GMS", secondary: "AD", qty: 4 },
      { key: "d", position: "Rotspawn", keywords: [keywords.bigGuy, keywords.spawn], cost: 140_000, ma: 4, st: 5, ag: 5, pa: 6, av: 10, skills: ["disturbingPresence", "foulAppearance", "loner4", "mightyBlow", "pickMeUp", "plagueRidden", "reallyStupid", "regeneration", "tentacles"], primary: "S", secondary: "DGM", qty: 1 },
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
      { key: "a", position: "Gnoblar Lineman", keywords: [keywords.gnoblar, keywords.lineman], cost: 15_000, ma: 5, st: 1, ag: 3, pa: 4, av: 6, skills: ["dodge", "rightStuff", "sidestep", "stunty", "titchy"], primary: "AD", secondary: "G", qty: 16 },
      { key: "b", position: "Ogre Blocker", keywords: [keywords.bigGuy, keywords.blocker, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: ["boneHead", "mightyBlow", "thickSkull", "throwTeamMate"], primary: "S", secondary: "ADGP", qty: 5 },
      { key: "c", position: "Ogre Runt Punter", keywords: [keywords.bigGuy, keywords.ogre, keywords.thrower], cost: 145_000, ma: 5, st: 5, ag: 4, pa: 4, av: 10, skills: ["boneHead", "kickTeamMate", "mightyBlow", "thickSkull"], primary: "PS", secondary: "ADG", qty: 1 },
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
      { key: "b", position: "Halfling Hopeful", keywords: [keywords.halfling, keywords.lineman], cost: 30_000, ma: 5, st: 2, ag: 3, pa: 4, av: 7, skills: ["dodge", "rightStuff", "stunty"], primary: "A", secondary: "GS", qty: 3 },
      { key: "c", position: "Human Catcher", keywords: [keywords.catcher, keywords.human], cost: 75_000, ma: 8, st: 3, ag: 3, pa: 4, av: 8, skills: ["catch", "dodge"], primary: "AG", secondary: "PS", qty: 1 },
      { key: "d", position: "Dwarf Lineman", keywords: [keywords.dwarf, keywords.lineman], cost: 70_000, ma: 4, st: 3, ag: 4, pa: 5, av: 10, skills: ["block", "defensive", "thickSkull"], primary: "DG", secondary: "S", qty: 3 },
      { key: "e", position: "Human Thrower", keywords: [keywords.human, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: ["pass", "sureHands"], primary: "GP", secondary: "AS", qty: 1 },
      { key: "f", position: "Dwarf Runner", keywords: [keywords.dwarf, keywords.runner], cost: 80_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: ["sprint", "sureHands", "thickSkull"], primary: "GP", secondary: "AS", qty: 1 },
      { key: "g", position: "Human Blitzer", keywords: [keywords.blitzer, keywords.human], cost: 85_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: ["block", "tackle"], primary: "GS", secondary: "A", qty: 1 },
      { key: "h", position: "Dwarf Blitzer", keywords: [keywords.blitzer, keywords.dwarf], cost: 100_000, ma: 5, st: 3, ag: 4, pa: 4, av: 10, skills: ["block", "divingTackle", "tackle", "thickSkull"], primary: "GS", secondary: "P", qty: 1 },
      { key: "i", position: "Troll Slayer", keywords: [keywords.dwarf, keywords.special], cost: 95_000, ma: 5, st: 3, ag: 4, pa: 5, av: 9, skills: ["block", "dauntless", "frenzy", "hatredTroll", "thickSkull"], primary: "GS", secondary: "A", qty: 1 },
      // FAQ: Remove Mutation (M) from secondary skill access.
      { key: "j", position: "Ogre", keywords: [keywords.bigGuy, keywords.ogre], cost: 140_000, ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: ["boneHead", "loner3", "mightyBlow", "thickSkull", "throwTeamMate"], primary: "S", secondary: "AG", qty: 1 },
      // FAQ: Add Loner (4+) trait.
      { key: "k", position: "Altern Forest Treeman", keywords: [keywords.bigGuy, keywords.treeman], cost: 120_000, ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: ["loner4", "mightyBlow", "standFirm", "strongArm", "takeRoot", "thickSkull", "throwTeamMate", "timmmber"], primary: "S", secondary: "AGP", qty: 1 },
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
      { key: "b", position: "Goblin Lineman", keywords: [keywords.goblin, keywords.lineman], cost: 40_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: ["dodge", "rightStuff", "stunty"], primary: "AD", secondary: "GPS", qty: 4 },
      { key: "c", position: "Orc Thrower", keywords: [keywords.orc, keywords.thrower], cost: 75_000, ma: 6, st: 3, ag: 3, pa: 3, av: 9, skills: ["pass", "sureHands"], primary: "GP", secondary: "ADS", qty: 2 },
      { key: "d", position: "Orc Blitzer", keywords: [keywords.blitzer, keywords.orc], cost: 85_000, ma: 6, st: 3, ag: 3, pa: 4, av: 10, skills: ["block", "breakTackle"], primary: "GS", secondary: "AD", qty: 2 },
      { key: "e", position: "Big Un Blocker", keywords: [keywords.blocker, keywords.orc], cost: 95_000, ma: 5, st: 4, ag: 4, pa: 6, av: 10, skills: ["mightyBlow", "taunt", "thickSkull", "unsteady"], primary: "GS", secondary: "AD", qty: 2 },
      { key: "f", position: "Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: ["alwaysHungry", "loner4", "mightyBlow", "projectileVomit", "reallyStupid", "regeneration", "throwTeamMate"], primary: "S", secondary: "AGP", qty: 1 },
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
      { key: "a", position: "Skeleton Lineman", keywords: [keywords.human, keywords.lineman, keywords.skeleton, keywords.undead], cost: 40_000, ma: 5, st: 3, ag: 4, pa: 6, av: 8, skills: ["regeneration", "thickSkull"], primary: "G", secondary: "ADS", qty: 16 },
      { key: "b", position: "Zombie Lineman", keywords: [keywords.human, keywords.lineman, keywords.undead, keywords.zombie], cost: 40_000, ma: 4, st: 3, ag: 4, pa: 6, av: 9, skills: ["eyeGouge", "regeneration", "unsteady"], primary: "DG", secondary: "AS", qty: 16 },
      { key: "c", position: "Ghoul Runner", keywords: [keywords.ghoul, keywords.runner, keywords.undead], cost: 75_000, ma: 7, st: 3, ag: 3, pa: 3, av: 8, skills: ["dodge", "regeneration"], primary: "AG", secondary: "DPS", qty: 2 },
      { key: "d", position: "Wight Blitzer", keywords: [keywords.blitzer, keywords.human, keywords.skeleton, keywords.undead], cost: 95_000, ma: 6, st: 3, ag: 3, pa: 5, av: 9, skills: ["block", "regeneration", "tackle", "thickSkull"], primary: "GS", secondary: "AD", qty: 2 },
      { key: "e", position: "Mummy", keywords: [keywords.bigGuy, keywords.blocker, keywords.human, keywords.undead], cost: 125_000, ma: 3, st: 5, ag: 5, pa: 6, av: 10, skills: ["mightyBlow", "regeneration"], primary: "S", secondary: "AG", qty: 2 },
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
      { key: "b", position: "Skaven Thrower", keywords: [keywords.skaven, keywords.thrower], cost: 80_000, ma: 7, st: 3, ag: 3, pa: 2, av: 8, skills: ["pass", "sureHands"], primary: "GP", secondary: "ADMS", qty: 2 },
      { key: "c", position: "Gutter Runner", keywords: [keywords.runner, keywords.skaven], cost: 85_000, ma: 9, st: 2, ag: 2, pa: 4, av: 8, skills: ["dodge", "stab"], primary: "ADG", secondary: "MS", qty: 2 },
      { key: "d", position: "Skaven Blitzer", keywords: [keywords.blitzer, keywords.skaven], cost: 90_000, ma: 8, st: 3, ag: 3, pa: 4, av: 9, skills: ["block", "stripBall"], primary: "GS", secondary: "ADM", qty: 2 },
      { key: "e", position: "Rat Ogre", keywords: [keywords.bigGuy, keywords.skaven], cost: 150_000, ma: 6, st: 5, ag: 4, pa: 6, av: 9, skills: ["animalSavagery", "frenzy", "loner4", "mightyBlow", "prehensileTail"], primary: "S", secondary: "AGM", qty: 1 },
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
      { key: "a", position: "Slann Lineman", keywords: [keywords.lineman, keywords.lizardman], cost: 60_000, ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: ["pogo"], primary: "G", secondary: "AS", qty: 16 },
      { key: "b", position: "Slann Catcher", keywords: [keywords.catcher, keywords.lizardman], cost: 80_000, ma: 7, st: 2, ag: 2, pa: 3, av: 8, skills: ["divingCatch", "onTheBall", "pogo", "veryLongLegs"], primary: "AG", secondary: "PS", qty: 2 },
      { key: "c", position: "Slann Blitzer", keywords: [keywords.blitzer, keywords.lizardman], cost: 100_000, ma: 7, st: 3, ag: 3, pa: 4, av: 9, skills: ["divingTackle", "hitAndRun", "jumpUp", "pogo"], primary: "AGS", secondary: "P", qty: 2 },
      { key: "d", position: "Kroxigor", keywords: [keywords.bigGuy, keywords.lizardman], cost: 140_000, ma: 6, st: 5, ag: 5, pa: 6, av: 10, skills: ["boneHead", "loner4", "mightyBlow", "prehensileTail", "thickSkull"], primary: "S", secondary: "AG", qty: 1 },
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
      { key: "a", position: "Snotling Lineman", keywords: [keywords.lineman, keywords.snotling], cost: 15_000, ma: 5, st: 1, ag: 3, pa: 4, av: 6, skills: ["dodge", "insignificant", "rightStuff", "sidestep", "stunty", "titchy"], primary: "AD", secondary: "G", qty: 16 },
      { key: "b", position: "Fun-hoppa", keywords: [keywords.snotling, keywords.special], cost: 20_000, ma: 6, st: 1, ag: 3, pa: 4, av: 6, skills: ["dodge", "pogo", "rightStuff", "sidestep", "stunty"], primary: "AD", secondary: "G", qty: 2 },
      { key: "c", position: "Stilty Runna", keywords: [keywords.runner, keywords.snotling], cost: 20_000, ma: 6, st: 1, ag: 3, pa: 4, av: 6, skills: ["dodge", "rightStuff", "sidestep", "sprint", "stunty"], primary: "AD", secondary: "G", qty: 2 },
      { key: "d", position: "Fungus Flinga", keywords: [keywords.snotling, keywords.special], cost: 30_000, ma: 5, st: 1, ag: 3, pa: 4, av: 6, skills: ["bombardier", "dodge", "rightStuff", "secretWeapon", "sidestep", "stunty", "titchy"], primary: "ADP", secondary: "G", qty: 2 },
      { key: "e", position: "Pump Wagon", keywords: [keywords.bigGuy, keywords.snotling, keywords.special], cost: 100_000, ma: 5, st: 5, ag: 5, pa: 6, av: 9, skills: ["dirtyPlayer", "juggernaut", "mightyBlow", "reallyStupid", "standFirm"], primary: "DS", secondary: "AG", qty: 2 },
      { key: "f", position: "Trained Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: ["alwaysHungry", "mightyBlow", "projectileVomit", "reallyStupid", "regeneration", "throwTeamMate"], primary: "S", secondary: "AGP", qty: 2 },
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
      { key: "a", position: "Skeleton Lineman", keywords: [keywords.human, keywords.lineman, keywords.skeleton, keywords.undead], cost: 40_000, ma: 5, st: 3, ag: 4, pa: 6, av: 8, skills: ["regeneration", "thickSkull"], primary: "G", secondary: "ADS", qty: 16 },
      { key: "b", position: "Tomb Kings Thrower", keywords: [keywords.human, keywords.skeleton, keywords.thrower, keywords.undead], cost: 65_000, ma: 6, st: 3, ag: 4, pa: 3, av: 9, skills: ["pass", "regeneration", "sureHands", "thickSkull"], primary: "GP", secondary: "ADS", qty: 2 },
      { key: "c", position: "Tomb Kings Blitzer", keywords: [keywords.blitzer, keywords.human, keywords.skeleton, keywords.undead], cost: 85_000, ma: 6, st: 3, ag: 4, pa: 5, av: 9, skills: ["block", "regeneration", "thickSkull"], primary: "GS", secondary: "AD", qty: 2 },
      { key: "d", position: "Tomb Guardian", keywords: [keywords.bigGuy, keywords.blocker, keywords.human, keywords.undead], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 6, av: 10, skills: ["brawler", "decay", "regeneration"], primary: "S", secondary: "AG", qty: 4 },
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
      { key: "a", position: "Goblin Lineman", keywords: [keywords.goblin, keywords.lineman], cost: 40_000, ma: 6, st: 2, ag: 3, pa: 4, av: 8, skills: ["dodge", "rightStuff", "stunty"], primary: "ADM", secondary: "GPS", qty: 16 },
      { key: "b", position: "Snotling Lineman", keywords: [keywords.lineman, keywords.snotling], cost: 15_000, ma: 5, st: 1, ag: 3, pa: 4, av: 6, skills: ["dodge", "insignificant", "rightStuff", "sidestep", "stunty", "titchy"], primary: "ADM", secondary: "G", qty: 6 },
      { key: "c", position: "Skaven Clanrat", keywords: [keywords.lineman, keywords.skaven], cost: 50_000, ma: 7, st: 3, ag: 3, pa: 4, av: 8, skills: ["animosityGoblin"], primary: "DGM", secondary: "AS", qty: 3 },
      { key: "d", position: "Skaven Thrower", keywords: [keywords.skaven, keywords.thrower], cost: 80_000, ma: 7, st: 3, ag: 3, pa: 2, av: 8, skills: ["animosityGoblin", "pass", "sureHands"], primary: "GMP", secondary: "ADS", qty: 1 },
      { key: "e", position: "Gutter Runner", keywords: [keywords.runner, keywords.skaven], cost: 85_000, ma: 9, st: 2, ag: 2, pa: 4, av: 8, skills: ["animosityGoblin", "dodge", "stab"], primary: "ADGM", secondary: "S", qty: 1 },
      { key: "f", position: "Skaven Blitzer", keywords: [keywords.blitzer, keywords.skaven], cost: 90_000, ma: 8, st: 3, ag: 3, pa: 4, av: 9, skills: ["animosityGoblin", "block", "stripBall"], primary: "GMS", secondary: "AD", qty: 1 },
      { key: "g", position: "Troll", keywords: [keywords.bigGuy, keywords.troll], cost: 115_000, ma: 4, st: 5, ag: 5, pa: 5, av: 10, skills: ["alwaysHungry", "loner4", "mightyBlow", "projectileVomit", "reallyStupid", "regeneration", "throwTeamMate"], primary: "MS", secondary: "AGP", qty: 1 },
      { key: "h", position: "Rat Ogre", keywords: [keywords.bigGuy, keywords.skaven], cost: 150_000, ma: 6, st: 5, ag: 4, pa: 6, av: 9, skills: ["animalSavagery", "frenzy", "loner4", "mightyBlow", "prehensileTail"], primary: "MS", secondary: "AG", qty: 1 },
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
      { key: "b", position: "Vampire Runner", keywords: [keywords.runner, keywords.undead, keywords.vampire], cost: 100_000, ma: 8, st: 3, ag: 2, pa: 3, av: 8, skills: ["bloodlust2", "hypnoticGaze", "regeneration"], primary: "AG", secondary: "PS", qty: 2 },
      { key: "c", position: "Vampire Thrower", keywords: [keywords.thrower, keywords.undead, keywords.vampire], cost: 110_000, ma: 6, st: 4, ag: 2, pa: 2, av: 9, skills: ["bloodlust2", "hypnoticGaze", "pass", "regeneration"], primary: "AGP", secondary: "S", qty: 2 },
      { key: "d", position: "Vampire Blitzer", keywords: [keywords.blitzer, keywords.undead, keywords.vampire], cost: 110_000, ma: 6, st: 4, ag: 2, pa: 4, av: 9, skills: ["bloodlust3", "hypnoticGaze", "juggernaut", "regeneration"], primary: "AGS", secondary: "", qty: 2 },
      { key: "e", position: "Vargheist", keywords: [keywords.bigGuy, keywords.undead, keywords.vampire], cost: 150_000, ma: 5, st: 5, ag: 4, pa: 6, av: 10, skills: ["bloodlust3", "claws", "frenzy", "loner4", "regeneration"], primary: "S", secondary: "AG", qty: 1 },
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
      { key: "b", position: "Wood Elf Thrower", keywords: [keywords.elf, keywords.thrower], cost: 85_000, ma: 7, st: 3, ag: 2, pa: 2, av: 8, skills: ["pass", "safePairOfHands"], primary: "AGP", secondary: "S", qty: 2 },
      { key: "c", position: "Wood Elf Catcher", keywords: [keywords.catcher, keywords.elf], cost: 90_000, ma: 8, st: 2, ag: 2, pa: 3, av: 8, skills: ["catch", "dodge", "sprint"], primary: "AG", secondary: "PS", qty: 2 },
      { key: "d", position: "Wardancer", keywords: [keywords.blitzer, keywords.elf], cost: 130_000, ma: 8, st: 3, ag: 2, pa: 3, av: 8, skills: ["block", "dodge", "leap"], primary: "AG", secondary: "PS", qty: 2 },
      { key: "e", position: "Loren Forest Treeman", keywords: [keywords.bigGuy, keywords.treeman], cost: 120_000, ma: 2, st: 6, ag: 5, pa: 5, av: 11, skills: ["loner4", "mightyBlow", "standFirm", "strongArm", "takeRoot", "thickSkull", "throwTeamMate"], primary: "S", secondary: "AGP", qty: 1 },
    ],
    costOfReRolls: 50_000,
    apothecaryAllowed: true,
  },
];

/** All available star players. */
export const starPlayers: PlayerProfile[] = [
  { key: "akhorne", name: "Akhorne the Squirrel", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.squirrel], ma: 7, st: 1, ag: 2, pa: undefined, av: 6, skills: ["claws", "dauntless", "dodge", "frenzy", "jumpUp", "loner4", "noBall", "sidestep", "stunty", "titchy"], cost: 80_000, playsFor: [ANY_TEAM], specialRule: "Blind Rage" },
  { key: "anqi", name: "Anqi Panqi", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.lizardman], ma: 7, st: 4, ag: 5, pa: 6, av: 10, skills: ["block", "grab", "loner4", "standFirm", "unsteady"], cost: 190_000, playsFor: [leagues.lustrianSuperleague], specialRule: "Savage Blow" },
  { key: "barik", name: "Barik Farblast", position: STAR_PLAYER, keywords: [keywords.dwarf, keywords.thrower], ma: 6, st: 3, ag: 4, pa: 3, av: 9, skills: ["cannoneer", "hailMaryPass", "loner4", "pass", "secretWeapon", "sureHands", "thickSkull"], cost: 80_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Blast It!" },
  { key: "bilerot", name: "Bilerot Vomitflesh", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.human], ma: 4, st: 5, ag: 4, pa: 6, av: 10, skills: ["dirtyPlayer", "disturbingPresence", "foulAppearance", "loneFouler", "loner4", "regeneration", "unsteady"], cost: 180_000, playsFor: [favouredOf.nurgle], specialRule: "Putrid Regurgitation" },
  { key: "black-gobbo", name: "The Black Gobbo", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 6, st: 2, ag: 3, pa: 3, av: 8, skills: ["bombardier", "disturbingPresence", "dodge", "loner3", "sidestep", "sneakyGit", "stab", "stunty"], cost: 210_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Sneakiest of the Lot" },
  { key: "boa", name: "Boa Kon’ssstriktr", position: STAR_PLAYER, keywords: [keywords.runner, keywords.snakeman], ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: ["dodge", "fend", "hypnoticGaze", "loner4", "prehensileTail", "safePairOfHands", "sidestep"], cost: 180_000, playsFor: [leagues.lustrianSuperleague], specialRule: "Look Into My Eyes" },
  { key: "bomber", name: "Bomber Dribblesnot", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 6, st: 2, ag: 3, pa: 3, av: 8, skills: ["accurate", "bombardier", "dodge", "loner4", "rightStuff", "secretWeapon", "stunty"], cost: 80_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Kaboom!" },
  { key: "karina", name: "Captain Karina von Riesz", position: STAR_PLAYER, keywords: [keywords.runner, keywords.vampire], ma: 7, st: 4, ag: 2, pa: 3, av: 9, skills: ["bloodlust2", "dodge", "hypnoticGaze", "jumpUp", "loner4", "regeneration"], cost: 230_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Tasty Morsel" },
  { key: "cindy", name: "Cindy Piewhistle", position: STAR_PLAYER, keywords: [keywords.halfling, keywords.special], ma: 5, st: 2, ag: 3, pa: 3, av: 7, skills: ["accurate", "bombardier", "dodge", "loner4", "secretWeapon", "stunty"], cost: 100_000, playsFor: [leagues.halflingThimbleCup, leagues.oldWorldClassic], specialRule: "All You Can Eat" },
  { key: "luthor", name: "Count Luthor von Drakenborg", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.vampire], ma: 6, st: 5, ag: 2, pa: 3, av: 10, skills: ["block", "hypnoticGaze", "loner4", "regeneration", "sidestep"], cost: 300_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Star of the Show" },
  { key: "deeproot", name: "Deeproot Strongbranch", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.treeman], ma: 2, st: 7, ag: 5, pa: 4, av: 11, skills: ["block", "bullseye", "loner4", "mightyBlow", "standFirm", "strongArm", "thickSkull", "throwTeamMate", "timmmber"], cost: 280_000, playsFor: [leagues.woodlandLeague], specialRule: "Reliable" },
  { key: "dribl", name: "Dribl", position: STAR_PLAYER, keywords: [keywords.skink, keywords.special], ma: 8, st: 2, ag: 3, pa: 4, av: 8, skills: ["dirtyPlayer", "dodge", "loner4", "quickFoul", "sidestep", "sneakyGit", "stunty"], cost: 230_000, playsFor: [leagues.lustrianSuperleague], specialRule: "A Sneaky Pair" },
  { key: "drull", name: "Drull", position: STAR_PLAYER, keywords: [keywords.skink, keywords.special], ma: 8, st: 2, ag: 3, pa: 4, av: 8, skills: ["dodge", "loner4", "sidestep", "stab", "stunty"], cost: 0, playsFor: [leagues.lustrianSuperleague], specialRule: "A Sneaky Pair" },
  { key: "eldril", name: "Eldril Sidewinder", position: STAR_PLAYER, keywords: [keywords.catcher, keywords.elf], ma: 8, st: 3, ag: 2, pa: 3, av: 8, skills: ["catch", "dodge", "hypnoticGaze", "loner4", "nervesOfSteel", "onTheBall"], cost: 220_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Mesmerising Dance" },
  { key: "estelle", name: "Estelle la Veneaux", position: STAR_PLAYER, keywords: [keywords.human, keywords.lineman], ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: ["disturbingPresence", "dodge", "guard", "loner4", "sidestep"], cost: 190_000, playsFor: [leagues.lustrianSuperleague], specialRule: "Baleful Hex" },
  { key: "fungus", name: "Fungus the Loon", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 4, st: 7, ag: 3, pa: undefined, av: 8, skills: ["ballAndChain", "loner4", "mightyBlow", "noBall", "secretWeapon", "stunty"], cost: 80_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Whirling Dervish" },
  { key: "glart", name: "Glart Smashrip", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.skaven], ma: 5, st: 4, ag: 4, pa: 6, av: 9, skills: ["block", "claws", "grab", "juggernaut", "loner4", "standFirm"], cost: 175_000, playsFor: [leagues.underworldChallenge], specialRule: "Frenzied Rush" },
  { key: "gloriel", name: "Gloriel Summerbloom", position: STAR_PLAYER, keywords: [keywords.elf, keywords.thrower], ma: 7, st: 2, ag: 2, pa: 2, av: 8, skills: ["accurate", "dodge", "loner3", "pass", "sidestep", "sureHands"], cost: 150_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Shot to Nothing" },
  { key: "glotl", name: "Glotl Stop", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.lizardman], ma: 6, st: 6, ag: 5, pa: 6, av: 10, skills: ["animalSavagery", "frenzy", "loner4", "mightyBlow", "prehensileTail", "standFirm", "thickSkull"], cost: 260_000, playsFor: [leagues.lustrianSuperleague], specialRule: "Primal Savagery" },
  { key: "grak", name: "Grak", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.ogre], ma: 5, st: 5, ag: 4, pa: 4, av: 10, skills: ["boneHead", "kickTeamMate", "loner4", "mightyBlow", "thickSkull"], cost: 250_000, playsFor: [ANY_TEAM], specialRule: "I’ll Carry You" },
  { key: "crumbleberry", name: "Crumbleberry", position: STAR_PLAYER, keywords: [keywords.halfling, keywords.lineman], ma: 5, st: 2, ag: 3, pa: 5, av: 7, skills: ["dodge", "lethalFlight", "loner4", "rightStuff", "stunty", "sureHands"], cost: 0, playsFor: [ANY_TEAM], specialRule: "I’ll Carry You" },
  { key: "grashnak", name: "Grashnak Blackhoof", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.minotaur], ma: 6, st: 6, ag: 4, pa: 6, av: 9, skills: ["frenzy", "horns", "loner4", "mightyBlow", "thickSkull", "unchannelledFury"], cost: 240_000, playsFor: [leagues.chaosClash], specialRule: "Gored by the Bull" },
  { key: "gretchen", name: "Gretchen Wächter", position: STAR_PLAYER, keywords: [keywords.special, keywords.undead, keywords.wraith], ma: 7, st: 3, ag: 2, pa: undefined, av: 9, skills: ["disturbingPresence", "dodge", "foulAppearance", "jumpUp", "loner4", "noBall", "regeneration", "shadowing", "sidestep"], cost: 180_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Incorporeal" },
  { key: "griff", name: "Griff Oberwald", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human], ma: 7, st: 4, ag: 2, pa: 3, av: 9, skills: ["block", "dodge", "fend", "loner3", "sprint", "sureFeet"], cost: 300_000, playsFor: [leagues.oldWorldClassic], specialRule: "Consummate Professional" },
  { key: "grim", name: "Grim Ironjaw", position: STAR_PLAYER, keywords: [keywords.dwarf, keywords.special], ma: 5, st: 4, ag: 3, pa: 6, av: 9, skills: ["block", "dauntless", "frenzy", "hatredBigGuy", "loner4", "multipleBlock", "thickSkull"], cost: 190_000, playsFor: [leagues.worldsEdgeSuperleague], specialRule: "Slayer" },
  { key: "grombrindal", name: "Grombrindal", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.dwarf], ma: 5, st: 3, ag: 3, pa: 4, av: 10, skills: ["block", "breakTackle", "dauntless", "loner4", "mightyBlow", "standFirm", "sureFeet", "thickSkull"], cost: 170_000, playsFor: [leagues.halflingThimbleCup, leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Wisdom of the White Dwarf" },
  { key: "guffle", name: "Guffle Pusmaw", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.human], ma: 5, st: 4, ag: 4, pa: 6, av: 10, skills: ["foulAppearance", "loner4", "monstrousMouth", "nervesOfSteel", "onTheBall", "plagueRidden"], cost: 150_000, playsFor: [favouredOf.nurgle], specialRule: "Quick Bite" },
  { key: "hakflem", name: "Hakflem Skuttlespike", position: STAR_PLAYER, keywords: [keywords.runner, keywords.skaven], ma: 8, st: 3, ag: 2, pa: 3, av: 8, skills: ["dodge", "extraArms", "loner4", "prehensileTail", "twoHeads"], cost: 200_000, playsFor: [leagues.underworldChallenge], specialRule: "Treacherous" },
  { key: "helmut", name: "Helmut Wulf", position: STAR_PLAYER, keywords: [keywords.human, keywords.special], ma: 6, st: 3, ag: 3, pa: undefined, av: 9, skills: ["chainsaw", "loner4", "noBall", "pro", "secretWeapon", "standFirm"], cost: 140_000, playsFor: [leagues.oldWorldClassic], specialRule: "Old Pro" },
  { key: "hthark", name: "H’thark the Unstoppable", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.dwarf], ma: 6, st: 6, ag: 4, pa: 6, av: 10, skills: ["block", "breakTackle", "defensive", "juggernaut", "loner4", "sprint", "sureFeet", "thickSkull", "unsteady"], cost: 300_000, playsFor: [leagues.badlandsBrawl, favouredOf.hashut], specialRule: "Unstoppable Momentum" },
  { key: "ivan", name: "Ivan ‘the Animal’ Deathshroud", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human, keywords.skeleton, keywords.undead], ma: 6, st: 4, ag: 4, pa: 5, av: 9, skills: ["block", "disturbingPresence", "hatredDwarf", "juggernaut", "loner4", "regeneration", "stripBall", "tackle"], cost: 210_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Dwarven Scourge" },
  { key: "ivar", name: "Ivar Eriksson", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human], ma: 6, st: 4, ag: 3, pa: 4, av: 9, skills: ["block", "guard", "loner4", "tackle"], cost: 215_000, playsFor: [leagues.oldWorldClassic], specialRule: "Raiding Party" },
  { key: "jeremiah", name: "Jeremiah Kool", position: STAR_PLAYER, keywords: [keywords.elf, keywords.runner], ma: 8, st: 3, ag: 1, pa: 2, av: 9, skills: ["block", "dodge", "divingCatch", "loner4", "nervesOfSteel", "onTheBall", "pass", "sidestep"], cost: 300_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "The Flashing Blade" },
  { key: "jordell", name: "Jordell Freshbreeze", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.elf], ma: 8, st: 3, ag: 1, pa: 3, av: 8, skills: ["block", "divingCatch", "dodge", "leap", "loner4", "sidestep", "steadyFooting"], cost: 280_000, playsFor: [leagues.elvenKingdomsLeague, leagues.woodlandLeague], specialRule: "Swift as the Breeze" },
  { key: "bugman", name: "Josef Bugman", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.dwarf], ma: 5, st: 3, ag: 3, pa: 4, av: 9, skills: ["block", "drunkard", "fend", "loner3", "tackle", "taunt", "thickSkull"], cost: 180_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Dwarfen Grit" },
  { key: "karla", name: "Karla von Kill", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human], ma: 6, st: 4, ag: 3, pa: 3, av: 9, skills: ["block", "dauntless", "dodge", "jumpUp", "loner4"], cost: 210_000, playsFor: [leagues.lustrianSuperleague, leagues.oldWorldClassic], specialRule: "Indomitable" },
  { key: "kiroth", name: "Kiroth Krakeneye", position: STAR_PLAYER, keywords: [keywords.elf, keywords.runner], ma: 7, st: 3, ag: 2, pa: 3, av: 8, skills: ["disturbingPresence", "foulAppearance", "loner4", "onTheBall", "tackle", "tentacles"], cost: 160_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Black Ink" },
  { key: "kreek", name: "Kreek Rustgouger", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.skaven, keywords.special], ma: 4, st: 7, ag: 4, pa: undefined, av: 10, skills: ["ballAndChain", "loner4", "mightyBlow", "noBall", "prehensileTail", "secretWeapon"], cost: 180_000, playsFor: [leagues.underworldChallenge], specialRule: "I’ll Be Back!" },
  { key: "borak", name: "Lord Borak The Despoiler", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.human], ma: 5, st: 5, ag: 3, pa: 5, av: 10, skills: ["block", "dirtyPlayer", "leader", "loner3", "mightyBlow", "putTheBootIn", "sneakyGit"], cost: 270_000, playsFor: [leagues.chaosClash], specialRule: "Lord of Chaos" },
  { key: "maple", name: "Maple Highgrove", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.treeman], ma: 3, st: 5, ag: 5, pa: 5, av: 11, skills: ["brawler", "grab", "loner4", "mightyBlow", "standFirm", "tentacles", "thickSkull"], cost: 210_000, playsFor: [leagues.woodlandLeague], specialRule: "Vicious Vines" },
  { key: "max", name: "Max Spleenripper", position: STAR_PLAYER, keywords: [keywords.human, keywords.special], ma: 5, st: 4, ag: 4, pa: undefined, av: 9, skills: ["chainsaw", "loner4", "noBall", "secretWeapon"], cost: 130_000, playsFor: [favouredOf.khorne], specialRule: "Maximum Carnage" },
  { key: "zug", name: "The Mighty Zug", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.human], ma: 5, st: 5, ag: 4, pa: 6, av: 10, skills: ["block", "loner4", "mightyBlow", "unsteady"], cost: 220_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Crushing Blow" },
  { key: "morg", name: "Morg ‘n’ Thorg", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.ogre], ma: 6, st: 6, ag: 3, pa: 4, av: 11, skills: ["block", "bullseye", "hatredUndead", "loner4", "mightyBlow", "thickSkull", "throwTeamMate"], cost: 340_000, playsFor: [leagues.badlandsBrawl, leagues.chaosClash, leagues.elvenKingdomsLeague, leagues.halflingThimbleCup, leagues.lustrianSuperleague, leagues.oldWorldClassic, leagues.underworldChallenge, leagues.woodlandLeague, leagues.worldsEdgeSuperleague], specialRule: "The Ballista" },
  { key: "nobbla", name: "Nobbla Blackwart", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 6, st: 2, ag: 3, pa: undefined, av: 8, skills: ["block", "chainsaw", "dodge", "loner4", "noBall", "saboteur", "secretWeapon", "stunty"], cost: 120_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Kick ’em While They’re Down!" },
  { key: "puggy", name: "Puggy Baconbreath", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.halfling], ma: 5, st: 3, ag: 3, pa: 3, av: 8, skills: ["block", "dodge", "loner3", "nervesOfSteel", "rightStuff", "stunty"], cost: 130_000, playsFor: [leagues.halflingThimbleCup, leagues.oldWorldClassic], specialRule: "Halfling Luck" },
  { key: "rashnak", name: "Rashnak Backstabber", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 7, st: 3, ag: 3, pa: 5, av: 8, skills: ["loner4", "shadowing", "sidestep", "sneakyGit", "stab"], cost: 130_000, playsFor: [leagues.badlandsBrawl], specialRule: "Toxin Connoisseur" },
  { key: "ripper", name: "Ripper Bolgrot", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.troll], ma: 5, st: 6, ag: 5, pa: 4, av: 10, skills: ["bullseye", "grab", "loner4", "mightyBlow", "regeneration", "throwTeamMate"], cost: 250_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Thinking Man’s Troll" },
  { key: "rodney", name: "Rodney Roachbait", position: STAR_PLAYER, keywords: [keywords.gnome, keywords.special], ma: 6, st: 2, ag: 3, pa: 4, av: 7, skills: ["catch", "divingCatch", "jumpUp", "loner4", "onTheBall", "sidestep", "stunty", "wrestle"], cost: 70_000, playsFor: [leagues.woodlandLeague], specialRule: "Catch of the Day" },
  { key: "rowana", name: "Rowana Forestfoot", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.gnome], ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: ["dodge", "dumpOff", "guard", "horns", "jumpUp", "leap", "loner4"], cost: 160_000, playsFor: [leagues.woodlandLeague], specialRule: "Bounding Leap" },
  { key: "roxanna", name: "Roxanna Darknail", position: STAR_PLAYER, keywords: [keywords.elf, keywords.special], ma: 8, st: 3, ag: 1, pa: 3, av: 8, skills: ["dodge", "frenzy", "jumpUp", "juggernaut", "leap", "loner4"], cost: 270_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Slashing Nails" },
  { key: "rumbelow", name: "Rumbelow Sheepskin", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.halfling], ma: 6, st: 3, ag: 3, pa: 5, av: 8, skills: ["block", "horns", "juggernaut", "loner4", "tackle", "thickSkull"], cost: 170_000, playsFor: [leagues.halflingThimbleCup], specialRule: "Ram" },
  { key: "scrappa", name: "Scrappa Sorehead", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 7, st: 2, ag: 3, pa: 4, av: 8, skills: ["dirtyPlayer", "dodge", "loner4", "pogo", "rightStuff", "sprint", "stunty", "sureFeet"], cost: 120_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Yoink!" },
  { key: "scyla", name: "Scyla Anfingrimm", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.spawn], ma: 5, st: 5, ag: 4, pa: 6, av: 10, skills: ["claws", "frenzy", "loner4", "mightyBlow", "prehensileTail", "thickSkull", "unchannelledFury"], cost: 200_000, playsFor: [favouredOf.khorne], specialRule: "Fury of the Blood God" },
  { key: "skitter", name: "Skitter Stab-Stab", position: STAR_PLAYER, keywords: [keywords.runner, keywords.skaven], ma: 9, st: 2, ag: 2, pa: 4, av: 8, skills: ["dodge", "loner4", "prehensileTail", "shadowing", "stab"], cost: 170_000, playsFor: [leagues.underworldChallenge], specialRule: "Master Assassin" },
  { key: "skrorg", name: "Skrorg Snowpelt", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.yhetee], ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: ["block", "claws", "disturbingPresence", "juggernaut", "loner4", "mightyBlow"], cost: 240_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Pump Up the Crowd" },
  { key: "skrull", name: "Skrull Halfheight", position: STAR_PLAYER, keywords: [keywords.dwarf, keywords.skeleton, keywords.thrower, keywords.undead], ma: 6, st: 3, ag: 4, pa: 3, av: 9, skills: ["accurate", "loner4", "nervesOfSteel", "pass", "regeneration", "sureHands", "thickSkull"], cost: 150_000, playsFor: [leagues.sylvanianSpotlight, leagues.worldsEdgeSuperleague], specialRule: "Strong Passing Game" },
  { key: "lucien", name: "Lucien Swift", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.elf], ma: 7, st: 3, ag: 2, pa: 3, av: 9, skills: ["block", "loner4", "mightyBlow", "tackle"], cost: 300_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Working in Tandem" },
  { key: "valen", name: "Valen Swift", position: STAR_PLAYER, keywords: [keywords.elf, keywords.thrower], ma: 7, st: 3, ag: 2, pa: 2, av: 9, skills: ["accurate", "loner4", "nervesOfSteel", "pass", "safePass", "sureHands"], cost: 0, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Working in Tandem" },
  { key: "swiftvine", name: "Swiftvine Glimmershard", position: STAR_PLAYER, keywords: [keywords.special, keywords.spite], ma: 7, st: 2, ag: 3, pa: 5, av: 7, skills: ["disturbingPresence", "fend", "loner4", "sidestep", "stab", "stunty"], cost: 110_000, playsFor: [leagues.woodlandLeague], specialRule: "Furious Outburst" },
  { key: "thorsson", name: "Thorsson Stoutmead", position: STAR_PLAYER, keywords: [keywords.human, keywords.lineman], ma: 6, st: 3, ag: 4, pa: 3, av: 8, skills: ["block", "drunkard", "loner4", "thickSkull"], cost: 170_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Beer Barrel Bash" },
  { key: "varag", name: "Varag Ghoul-Chewer", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.orc], ma: 6, st: 5, ag: 3, pa: 5, av: 10, skills: ["block", "hatredUndead", "jumpUp", "loner4", "mightyBlow", "thickSkull", "unsteady"], cost: 260_000, playsFor: [leagues.badlandsBrawl], specialRule: "Krump and Smash" },
  { key: "wilhelm", name: "Wilhelm Chaney", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.undead, keywords.werewolf], ma: 8, st: 4, ag: 3, pa: 4, av: 9, skills: ["catch", "claws", "frenzy", "loner4", "regeneration", "wrestle"], cost: 220_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Savage Mauling" },
  { key: "willow", name: "Willow Rosebark", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.dryad], ma: 6, st: 4, ag: 3, pa: 5, av: 9, skills: ["dauntless", "loner4", "sidestep", "thickSkull"], cost: 160_000, playsFor: [leagues.woodlandLeague], specialRule: "Woodland Fury" },
  { key: "withergrasp", name: "Withergrasp Doubledrool", position: STAR_PLAYER, keywords: [keywords.beastman, keywords.blocker], ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: ["foulAppearance", "loner4", "prehensileTail", "tackle", "tentacles", "twoHeads", "wrestle"], cost: 170_000, playsFor: [favouredOf.nurgle], specialRule: "Watch Out!" },
  { key: "zolcath", name: "Zolcath the Zoat", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.zoat], ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: ["disturbingPresence", "juggernaut", "loner4", "mightyBlow", "prehensileTail", "regeneration", "sureFeet"], cost: 220_000, playsFor: [leagues.elvenKingdomsLeague, leagues.lustrianSuperleague], specialRule: "Excuse me, are you a Zoat?" },
  { key: "zzharg", name: "Zzharg Madeye", position: STAR_PLAYER, keywords: [keywords.dwarf, keywords.special], ma: 4, st: 4, ag: 4, pa: 3, av: 10, skills: ["cannoneer", "hailMaryPass", "loner4", "nervesOfSteel", "secretWeapon", "thickSkull"], cost: 130_000, playsFor: [favouredOf.hashut], specialRule: "Blastin’ Solves Everything" },
];

// Inducements

/** All inducements. */
export const inducements = {
  prayers: "Prayers to Nuffle",
  coaches: "Part-time Assistant Coaches",
  cheers: "Temp Agency Cheerleaders",
  mascot: "Team Mascot",
  weathMag: "Weather Mage",
  kegs: "Blitzer’s Best Kegs",
  bribes: "Bribes",
  extraTT: "Extra Team Training",
  mortAsst: "Mortuary Assistant",
  plagDoc: "Plague Doctor",
  rookies: "Riotous Rookies",
  wandApo: "Wandering Apothecary",
  chef: "Halfling Master Chef",
  dodgyRep: "Biased Referee: Dodgy League Rep",
  bugman: "Infamous Coaching Staff: Josef Bugman",
  sportsWiz: "Wizard: Sports-Wizard",
  despMeas: "Desperate Measures",
};

/** An available inducement with max and cost according to the current state. */
export interface AvailableInducement {
  key: keyof typeof inducements;
  max: number;
  cost: number;
}

/** Get the available inducements for a given roster and rules variant. */
export function getAvailableInducements(team: TeamState): AvailableInducement[] {
  const roster = rosters.find((r) => r.key === team.roster) as Roster;
  const result: AvailableInducement[] = [];
  if (team.variant === "sevens") {
    result.push({ key: "cheers", max: 2, cost: 15_000 });
    result.push({ key: "coaches", max: 2, cost: 15_000 });
    result.push({ key: "kegs", max: 2, cost: 50_000 });
    result.push({ key: "prayers", max: 2, cost: 5_000 });
    result.push({ key: "extraTT", max: 6, cost: 125_000 });
    if (roster.specialRules.includes(specialRules.briberyAndCorruption)) {
      result.push({ key: "bribes", max: 2, cost: 50_000 });
    } else {
      result.push({ key: "bribes", max: 2, cost: 100_000 });
    }
    if (roster.apothecaryAllowed) {
      result.push({ key: "wandApo", max: 1, cost: 100_000 });
    }
    if (roster.specialRules.includes(specialRules.mastersOfUndeath)) {
      result.push({ key: "mortAsst", max: 1, cost: 100_000 });
    }
    if (team.favouredOf && roster.favouredOf[team.favouredOf - 1] === favouredOf.nurgle) {
      result.push({ key: "plagDoc", max: 1, cost: 100_000 });
    }
    if (team.roster === "halfling") {
      result.push({ key: "chef", max: 1, cost: 100_000 });
    } else {
      result.push({ key: "chef", max: 1, cost: 300_000 });
    }
    result.push({ key: "despMeas", max: 5, cost: 50_000 });
  } else {
    // variant standard
    result.push({ key: "prayers", max: 3, cost: 10_000 });
    result.push({ key: "coaches", max: 5, cost: 20_000 });
    result.push({ key: "cheers", max: 5, cost: 5_000 });
    result.push({ key: "mascot", max: 1, cost: 25_000 });
    result.push({ key: "weathMag", max: 1, cost: 25_000 });
    result.push({ key: "kegs", max: 2, cost: 50_000 });
    if (roster.specialRules.includes(specialRules.briberyAndCorruption)) {
      result.push({ key: "bribes", max: 6, cost: 50_000 });
    } else {
      result.push({ key: "bribes", max: 3, cost: 100_000 });
    }
    result.push({ key: "extraTT", max: 8, cost: 100_000 });
    if (roster.specialRules.includes(specialRules.mastersOfUndeath)) {
      result.push({ key: "mortAsst", max: 1, cost: 100_000 });
    }
    if (team.favouredOf && roster.favouredOf[team.favouredOf - 1] === favouredOf.nurgle) {
      result.push({ key: "plagDoc", max: 1, cost: 100_000 });
    }
    if (roster.specialRules.includes(specialRules.lowCostLinemen)) {
      result.push({ key: "rookies", max: 1, cost: 150_000 });
    }
    if (roster.apothecaryAllowed) {
      result.push({ key: "wandApo", max: 2, cost: 100_000 });
    }
    if (team.roster === "halfling") {
      result.push({ key: "chef", max: 1, cost: 100_000 });
    } else {
      result.push({ key: "chef", max: 1, cost: 300_000 });
    }
    if (roster.specialRules.includes(specialRules.briberyAndCorruption)) {
      result.push({ key: "dodgyRep", max: 1, cost: 80_000 });
    } else {
      result.push({ key: "dodgyRep", max: 1, cost: 120_000 });
    }
    result.push({ key: "bugman", max: 1, cost: 100_000 });
    result.push({ key: "sportsWiz", max: 1, cost: 150_000 });
  }
  return result;
}
