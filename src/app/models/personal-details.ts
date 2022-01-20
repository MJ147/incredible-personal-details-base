import { SortingColumn } from './../enum/sortingColumn.enum';

export interface PersonalDetails extends PersonalDetailsAdd {
	id: string;
	createdAt: number;
}

export interface PersonalDetailsAdd {
	avatarUrl: string;
	name: string;
	company: string;
	email: string;
	phone: string;
	address: string;
	about: string;
	tags: string[];
}

export interface Filters {
	name: string;
	company: string;
}

export interface Sorting {
	column: SortingColumn;
	isAsc: boolean;
}
