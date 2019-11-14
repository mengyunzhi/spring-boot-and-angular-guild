import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Klass} from '../../norm/entity/Klass';

@Component({
  selector: 'app-klass-select',
  templateUrl: './klass-select.component.html',
  styleUrls: ['./klass-select.component.sass']
})
export class KlassSelectComponent implements OnInit {

  @Output() selected = new EventEmitter<Klass>();
  @Input() klass: Klass;
  url = 'http://localhost:8080/Klass?name=';

  constructor() {
  }

  ngOnInit() {
  }

  onSelected(klass: Klass): void {
    console.log(klass);
    this.selected.emit(klass);
  }

}
