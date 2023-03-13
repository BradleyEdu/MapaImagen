import * as React from 'react';
import { IMapaImagenProps } from './IMapaImagenProps';
import "@pnp/sp/webs";
import Mapa from './Mapa';
import { Area } from '@qiuz/react-image-map';

export interface IMapaImagenState {
  url: string;
  mapa: Area[]
}

export default class MapaImagen extends React.Component<IMapaImagenProps, IMapaImagenState> {

  constructor(props:IMapaImagenProps){
    super(props);
    this.state = {
      url:"",
      mapa: []
    }
  }

  async componentDidMount(): Promise<void> {
    const urlImagen = await this.props.servicioDatos.buscarImagen();
    this.setState({ url: urlImagen });
    const mapaIma = await this.props.servicioDatos.obtenerCoordenadas();
    this.setState({ mapa: mapaIma });
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
    this.props.servicioDatos.buscarInfo(id);
  }

}
