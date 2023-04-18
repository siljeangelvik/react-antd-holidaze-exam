import { Row, Col } from 'antd';
import {useContext} from 'react';
import { VenuesContext } from '../context/VenuesContext';
import { VenueItem } from './VenueItem';

export function VenueList() {
    const { venues } = useContext(VenuesContext);

    return (
        <Row gutter={[16, 16]}>
            {venues.map((venue) => (
                <Col key={venue.id} xs={24} sm={12} md={8} lg={6}>
                    <VenueItem venue={venue} />
                </Col>
            ))}
        </Row>
    );
}
