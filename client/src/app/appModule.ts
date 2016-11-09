import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './components/app/app';
import {PokemonService} from './services/pokemonService';
import {ListComponent} from './components/list/list';
import {AppRoutes, appRoutingProviders} from './routes';
import {NavigationComponent} from './components/navigation/navigation';
import {DetailComponent} from './components/detail/detail';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutes
    ],
    declarations: [
        AppComponent,
        ListComponent,
        NavigationComponent,
        DetailComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        appRoutingProviders,
        PokemonService
    ]
})
export class AppModule {

}
