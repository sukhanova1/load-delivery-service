import React from 'react';

import './ShippInfoTable.css';

const ShippInfoTable = ({ shippInfo }) => (
	<table className='shipp-info__table'>
		<thead>
			<tr>
				<th></th>
				<th className='shipp-info__th'>Width</th>
				<th className='shipp-info__th'>Length</th>
				<th className='shipp-info__th'>Height</th>
				<th className='shipp-info__th'>Payload</th>
			</tr>
		</thead>
		<tbody>
			<tr className='shipp-info__tr'>
				<th className='shipp-info__td'>Load</th>
				<td className='shipp-info__td'>
					{shippInfo && shippInfo.load.dimensions.width}
				</td>
				<td className='shipp-info__td'>
					{shippInfo && shippInfo.load.dimensions.length}
				</td>
				<td className='shipp-info__td'>
					{shippInfo && shippInfo.load.dimensions.height}
				</td>
				<td className='shipp-info__td'>
					{shippInfo && shippInfo.load.payload}
				</td>
			</tr>
			<tr className='shipp-info__tr'>
				<th className='shipp-info__td'>Truck</th>
				<td className='shipp-info__td'>
					{shippInfo && shippInfo.truck.dimensions.width}
				</td>
				<td className='shipp-info__td'>
					{shippInfo && shippInfo.truck.dimensions.length}
				</td>
				<td className='shipp-info__td'>
					{shippInfo && shippInfo.truck.dimensions.height}
				</td>
				<td className='shipp-info__td'>
					{shippInfo && shippInfo.truck.dimensions.payload}
				</td>
			</tr>
		</tbody>
	</table>
);

export default ShippInfoTable;
