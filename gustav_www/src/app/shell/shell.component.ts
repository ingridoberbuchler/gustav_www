import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { Router } from "@angular/router";
import { filter } from 'rxjs/operators';

import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private media: MediaObserver, private router: Router) {}

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.some(change => change.mqAlias !== 'xs' && change.mqAlias !== 'sm')),
        untilDestroyed(this)
      )
      .subscribe(() => this.sidenav.close());
  }

  ngOnDestroy() {
    // Needed for automatic unsubscribe with untilDestroyed
  }

  getRoute() {
    if (this.router.url === '/home') {
      return "dark-bg";
    }
  }
}
