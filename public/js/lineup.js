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

function initLineupTable(parent, numPlayerRows) {
  var table = document.createElement('table');
  table.className = 'lineupTable';
  table.appendChild(getLineupTableHeaderRow());

  for(var i = 0; i < numPlayerRows; i++) {
    table.appendChild(getLineupTablePlayerRow(i + 1, null));
  }

  parent.appendChild(table);
}

function getLineupTableHeaderRow() {
  var tdBattingOrder = document.createElement('td');
  var tdPlayerNumber = document.createElement('td');
  var tdPlayerName = document.createElement('td');
  var tdPlayerPosition = document.createElement('td');

  tdBattingOrder.textContent = ' ';
  tdPlayerNumber.textContent = 'No.';
  tdPlayerName.textContent = 'Player';
  tdPlayerPosition.textContent = 'Pos.';

  var trHeader = document.createElement('tr');
  trHeader.appendChild(tdBattingOrder);
  trHeader.appendChild(tdPlayerNumber);
  trHeader.appendChild(tdPlayerName);
  trHeader.appendChild(tdPlayerPosition);

  return trHeader;
}

function getLineupTablePlayerRow(battingOrder, player) {
  var tdBattingOrder = document.createElement('td');
  var tdPlayerNumber = document.createElement('td');
  var tdPlayerName = document.createElement('td');
  var tdPlayerPosition = document.createElement('td');

  tdBattingOrder.textContent = battingOrder.toString();
  if (player) {
    tdPlayerNumber.textContent = player.number;
    tdPlayerName.textContent = player.name;
    tdPlayerPosition.textContent = player.position;
  }

  var trPlayer = document.createElement('tr');
  trPlayer.appendChild(tdBattingOrder);
  trPlayer.appendChild(tdPlayerNumber);
  trPlayer.appendChild(tdPlayerName);
  trPlayer.appendChild(tdPlayerPosition);

  return trPlayer;
}
