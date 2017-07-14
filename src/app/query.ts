export class Query {
	constructor(public make: string, 
				public model: string, 
				public minPrice: number,
				public maxPrice: number,
				public transmission: number[], 
				public minYear: number,
	 	   		public maxYear: number) {}
}