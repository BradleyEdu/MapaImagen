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


const ejemplo: Casilla = new Casilla();
console.log(ejemplo);

export default class MapaImagen extends React.Component<IMapaImagenProps, IMapaImagenState> {

  constructor(props: IMapaImagenProps) {
    super(props);
    this.state = {
      url: "",
      mapa: [],
      casillas: [],
      open: false,
      informacion: ejemplo
    }
  }

  async componentDidMount() {
    try {
      const [urlImagen, mapaIma, casillero] = await Promise.all([
        this.props.servicioDatos.buscarImagen(),
        this.props.servicioDatos.obtenerCoordenadas(),
        this.props.servicioDatos.buscarInfo()
      ]);
      this.setState({
        url: urlImagen,
        mapa: mapaIma,
        casillas: casillero
      });
    } catch (error) {
      console.error(error);
    }
  }

  public render(): React.ReactElement<IMapaImagenProps> {

    return (
      <div>
        <h1>Mapeo de Imagen</h1>
        <Mapa imagen={this.state.url} mapArea={this.state.mapa} buscarInfo={this.handlerClick} />
        <PopUp informacion={this.state.informacion} open={this.state.open} cerrarModal={this.cerrarModal} />
      </div>
    );
  }

  public handlerClick = (id: number) => {
    const info: Casilla = this.props.servicioDatos.obtenerInfoCasilla(this.state.casillas, id);
    this.mostrarModal(info);
  }

  public mostrarModal = (info: Casilla) => {
    this.setState({ open: true, informacion: info });
  }

  public cerrarModal = () => {
    this.setState({ open: false });
  }

}
