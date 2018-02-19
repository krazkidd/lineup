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

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lineup');

const playerSchema = new mongoose.Schema({
  /**
   * Player's name.
   * @type {String}
   */
  name: String,

  /**
   * Player's number.
   *
   * Type is String because some recreational rule
   * variations allow non-integer "numbers".
   * @type {String}
   */
  number: String
});

const lineupSchema = new mongoose.Schema({
  /**
   * Team name.
   * @type {String}
   */
  teamName: String,

  /**
   * Array of Player objects.
   * @type {Array}
   */
  players: [playerSchema],

  /**
   * Batting order; values are indexes to this.players array.
   *
   * Length of array is variable due to variations in
   * recreational rules (expect 8-12 values).
   * @type {Array}
   */
  batPositions: [Number],

  /**
   * Field positions; values are indexes to this.players array.
   *
   * Length of array is variable due to variations in
   * recreational rules (expect 9-10 values)
   * @type {Array}
   */
  fieldPositions: [Number],

  /**
   * Substitute players; values are indexes to this.players array.
   *
   * Length of array is variable.
   * @type {Array}
   */
  subs: [Number]
});

module.exports = {

  /**
   * A Player entity represents an individual competitor.
   * @type {mongoose.Model}
   */
  Player: mongoose.model("Player", playerSchema),

  /**
   * A Lineup entity represents a team's initial offensive and defensive
   * positions in a game.
   * @type {mongoose.Model}
   */
  Lineup: mongoose.model("Lineup", lineupSchema),

}
