import { PersonalDetails } from './../../models/personal-details';
import { FormMode } from './../../enum/formMode.enum';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';

@Component({
	selector: 'app-personal-details-form',
	templateUrl: './personal-details-form.component.html',
	styleUrls: ['./personal-details-form.component.less'],
})
export class PersonalDetailsFormComponent implements OnInit {
	id: string = '';
	formMode: FormMode = FormMode.Add;
	personalDetails: PersonalDetails | null = null;

	headerText: string = '';
	submitButtonText: string = '';
	confirmSnackBarText: string = '';
	matButtonIcon: string = '';

	private readonly _DATE_PATTERN = '^(([0-9])|([0-2][0-9])|([3][0-1])) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [0-9]{4}$';
	private readonly _DATE_FORMAT = 'DD MMM YYYY';

	form = this._formBuilder.group({
		name: this._formBuilder.control('', [Validators.required]),
		company: this._formBuilder.control('', [Validators.required]),
		address: this._formBuilder.control('', [Validators.required]),
		createdAt: this._formBuilder.control('', [Validators.required, Validators.pattern(this._DATE_PATTERN)]),
		about: this._formBuilder.control('', [Validators.required]),
		tags: this._formBuilder.control('', [Validators.required]),
		email: this._formBuilder.control('', [Validators.required, Validators.email]),
	});

	constructor(
		private _formBuilder: FormBuilder,
		private _dataService: DataService,
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
					let createdAt = moment.unix(personalDetails?.createdAt ?? 0).format(this._DATE_FORMAT);
					this.form.patchValue({ ...personalDetails, createdAt } ?? {});
					this.personalDetails = personalDetails;
				});
			}

			this.prepareComponentMode(this.formMode);
		});
	}

	submit(): void {
		if (!this.form.valid) {
			this.form.markAllAsTouched();
			this._matSnackBar.open('Complete required fields');
			return;
		}

		const createdAt = moment(this.form.value.createdAt, this._DATE_FORMAT).unix();
		const formValues = { ...this.form.value, createdAt };

		if (this.personalDetails == null) {
			const avatar = 'http://placehold.it/32x32';
			const details = { ...formValues, avatar };
			this._dataService.addPersonalDetails(details);
		} else {
			const details = { ...this.personalDetails, ...formValues };
			this._dataService.editPersonalDetails(details);
		}

		this._matSnackBar.open(this.confirmSnackBarText);
		this._router.navigate(['/personal-details', 'list']);
	}

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
