import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = '';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primeira página';
  override lastPageLabel = 'Última página';

  override changes = new Subject<void>();

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const amountPages = Math.ceil(length / pageSize);
    return `${page + 1} – ${amountPages}`;
  };
}

export interface TableColumn {
  key: string;
  header: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];

  @Input() totalItems: number = 0;
  @Input() serverPagination: boolean = false;
  @Input() pageSize: number = 6;

  @Output() pageChange = new EventEmitter<{page: number, pageSize: number}>();

  @Output() rowClick = new EventEmitter<any>();

  onRowClick(item: any): void {
    this.rowClick.emit(item);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  paginatedData: any[] = [];
  currentPage = 0;

  ngOnInit(): void {
    this.updatePaginatedData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se 'data' ou 'pageSize' mudar, atualize a paginação
    if (changes['data'] || changes['pageSize']) {
      this.updatePaginatedData();

      if (this.paginator && this.currentPage === 0) {
        this.paginator.firstPage();
      }
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    if (this.serverPagination) {
      this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize });
    } else {
      this.updatePaginatedData();
    }
  }

  private updatePaginatedData(): void {
    if (!this.serverPagination) {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedData = this.data.slice(start, end);
    } else {
      this.paginatedData = this.data;
    }
  }
}
