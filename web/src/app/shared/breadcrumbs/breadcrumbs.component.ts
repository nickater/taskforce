import { TitleCasePipe } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbsList$: Observable<BreadcrumbLink[]>;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.breadcrumbsList$ = this.buildBreadCrumbs();
  }

  buildBreadCrumbs() {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map((navEnd: NavigationEnd) => this.buildLinks(navEnd.url))
    );
  }

  buildLinks(url: string): BreadcrumbLink[] {
    let urlPieces = url.split('/');
    urlPieces.shift();
    let breadCrumbs: BreadcrumbLink[] = [];
    let urlAccumulator = 'customers';

    for (let i = 1; i < urlPieces.length; i++) {
      if (i % 2 !== 0) {
        let url = `${urlAccumulator}`;
        breadCrumbs.push({
          url,
          title: this.pickTitle(urlPieces[i - 1]),
        });
        urlAccumulator = `${urlAccumulator}/${urlPieces[i]}/${
          urlPieces[i + 1]
        }`;
      }
    }

    return breadCrumbs;
  }

  pickTitle(url: string): string {
    if (!url) return 'Customers';
    const titleCase = new TitleCasePipe();
    return titleCase.transform(url);
  }
}

export interface BreadcrumbLink {
  title: string;
  url: string;
}
