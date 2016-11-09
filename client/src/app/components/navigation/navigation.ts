import {Component} from '@angular/core';

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.html'
})
export class NavigationComponent {
    public visible: boolean;

    public toggleNavigation(): void {
        this.visible = !this.visible;
    }
}
