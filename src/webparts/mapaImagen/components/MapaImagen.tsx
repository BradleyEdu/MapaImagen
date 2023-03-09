import * as React from 'react';
import { IMapaImagenProps } from './IMapaImagenProps';
import "@pnp/sp/webs";
import Mapa from './Mapa';

export interface IMapaImagenState {
  url: string;
}

export default class MapaImagen extends React.Component<IMapaImagenProps, IMapaImagenState> {

  constructor(props:IMapaImagenProps){
    super(props);
    this.state = {
      url:""
    }
  }

  async componentDidMount(): Promise<void> {
    const urlImagen =await this.props.servicioDatos.buscarImagen();
    this.setState({ url: urlImagen  });
  }

  public render(): React.ReactElement<IMapaImagenProps> {
    return (
      <div>
        <h1>Mapeo de Imagen</h1>
        <Mapa imagen={this.state.url} context={this.props.context} info={this.props.servicioDatos.buscarInfo}/>
      </div>
    );
  }

}
