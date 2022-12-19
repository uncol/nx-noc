import { CommonModule } from '@angular/common';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CdsButtonModule, CdsModalModule } from '@cds/angular';
import { Subscription, first, timer } from 'rxjs';

@Component({
  selector: 'noc-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CdsModalModule,
    CdsButtonModule,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent implements OnDestroy {
  hidden = true;
  sub!: Subscription;
  alarmsList = ['/', { outlets: { main: ['alarms'] } }];
  assetsHome = ['/', { outlets: { main: ['assets'] } }];
  assetsUsers = [
    '/home',
    { outlets: [{ main: ['assets'] }, { assets: ['users'] }] },
  ];

  start() {
    this.hidden = !this.hidden;

    if (this.sub) {
      // this.sub.unsubscribe();
    }
    this.sub = timer(10000, 2000)
      .pipe(first())
      .subscribe((value) => {
        console.log(value);
        // this.router.navigateByUrl('/login').catch(console.error);
      });
    // setTimeout(() => {
    //   this.router.navigateByUrl('/login');
    // }, 5000);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      // this.sub.unsubscribe();
    }
  }
}
