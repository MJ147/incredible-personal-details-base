import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalDetailsFormComponent } from './components/personal-details-form/personal-details-form.component';
import { PersonalDetailsListComponent } from './components/personal-details-list/personal-details-list.component';

const routes: Routes = [
	{
		path: 'personal-details',
		children: [
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{ path: 'list', component: PersonalDetailsListComponent },
			{ path: 'add', component: PersonalDetailsFormComponent },
			{ path: 'edit/:id', component: PersonalDetailsFormComponent },
			{ path: 'preview/:id', component: PersonalDetailsFormComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
