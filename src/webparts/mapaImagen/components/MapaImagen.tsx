import * as React from 'react';
import { IMapaImagenProps } from './IMapaImagenProps';
import "@pnp/sp/webs";
import Mapa from './Mapa';
import { Area } from '@qiuz/react-image-map';
import { Casilla } from '../../../general/data/entities';
import PopUp from './PopUp';

export interface IMapaImagenState {
  url: string;
  mapa: Area[];
  casillas: Casilla[];
  open: boolean;
  informacion: Casilla;
}

const ejemplo: Casilla = {
  Id: 1,
  Title: "Titulo prueba",
  Descripcion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"+
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"+
  "of type and scrato electronic typesetting, remaining essentially unchanged. Itsum passages",
  Manda: [],
  MainRoles: [],
  Tools: {Description: "Go tools", Url: "www.google.com"},
  Process: {Description: "Go Process", Url: "www.google.com"}
}

export default class MapaImagen extends React.Component<IMapaImagenProps, IMapaImagenState> {

  constructor(props:IMapaImagenProps){
    super(props);
    this.state = {
      url:"",
      mapa: [],
      casillas: [],
      open: false,
      informacion: ejemplo
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
        <PopUp informacion={this.state.informacion} open={this.state.open} cerrarModal={this.cerrarModal}/>
      </div>
    );
  }

  public handlerClick = (id: number) => {
    const info: Casilla = this.props.servicioDatos.obtenerInfoCasilla(this.state.casillas, id);
    this.mostrarModal(info);
  }

  public mostrarModal = (info: Casilla) => {
    this.setState({open: true, informacion: info});
  }

  public cerrarModal = () => {
    this.setState({ open: false });
  }

}
