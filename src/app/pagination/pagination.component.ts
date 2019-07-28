import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() page: number; // the current page
  @Input() count: number; // how many total items there are in all pages
  @Input() perPage: number; // how many items we want to show per page
  @Input() pagesToShow: number; // how many pages between next/prev
  @Input() loading: boolean; // check if content is being loaded
  @Input() min: number; // minimum item index
  @Input() max: number; // maximum item index

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(next: boolean): void {
    this.goNext.emit(next);
  }

  // find total number of pages
  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  // check if last page
  lastPage(): boolean {
    return this.perPage * this.page >= this.count;
  }

  // get actual, two next and two previous pages
  getPages(): number[] {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}
