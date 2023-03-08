import { ImageMap,Area } from '@qiuz/react-image-map';
import * as React from 'react';
import buscarInfo from './buscarInfo';
import PopUp from './PopUp';

function Mapa(props: { imagen: string, context: any }){
  const img = props.imagen;
  let informacion = {};

const mapArea: Area[] = [
  {
    left: '60.956790123456784%',
    top: '6.2876254180602%',
    height: '8.655518394648835%',
    width: '11.39506172839506%',
    style: { background: 'rgba(255, 0, 0, 0.5)' },
    onMouseOver: () => console.log('Primer Casilla')
  }
];

const onMapClick = (area:any, index:number) => {
	const tip = `click map${index + 1}`;
	console.log(tip, area);
	//alert(tip);
  informacion = buscarInfo(index, props.context);
}

<ImageMap
	className="usage-map"
	src={img}
	map={mapArea}
	onMapClick={onMapClick}
/>

// in hooks
const ImageMapComponent = React.useMemo(() => <ImageMap className="usage-map" src={img} map={mapArea} onMapClick={onMapClick} />, [mapArea, img]);

return (
	<div>
    <div>{ImageMapComponent}</div>
    <PopUp info={informacion}/>
	</div>

)
}

export default Mapa;