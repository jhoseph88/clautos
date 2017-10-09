const express = require('express')
const router = express.Router()
var http = require('http')
var request = require('request')

var baseUrl = '.craigslist.org'

/* parses the listing page to fetch the main image url and mileage and returns 
   an object containing the listing url and the fetched image url */
function getListingDetail(listingUrl, imgFileName, price, callback) {
	request(listingUrl, (err, resp, body) => {
		if (err) {
			console.log('error: ' + err)
			return
		}

		// get image url 
		var baseImgUrl = 'https://images.craigslist.org/'
		var alnum = '[0-9a-zA-Z]*'
		var imgUrlRegex = new RegExp(`${baseImgUrl}${imgFileName}_${alnum}x${alnum}\.jpg`, 'gm')
		var imgUrl = body.match(imgUrlRegex)
		// default image if none found
		var imgUrl = imgUrl ? imgUrl[0] : '../../assets/images/no_img.png'

		// get mileage
		var mileageRegex = /<span>odometer: <b>[0-9]*</g
		var mileageMatches = body.match(mileageRegex)
		var mileage = mileageMatches ? mileageMatches[0] : null
		var numRegex = /[0-9]+/g
		var miles = mileageMatches ? numRegex.exec(mileage)[0] : ''

		// get description
		var descRegex = /<meta name="description" content=".*>/g
		var descMatches = descRegex.exec(body)

		var description = descMatches ? descMatches[0] : ''
		var descContentRegex = /content=".*>/g
		descMatches = description ? descContentRegex.exec(description) : ''
		description = descMatches ? descMatches[0] : ''

		descContentRegex = /".*?"/g
		descMatches = description ? descContentRegex.exec(description) : ''
		description = descMatches ? descMatches[0] : ''
		description = description.replace(/"/g, '')
		
		callback({url: listingUrl, imgUrl: imgUrl, price: price, 
				  mileage: miles, description: description })
	})
}

/* parses the results page and fetches the listing url and image url for each 
   listing. returns an array containing objects of form 
   { listingUrl, imgUrl, price} */
function getListingData(city, res, callback) {
	// get array of anchor tag strings--one string for each listing
	var metaRegex = /<a.*\n[\s]+.*result-price.*\n[\s]+<\/a>/gm
	var anchorMatches = res.match(metaRegex)
	// return immediately if no results found
	if (anchorMatches === null) {
		callback({msg: 'No results.'})
		return
	}
	// get unique listings by filtering (quadratic time - bad)
	var anchorElts = anchorMatches.filter( (elt, idx) => {
		return anchorMatches.indexOf(elt) === idx
	})

	var urlRegex = /https:.*[0-9]*\.html/gm
	var imgRegEx = /[0-9a-zA-Z]{5}_[a-zA-Z0-9]{11}/
	var priceRegex = /\$[0-9]*/

	var listingData = [];
	var listingUrl = '', imgFileName = '', imgMatch, imageUrl = ''
	var i = anchorElts.length
	var urls = []
	/* loop through anchorElts, fetch each listing url, and add a listing object
	   for each listing found containing the listings's url and its image url */
	anchorElts.forEach( (anchorElt) => {
		urls = anchorElt.match(urlRegex)
		if (urls)
			listingUrl = urls[0]
		else {
			callback({msg: 'No results.'})
			return
		}
		price = anchorElt.match(priceRegex)
		price = price ? anchorElt.match(priceRegex)[0] : 0

		imgMatch = anchorElt.match(imgRegEx)
		// default image if none found
		if (!imgMatch) {
			imgFileName = '../../assets/images/no_img.png'
			listingData.push({url: listingUrl, imgUrl: imgFileName, 
							  price: price, mileage: '', description: ''})
			i--
		} else {
			imgFileName = imgMatch[0]
			getListingDetail(listingUrl, imgFileName, price, (listingObj) => {
				listingData.push(listingObj)
				if (--i === 0)
					callback(listingData)
			})
		}
	})
}

function getTransmissions(trans) {
	var transmissions = ''
	for (let t of trans)
			transmissions += (`&auto_transmission=${t}`)
	return transmissions

}

// Get matching listings
router.get('/listings', (req, res) => {
	// extract data from query using express
	var minPrice = req.query.min_price, maxPrice = req.query.max_price
	var minYear = req.query.min_auto_year, maxYear = req.query.max_auto_year
	var makeAndModel = '', transmissions = ''
	// only include make and model specification if user specified them
	if (req.query.auto_make_model)
		makeAndModel = '&auto_make_model=' + req.query.auto_make_model
	// get formatted query string of transmissions to consider from query
	// (will be empty string if not specified (undefined) )
	if (req.query.auto_transmission)
		transmissions = getTransmissions(req.query.auto_transmission)
	var city = req.query.city
	var url = city + baseUrl
	var path = '/search/cta?' + 'min_price=' + minPrice + '&max_price=' + 
			   maxPrice + makeAndModel + transmissions + 
			   '&min_auto_year=' + minYear + '&max_auto_year=' + maxYear
	path = path.replace(' ', '+')
	var uri = 'https://' + url + path
	request(uri, (err, resp, body) => {
		if (err) {
			console.log('error: ' + err)
			return
		}
		getListingData(city, body, (listings) => {
			res.json(listings)
		})
	})
})

module.exports = router