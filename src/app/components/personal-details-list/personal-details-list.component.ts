import { DataService } from '../../services/data.service';
import { PersonalDetails, Filters, Sorting } from '../../models/personal-details';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SortingColumn } from 'src/app/enum/sortingColumn.enum';

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
	paginatedPersonalDetailsList: PersonalDetails[] = [];

	currentPage = 1;
	pageSize = 20;
	sorting: Sorting = { column: SortingColumn.Name, isAsc: true };

	SortingColumn: typeof SortingColumn = SortingColumn;

	constructor(private _formBuilder: FormBuilder, private _dataService: DataService, private _cdr: ChangeDetectorRef) {}

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
		this._paginatePersonalDetailsList();
	}

	private _onFiltersChange(): void {
		this.filters.valueChanges.subscribe(() => {
			this._filterPersonalDetailsList(this.filters.value);
		});
	}

	private _paginatePersonalDetailsList(): void {
		const firstPage = this.pageSize * (this.currentPage - 1);
		this.paginatedPersonalDetailsList = this.filteredPersonalDetailsList.slice(firstPage, firstPage + this.pageSize);
		this.sortPersonalDetailsList(this.sorting.column, this.sorting.isAsc);
	}

	sortPersonalDetailsList(column: SortingColumn, isAsc?: boolean): void {
		let asc = 0;
		if (isAsc) {
			asc = -1;
		} else {
			asc = column !== this.sorting.column || this.sorting.isAsc ? -1 : 1;
		}

		this.filteredPersonalDetailsList.sort((a, b) => (a[column] < b[column] ? asc : -asc));

		this.sorting = { column, isAsc: asc === 1 };
	}

	resetFilters(): void {
		this.filters.reset();
	}

	changePage(move: number | null = null, newNumber: number | null = null) {
		let pageNumber = 0;

		if (newNumber != null) {
			this.currentPage = newNumber;
			return;
		}

		if (move == null) {
			return;
		}

		pageNumber = this.currentPage + move;

		if (pageNumber >= this.filteredPersonalDetailsList.length / 20) {
			pageNumber = this.filteredPersonalDetailsList.length / 20;
		} else if (pageNumber <= 1) {
			pageNumber = 1;
		}

		this.currentPage = pageNumber;

		this._paginatePersonalDetailsList();
	}
}
