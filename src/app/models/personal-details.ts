export interface PersonalDetails {
	id: string;
	avatarUrl: string;
	name: string;
	company: string;
	email: string;
	phone: string;
	address: string;
	about: string;
	createdAt: number;
	tags: string[];
}

export interface Filters {
	name: string;
	company: string;
}
