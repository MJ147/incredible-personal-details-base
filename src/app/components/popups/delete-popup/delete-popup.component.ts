import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-delete-popup',
	templateUrl: './delete-popup.component.html',
	styleUrls: ['./delete-popup.component.less'],
})
export class DeletePopupComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public personName: string) {}
}
