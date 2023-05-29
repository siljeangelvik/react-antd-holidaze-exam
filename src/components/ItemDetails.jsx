import {Description, PriceCheck} from '@mui/icons-material';
import {Header} from 'antd/es/layout/layout';

export function ItemDetails({ item }) {

    return (
        <>

            <Header>{item.name}</Header>
            <Description>{item.description}</Description>
            <PriceCheck>{item.price}</PriceCheck>

        </>
  );
}