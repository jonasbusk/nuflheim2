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
  elf: "Elf",
  human: "Human",
  lineman: "Lineman",
  minotaur: "Minotaur",
  ogre: "Ogre",
  runner: "Runner",
  skeleton: "Skeleton",
  spawn: "Spawn",
  special: "Special",
  thrower: "Thrower",
  troll: "Troll",
  undead: "Undead",
  yhetee: "Yhetee",
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
// TODO: Make this a map instead of an array for easier unique key lookup
export const rosters: Roster[] = [
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
];

/** All available star players. */
export const starPlayers: PlayerProfile[] = [
  { key: "akhorne", name: "Akhorne the Squirrel", position: STAR_PLAYER, keywords: [keywords.blitzer, "Squirrel"], ma: 7, st: 1, ag: 2, pa: undefined, av: 6, skills: [skills.claws, skills.dauntless, skills.dodge, skills.frenzy, skills.jumpUp, skills.loner(4), skills.noBall, skills.sideStep, skills.stunty, skills.titchy], cost: 80_000, playsFor: [ANY_TEAM], specialRule: "Blind Rage" },
  { key: "griff", name: "Griff Oberwald", position: STAR_PLAYER, keywords: [keywords.blitzer, keywords.human], ma: 7, st: 4, ag: 2, pa: 3, av: 9, skills: [skills.block, skills.dodge, skills.fend, skills.loner(3), skills.sprint, skills.sureFeet], cost: 300_000, playsFor: [leagues.oldWorldClassic], specialRule: "Consummate Professional" },
  { key: "grashnak", name: "Grashnak Blackhoof", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.minotaur], ma: 6, st: 6, ag: 4, pa: 6, av: 9, skills: [skills.frenzy, skills.horns, skills.loner(4), skills.mightyBlow, skills.thickSkull, skills.unchannelledFury], cost: 240_000, playsFor: [leagues.chaosClash], specialRule: "Gored by the Bull" },
  { key: "scyla", name: "Scyla Anfingrimm", position: STAR_PLAYER, keywords: [keywords.bigGuy, keywords.spawn], ma: 5, st: 5, ag: 4, pa: 6, av: 10, skills: [skills.claws, skills.frenzy, skills.loner(4), skills.mightyBlow, skills.prehensileTail, skills.thickSkull, skills.unchannelledFury], cost: 200_000, playsFor: [favouredOf.khorne], specialRule: "Fury of the Blood God" },
];
