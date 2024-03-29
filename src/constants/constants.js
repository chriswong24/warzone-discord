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

const currentSeason = 2;

const seasonEpochTimestamps = {
  season1Start: 1608076800000,
  season1End:  1614211200000,
  season2Start: 1614211200000,
  season2End: Date.now(),
}

const alMazrahDropZones = [
  {name: 'Ahkdar Village', image: 'src/images/al-ahkdar-village.png'},
  {name: 'Airport', image: 'src/images/al-airport.png'},
  {name: 'Caves', image: 'src/images/al-caves.png'},
  {name: 'Cemetary', image: 'src/images/al-cemetary.png'},
  {name: 'Al Mazrah City East', image: 'src/images/al-city-east.png'},
  {name: 'Al Mazrah City West', image: 'src/images/al-city-west.png'},
  {name: 'Village on the east border', image: 'src/images/al-east-end.png'},
  {name: 'Fortress', image: 'src/images/fortress.png'},
  {name: 'Hydro Electric', image: 'src/images/al-hydro-electric.png'},
  {name: 'Oasis', image: 'src/images/al-oasis.png'},
  {name: 'Observatory', image: 'src/images/al-observatory.png'},
  {name: 'Port', image: 'src/images/al-port.png'},
  {name: 'Quarry', image: 'src/images/al-quarry.png'},
  {name: 'Rohan Oil', image: 'src/images/al-rohan-oil.png'},
  {name: 'Sa\'id City', image: 'src/images/al-said-city.png'},
  {name: 'Sarrif Bay', image: 'src/images/al-sarrif-bay.png'},
  {name: 'Sawah Village', image: 'src/images/al-sawah-village.png'},
  {name: 'Sharim Pass', image: 'src/images/al-sharim-pass.png'},
  {name: 'Taraq Village', image: 'src/images/al-taraq-village.png'},
];

const dropZones = [
  {name: 'Airfield', image: 'src/images/caldera-airfield.png'},
  {name: 'Arsenal', image: 'src/images/caldera-arsenal.png'},
  {name: 'Beachhead', image: 'src/images/caldera-beachhead.png'},
  {name: 'Capital', image: 'src/images/caldera-capital.png'},
  {name: 'Docks', image: 'src/images/caldera-docks.png'},
  {name: 'East Fields', image: 'src/images/caldera-east-fields.png'},
  {name: 'West Fields', image: 'src/images/caldera-west-fields.png'},
  {name: 'North Fields', image: 'src/images/caldera-north-fields.png'},
  {name: 'South Fields', image: 'src/images/caldera-south-fields.png'},
  {name: 'Lagoon', image: 'src/images/caldera-lagoon.png'},
  {name: 'North Mines', image: 'src/images/caldera-north-mines.png'},
  {name: 'South Mines', image: 'src/images/caldera-south-mines.png'},
  {name: 'Factory', image: 'src/images/caldera-factory.png'},
  {name: 'That town north of airfield', image: 'src/images/caldera-north-airfield-town.png'},
  {name: 'Peak', image: 'src/images/caldera-peak.png'},
  {name: 'Powerplant', image: 'src/images/caldera-powerplant.png'},
  {name: 'Resort', image: 'src/images/caldera-resort.png'},
  {name: 'Ruins', image: 'src/images/caldera-ruins.png'},
  {name: 'Runway', image: 'src/images/caldera-runway.png'},
  {name: 'Subpen', image: 'src/images/caldera-subpen.png'},
  {name: 'That village west of subpen', image: 'src/images/caldera-subpen-village.png'},
  {name: 'Village', image: 'src/images/caldera-village.png'},
  {name: 'Immediate Drop!!', image: 'src/images/daisy.png'},
  {name: 'Wait it out till the end', image: 'src/images/remy.png'},
]

const verdanskDropZones = [
  {name: 'Airport', image: 'src/images/warzone2-airport.png'},
  {name: 'Array', image: 'src/images/warzone2-array.png'},
  {name: 'ATC', image: 'src/images/warzone2-atc.png'},
  {name: 'Boneyard', image: 'src/images/warzone2-boneyard.png'},
  {name: 'Bridge', image: 'src/images/warzone2-bridge.png'},
  {name: 'Downtown', image: 'src/images/warzone2-downtown.png'},
  {name: 'Factory', image: 'src/images/warzone2-factory.png'},
  {name: 'Farmland', image: 'src/images/warzone2-farmland.png'},
  {name: 'Graveyard', image: 'src/images/warzone2-graveyard.png'},
  {name: 'Henrietta', image: 'src/images/warzone2-henrietta.png'},
  {name: 'Hills', image: 'src/images/warzone2-hills.png'},
  {name: 'Hospital', image: 'src/images/warzone2-hospital.png'},
  {name: 'Lumber', image: 'src/images/warzone2-lumber.png'},
  {name: 'Military Base', image: 'src/images/warzone2-military-base.png'},
  {name: 'Hotel South of Military Base', image: 'src/images/warzone2-military-hotel.png'},
  {name: 'Park', image: 'src/images/warzone2-park.png'},
  {name: 'Port', image: 'src/images/warzone2-port.png'},
  {name: 'Prison', image: 'src/images/warzone2-prison.png'},
  {name: 'Promenade East', image: 'src/images/warzone2-promenade-east.png'},
  {name: 'Promenade West', image: 'src/images/warzone2-promenade-west.png'},
  {name: 'Riverside', image: 'src/images/warzone2-riverside.png'},
  {name: 'Salt Mine', image: 'src/images/warzone2-salt-mine.png'},
  {name: 'Stadium', image: 'src/images/warzone2-stadium.png'},
  {name: 'Storage Town', image: 'src/images/warzone2-storage-town.png'},
  {name: 'Summit', image: 'src/images/warzone2-summit.png'},
  {name: 'Superstore', image: 'src/images/warzone2-superstore.png'},
  {name: 'Train Station', image: 'src/images/warzone2-train-station.png'},
  {name: 'TV Station', image: 'src/images/warzone2-tv-station.png'},
];

const oldDropZones = [
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
  currentSeason,
  dropZones,
  alMazrahDropZones,
  gameModePrecedence,
  gameModes,
  platforms,
  seasonEpochTimestamps
};
