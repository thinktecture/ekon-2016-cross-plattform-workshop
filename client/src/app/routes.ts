import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './app/components/list/list';

const appRoutes: Routes = [
    {
        path: '',
        component: ListComponent,
        pathMatch: 'full'
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, {
    useHash: true
});

export const appRoutingProviders: any[] = [];
