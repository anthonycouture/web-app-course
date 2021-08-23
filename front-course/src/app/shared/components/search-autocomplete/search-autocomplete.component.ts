import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {startWith} from "rxjs/operators";

@Component({
  selector: 'app-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.css']
})
export class SearchAutocompleteComponent implements OnChanges, OnDestroy {

  @Input() listOption: string[] = [];
  @Output() optionValide = new EventEmitter<string[]>();

  myControl = new FormControl();
  filteredOptions: string[] = [];
  private _value: string = '';


  private _subscribeChangeValue$: Subscription;


  constructor() {
    this._subscribeChangeValue$ = this.myControl.valueChanges.pipe(
      startWith('')).subscribe(value => {
      this._value = value;
      return this._filter()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._filter();
  }

  private _filter() {
    const filterValue = this._value.toLowerCase();
    this.filteredOptions = this.listOption.filter(option => option.toLowerCase().startsWith(filterValue));
    if (this._value === '')
      this.optionValide.emit(this.listOption);
    else {
      this.optionValide.emit(this.filteredOptions);
    }
  }

  ngOnDestroy(): void {
    this._subscribeChangeValue$.unsubscribe();
  }


}
