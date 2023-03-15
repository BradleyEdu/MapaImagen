import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'MapaImagenWebPartStrings';
import MapaImagen from './components/MapaImagen';
import { IMapaImagenProps } from './components/IMapaImagenProps';
import { IServicioDatos } from '../../general/data/interfaces/IServicioDatos';
import { ServicioDatos } from '../../general/data/services/ServicioDatos';


export interface IMapaImagenWebPartProps {
  description: string;
}

export default class MapaImagenWebPart extends BaseClientSideWebPart<IMapaImagenWebPartProps> {

  private servicioDatos: IServicioDatos;

  public onInit(): Promise<void> {

    this.servicioDatos = new ServicioDatos(this.context);

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IMapaImagenProps> = React.createElement(
      MapaImagen,
      {
        servicioDatos: this.servicioDatos
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
