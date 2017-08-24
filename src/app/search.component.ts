import { Component, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http'

import { Query } from './query';

declare var $:any;

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styles: [
		`#search-form-outer {
			position: relative;
		}

		@media (min-width: 992px) {
			#search-form {
				position: fixed;
			}
		}
	
		.ui-icon {
			float: left;
			margin: 12px 12px 20px 0;
		}`
	]
})
export class SearchComponent implements AfterViewInit {
	// example/default query
	query: Query = new Query('', '', 0, 100000, [], 1999, 2006);
	manual: boolean = false;
	automatic: boolean = false;
	other: boolean = false;
	submitted: boolean = false;
	nationalSearch: boolean = false;
	missingField: boolean = false;
	searchCompleted: boolean = false;
	listings: any[] = [];
	selectedCity: string;

	cities: string[] = ['auburn', 'bham', 'dothan', 'shoals', 'gadsden', 
						'huntsville', 'mobile', 'montgomery', 'tuscaloosa', 
						'anchorage', 'fairbanks', 'kenai', 'juneau', 
						'flagstaff', 'mohave', 'phoenix', 'prescott', 'showlow',
						'sierravista', 'tucson', 'yuma', 'fayar', 'fortsmith',
						'jonesboro', 'littlerock', 'texarkana', 'bakersfield',
						'chico', 'fresno', 'goldcountry', 'hanford', 'humboldt',
						'imperial', 'inlandempire', 'losangeles', 'mendocino',
						'merced', 'modesto', 'monterey', 'orangecounty',
						'palmsprings', 'redding', 'sacramento', 'sandiego',
						'sfbay', 'slo', 'santabarbara', 'santamaria',
						'siskiyou', 'stockton', 'susanville', 'ventura',
						'visalia', 'yubasutter', 'boulder', 'cosprings', 
						'denver', 'eastco', 'fortcollins', 'rockies', 'pueblo',
						'westslope', 'newlondon', 'hartford', 'newhaven', 
						'nwct', 'delaware', 'washingtondc', 'miami', 'daytona',
						'keys', 'fortmyers', 'gainesville', 'cfl', 
						'jacksonville', 'lakeland', 'lakecity', 'ocala', 
						'okaloosa', 'orlando', 'panamacity', 'pensacola',
						'sarasota', 'spacecoast', 'staugustine', 'tallahassee',
						'tampa', 'treasure', 'albanyga', 'athensga', 'atlanta',
						'augusta', 'brunswick', 'columbusga', 'macon', 'nwga',
						'savannah', 'statesboro', 'valdosta', 'honolulu',
						'boise', 'eastidaho', 'lewiston', 'twinfalls', 'bn',
						'chambana', 'chicago', 'decatur', 'lasalle', 'mattoon',
						'peoria', 'rockford', 'carbondale', 'springfieldil',
						'quincy', 'bloomington', 'evansville', 'fortwayne',
						'indianapolis', 'kokomo', 'tippecanoe', 'muncie',
						'richmondin', 'southbend', 'terrehaute', 'ames',
						'cedarrapids', 'desmoines', 'dubuque', 'fortdodge',
						'iowacity', 'masoncity', 'quadcities', 'siouxcity',
						'ottumwa', 'waterloo', 'lawrence', 'ksu', 'nwks',
						'salina', 'seks', 'swks', 'topeka', 'wichita', 'bgky',
						'eastky', 'lexington', 'louisville', 'owensboro',
						'westky', 'batonrouge', 'cenla', 'houma', 'lafayette',
						'lakecharles', 'monroe', 'neworleans', 'shreveport',
						'maine', 'annapolis', 'baltimore', 'easternshore',
						'frederick', 'smd', 'westmd', 'boston', 'capecod',
						'southcoast', 'westernmass', 'worcester', 'annarbor',
						'battlecreek', 'centralmich', 'detroit', 'flint',
						'grandrapids', 'holland', 'jxn', 'kalamazoo','lansing',
						'monroemi', 'muskegon', 'nmi', 'porthuron', 'saginaw',
						'swmi', 'thumb', 'up', 'bemidji', 'brainerd', 'duluth',
						'mankato', 'minneapolis', 'rmn', 'marshall', 'stcloud',
						'gulfport', 'hattiesburg', 'jackson', 'meridian',
						'northmiss', 'natchez', 'columbiamo', 'joplin',
						'kansascity', 'kirksville', 'loz', 'semo',
						'springfield', 'stjoseph', 'stlouis', 'billings',
						'bozeman', 'butte', 'greatfalls', 'helena', 'kalispell',
						'missoula', 'montana', 'grandisland', 'lincoln',
						'northplatte', 'omaha', 'scottsbluff', 'elko',
						'lasvegas', 'reno', 'nh', 'cnj', 'jerseyshore',
						'newjersey', 'southjersey', 'albuquerque', 'clovis',
						'farmington', 'lascruces', 'roswell', 'santafe',
						'albany', 'binghamton', 'buffalo', 'catskills',
						'chautauqua', 'elmira', 'fingerlakes', 'glensfalls',
						'hudsonvalley', 'ithaca', 'longisland', 'newyork',
						'oneonta', 'plattsburgh', 'potsdam', 'rochester',
						'syracuse', 'twintiers', 'utica', 'watertown',
						'asheville', 'boone', 'charlotte', 'eastnc',
						'fayetteville', 'greensboro', 'hickory', 'onslow',
						'outerbanks', 'raleigh', 'wilmington', 'winstonsalem',
						'bismarck', 'fargo', 'grandforks', 'nd', 'akroncanton',
						'ashtabula', 'athensohio', 'chillicothe', 'cincinnati',
						'cleveland', 'columbus', 'dayton', 'limaohio',
						'mansfield', 'sandusky', 'toledo', 'tuscarawas',
						'youngstown', 'zanesville', 'lawton', 'enid',
						'oklahomacity', 'stillwater', 'tulsa', 'bend',
						'corvallis', 'eastoregon', 'eugene', 'klamath',
						'medford', 'oregoncoast', 'portland', 'roseburg',
						'salem', 'altoona', 'chambersburg', 'erie',
						'harrisburg', 'lancaster', 'allentown', 'meadville',
						'philadelphia', 'pittsburgh', 'poconos', 'reading',
						'scranton', 'pennstate', 'williamsport', 'york',
						'providence', 'charleston', 'columbia', 'florencesc',
						'greenville', 'hiltonhead', 'myrtlebeach', 'nesd',
						'csd', 'rapidcity', 'siouxfalls', 'sd', 'chattanooga',
						'clarksville', 'cookeville', 'jacksontn', 'knoxville',
						'memphis', 'nashville', 'tricities', 'abilene',
						'amarillo', 'austin', 'beaumont', 'brownsville',
						'collegestation', 'corpuschristi', 'dallas',
						'nacogdoches', 'delrio', 'elpaso', 'galveston',
						'houston', 'killeen', 'laredo', 'lubbock', 'mcallen',
						'odessa', 'sanangelo', 'sanantonio', 'sanmarcos',
						'bigbend', 'texoma', 'easttexas', 'victoriatx', 'waco',
						'wichitafalls', 'logan', 'ogden', 'provo',
						'saltlakecity', 'stgeorge', 'vermont',
						'charlottesville', 'danville', 'fredericksburg',
						'norfolk', 'harrisonburg', 'lynchburg', 'blacksburg',
						'richmond', 'roanoke', 'swva', 'winchester',
						'bellingham', 'kpr', 'moseslake', 'olympic', 'pullman',
						'seattle', 'skagit', 'spokane', 'wenatchee', 'yakima',
						'charlestonwv', 'martinsburg', 'huntington',
						'morgantown','wheeling', 'parkersburg', 'swv', 'wv',
						'appleton', 'eauclaire', 'greenbay', 'janesville',
						'racine', 'lacrosse', 'madison', 'milwaukee',
						'northernwi', 'sheboygan', 'wausau', 'wyoming'];

