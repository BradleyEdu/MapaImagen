import { ImageMap } from '@qiuz/react-image-map';
import { IMapaProps } from './IMapaProps';
import * as React from 'react';

class Mapa extends React.Component<IMapaProps> {

  onMapClick = (area:any, index:number) => {
    const { mapArea, buscarInfo } = this.props;
    const tip = `click map${index + 1}`;
    console.log(`Click en ${tip}  ${area}`);
    buscarInfo(mapArea[index].id);
  }

  render() {
    const { imagen, mapArea } = this.props;

    return (
      <div>
        <ImageMap
          className="usage-map"
          src={imagen}
          map={mapArea}
          onMapClick={this.onMapClick}
        />
      </div>
    );
  }
}

export default Mapa;
