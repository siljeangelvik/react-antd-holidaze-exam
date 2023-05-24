import { Carousel } from 'antd';
import {useContext} from 'react';
import {VenuesContext} from '../../context/VenuesContext';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const Carousel = () => {
    const {venues, allVenues} = useContext(VenuesContext);
    console.log(venues?.media && venues?.media?.url);
    console.log(venues);
    console.log(allVenues);

    return(
        <Carousel autoplay>
            <div>
                <h3 style={contentStyle}>{}</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
    );
}
export default Carousel;