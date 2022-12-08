import { ListFacade } from '@alarms-domain';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'alarms-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  alarmList$ = this.listFacade.alarmList$;

  constructor(private listFacade: ListFacade) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.listFacade.load();
  }
}
