import { Injectable } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Query } from './query';

@Injectable()
export class SearchService {

	headers: Headers = new Headers({'Content-Type': 'text/html'});

	constructor(private http: Http) {}

	search(query: Query, city: string) {
		let minPrice = query.minPrice, maxPrice = query.maxPrice;
		let minYear = query.minYear, maxYear = query.maxYear;
		let makeAndModel = '';
		// only include make and model specification if user specified them
		if (query.make != '' && query.model != '')
			makeAndModel = 'auto_make_model=' + query.make + '+' + query.model;
		if (query.transmission.length > 0) 
			makeAndModel += '&';
		let transmission = '', url = '';
		if (query.transmission.indexOf(1) > -1) // manual
			transmission += 'auto_transmission=1';
		if (query.transmission.indexOf(2) > -1) // automatic
			transmission += '&auto_transmission=2';
		if (query.transmission.indexOf(3) > -1) // other
			transmission += '&auto_transmission=3';

	 	url = '/api/listings?' + `${makeAndModel}${transmission}` + 
	 		  `&city=${city}` + `&min_price=${minPrice}` + 
	 		  `&max_price=${maxPrice}` + `&min_auto_year=${minYear}` + 
	 		  `&max_auto_year=${maxYear}`;
	 	return this.http.get(url)
	 		.toPromise().
	 		then(listings => listings.json() )
	 		.catch(this.handleError);
	}

	handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
    		errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
    		errMsg = error.message ? error.message : error.toString();
  		}
  		return Promise.reject(errMsg);
	}

}