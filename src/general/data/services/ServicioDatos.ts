import { Casilla } from "../entities";
import { IServicioDatos } from "../interfaces/IServicioDatos";
import { SPHttpClient } from '@microsoft/sp-http';


export class ServicioDatos implements IServicioDatos {
  context: any;

  constructor(_context: any) {
    this.context = _context;
  }

  public async buscarInfo(index: number, context: any): Promise<Casilla> {
    const listName = "InformacionCasillas";
    const apiUrl = `/_api/web/lists/getbytitle('${listName}')/items(1)?
    $select=ID,Title,Descripcion,Manda,MainRoles,Tools,Process`;

    const response = await this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + apiUrl,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      const responseText = response.text();
      throw new Error(responseText);
    }

    const responseJson: Casilla = await response.json();

    console.log(responseJson);
    return responseJson as Casilla;
  }

  public async buscarImagen(): Promise<string>{
    const listName = 'ImagenFondo';
    const apiUrl = `/_api/web/lists/getbytitle('${listName}')/items`;

    const response = await  this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + apiUrl,
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
    return urlImagen;
  }
}