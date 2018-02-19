module.exports = function (db) {

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

  var players = [
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

  db.Player.create(players).then(players => {
    console.log("Players created.")

    var lineupDb =   {
        "teamName": "Painkillers",
        "players": players,
        "batPositions": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        "fieldPositions": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        "subs": []
      };

    db.Lineup.create(lineupDb, (err, lineup) => {
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
