import * as React from 'react';
// import styles from './MapaImagen.module.scss';
import { IMapaImagenProps } from './IMapaImagenProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';
// import { spfi } from "@pnp/sp";
import "@pnp/sp/webs";

export default class MapaImagen extends React.Component<IMapaImagenProps, {}> {

  url:string;

  componentDidMount(): void {
    this.buscarImagen();
  }

  buscarImagen = async () => {
    const response = await  this.props.context.spHttpClient.get(
      this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('ImagenFondo')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      });
    
    if (!response.ok) {
      const responseText =  response.text();
      throw new Error(responseText);
    }
  
    const responseJson = await  response.json();
    
    console.log(JSON.parse(responseJson.value[0].imagen));
    this.url =  responseJson.value[0].imagen;
  }

  public render(): React.ReactElement<IMapaImagenProps> {

    return (
      <div>
        <h1>Hola Mundo!!</h1>
        <img src={this.url} alt="Imagen de Fondo" />
        <button onClick={this.buscarImagen}>Picale</button>
      </div>
    );
  }

}
