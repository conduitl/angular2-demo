import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import './rxjs-extensions';
import { HeroService } from './services/hero.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/html/app.component.html',
    styleUrls: ['app/css/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [HeroService]
})
export class AppComponent {
    title = 'Tour of Heroes';
}