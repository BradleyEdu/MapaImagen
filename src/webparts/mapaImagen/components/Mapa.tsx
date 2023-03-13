import { ImageMap } from '@qiuz/react-image-map';
import { IMapaProps } from './IMapaProps';
import * as React from 'react';


function Mapa(props: IMapaProps){
	const {imagen, mapArea, buscarInfo} = props;

	const onMapClick = (area:any, index:number) => {
		const tip = `click map${index + 1}`;
		console.log(`Click en ${tip}  ${area}`);
		buscarInfo(mapArea[index].id);
	}

	return (
		<div>
			<ImageMap
				className="usage-map"
				src={imagen}
				map={mapArea}
				onMapClick={onMapClick}
			/>
		</div>
	)
}

export default Mapa;