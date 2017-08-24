import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { MdProgressSpinner } from '@angular/material';

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
	`],
	providers: [MdProgressSpinner]
})
export class ListingsComponent {
	@Input() listings: any[];

	constructor(spinner: MdProgressSpinner) {}
}