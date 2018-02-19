/**************************************************************************

This file is part of Lineup.

Copyright © 2018 Mark Ross <krazkidd@gmail.com>

Lineup is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Lineup is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with Lineup.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

// for fake latency
const sleep = require('sleep');

module.exports = function (app, db) {

  // API routes ///////////////////////////////////////////
  /////////////////////////////////////////////////////////

  //TODO only allow API requests from localhost (until we can monetize huehueh)

  // players //////////////////////////////////////////////

  // app.get('/json/players', (req, res) => {
  //   db.Player.find({}, (err, players) => {
  //     if (err) {
  //       //TODO handle error
  //     } else {
  //       sleep.sleep(1);
  //
  //       res.status(200).send(players);
  //     }
  //   });
  // });

  app.get('/json/players/:id', (req, res) => {
    db.Player.findById(req.params.id, (err, player) => {
      if (err) {
        //TODO handle error
      } else {
        sleep.sleep(1);

        res.status(200).send(player);
      }
    });
  });

  // lineups //////////////////////////////////////////////

  // app.get('/json/lineups', (req, res) => {
  //   db.Lineup.find({}, (err, lineups) => {
  //     if (err) {
  //       //TODO handle error
  //     } else {
  //       sleep.sleep(1);
  //
  //       res.status(200).send(lineups);
  //     }
  //   });
  // });

  app.get('/json/lineups/:id', (req, res) => {
    db.Lineup.findById(req.params.id, (err, lineup) => {
      if (err) {
        //TODO handle error
      } else {
        sleep.sleep(1);

        res.status(200).send(lineup);
      }
    });
  });


  // public routes ////////////////////////////////////////
  /////////////////////////////////////////////////////////

  //TODO refactor to reuse DB calls for both public and API requests

  // players //////////////////////////////////////////////

  app.get('/players', (req, res) => {
    db.Player.find({}, (err, players) => {
      if (err) {
        //TODO handle error
      } else {
        res.render('players/index', {players: players});
      }
    });
  });

  app.post('/players', (req, res) => {
    db.Player.create(req.body.player, (err, player) => {
      if (err) {
        //TODO handle error
      } else {
        res.redirect('players/' + player._id);
      }
    });
  });

  app.get('/players/new', (req, res) => { res.render('players/new') });

  app.get('/players/:id', (req, res) => {
    db.Player.findById(req.params.id, (err, player) => {
      if (err) {
        //TODO handle error
      } else {
        res.render('players/show', {player: player});
      }
    });
  });

  // lineups //////////////////////////////////////////////

  app.get('/lineups', (req, res) => {
    db.Lineup.find({}, (err, lineups) => {
      if (err) {
        //TODO handle error
      } else {
        res.render('lineups/index', {lineups: lineups});
      }
    });
  });

  //TODO
  // app.post('/lineups', (req, res) => {
  //   //TODO need to process req.body.lineup to get arrays
  //   db.Lineup.create(req.body.lineup, (err, lineup) => {
  //     if (err) {
  //       //TODO handle error
  //     } else {
  //       res.redirect('lineups/' + lineup._id);
  //     }
  //   });
  // });

  app.get('/lineups/new', (req, res) => { res.render('lineups/new') });

  app.get('/lineups/:id', (req, res) => {
    db.Lineup.findById(req.params.id, (err, lineup) => {
      if (err) {
        //TODO handle error
      } else {
        res.render('lineups/show', {lineup: lineup});
      }
    });
  });

  // root /////////////////////////////////////////////////

  app.get('/', (reg, res) => res.render('index'));

}
