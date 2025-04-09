import { Component, Input } from '@angular/core';

interface InfoItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dashboard-info',
  imports: [],
  templateUrl: './dashboard-info.component.html',
  styleUrl: './dashboard-info.component.css'
})
export class DashboardInfoComponent {
  @Input() infoData: InfoItem[] = [];

  isNotLastItem(index: number): boolean {
    return index < this.infoData.length - 1;
  }
}
