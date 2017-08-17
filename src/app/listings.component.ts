import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-listings',
	templateUrl: './listings.component.html',
	styles: [`
		.cropped {
			object-fit: cover;
		}
	`]
})
export class ListingsComponent {
	@Input() listings: any[];

	constructor() {}
}