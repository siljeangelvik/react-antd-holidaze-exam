import {Row, Col} from 'antd';
import {useContext} from 'react';
import VenueItem from '../components/VenueItem';
import {VenuesContext} from '../context/VenuesContext';

export function VenueList() {

    const {venues} = useContext(VenuesContext);

    return (
        <Row gutter={[16, 16]}>
            {venues.map((venue) => (
                <Col xs={24} sm={12} md={10} lg={8}>
                    <VenueItem key={venues?.id} venue={venue} />
                </Col>
            ))}
        </Row>
    );
}