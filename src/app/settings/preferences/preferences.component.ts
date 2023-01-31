import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  text = 'Drag Me Around';
  openEdit = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleEdit() {
    this.openEdit = !this.openEdit;
  }
  submit() {
    console.log('submitted');
  }

}
