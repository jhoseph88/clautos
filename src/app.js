// Get dependencies
const express = require('express')
const http = require('http')
const path = require('path')

// Get API routes
const api = require('./server/routes/api')

const app = express()

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist') ) )

// Set api routes
app.use('/api', api)

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	console.log(__dirname)
	res.sendFile(path.join(__dirname, '../dist/index.html') )
});

// Get port from environment and store in Express
const port = process.env.port || '3000'
app.set('port', port)

app.listen(port, () => console.log(`API running on localhost:${port}`) )