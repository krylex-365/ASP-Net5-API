import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  constructor() { }

  get reload() {
    return localStorage.getItem('reload');
  }

  set reload(value: string) {
    localStorage.setItem('reload', value);
  }

  refresh(): void {
    if (this.reload == "1") {
      this.reload = "0";
      window.location.reload();
    }
  }
}
