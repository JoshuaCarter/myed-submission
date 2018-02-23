'use strict';

/**
 * Author: Joshua Carter
 * Created: 22/02/2018
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const PORT = 80;
const HOST = '0.0.0.0';

//make express app
const app = express();

//enable CORS
app.use(cors());

//default route
app.get('/', (req, res) => {
	res.statusCode = 200;
	res.send("Node.js server is running.");
});

//file request route
app.get('/files/:file', (req, res) => {
	let file = req.params.file;
	//load file
	fs.readFile('served_files/' + file, 'utf8', (err, data) => {
		//header
		res.statusCode = 200;
		res.statusMessage = 'OK';
		res.setHeader('Content-type', 'application/json');

		//if failed to load file
		if (err) {
			//send error json
			let error = [{
				error: `Could not retrieve <strong>${file}</strong> from file server.`
			}];
			res.send(JSON.stringify(error));
		}
		//else succeeded 
		else {
			//send json
			res.send(data);
		}
	});
});

//run app
app.listen(PORT, HOST);