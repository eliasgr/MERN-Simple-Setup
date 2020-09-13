import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
import template from './../template';
import devBundle from './devBundle'; // comment out before building for production

const app = express();
devBundle.compile(app); //comment out before building for production

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
	res.status(200).send(template());
});

let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
	if (err) {
		console.log(err);
	}
	console.info('Server started on port %s.', port);
});

//Database connection url
const url =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';
//use connect method to connect to the server
MongoClient.connect(
	url,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, db) => {
		console.log('Connectes successfully to mongodb server');
		db.close();
	}
);
