import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-table';
  items = [];
  colsnumber: number;
  total = 10;
  loading = false;
  page = 1;
  limit = 10;
  paginate = true;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  // change table page size
  changedata($event) {
    this.paginate = ($event.target.value === '0') ? false : true;
    this.limit = $event.target.value;
    this.page = 1;
    this.getMessages();
  }

  // submit id and status to api
  submitIdAndStatus(id, status) {
    this.messageService.sendData(id, status).subscribe((res) => {
      console.log(res);
    });
  }

  // get page data from json file
  getMessages(): void {
    this.loading = true;
    this.messageService.getData(this.getMin() - 1, this.getMax()).subscribe((res) => {
      this.total = res.total;
      this.items = res.messages;
      this.loading = false;
      this.colsnumber = Object.keys(this.items[0] && this.items[0]).length;
    });
  }

  // minimum data index
  getMin(): number {
    return ((this.limit * this.page) - this.limit) + 1;
  }

  // maximum data index
  getMax(): number {
    let max = this.limit * this.page;
    if (max > this.total) {
      max = this.total;
    }
    return max;
  }

  // jump to specific page
  goToPage(n: number): void {
    this.page = n;
    this.getMessages();
  }

  // go to next page
  onNext(): void {
    this.page++;
    this.getMessages();
  }

  // go to previous page
  onPrev(): void {
    this.page--;
    this.getMessages();
  }
}
