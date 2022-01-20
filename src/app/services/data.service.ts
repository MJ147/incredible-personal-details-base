import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalDetails } from '../models/personal-details';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private readonly _JSON_PATH: string = './assets/data/data.json';

	private _personalDetailsList$: BehaviorSubject<PersonalDetails[]> = new BehaviorSubject<PersonalDetails[]>([]);

	constructor(private _http: HttpClient) {
		this.preparePersonalDetailsList();
		this._generateId();
	}

	preparePersonalDetailsList(): void {
		this._http.get<PersonalDetails[]>(this._JSON_PATH).subscribe((data) => this._personalDetailsList$.next(data));
	}

	getPersonalDetails(): Observable<PersonalDetails[]> {
		return this._personalDetailsList$;
	}

	getPersonalDetailsById(id: string): Observable<PersonalDetails | null> {
		return this._personalDetailsList$.pipe(
			map((personalDetailList) => {
				return (
					personalDetailList.find((personalDetails) => {
						return personalDetails.id === id;
					}) || null
				);
			}),
		);
	}

	editPersonalDetails(personalDetails: PersonalDetails): void {
		const list = this._personalDetailsList$.getValue();
		const idx = list.findIndex((item) => item.id === personalDetails.id);
		list[idx] = personalDetails;
	}

	addPersonalDetails(personalDetails: PersonalDetails): void {
		const list = this._personalDetailsList$.getValue();
		list.push({ ...personalDetails, createdAt: Date.now(), id: this._generateId() });
	}

	private _generateId(): string {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		let id = String(Date.now());

		while (id.length < 24) {
			id += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		return id;
	}
}
