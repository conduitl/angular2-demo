import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
    selector: 'hero-search',
    templateUrl: 'app/hero-search.component.html',
    providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;
    searchSubject = new Subject<string>();

    constructor(
        private heroSearchServce: HeroSearchService,
        private router: Router) {}

    // Push a search term into the observable stream.
    search(term: string) { this.searchSubject.next(term); }

    ngOnInit() {
        this.heroes = this.searchSubject
            .asObservable() // case as Observable
            .debounceTime(300) //wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next searchterm is same as in previous
            .switchMap(term => term  // Switch to new observable each time
                // return the http search observable
                ? this.heroSearchServce.search(term)
                // or th observable of empty heroes if no search term
                : Observable.of<Hero[]>([]) )
            .catch(error => {
                // Todo: real error handling
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }

    gotoDetail(hero: Hero) {
        let link= ['/detail', hero.id];
        this.router.navigate(link);
    }
}