import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { TableColumn } from '../table/table.component';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-popup-profissionais',
  templateUrl: './popup-profissionais.component.html',
  styleUrls: ['./popup-profissionais.component.css'],
  imports: [
    SearchBarComponent,
    DateTimePickerComponent,
    NgIf,
    MatButtonModule,
    TableComponent,
    ButtonComponent,
    MatIconModule
  ]
})
export class PopupProfissionaisComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<PopupProfissionaisComponent>
  ) {}

  searchText: string = '';

  tableData = [
    { nome: 'José dos Santos', contato: 'Quisque non sodales' },
    { nome: 'Maria da Silva', contato: 'Lorem ipsum dolor' },
    { nome: 'Carlos Almeida', contato: 'Sed hendrerit massa' },
  ];

  tableColumns: TableColumn[] = [
    { key: 'nome', header: 'Nome' },
    { key: 'contato', header: 'Contato' }
  ];

  onSearch(searchTerm: string) {
    this.searchText = searchTerm;
    console.log('Texto da pesquisa:', this.searchText);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
