import { Component } from '@angular/core';
import { CardHomeComponent } from '../../components/card-home/card-home.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { PopupProfissionaisComponent } from '../../components/popup-profissionais/popup-profissionais.component';

@Component({
  selector: 'app-homepage',
  imports: [CardHomeComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})


export class HomepageComponent {

  constructor(public dialog: MatDialog) {}
}
