import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() open!: boolean;
  @Output() close = new EventEmitter<boolean>();
  searchForm = this.formBuilder.group({
    searchVal: new FormControl('', [
      Validators.required,
    ])
  })
  searches: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  closeSearch() {
    this.open = false;
    this.close.emit(false);
  }

  limitString(str: string): string {
    let maxLen = 20
    if (str.length > maxLen) {
      const newStr = str.slice(0, maxLen);
      return newStr + '...'
    }
    return str
  }
   submitSearch(): void | boolean {
    if (!this.searchVal!.value) {
      return false;
    }
    this.searches.push(this.searchVal!.value)
    this.searchForm.setValue({
      searchVal: ''
    })
  }

  recentSearches(): string[] {
    const searchRef = [...this.searches];
    if (this.searches.length > 5) {
      return searchRef.splice(searchRef.length - 5, 5)
    }
    return this.searches;
  }
  removeFromSearch(param: string): void | boolean {
    this.searches = this.searches.filter((search) => search !== param)
  }

  get searchVal() {
    return this.searchForm.get('searchVal')
  }
}
