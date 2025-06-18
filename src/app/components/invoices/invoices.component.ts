import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

interface QuickRange {
	label: string;
	value: string;
}

@Component({
	selector: 'app-invoices',
	standalone: true,
	imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule, DatePipe, MatTableModule, MatPaginatorModule],
	templateUrl: './invoices.component.html',
	styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
	invoices: any[] = [];
	loading = true;
	error: string | null = null;
	startDate: Date | null = null;
	endDate: Date | null = null;
	today: Date = new Date();
	quickRanges: QuickRange[] = [
		{ label: 'Hoy', value: 'today' },
		{ label: 'Ayer', value: 'yesterday' },
		{ label: 'Una semana', value: 'week' },
		{ label: 'Hace un mes', value: 'month' },
		{ label: 'Últimos 3 meses', value: '3months' },
		{ label: 'Últimos 6 meses', value: '6months' }
	];
	selectedRange: string = '';
	meta: any = {};
	
	displayedColumns: string[] = ['id', 'invoice_number', 'total', 'invoice_date', 'status'];
	totalRecords: number = 0;
	pageSize: number = 20;
	pageIndex: number = 0;

	setRange(range: string) {
		const today = new Date();
		let start: Date | null = null;
		let end: Date | null = null;
		switch (range) {
			case 'today':
				start = new Date(today);
				end = new Date(today);
				start.setHours(0, 0, 0, 0);
				end.setHours(23, 59, 59, 999);
				break;
			case 'yesterday':
				start = new Date(today);
				start.setDate(today.getDate() - 1);
				end = new Date(start);
				break;
			case 'week':
				end = today;
				start = new Date(today);
				start.setDate(today.getDate() - 7);
				break;
			case 'month':
				end = today;
				start = new Date(today);
				start.setMonth(today.getMonth() - 1);
				break;
			case '3months':
				end = today;
				start = new Date(today);
				start.setMonth(today.getMonth() - 3);
				break;
			case '6months':
				end = today;
				start = new Date(today);
				start.setMonth(today.getMonth() - 6);
				break;
			default:
				start = null;
				end = null;
		}
		this.startDate = start;
		this.endDate = end;
		this.selectedRange = range;
		if (start && end) {
			this.fetchInvoices(start, end);
		}
	}

	fetchInvoices(startDate?: Date, endDate?: Date, page: number = 1, perPage: number = 20) {
		this.loading = true;
		this.error = null;
		
		let url = 'http://127.0.0.1:3000/api/v1/invoices/fetch_by_date_range';
		const params = new URLSearchParams();
		params.append('page', page.toString());
		params.append('per_page', perPage.toString());
		if (startDate && endDate) {
			params.append('start_date', startDate.toISOString().split('T')[0]);
			params.append('end_date', endDate.toISOString().split('T')[0]);
		}

		const paramString = Array.from(params.entries())
			.filter(([_, v]) => v && v !== 'undefined' && v !== 'null')
			.map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
			.join('&');
		url += paramString ? ('?' + paramString) : '';
		
			fetch(url, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' }
			})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				this.invoices = data.data || [];
				this.meta = data.meta || {};
				this.totalRecords = this.meta.total || 0;
				this.loading = false;
			})
			.catch(error => {
				console.error('Error fetching invoices:', error);
				this.error = error.message;
				this.loading = false;
			});
	}

	onSubmit(event: Event) {
		event.preventDefault();
		if (this.startDate && this.endDate) {
			this.fetchInvoices(this.startDate, this.endDate);
		}
	}

	onPageChange(event: PageEvent) {
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;
		const page = event.pageIndex + 1;
		this.fetchInvoices(this.startDate || undefined, this.endDate || undefined, page, this.pageSize);
	}

	ngOnInit() {
		this.fetchInvoices();
	}
}
