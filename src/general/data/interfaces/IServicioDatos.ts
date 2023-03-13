import { Casilla } from "../entities";
import { Area } from "@qiuz/react-image-map";

export interface IServicioDatos{
    //Obtiene la imagen de fondo
    buscarImagen(): Promise<string>;
    //Obtiene la informacion de la casilla
    buscarInfo(index: number): Promise<Casilla[]>;
    //Obtener coordenadas de las casillas
    obtenerCoordenadas():Promise<Area[]>}