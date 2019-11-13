import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  /*当前年份*/
  currentYear: number;

  constructor() {
  }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }

}
