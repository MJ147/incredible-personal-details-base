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
			{ path: 'create', component: PersonalDetailsFormComponent },
			{ path: 'edit', component: PersonalDetailsFormComponent },
		],
	},
	{ path: '**', redirectTo: 'personal-details/list' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
