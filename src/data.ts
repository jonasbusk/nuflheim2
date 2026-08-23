// Types

/** The overall state of a team draft list. */
// Note: Should be as small as possible
export interface TeamState {
  variant: keyof typeof variants; // The selected rules variant
  budget: number; // The total team budget
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

/** Rules variants for the team draft list. */
export const variants = {
  standard: "Standard",
  sevens: "Sevens",
}

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
  { key: "akhorne", name: "Akhorne the Squirrel", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.squirrel], ma: 7, st: 1, ag: 2, pa: undefined, av: 6, skills: [skills.claws, skills.dauntless, skills.dodge, skills.frenzy, skills.jumpUp, skills.loner(4), skills.noBall, skills.sideStep, skills.stunty, skills.titchy], cost: 80_000, playsFor: [ANY_TEAM], specialRule: "Blind Rage" },
  { key: "anqi", name: "Anqi Panqi", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.lizardman], ma: 7, st: 4, ag: 5, pa: 6, av: 10, skills: [skills.block, skills.grab, skills.loner(4), skills.standFirm, skills.unsteady], cost: 190_000, playsFor: [leagues.lustrianSuperleague], specialRule: "Savage Blow" },
  { key: "barik", name: "Barik Farblast", position: STAR_PLAYER, keywords: [keywords.dwarf, keywords.thrower], ma: 6, st: 3, ag: 4, pa: 3, av: 9, skills: [skills.cannoneer, skills.hailMaryPass, skills.loner(4), skills.pass, skills.secretWeapon, skills.sureHands, skills.thickSkull], cost: 80_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Blast It!" },
  { key: "bilerot", name: "Bilerot Vomitflesh", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.human], ma: 4, st: 5, ag: 4, pa: 6, av: 10, skills: [skills.dirtyPlayer, skills.disturbingPresence, skills.foulAppearance, skills.loneFouler, skills.loner(4), skills.regeneration, skills.unsteady], cost: 180_000, playsFor: [favouredOf.nurgle], specialRule: "Putrid Regurgitation" },
  { key: "black-gobbo", name: "The Black Gobbo", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 6, st: 2, ag: 3, pa: 3, av: 8, skills: [skills.bombardier, skills.disturbingPresence, skills.dodge, skills.loner(3), skills.sideStep, skills.sneakyGit, skills.stab, skills.stunty], cost: 210_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Sneakiest of the Lot" },
  { key: "boa", name: "Boa Kon’ssstriktr", position: STAR_PLAYER, keywords: [keywords.runner, keywords.snakeman], ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.dodge, skills.fend, skills.hypnoticGaze, skills.loner(4), skills.prehensileTail, skills.safePairOfHands, skills.sideStep], cost: 180_000, playsFor: [leagues.lustrianSuperleague], specialRule: "Look Into My Eyes" },
  { key: "bomber", name: "Bomber Dribblesnot", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 6, st: 2, ag: 3, pa: 3, av: 8, skills: [skills.accurate, skills.bombardier, skills.dodge, skills.loner(4), skills.rightStuff, skills.secretWeapon, skills.stunty], cost: 80_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Kaboom!" },
  { key: "karina", name: "Captain Karina von Riesz", position: STAR_PLAYER, keywords: [keywords.runner, keywords.vampire], ma: 7, st: 4, ag: 2, pa: 3, av: 9, skills: [skills.bloodlust(2), skills.dodge, skills.hypnoticGaze, skills.jumpUp, skills.loner(4), skills.regeneration], cost: 230_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Tasty Morsel" },
  { key: "cindy", name: "Cindy Piewhistle", position: STAR_PLAYER, keywords: [keywords.halfling, keywords.special], ma: 5, st: 2, ag: 3, pa: 3, av: 7, skills: [skills.accurate, skills.bombardier, skills.dodge, skills.loner(4), skills.secretWeapon, skills.stunty], cost: 100_000, playsFor: [leagues.halflingThimbleCup, leagues.oldWorldClassic], specialRule: "All You Can Eat" },
  { key: "luthor", name: "Count Luthor von Drakenborg", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.vampire], ma: 6, st: 5, ag: 2, pa: 3, av: 10, skills: [skills.block, skills.hypnoticGaze, skills.loner(4), skills.regeneration, skills.sideStep], cost: 300_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Star of the Show" },
  { key: "deeproot", name: "Deeproot Strongbranch", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.treeman], ma: 2, st: 7, ag: 5, pa: 4, av: 11, skills: [skills.block, skills.bullseye, skills.loner(4), skills.mightyBlow, skills.standFirm, skills.strongArm, skills.thickSkull, skills.throwTeamMate, skills.timmmber], cost: 280_000, playsFor: [leagues.woodlandLeague], specialRule: "Reliable" },
  { key: "dribl", name: "Dribl", position: STAR_PLAYER, keywords: [keywords.skink, keywords.special], ma: 8, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.dirtyPlayer, skills.dodge, skills.loner(4), skills.quickFoul, skills.sideStep, skills.sneakyGit, skills.stunty], cost: 230_000, playsFor: [leagues.lustrianSuperleague], specialRule: "A Sneaky Pair" },
  { key: "drull", name: "Drull", position: STAR_PLAYER, keywords: [keywords.skink, keywords.special], ma: 8, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.dodge, skills.loner(4), skills.sideStep, skills.stab, skills.stunty], cost: 0, playsFor: [leagues.lustrianSuperleague], specialRule: "A Sneaky Pair" },
  { key: "eldril", name: "Eldril Sidewinder", position: STAR_PLAYER, keywords: [keywords.catcher, keywords.elf], ma: 8, st: 3, ag: 2, pa: 3, av: 8, skills: [skills.catch, skills.dodge, skills.hypnoticGaze, skills.loner(4), skills.nervesOfSteel, skills.onTheBall], cost: 220_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Mesmerising Dance" },
  { key: "estelle", name: "Estelle la Veneaux", position: STAR_PLAYER, keywords: [keywords.human, keywords.lineman], ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.disturbingPresence, skills.dodge, skills.guard, skills.loner(4), skills.sideStep], cost: 190_000, playsFor: [leagues.lustrianSuperleague], specialRule: "Baleful Hex" },
  { key: "fungus", name: "Fungus the Loon", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 4, st: 7, ag: 3, pa: undefined, av: 8, skills: [skills.ballAndChain, skills.loner(4), skills.mightyBlow, skills.noBall, skills.secretWeapon, skills.stunty], cost: 80_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Whirling Dervish" },
  { key: "glart", name: "Glart Smashrip", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.skaven], ma: 5, st: 4, ag: 4, pa: 6, av: 9, skills: [skills.block, skills.claws, skills.grab, skills.juggernaut, skills.loner(4), skills.standFirm], cost: 175_000, playsFor: [leagues.underworldChallenge], specialRule: "Frenzied Rush" },
  { key: "gloriel", name: "Gloriel Summerbloom", position: STAR_PLAYER, keywords: [keywords.elf, keywords.thrower], ma: 7, st: 2, ag: 2, pa: 2, av: 8, skills: [skills.accurate, skills.dodge, skills.loner(3), skills.pass, skills.sideStep, skills.sureHands], cost: 150_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Shot to Nothing" },
  { key: "glotl", name: "Glotl Stop", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.lizardman], ma: 6, st: 6, ag: 5, pa: 6, av: 10, skills: [skills.animalSavagery, skills.frenzy, skills.loner(4), skills.mightyBlow, skills.prehensileTail, skills.standFirm, skills.thickSkull], cost: 260_000, playsFor: [leagues.lustrianSuperleague], specialRule: "Primal Savagery" },
  { key: "grak", name: "Grak", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.ogre], ma: 5, st: 5, ag: 4, pa: 4, av: 10, skills: [skills.boneHead, skills.kickTeamMate, skills.loner(4), skills.mightyBlow, skills.thickSkull], cost: 250_000, playsFor: [ANY_TEAM], specialRule: "I’ll Carry You" },
  { key: "crumbleberry", name: "Crumbleberry", position: STAR_PLAYER, keywords: [keywords.halfling, keywords.lineman], ma: 5, st: 2, ag: 3, pa: 5, av: 7, skills: [skills.dodge, skills.lethalFlight, skills.loner(4), skills.rightStuff, skills.stunty, skills.sureHands], cost: 0, playsFor: [ANY_TEAM], specialRule: "I’ll Carry You" },
  { key: "grashnak", name: "Grashnak Blackhoof", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.minotaur], ma: 6, st: 6, ag: 4, pa: 6, av: 9, skills: [skills.frenzy, skills.horns, skills.loner(4), skills.mightyBlow, skills.thickSkull, skills.unchannelledFury], cost: 240_000, playsFor: [leagues.chaosClash], specialRule: "Gored by the Bull" },
  { key: "gretchen", name: "Gretchen Wächter", position: STAR_PLAYER, keywords: [keywords.special, keywords.undead, keywords.wraith], ma: 7, st: 3, ag: 2, pa: undefined, av: 9, skills: [skills.disturbingPresence, skills.dodge, skills.foulAppearance, skills.jumpUp, skills.loner(4), skills.noBall, skills.regeneration, skills.shadowing, skills.sideStep], cost: 180_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Incorporeal" },
  { key: "griff", name: "Griff Oberwald", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human], ma: 7, st: 4, ag: 2, pa: 3, av: 9, skills: [skills.block, skills.dodge, skills.fend, skills.loner(3), skills.sprint, skills.sureFeet], cost: 300_000, playsFor: [leagues.oldWorldClassic], specialRule: "Consummate Professional" },
  { key: "grim", name: "Grim Ironjaw", position: STAR_PLAYER, keywords: [keywords.dwarf, keywords.special], ma: 5, st: 4, ag: 3, pa: 6, av: 9, skills: [skills.block, skills.dauntless, skills.frenzy, skills.hatred(keywords.bigGuy), skills.loner(4), skills.multipleBlock, skills.thickSkull], cost: 190_000, playsFor: [leagues.worldsEdgeSuperleague], specialRule: "Slayer" },
  { key: "grombrindal", name: "Grombrindal", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.dwarf], ma: 5, st: 3, ag: 3, pa: 4, av: 10, skills: [skills.block, skills.breakTackle, skills.dauntless, skills.loner(4), skills.mightyBlow, skills.standFirm, skills.sureFeet, skills.thickSkull], cost: 170_000, playsFor: [leagues.halflingThimbleCup, leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Wisdom of the White Dwarf" },
  { key: "guffle", name: "Guffle Pusmaw", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.human], ma: 5, st: 4, ag: 4, pa: 6, av: 10, skills: [skills.foulAppearance, skills.loner(4), skills.monstrousMouth, skills.nervesOfSteel, skills.onTheBall, skills.plagueRidden], cost: 150_000, playsFor: [favouredOf.nurgle], specialRule: "Quick Bite" },
  { key: "hakflem", name: "Hakflem Skuttlespike", position: STAR_PLAYER, keywords: [keywords.runner, keywords.skaven], ma: 8, st: 3, ag: 2, pa: 3, av: 8, skills: [skills.dodge, skills.extraArms, skills.loner(4), skills.prehensileTail, skills.twoHeads], cost: 200_000, playsFor: [leagues.underworldChallenge], specialRule: "Treacherous" },
  { key: "helmut", name: "Helmut Wulf", position: STAR_PLAYER, keywords: [keywords.human, keywords.special], ma: 6, st: 3, ag: 3, pa: undefined, av: 9, skills: [skills.chainsaw, skills.loner(4), skills.noBall, skills.pro, skills.secretWeapon, skills.standFirm], cost: 140_000, playsFor: [leagues.oldWorldClassic], specialRule: "Old Pro" },
  { key: "hthark", name: "H’thark the Unstoppable", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.dwarf], ma: 6, st: 6, ag: 4, pa: 6, av: 10, skills: [skills.block, skills.breakTackle, skills.defensive, skills.juggernaut, skills.loner(4), skills.sprint, skills.sureFeet, skills.thickSkull, skills.unsteady], cost: 300_000, playsFor: [leagues.badlandsBrawl, favouredOf.hashut], specialRule: "Unstoppable Momentum" },
  { key: "ivan", name: "Ivan ‘the Animal’ Deathshroud", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human, keywords.skeleton, keywords.undead], ma: 6, st: 4, ag: 4, pa: 5, av: 9, skills: [skills.block, skills.disturbingPresence, skills.hatred(keywords.dwarf), skills.juggernaut, skills.loner(4), skills.regeneration, skills.stripBall, skills.tackle], cost: 210_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Dwarven Scourge" },
  { key: "ivar", name: "Ivar Eriksson", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human], ma: 6, st: 4, ag: 3, pa: 4, av: 9, skills: [skills.block, skills.guard, skills.loner(4), skills.tackle], cost: 215_000, playsFor: [leagues.oldWorldClassic], specialRule: "Raiding Party" },
  { key: "jeremiah", name: "Jeremiah Kool", position: STAR_PLAYER, keywords: [keywords.elf, keywords.runner], ma: 8, st: 3, ag: 1, pa: 2, av: 9, skills: [skills.block, skills.dodge, skills.divingCatch, skills.loner(4), skills.nervesOfSteel, skills.onTheBall, skills.pass, skills.sideStep], cost: 300_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "The Flashing Blade" },
  { key: "jordell", name: "Jordell Freshbreeze", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.elf], ma: 8, st: 3, ag: 1, pa: 3, av: 8, skills: [skills.block, skills.divingCatch, skills.dodge, skills.leap, skills.loner(4), skills.sideStep, skills.steadyFooting], cost: 280_000, playsFor: [leagues.elvenKingdomsLeague, leagues.woodlandLeague], specialRule: "Swift as the Breeze" },
  { key: "bugman", name: "Josef Bugman", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.dwarf], ma: 5, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.block, skills.drunkard, skills.fend, skills.loner(3), skills.tackle, skills.taunt, skills.thickSkull], cost: 180_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Dwarfen Grit" },
  { key: "karla", name: "Karla von Kill", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human], ma: 6, st: 4, ag: 3, pa: 3, av: 9, skills: [skills.block, skills.dauntless, skills.dodge, skills.jumpUp, skills.loner(4)], cost: 210_000, playsFor: [leagues.lustrianSuperleague, leagues.oldWorldClassic], specialRule: "Indomitable" },
  { key: "kiroth", name: "Kiroth Krakeneye", position: STAR_PLAYER, keywords: [keywords.elf, keywords.runner], ma: 7, st: 3, ag: 2, pa: 3, av: 8, skills: [skills.disturbingPresence, skills.foulAppearance, skills.loner(4), skills.onTheBall, skills.tackle, skills.tentacles], cost: 160_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Black Ink" },
  { key: "kreek", name: "Kreek Rustgouger", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.skaven, keywords.special], ma: 4, st: 7, ag: 4, pa: undefined, av: 10, skills: [skills.ballAndChain, skills.loner(4), skills.mightyBlow, skills.noBall, skills.prehensileTail, skills.secretWeapon], cost: 180_000, playsFor: [leagues.underworldChallenge], specialRule: "I’ll Be Back!" },
  { key: "borak", name: "Lord Borak The Despoiler", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.human], ma: 5, st: 5, ag: 3, pa: 5, av: 10, skills: [skills.block, skills.dirtyPlayer, skills.leader, skills.loner(3), skills.mightyBlow, skills.putTheBootIn, skills.sneakyGit], cost: 270_000, playsFor: [leagues.chaosClash], specialRule: "Lord of Chaos" },
  { key: "maple", name: "Maple Highgrove", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.treeman], ma: 3, st: 5, ag: 5, pa: 5, av: 11, skills: [skills.brawler, skills.grab, skills.loner(4), skills.mightyBlow, skills.standFirm, skills.tentacles, skills.thickSkull], cost: 210_000, playsFor: [leagues.woodlandLeague], specialRule: "Vicious Vines" },
  { key: "max", name: "Max Spleenripper", position: STAR_PLAYER, keywords: [keywords.human, keywords.special], ma: 5, st: 4, ag: 4, pa: undefined, av: 9, skills: [skills.chainsaw, skills.loner(4), skills.noBall, skills.secretWeapon], cost: 130_000, playsFor: [favouredOf.khorne], specialRule: "Maximum Carnage" },
  { key: "zug", name: "The Mighty Zug", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.human], ma: 5, st: 5, ag: 4, pa: 6, av: 10, skills: [skills.block, skills.loner(4), skills.mightyBlow, skills.unsteady], cost: 220_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Crushing Blow" },
  { key: "morg", name: "Morg ‘n’ Thorg", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.ogre], ma: 6, st: 6, ag: 3, pa: 4, av: 11, skills: [skills.block, skills.bullseye, skills.hatred(keywords.undead), skills.loner(4), skills.mightyBlow, skills.thickSkull, skills.throwTeamMate], cost: 340_000, playsFor: [leagues.badlandsBrawl, leagues.chaosClash, leagues.elvenKingdomsLeague, leagues.halflingThimbleCup, leagues.lustrianSuperleague, leagues.oldWorldClassic, leagues.underworldChallenge, leagues.woodlandLeague, leagues.worldsEdgeSuperleague], specialRule: "The Ballista" },
  { key: "nobbla", name: "Nobbla Blackwart", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 6, st: 2, ag: 3, pa: undefined, av: 8, skills: [skills.block, skills.chainsaw, skills.dodge, skills.loner(4), skills.noBall, skills.saboteur, skills.secretWeapon, skills.stunty], cost: 120_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Kick ’em While They’re Down!" },
  { key: "puggy", name: "Puggy Baconbreath", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.halfling], ma: 5, st: 3, ag: 3, pa: 3, av: 8, skills: [skills.block, skills.dodge, skills.loner(3), skills.nervesOfSteel, skills.rightStuff, skills.stunty], cost: 130_000, playsFor: [leagues.halflingThimbleCup, leagues.oldWorldClassic], specialRule: "Halfling Luck" },
  { key: "rashnak", name: "Rashnak Backstabber", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 7, st: 3, ag: 3, pa: 5, av: 8, skills: [skills.loner(4), skills.shadowing, skills.sideStep, skills.sneakyGit, skills.stab], cost: 130_000, playsFor: [leagues.badlandsBrawl], specialRule: "Toxin Connoisseur" },
  { key: "ripper", name: "Ripper Bolgrot", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.troll], ma: 5, st: 6, ag: 5, pa: 4, av: 10, skills: [skills.bullseye, skills.grab, skills.loner(4), skills.mightyBlow, skills.regeneration, skills.throwTeamMate], cost: 250_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Thinking Man’s Troll" },
  { key: "rodney", name: "Rodney Roachbait", position: STAR_PLAYER, keywords: [keywords.gnome, keywords.special], ma: 6, st: 2, ag: 3, pa: 4, av: 7, skills: [skills.catch, skills.divingCatch, skills.jumpUp, skills.loner(4), skills.onTheBall, skills.sideStep, skills.stunty, skills.wrestle], cost: 70_000, playsFor: [leagues.woodlandLeague], specialRule: "Catch of the Day" },
  { key: "rowana", name: "Rowana Forestfoot", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.gnome], ma: 6, st: 3, ag: 3, pa: 4, av: 8, skills: [skills.dodge, skills.dumpOff, skills.guard, skills.horns, skills.jumpUp, skills.leap, skills.loner(4)], cost: 160_000, playsFor: [leagues.woodlandLeague], specialRule: "Bounding Leap" },
  { key: "roxanna", name: "Roxanna Darknail", position: STAR_PLAYER, keywords: [keywords.elf, keywords.special], ma: 8, st: 3, ag: 1, pa: 3, av: 8, skills: [skills.dodge, skills.frenzy, skills.jumpUp, skills.juggernaut, skills.leap, skills.loner(4)], cost: 270_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Slashing Nails" },
  { key: "rumbelow", name: "Rumbelow Sheepskin", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.halfling], ma: 6, st: 3, ag: 3, pa: 5, av: 8, skills: [skills.block, skills.horns, skills.juggernaut, skills.loner(4), skills.tackle, skills.thickSkull], cost: 170_000, playsFor: [leagues.halflingThimbleCup], specialRule: "Ram" },
  { key: "scrappa", name: "Scrappa Sorehead", position: STAR_PLAYER, keywords: [keywords.goblin, keywords.special], ma: 7, st: 2, ag: 3, pa: 4, av: 8, skills: [skills.dirtyPlayer, skills.dodge, skills.loner(4), skills.pogo, skills.rightStuff, skills.sprint, skills.stunty, skills.sureFeet], cost: 120_000, playsFor: [leagues.badlandsBrawl, leagues.underworldChallenge], specialRule: "Yoink!" },
  { key: "scyla", name: "Scyla Anfingrimm", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.spawn], ma: 5, st: 5, ag: 4, pa: 6, av: 10, skills: [skills.claws, skills.frenzy, skills.loner(4), skills.mightyBlow, skills.prehensileTail, skills.thickSkull, skills.unchannelledFury], cost: 200_000, playsFor: [favouredOf.khorne], specialRule: "Fury of the Blood God" },
  { key: "skitter", name: "Skitter Stab-Stab", position: STAR_PLAYER, keywords: [keywords.runner, keywords.skaven], ma: 9, st: 2, ag: 2, pa: 4, av: 8, skills: [skills.dodge, skills.loner(4), skills.prehensileTail, skills.shadowing, skills.stab], cost: 170_000, playsFor: [leagues.underworldChallenge], specialRule: "Master Assassin" },
  { key: "skrorg", name: "Skrorg Snowpelt", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.yhetee], ma: 5, st: 5, ag: 4, pa: 6, av: 9, skills: [skills.block, skills.claws, skills.disturbingPresence, skills.juggernaut, skills.loner(4), skills.mightyBlow], cost: 240_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Pump Up the Crowd" },
  { key: "skrull", name: "Skrull Halfheight", position: STAR_PLAYER, keywords: [keywords.dwarf, keywords.skeleton, keywords.thrower, keywords.undead], ma: 6, st: 3, ag: 4, pa: 3, av: 9, skills: [skills.accurate, skills.loner(4), skills.nervesOfSteel, skills.pass, skills.regeneration, skills.sureHands, skills.thickSkull], cost: 150_000, playsFor: [leagues.sylvanianSpotlight, leagues.worldsEdgeSuperleague], specialRule: "Strong Passing Game" },
  { key: "lucien", name: "Lucien Swift", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.elf], ma: 7, st: 3, ag: 2, pa: 3, av: 9, skills: [skills.block, skills.loner(4), skills.mightyBlow, skills.tackle], cost: 300_000, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Working in Tandem" },
  { key: "valen", name: "Valen Swift", position: STAR_PLAYER, keywords: [keywords.elf, keywords.thrower], ma: 7, st: 3, ag: 2, pa: 2, av: 9, skills: [skills.accurate, skills.loner(4), skills.nervesOfSteel, skills.pass, skills.safePass, skills.sureHands], cost: 0, playsFor: [leagues.elvenKingdomsLeague], specialRule: "Working in Tandem" },
  { key: "swiftvine", name: "Swiftvine Glimmershard", position: STAR_PLAYER, keywords: [keywords.special, keywords.spite], ma: 7, st: 2, ag: 3, pa: 5, av: 7, skills: [skills.disturbingPresence, skills.fend, skills.loner(4), skills.sideStep, skills.stab, skills.stunty], cost: 110_000, playsFor: [leagues.woodlandLeague], specialRule: "Furious Outburst" },
  { key: "thorsson", name: "Thorsson Stoutmead", position: STAR_PLAYER, keywords: [keywords.human, keywords.lineman], ma: 6, st: 3, ag: 4, pa: 3, av: 8, skills: [skills.block, skills.drunkard, skills.loner(4), skills.thickSkull], cost: 170_000, playsFor: [leagues.oldWorldClassic, leagues.worldsEdgeSuperleague], specialRule: "Beer Barrel Bash" },
  { key: "varag", name: "Varag Ghoul-Chewer", position: STAR_PLAYER, keywords: [keywords.blocker, keywords.orc], ma: 6, st: 5, ag: 3, pa: 5, av: 10, skills: [skills.block, skills.hatred(keywords.undead), skills.jumpUp, skills.loner(4), skills.mightyBlow, skills.thickSkull, skills.unsteady], cost: 260_000, playsFor: [leagues.badlandsBrawl], specialRule: "Krump and Smash" },
  { key: "wilhelm", name: "Wilhelm Chaney", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.undead, keywords.werewolf], ma: 8, st: 4, ag: 3, pa: 4, av: 9, skills: [skills.catch, skills.claws, skills.frenzy, skills.loner(4), skills.regeneration, skills.wrestle], cost: 220_000, playsFor: [leagues.sylvanianSpotlight], specialRule: "Savage Mauling" },
  { key: "willow", name: "Willow Rosebark", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.dryad], ma: 6, st: 4, ag: 3, pa: 5, av: 9, skills: [skills.dauntless, skills.loner(4), skills.sideStep, skills.thickSkull], cost: 160_000, playsFor: [leagues.woodlandLeague], specialRule: "Woodland Fury" },
  { key: "withergrasp", name: "Withergrasp Doubledrool", position: STAR_PLAYER, keywords: [keywords.beastman, keywords.blocker], ma: 6, st: 3, ag: 3, pa: 4, av: 9, skills: [skills.foulAppearance, skills.loner(4), skills.prehensileTail, skills.tackle, skills.tentacles, skills.twoHeads, skills.wrestle], cost: 170_000, playsFor: [favouredOf.nurgle], specialRule: "Watch Out!" },
  { key: "zolcath", name: "Zolcath the Zoat", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.zoat], ma: 5, st: 5, ag: 4, pa: 5, av: 10, skills: [skills.disturbingPresence, skills.juggernaut, skills.loner(4), skills.mightyBlow, skills.prehensileTail, skills.regeneration, skills.sureFeet], cost: 220_000, playsFor: [leagues.elvenKingdomsLeague, leagues.lustrianSuperleague], specialRule: "Excuse me, are you a Zoat?" },
  { key: "zzharg", name: "Zzharg Madeye", position: STAR_PLAYER, keywords: [keywords.dwarf, keywords.special], ma: 4, st: 4, ag: 4, pa: 3, av: 10, skills: [skills.cannoneer, skills.hailMaryPass, skills.loner(4), skills.nervesOfSteel, skills.secretWeapon, skills.thickSkull], cost: 130_000, playsFor: [favouredOf.hashut], specialRule: "Blastin’ Solves Everything" }
];
