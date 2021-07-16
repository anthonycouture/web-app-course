import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.css']
})
export class SearchAutocompleteComponent implements OnInit {

  @Input() listOption!: string[];
  @Output() optionValide = new EventEmitter<string[]>();

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnInit(): void {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let optionValide = this.listOption.filter(option => option.toLowerCase().includes(filterValue));
    this.optionValide.emit(optionValide);
    return optionValide;
  }

}
