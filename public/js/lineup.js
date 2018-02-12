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

"use strict"

function getStarterTable(lineupData, numPlayerRows) {
  var table = document.createElement('table');
  table.className = 'lineupTable';
  table.appendChild(getStarterTableHeaderRow());

  if (lineupData) {
    for(var i = 0; i < Math.max(lineupData.batPositions.length, numPlayerRows); i++) {
      var player = null;

      if (i < lineupData.batPositions.length) {
          player = lineupData.players[lineupData.batPositions[i]];
      }

      table.appendChild(getStarterTablePlayerRow(i + 1, player));
    }
  } else {
    for(var i = 0; i < numPlayerRows; i++) {
      table.appendChild(getStarterTablePlayerRow(i + 1, null));
    }
  }

  return table;
}

function getSubTable(lineupData, numPlayerRows) {
  var table = document.createElement('table');
  table.className = 'subTable';
  table.appendChild(getSubTableHeaderRow());

  if (lineupData) {
    for(var i = 0; i < Math.max(lineupData.subs.length, numPlayerRows); i++) {
      var player = null;

      if (i < lineupData.subs.length) {
          player = lineupData.players[lineupData.subs[i]];
      }

      table.appendChild(getSubTablePlayerRow(player));
    }
  } else {
    for(var i = 0; i < numPlayerRows; i++) {
      table.appendChild(getSubTablePlayerRow(null));
    }
  }

  return table;
}

function getStarterTableHeaderRow() {
  var tdBattingPosition = document.createElement('td');
  var tdPlayerNumber = document.createElement('td');
  var tdPlayerName = document.createElement('td');
  var tdFieldPosition = document.createElement('td');

  tdBattingPosition.textContent = ' ';
  tdPlayerNumber.textContent = 'No.';
  tdPlayerName.textContent = 'Player';
  tdFieldPosition.textContent = 'Pos.';

  var trHeader = document.createElement('tr');
  trHeader.appendChild(tdBattingPosition);
  trHeader.appendChild(tdPlayerNumber);
  trHeader.appendChild(tdPlayerName);
  trHeader.appendChild(tdFieldPosition);

  return trHeader;
}

function getStarterTablePlayerRow(battingPosition, player) {
  var tdBattingPosition = document.createElement('td');
  var tdPlayerNumber = document.createElement('td');
  var tdPlayerName = document.createElement('td');
  var tdFieldPosition = document.createElement('td');

  tdBattingPosition.textContent = battingPosition.toString();
  if (player) {
    tdPlayerNumber.textContent = player.number;
    tdPlayerName.textContent = player.name;
    // tdFieldPosition.textContent = player ? player.position : ' ';
  } else {
    tdPlayerNumber.innerHTML = '\u00A0';  //&nbsp;
    tdPlayerName.innerHTML = '\u00A0';    //&nbsp;
    tdFieldPosition.innerHTML = '\u00A0'; //&nbsp;
  }

  var trPlayer = document.createElement('tr');
  trPlayer.appendChild(tdBattingPosition);
  trPlayer.appendChild(tdPlayerNumber);
  trPlayer.appendChild(tdPlayerName);
  trPlayer.appendChild(tdFieldPosition);

  return trPlayer;
}

function getSubTableHeaderRow() {
  var tdPlayerNumber = document.createElement('td');
  var tdPlayerName = document.createElement('td');

  tdPlayerNumber.textContent = 'No.';
  tdPlayerName.textContent = 'Player';

  var trHeader = document.createElement('tr');
  trHeader.appendChild(tdPlayerNumber);
  trHeader.appendChild(tdPlayerName);

  return trHeader;
}

function getSubTablePlayerRow(player) {
  var tdPlayerNumber = document.createElement('td');
  var tdPlayerName = document.createElement('td');

  if (player) {
    tdPlayerNumber.textContent = player.number;
    tdPlayerName.textContent = player.name;
  } else {
    tdPlayerNumber.innerHTML = '\u00A0'; //&nbsp;
    tdPlayerName.innerHTML = '\u00A0';   //&nbsp;
  }

  var trPlayer = document.createElement('tr');
  trPlayer.appendChild(tdPlayerNumber);
  trPlayer.appendChild(tdPlayerName);

  return trPlayer;
}

function asyncGetLineup(id, callback) {
  $.get('/json/lineup/' + id, function (data) {
    callback(data);
  });
}

/**
 * Remove given nodes from the DOM.
 * @param  {HTMLCollection} htmlCollection [description]
 */
function removeNodes(htmlCollection) {
  if (htmlCollection) {
    for (var i = 0; i < htmlCollection.length; i++) {
      htmlCollection.item(i).remove();
    }
  }
}
