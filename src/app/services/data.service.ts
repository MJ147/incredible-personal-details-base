import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filters, PersonalDetails } from '../models/personal-details';
import { filter, find, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private readonly _JSON_PATH: string = './assets/data/data.json';

	private _personalDetailsList: BehaviorSubject<PersonalDetails[]> = new BehaviorSubject<PersonalDetails[]>([]);

	constructor(private _http: HttpClient) {
		this.preparePersonalDetailsList();
	}

	preparePersonalDetailsList(): void {
		this._http.get<PersonalDetails[]>(this._JSON_PATH).subscribe((data) => this._personalDetailsList.next(data));
	}

	getPersonalDetails(): Observable<PersonalDetails[]> {
		return this._personalDetailsList;
	}

	// getPersonalDetailsById(id: string): Observable<PersonalDetails[] | null> {
	// 	return this._personalDetailsList.pipe(
	// 		find((personalDetails) => {
	//             console.log(personalDetails);

	// 			return personalDetails.id === id;
	// 		}),
	// 		map((personalDetails) => personalDetails ?? null),
	// 	);
	// }
}
