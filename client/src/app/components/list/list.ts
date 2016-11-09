import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../services/pokemonService';
import {Pokemon} from '../../models/pokemon';

@Component({
    selector: 'list',
    templateUrl: 'list.html'
})
export class ListComponent implements OnInit {
    public pokemonList: Array<Pokemon>;

    constructor(private _pokemonService: PokemonService) {

    }

    public ngOnInit(): void {
        this._pokemonService.getPokemonList()
            .subscribe(res => this.pokemonList = res);
    }
}
