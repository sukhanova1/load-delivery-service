import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

import { transformDateFull } from 'helpers/transformDate';

const styles = StyleSheet.create({
	page: { padding: 30 | 20 },
	heading: { textAlign: 'center', color: '#8595c9' },
	section: {
		padding: 15 | 0,
		fontSize: 12,
		color: '#201945',
	},
	loadName: { fontSize: 14, fontWeight: 900, color: '#F6C44D' },
});

const LoadsReport = ({ shippedLoads }) => (
	<Document>
		<Page size='A4' style={styles.page}>
			<Text style={styles.heading}>Shipped Loads Report</Text>
			<View>
				{shippedLoads.map((load) => (
					<View key={load.id} style={styles.section}>
						<Text style={styles.loadName}>{load && load.name}</Text>
						<Text className='load-item__name'>
							Created at: {transformDateFull(load.created_date)}
						</Text>
						<Text className='load-item__name'>
							Latest update at: {transformDateFull(load.updatedAt)}
						</Text>
						<Text className='load-item__name'>
							Dimensions: {load.dimensions.length} &#215;{' '}
							{load.dimensions.width} &#215; {load.dimensions.height}
						</Text>
						<Text className='load-item__name'>Payload: {load.payload}</Text>
						<Text className='load-item__name'>
							Pickup address: {load.pickup_address}
						</Text>
						<Text className='load-item__name'>
							Shipping address: {load.delivery_address}
						</Text>
					</View>
				))}
			</View>
		</Page>
	</Document>
);

export default LoadsReport;
