import * as React from 'react';
// import styles from './MapaImagen.module.scss';
import { IMapaImagenProps } from './IMapaImagenProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';
// import { spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import Mapa from './Mapa';

export interface IMapaImagenState {
  url: string;
}

export default class MapaImagen extends React.Component<IMapaImagenProps, IMapaImagenState> {

  //url:string = '';
  constructor(props:IMapaImagenProps){
    super(props);
    this.state = {
      url:""
    }
  }
  componentDidMount(): void {
    this.buscarImagen();
  }

  buscarImagen = async () => {
    const listName = 'ImagenFondo';
    const apiUrl = `/_api/web/lists/getbytitle('${listName}')/items`;

    const response = await  this.props.context.spHttpClient.get(
      this.props.context.pageContext.web.absoluteUrl + apiUrl,
      SPHttpClient.configurations.v1);
    
    if (!response.ok) {
      const responseText =  response.text();
      throw new Error(responseText);
    }
  
    const responseJson = await  response.json();

    const imagen = JSON.parse(responseJson.value[0].imagen);
    const serverUrl = imagen.serverUrl;
    const serverRelativeUrl = imagen.serverRelativeUrl;
    const urlImagen = serverUrl + serverRelativeUrl;
    this.setState({ url: urlImagen  });
    //console.log(this.state.url)
  }

  public render(): React.ReactElement<IMapaImagenProps> {

    return (
      <div>
        <h1>Mapeo de Imagen</h1>
        <Mapa imagen={this.state.url} context={this.props.context}/>
      </div>
    );
  }

}
