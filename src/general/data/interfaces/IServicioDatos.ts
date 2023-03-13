import { Casilla } from "../entities";
import { Area } from "@qiuz/react-image-map";

export interface IServicioDatos{
    //Obtiene la imagen de fondo
    buscarImagen(): Promise<string>;
    //Obtiene la informacion de la casilla
    buscarInfo(): Promise<Casilla[]>;
    //Obtener coordenadas de las casillas
    obtenerCoordenadas():Promise<Area[]>;
    //Obtener informacion de la casilla clickeada
    obtenerInfoCasilla(casillas: Casilla[], index: number): Casilla;
}
