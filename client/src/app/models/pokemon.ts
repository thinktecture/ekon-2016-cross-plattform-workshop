export class Pokemon {
    public id: number;
    public name: string;
    public thumbnail: string;
    public image: string;

    public static deserialize(obj: any): Pokemon {
        let pokemon = new Pokemon();
        pokemon.id = obj.id;
        pokemon.name = obj.name;
        pokemon.thumbnail = obj.thumbnail;
        pokemon.image = obj.image;
        return pokemon;
    }
}
