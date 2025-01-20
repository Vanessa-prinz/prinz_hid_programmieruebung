import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})

export class DataComponent {
  registration: any;

  constructor(public storeService: StoreService, private backendService: BackendService) { }

  public page: number = 0;
  public loadingRows: Set<number> = new Set<number>();

  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
  }

  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

  deleteRegistration(registrationId: number) {
    this.loadingRows.add(registrationId);
    this.backendService.deleteRegistration(registrationId).subscribe({
      next: () => {
        this.storeService.registrations = this.storeService.registrations.filter(reg => +reg.id !== registrationId);
        this.loadingRows.delete(registrationId);
      },
      error: () => {
        console.error("Fehler beim Löschen der Registrierung.");
        this.loadingRows.delete(registrationId);
      }
    });
  }

  public sortAscending: boolean = true;
  sortRegistrations() {
    this.sortAscending = !this.sortAscending;
    this.storeService.registrations.sort((a, b) => {
      const dateA = new Date(a.registrationDate).getTime();
      const dateB = new Date(b.registrationDate).getTime();
      return this.sortAscending ? dateA - dateB : dateB - dateA;
    });
  }
}
