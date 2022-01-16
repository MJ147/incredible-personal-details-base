import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filters, PersonalDetails } from '../models/personal-details';
import { filter, find, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private readonly _JSON_PATH: string = './assets/data/data.json';

	constructor(private _http: HttpClient) {}

	getPersonalDetails(filters: Partial<Filters>): Observable<PersonalDetails[]> {
		return this._http.get<PersonalDetails[]>(this._JSON_PATH).pipe(
			map((personalDetailsList) => {
				return personalDetailsList.filter((personalDetails) => {
					return personalDetails.name.includes(filters?.name ?? '') || personalDetails.company.includes(filters?.company ?? '');
				});
			}),
		);
	}

	getPersonalDetailsById(id: string): Observable<PersonalDetails | null> {
		return this._http.get<PersonalDetails>(this._JSON_PATH).pipe(
			find((personalDetails) => personalDetails.id === id),
			map((personalDetails) => personalDetails ?? null),
		);
	}
}
