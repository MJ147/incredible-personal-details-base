import { DataService } from '../../services/data.service';
import { PersonalDetails, Filters, Sorting } from '../../models/personal-details';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SortingColumn } from 'src/app/enum/sortingColumn.enum';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../popups/delete-popup/delete-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

	personalDetailsList: PersonalDetails[] = [];
	filteredPersonalDetailsList: PersonalDetails[] = [];
	paginatedPersonalDetailsList: PersonalDetails[] = [];

	currentPage = 1;
	pageSize = 20;
	sorting: Sorting = { column: SortingColumn.Name, isAsc: true };

	SortingColumn: typeof SortingColumn = SortingColumn;

	constructor(
		private _formBuilder: FormBuilder,
		private _dataService: DataService,
		private _matDialog: MatDialog,
		private _matSnackBar: MatSnackBar,
		private _router: Router,
	) {}

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
			return (
				personalDetails.name.toLocaleLowerCase().includes(filters?.name?.toLocaleLowerCase() ?? '') &&
				personalDetails.company.toLocaleLowerCase().includes(filters?.company?.toLocaleLowerCase() ?? '')
			);
		});
		this.sortPersonalDetailsList(this.sorting.column, this.sorting.isAsc);
	}

	private _onFiltersChange(): void {
		this.filters.valueChanges.subscribe(() => {
			this._filterPersonalDetailsList(this.filters.value);
		});
	}

	private _paginatePersonalDetailsList(): void {
		const firstPage = this.pageSize * (this.currentPage - 1);
		this.paginatedPersonalDetailsList = this.filteredPersonalDetailsList.slice(firstPage, firstPage + this.pageSize);
	}

	sortPersonalDetailsList(column: SortingColumn, isAsc?: boolean): void {
		let asc = 0;
		if (isAsc != null) {
			asc = this.sorting.isAsc === isAsc ? -1 : 1;
		} else {
			asc = column !== this.sorting.column || this.sorting.isAsc ? -1 : 1;
		}

		this.filteredPersonalDetailsList.sort((a, b) => (a[column] < b[column] ? asc : -asc));

		this.sorting = { column, isAsc: asc === 1 };
		this.changePage(0, this.currentPage);
	}

	changePage(move: number, newNumber: number | null = null) {
		let pageNumber = this.currentPage;

		if (newNumber != null) {
			pageNumber = newNumber;
		}

		pageNumber += move;

		if (pageNumber >= this.lastPage) {
			pageNumber = this.lastPage;
		} else if (pageNumber <= 1) {
			pageNumber = 1;
		}

		this.currentPage = pageNumber;

		this._paginatePersonalDetailsList();
	}

	deletePersonalDetails(personalDetails: PersonalDetails): void {
		this._matDialog
			.open<DeletePopupComponent, string>(DeletePopupComponent, {
				data: personalDetails.name,
				autoFocus: false,
			})
			.afterClosed()
			.subscribe((isConfirm) => {
				if (isConfirm) {
					const idx = this.personalDetailsList.indexOf(personalDetails);
					this.personalDetailsList.splice(idx, 1);

					this._filterPersonalDetailsList(this.filters.value);
					this._matSnackBar.open('Element has been deleted');
				}
			});
	}

	resetFilters(): void {
		this.filters.reset();
	}

	get lastPage(): number {
		return Math.ceil(this.filteredPersonalDetailsList.length / this.pageSize);
	}
}
