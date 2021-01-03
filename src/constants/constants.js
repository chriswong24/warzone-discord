const gameModes = {
  br_all: 'Overall',
  br_brquads: 'BR Quads',
  br_brtrios: 'BR Trios',
  br_brduos: 'BR Duos',
  br_brsolo: 'BR Solo',
  br_mini_rebirth_mini_royale_quads: 'BR Rebirth Mini Royale Quads',
  br_rebirth_rbrthtrios: 'BR Rebirth Trios',
}

const gameModePrecedence = {
  br_all: 0,
  br_brquads: 1,
  br_brtrios: 2,
  br_brduos: 3,
  br_brsolo: 4,
  br_mini_rebirth_mini_royale_quads: 5,
  br_rebirth_rbrthtrios: 6,
}

const platforms = {
  psn: 'psn',
  steam: 'steam',
  xbl: 'xbl',
  battle: 'battle',
  acti: 'acti',
  uno: 'uno'
}

const dropZones = [
  {name: 'Dam', image: 'src/images/warzone-dam.png'},
  {name: 'Military Base', image: 'src/images/warzone-military-base.png'},
  {name: 'Quarry', image: 'src/images/warzone-quarry.png'},
  {name: 'That place south of quarry', image: 'src/images/warzone-south-quarry-town.png'},
  {name: 'That weird areea north west of Military Base', image: 'src/images/warzone-weenie.png'},
  {name: 'Hilly town place south west of military base', image: 'src/images/warzone-hill-town.png'},
  {name: 'Riverside', image: 'src/images/warzone-riverside.png'},
  {name: 'Air Traffic Control', image: 'src/images/warzone-atc.png'},
  {name: 'Airport', image: 'src/images/warzone-airport.png'},
  {name: 'Storage Town', image: 'src/images/warzone-storage-town.png'},
  {name: 'Superstore', image: 'src/images/warzone-superstore.png'},
  {name: 'Junkyard', image: 'src/images/warzone-junkyard.png'},
  {name: 'Boneyard', image: 'src/images/warzone-boneyard.png'},
  {name: 'Graveyard', image: 'src/images/warzone-graveyard.png'},
  {name: 'Two Towers', image: 'src/images/warzone-two-towers.png'},
  {name: 'Train Station', image: 'src/images/warzone-train-station.png'},
  {name: 'Promenade West', image: 'src/images/warzone-promenade-west.png'},
  {name: 'Promenade East', image: 'src/images/warzone-promenade-east.png'},
  {name: 'Hospital', image: 'src/images/warzone-hospital.png'},
  {name: 'Park', image: 'src/images/warzone-park.png'},
  {name: 'Downtown', image: 'src/images/warzone-downtown.png'},
  {name: 'Stadium', image: 'src/images/warzone-stadium.png'},
  {name: 'TV Station', image: 'src/images/warzone-tv.png'},
  {name: 'Henrietta', image: 'src/images/warzone-henrietta.png'},
  {name: 'Bridge', image: 'src/images/warzone-bridge.png'},
  {name: 'Lumber', image: 'src/images/warzone-bridge.png'},
  {name: 'Farmland', image: 'src/images/warzone-farmland.png'},
  {name: 'Port', image: 'src/images/warzone-port.png'},
  {name: 'Prison', image: 'src/images/warzone-prison.png'},
];


module.exports = {
  gameModes: gameModes,
  gameModePrecedence: gameModePrecedence,
  platforms: platforms,
  dropZones: dropZones,
};
