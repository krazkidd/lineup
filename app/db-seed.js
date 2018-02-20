var players1 = [
  {
    "name": "Terry Fallweather",
    "number": "10"
  },
  {
    "name": "Tera Splendor",
    "number": "32"
  },
  {
    "name": "Greg Butters",
    "number": "85"
  },
  {
    "name": "Norma Frent",
    "number": "12"
  },
  {
    "name": "Grelt Lazer",
    "number": "99"
  },
  {
    "name": "Greese Witherspoon",
    "number": "11"
  },
  {
    "name": "Booze Willis",
    "number": "21"
  },
  {
    "name": "Jen Stiller",
    "number": "1"
  },
  {
    "name": "Mike Wizekowski",
    "number": "22"
  },
  {
    "name": "Barbara La Barbara",
    "number": "33"
  }
];

var lineup1 =   {
  "teamName": "Painkillers",
  "players": players1,
  "batPositions": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  "fieldPositions": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  "subs": []
};

module.exports = function (db) {

  //TODO I feel like this could be (should be?) done in a single promise chain..

  db.Lineup.remove({}, err => {
    if (err) {
      console.log("Error: Lineups not removed.")
      console.log(err);
    } else {
      console.log("Lineups removed.");
    }
  });

  db.Player.remove({}, err => {
    if (err) {
      console.log("Error: Players not removed.")
      console.log(err);
    } else {
      console.log("Players removed.");
    }
  });

  db.Player.create(players1).then(players => {
    console.log("Players created.")

    db.Lineup.create(lineup1, (err, lineup) => {
      if (err) {
        console.log("Error: Lineup not created.");
        console.log(err);
      } else {
        console.log("Lineup created.");
      }
    });
  })
  .catch(err => {
    console.log("Failed to seed DB.")

    console.log(err);
  });

}
