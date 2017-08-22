import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-listings',
	templateUrl: './listings.component.html',
	styles: [`
		.cropped {
			object-fit: cover;
			margin: 5px;
		}

		a {
			text-decoration: none;
			color: black;
		}

		.msg {
			margin-left: 15px;
		}
	`]
})
export class ListingsComponent {
	@Input() listings: any[];

	constructor() {}
}