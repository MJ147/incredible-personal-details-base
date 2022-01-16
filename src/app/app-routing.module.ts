import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalDataListComponent } from './components/personal-data-list/personal-data-list.component';

const routes: Routes = [
	{ path: '', redirectTo: 'personal-details-list', pathMatch: 'full' },
	{ path: 'personal-details-list', component: PersonalDataListComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
