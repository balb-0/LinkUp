import { Component } from '@angular/core';
import { CardHomeComponent } from '../../components/card-home/card-home.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { PopupProfissionaisComponent } from '../../components/popup-profissionais/popup-profissionais.component';
import { ServiceTechnologyCardComponent } from '../../components/service-technology-card/service-technology-card.component';


@Component({
  selector: 'app-homepage',
  imports: [CardHomeComponent, ServiceTechnologyCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})


export class HomepageComponent {

  constructor(public dialog: MatDialog) {}

  abrirPopupProfissionais() {
    const dialogRef = this.dialog.open(PopupProfissionaisComponent); // Verifique se está chamando o componente correto

    dialogRef.afterClosed().subscribe(result => {
      console.log('Popup Profissionais fechado');
    });
  }
}
