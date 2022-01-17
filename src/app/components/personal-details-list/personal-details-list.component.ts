import { DataService } from '../../services/data.service';
import { PersonalDetails, Filters } from '../../models/personal-details';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'app-personal-details-list',
	templateUrl: './personal-details-list.component.html',
	styleUrls: ['./personal-details-list.component.less'],
})
export class PersonalDetailsListComponent implements OnInit {
	filters = this._formBuilder.group({
		name: this._formBuilder.control(''),
		company: this._formBuilder.control(''),
	});

	displayedColumns: string[] = ['avatar', 'name', 'company', 'actions'];

	personalDetailsList: PersonalDetails[] = [];
	filteredPersonalDetailsList: PersonalDetails[] = [];

	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 20, 40];
	pageEvent: PageEvent | null = null;

	constructor(private _formBuilder: FormBuilder, private _dataService: DataService) {}

	ngOnInit(): void {
		this._loadPersonalDetailsList();
		this._onFiltersChange();
	}

	private _loadPersonalDetailsList(): void {
		this._dataService.getPersonalDetails().subscribe((data) => {
			this.personalDetailsList = data;
			this._filterPersonalDetailsList(this.filters.value);
		});
	}

	private _filterPersonalDetailsList(filters: Partial<Filters>): void {
		this.filteredPersonalDetailsList = this.personalDetailsList.filter((personalDetails) => {
			return personalDetails.name.includes(filters?.name ?? '') && personalDetails.company.includes(filters?.company ?? '');
		});
	}

	private _onFiltersChange(): void {
		this.filters.valueChanges.subscribe(() => {
			this._filterPersonalDetailsList(this.filters.value);
		});
	}

	resetFilters(): void {
		this.filters.reset();
	}
}
