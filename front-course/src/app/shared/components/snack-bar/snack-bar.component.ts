import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  openSnackBar() {
    this._snackBar.open("message", "action", {duration: 5 * 1000});
  }
}
