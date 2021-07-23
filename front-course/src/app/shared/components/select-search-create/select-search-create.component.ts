import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-search-create',
  templateUrl: './select-search-create.component.html',
  styleUrls: ['./select-search-create.component.css']
})
export class SelectSearchCreateComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];


  selectedStates = this.states;

  searchValue: string = '';


  onKey() {
    let resultSearch = this.search(this.searchValue);
    this.selectedStates = JSON.stringify(resultSearch) === JSON.stringify([]) ? [this.searchValue] : resultSearch;
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.states.filter(option => option.toLowerCase().startsWith(filter));
  }

}