	constructor(private http: HttpClient) {}

	removeDuplicates() {
		this.listings = this.listings.filter( (elt, idx) => {
			return this.listings.indexOf(elt) == idx;
		});
	}

	getUrl(city) {
		if (this.manual)
			this.query.transmission.push(1);
		if (this.automatic)
			this.query.transmission.push(2);
		if (this.other)
			this.query.transmission.push(3);
		let transString = '';
		for (let trans of this.query.transmission)
			transString += (`&auto_transmission=${trans}`)
		let url = '/api/listings?' + `auto_make_model=${this.query.make}+` +
				  `${this.query.model}&city=${city}` + 
				  `&min_price=${this.query.minPrice}` + 
	 			  `&max_price=${this.query.maxPrice}` + 
	 			  `&min_auto_year=${this.query.minYear}` + 
	 			  `&max_auto_year=${this.query.maxYear}` + transString;
	 	return url;
	}

	onSubmit() {
		// set searchCompleted = false to display progress spinner
		this.searchCompleted = false;
		// missing field if form submitted without city
	 	this.missingField = this.selectedCity === undefined ? true : false;
	 	// only run search if no missing fields
	 	if (!this.missingField) {
			this.http.get(this.getUrl(this.selectedCity) ).subscribe(
				listings => {
					this.listings = this.listings.concat(listings);
					// remove any duplicates concat created
			 		this.removeDuplicates();
			 		// set submitted to true to show listings once returned
			 		this.submitted = true;
				},
				// log the error if there was one
				error => console.log(error),
				// detects when the search is through
				() => {
					// if still no listings found, say 'No results.'
					if (this.listings.length === 0)
						this.listings.push({msg: 'No results.'});
					// set searchCompleted = true to remove progress spinner
					this.searchCompleted = true;
				}
			);
		}
	}

