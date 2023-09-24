import React from 'react';

import './TrucksTable.css';

const TrucksTable = () => (
	<table className='trucks__header-table'>
		<thead>
			<tr>
				<th className='trucks__header-td'>Type</th>
				<th className='trucks__header-td'>Width</th>
				<th className='trucks__header-td'>Length</th>
				<th className='trucks__header-td'>Height</th>
				<th className='trucks__header-td'>Payload</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td className='trucks__header-td'>SPRINTER</td>
				<td className='trucks__header-td'>250</td>
				<td className='trucks__header-td'>300</td>
				<td className='trucks__header-td'>170</td>
				<td className='trucks__header-td'>1700</td>
			</tr>
			<tr>
				<td className='trucks__header-td'>SMALL STRAIGHT</td>
				<td className='trucks__header-td'>250</td>
				<td className='trucks__header-td'>500</td>
				<td className='trucks__header-td'>170</td>
				<td className='trucks__header-td'>2500</td>
			</tr>
			<tr>
				<td className='trucks__header-td'>LARGE STRAIGHT</td>
				<td className='trucks__header-td'>350</td>
				<td className='trucks__header-td'>700</td>
				<td className='trucks__header-td'>270</td>
				<td className='trucks__header-td'>4000</td>
			</tr>
		</tbody>
	</table>
);

export default TrucksTable;
