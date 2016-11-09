import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './components/list/list';
import {DetailComponent} from './components/detail/detail';

const appRoutes: Routes = [
    {
        path: '',
        component: ListComponent,
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: DetailComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, {
    useHash: true
});

export const appRoutingProviders: any[] = [];
