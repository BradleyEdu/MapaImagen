import * as React from 'react';
import { IMapaImagenProps } from './IMapaImagenProps';
import "@pnp/sp/webs";
import Mapa from './Mapa';
import { Area } from '@qiuz/react-image-map';
import { Casilla } from '../../../general/data/entities';

export interface IMapaImagenState {
  url: string;
  mapa: Area[];
  casillas: Casilla[];
}

export default class MapaImagen extends React.Component<IMapaImagenProps, IMapaImagenState> {

  constructor(props:IMapaImagenProps){
    super(props);
    this.state = {
      url:"",
      mapa: [],
      casillas: []
    }
  }

  async componentDidMount(): Promise<void> {
    const urlImagen = await this.props.servicioDatos.buscarImagen();
    this.setState({ url: urlImagen });
    const mapaIma = await this.props.servicioDatos.obtenerCoordenadas();
    this.setState({ mapa: mapaIma });
    
    const casillero = await this.props.servicioDatos.buscarInfo();
    this.setState({ casillas: casillero});
  }

  public render(): React.ReactElement<IMapaImagenProps> {
    return (
      <div>
        <h1>Mapeo de Imagen</h1>
        <Mapa imagen={this.state.url} mapArea={this.state.mapa} buscarInfo={this.handlerClick}/>
      </div>
    );
  }

  public handlerClick = (id: number) => {
    this.props.servicioDatos.obtenerInfoCasilla(this.state.casillas, id);
  }

}
