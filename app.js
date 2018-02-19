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

const express = require('express');
const bodyParser = require('body-parser');

// app config
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

// DB init
const db = require('./app/db.js');
require('./app/db-seed.js')(db);

// routes init
require('./app/routes.js')(app, db);

// server start
app.listen(app.get('port'), process.env.IP, () =>
   console.log('Lineup app listening on port ' + app.get('port') + '.'));
