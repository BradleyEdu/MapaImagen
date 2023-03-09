import { Casilla } from "../entities";

export interface IServicioDatos{
    //Obtiene la imagen de fondo
    buscarImagen(): Promise<string>;
    //Obtiene la informacion de la casilla
    buscarInfo(index: number, context: any): Promise<Casilla>;
}