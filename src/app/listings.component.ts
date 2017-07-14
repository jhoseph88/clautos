import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { SearchService } from './search.service';

@Component({
	selector: 'app-listings',
	templateUrl: './listings.component.html',
	styles: [`
		.cropped {
			object-fit: cover;
		}
	`]
})
export class ListingsComponent implements OnInit {
	@Input() listings: any[];

	constructor(private searchService: SearchService) {}

	ngOnInit() {
		
	}
}