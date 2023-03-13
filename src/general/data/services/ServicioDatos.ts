import { Casilla } from "../entities";
import { IServicioDatos } from "../interfaces/IServicioDatos";
import { SPHttpClient } from '@microsoft/sp-http';
import { Area } from '@qiuz/react-image-map';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Coordenadas } from "../entities";


export class ServicioDatos implements IServicioDatos {
  context: WebPartContext;

  constructor(_context: WebPartContext) {
    this.context = _context;
  }

  public async buscarInfo(index?: number): Promise<Casilla[]> {
    const listName = "InformacionCasillas";
    const apiUrl = `/_api/web/lists/getbytitle('${listName}')/items(${index})?$select=ID,Title,Descripcion,Manda,MainRoles,Tools,Process`;

    const response = await this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + apiUrl,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText);
    }

    const responseJson:Area = await response.json();
    const casillas: Casilla[] = responseJson.value;
    return casillas;
  }

  public async buscarImagen(): Promise<string>{
    const listName = 'ImagenFondo';
    const apiUrl = `/_api/web/lists/getbytitle('${listName}')/items`;

    const response = await  this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + apiUrl,
      SPHttpClient.configurations.v1);
    
    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText);
    }
  
    const responseJson = await  response.json();

    const imagen = JSON.parse(responseJson.value[0].imagen);
    const serverUrl = imagen.serverUrl;
    const serverRelativeUrl = imagen.serverRelativeUrl;
    const urlImagen = serverUrl + serverRelativeUrl;
    return urlImagen;
  }

  public async obtenerCoordenadas(): Promise<Area[]>{

    const listName = "InformacionCasillas";
    const apiUrl = `/_api/web/lists/getbytitle('${listName}')/items?$select=ID,Left,Top,Height,Width`;

    const response = await this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + apiUrl,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText);
    }

    const responseJson = await response.json();
    const casillas: Coordenadas[] = responseJson.value;

    const Area: Area[] = casillas.map( (casilla: Coordenadas) => {
      const area: Area = {
        left: casilla.Left,
        top: casilla.Top,
        height: casilla.Height,
        width: casilla.Width,
        style:{ background: 'rgba(255, 0, 0, 0.5)' },
        id: casilla.ID
      };

      return area;
    });

    return Area;
  }
}