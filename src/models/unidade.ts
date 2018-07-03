export class Unidade {
    id: string;
    coodenadas: number[];
    municipio: string;
    cep: string;
    estabelecimento: string;
    tipo: string;
    endereco: string;
    telefone: string;
    distancia: number;
    distanciaText: string;

    constructor(obj: any, lat: number, long: number){
        this.id =               obj && obj.id || null;
        // if(obj.geometry == null) {
        //     this.coodenadas = [5,5];
        // } else {
        //     this.coodenadas =       obj && null || obj.geometry.coordinates[0];
        // };
        this.coodenadas =       obj && null || obj.geometry.coordinates[0];

        this.municipio =        obj && obj.properties.municipio || null;
        this.estabelecimento =  obj && obj.properties.estabeleci || null;
        this.tipo =             obj && obj.properties.tipo || null;
        this.cep =              obj && obj.properties.cep || null;
        this.endereco =         obj && obj.properties.endereco || null;
        this.telefone =         obj && obj.properties.telefone || null;

        this.distancia = this.getMaisProximo(this.coodenadas[1], this.coodenadas[0], lat, long);
    }

    getMaisProximo(lat1, long1, lat2, long2){
        let lat = Math.abs(lat1-lat2);
        let long = Math.abs(long1-long2);
        return Math.sqrt(lat*lat+long*long)
    }

    setDistanciaText(text: string, num: string){
        this.distancia = parseFloat(num);
        this.distanciaText = text;
    }
}