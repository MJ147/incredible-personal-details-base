import { DataService } from './../../services/data.service';
import { PersonalDetails, Filters } from './../../models/personal-details';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-personal-data-list',
	templateUrl: './personal-data-list.component.html',
	styleUrls: ['./personal-data-list.component.less'],
})
export class PersonalDataListComponent implements OnInit {
	filters = this._formBuilder.group({
		name: this._formBuilder.control(''),
		company: this._formBuilder.control(''),
	});

	displayedColumns: string[] = ['avatar', 'name', 'company', 'actions'];

	personalDetailsList: PersonalDetails[] = [];

	constructor(private _formBuilder: FormBuilder, private _dataService: DataService) {}

	ngOnInit(): void {
		this.loadPersonalDetails();
	}

	loadPersonalDetails(): void {
		this._dataService.getPersonalDetails(this.filters.value).subscribe((data) => {
			this.personalDetailsList = data;
		});
	}
}