	runNationalSearch() {
		// set searchCompleted = false to display progress spinner
		this.searchCompleted = false;
		for (let city of this.cities) {
			this.http.get(this.getUrl(city) ).subscribe(listings => {
				this.submitted = true;
				// don't say 'No results' until national search is done running
				if (!listings.hasOwnProperty('msg') ) {
					this.listings = this.listings.concat(listings);
					// remove any duplicates concat created
	 				this.removeDuplicates();
	 			}
	 			// rough way of detecting when search is through
				if (city === this.cities[this.cities.length - 1]) {
					// if still no listings found, say 'No results.'
					if (this.listings.length === 0)
						this.listings.push({msg: 'No results.'});
					// set searchCompleted = true to remove progress spinner
					this.searchCompleted = true;
				}
			});
		}
	}

	ngAfterViewInit() {
		// Logic for price range slider
    	$( () => {
	      $('#price-range').slider({
	        range: true,
	        min: 0,
	        max: 100000,
	        values: [0, 100000],
	        step: 1000,
	        slide: (event, ui ) => {
	          $('#price').val('$' + ui.values[0] + ' - $' + ui.values[1]);
	          // bind to the min and max prices for the query
	          this.query.minPrice = ui.values[0];
	          this.query.maxPrice = ui.values[1];
	        }
	      });
	      $('#price').val('$' + $('#price-range').slider('values', 0 ) +
	        ' - $' + $('#price-range').slider('values', 1 ) );
	    });

	    // Logic for year range slider
	    $( () => {
	      $('#year-range').slider({
	        range: true,
	        min: 1900,
	        max: 2018,
	        values: [1900, 2018],
	        slide: (event, ui ) => {
	          $('#year').val(ui.values[0] + ' - ' + ui.values[1]);
	          // bind to the min and max years for the query
	          this.query.minYear = ui.values[0];
	          this.query.maxYear = ui.values[1];
	        }
	      });
	      $('#year').val($('#year-range').slider('values', 0 ) + ' - ' + 
	      $('#year-range').slider('values', 1 ) );
	    });
	}

	confirmNat() {
		this.nationalSearch = true;
		$( () => {
			$("#dialog-confirm").dialog({
				resizable: false,
				height: "auto",
				width: 400,
				modal: true,
				buttons: {
					"Run national search": () => {
						$("#dialog-confirm").dialog("close");
						this.nationalSearch = false;
						this.runNationalSearch();
					},
					Cancel: () => {
						$("#dialog-confirm").dialog("close");
						this.nationalSearch = false;
					}
				}
			});
		});
	}
	// clear listings from previous searches
	clear() {
		this.listings = [];
		this.submitted = false;
	}
}