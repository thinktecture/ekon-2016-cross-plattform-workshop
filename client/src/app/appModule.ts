import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app/components/app/app';
import {PokemonService} from './app/services/pokemonService';
import {ListComponent} from './app/components/list/list';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutes
    ],
    declarations: [
        AppComponent,
        ListComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        appRoutingProviders,
        PokemonService
    ]
})
export class AppModule {

}
