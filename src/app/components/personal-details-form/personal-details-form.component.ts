import { FormMode } from './../../enum/formMode.enum';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-personal-details-form',
	templateUrl: './personal-details-form.component.html',
	styleUrls: ['./personal-details-form.component.less'],
})
export class PersonalDetailsFormComponent implements OnInit {
	id: string = '';
	formMode: FormMode = FormMode.Add;

	headerText: string = '';
	submitButtonText: string = '';
	confirmSnackBarText: string = '';
	matButtonIcon: string = '';

	form = this._formBuilder.group({
		name: this._formBuilder.control('', [Validators.required]),
		company: this._formBuilder.control('', [Validators.required]),
		address: this._formBuilder.control('', [Validators.required]),
		about: this._formBuilder.control('', [Validators.required]),
		tags: this._formBuilder.control('', [Validators.required]),
		email: this._formBuilder.control('', [Validators.required]),
	});

	constructor(
		private _formBuilder: FormBuilder,
		private _dataService: DataService,
		private _matDialog: MatDialog,
		private _matSnackBar: MatSnackBar,
		private _route: ActivatedRoute,
		private _router: Router,
	) {}

	ngOnInit(): void {
		this._route.url.subscribe((url) => {
			this.setFormMode(url[0].path);
			this.id = this._route.snapshot.params.id ?? '';

			if (this.formMode !== FormMode.Add) {
				this._dataService.getPersonalDetailsById(this.id).subscribe((personalDetails) => {
					this.form.patchValue(personalDetails ?? {});
				});
			}

			this.prepareComponentMode(this.formMode);
		});
	}

	submitForm(): void {}

	setFormMode(path: string) {
		switch (path) {
			case FormMode.Edit:
				this.formMode = FormMode.Edit;
				break;

			case FormMode.Preview:
				this.formMode = FormMode.Preview;
				break;

			default:
				this.formMode = FormMode.Add;
				break;
		}
	}

	prepareComponentMode(formMode: FormMode): void {
		switch (formMode) {
			case FormMode.Edit:
				this.headerText = 'Edit personal details';
				this.submitButtonText = 'Save';
				this.confirmSnackBarText = 'Changes has been saved';
				this.matButtonIcon = 'save';
				break;

			case FormMode.Preview:
				this.headerText = 'Personal details';
				this.submitButtonText = 'Save';
				break;

			default:
				this.headerText = 'Add personal details';
				this.submitButtonText = 'Add';
				this.confirmSnackBarText = 'Personal details have been added';
				this.matButtonIcon = 'add';
		}
	}

	get isPreviewMode(): boolean {
		return this.formMode === FormMode.Preview;
	}
}
