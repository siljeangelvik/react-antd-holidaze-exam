import {EditOutlined, EllipsisOutlined} from '@ant-design/icons';
import {Avatar} from '@mui/material';
import {Card, Switch} from 'antd';
import Meta from 'antd/es/card/Meta';
import React, {useContext} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {VenuesContext} from '../context/VenuesContext';
import {DeleteItem} from './ChildComponents/DeleteItem';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {ItemRating} from './ChildComponents/ItemRating';
import useToggle from '../hooks/useToggle';
import {ItemMedia} from './ChildComponents/ItemMedia';
import useApiGet from '../hooks/useApiGet';


function ItemList() {

    const {isAuthenticated, userProfile} = useContext(AuthenticationContext);
    let {
        data,
        isLoading,
        isError
    } = useApiGet('https://nf-api.onrender.com/api/v1/holidaze/venues?sort=created&sortOrder=desc&limit=20&_owner=true&_bookings=true');

    const {specificVenue} = useContext(VenuesContext);

    const {id} = useParams();
    const navigate = useNavigate();


    const redirectDetails = () => {
        navigate(`/details/${specificVenue?.id}`);
    };
    const redirectEdit = () => {
        navigate(`/profile/${userProfile?.name}`);
    };



    const [loadingList, setLoadingList] = useToggle(isLoading);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error loading data: {data.errors[0].message}</div>;
    }
    const onChange = (checked) => {
        setLoadingList(!checked);
    };

    return (
        <Switch checked={!loadingList} onChange={onChange}/>
        &&
        <div className="venues-list">
            {data.map((item) => (
                <Card
                    id={item.id}
                    showLoading={loadingList}
                    title={item.name}
                    content={item.description}
                    size="small"
                    loading={loadingList}
                    hoverable={true}
                    cover={
                        <ItemMedia
                            media={item.media}
                        />
                    }
                    actions={[
                        isAuthenticated && <EditOutlined key="edit" onClick={item.id}/>,
                        <Link to={`/details/${id}`}><EllipsisOutlined key="ellipsis"/>Details</Link>,
                        isAuthenticated && <DeleteItem key="delete" id={item.id}/>,
                    ]}
                    style={{
                        width: 300,
                        margin: '0 10px 10px 0',
                        float: 'left',
                        minHeight: "480px",
                        maxHeight: "485px",
                    }}
                >
                    <ItemRating rating={item.rating}/>
                    <Meta
                        avatar={isAuthenticated ? <Avatar src={item.owner.avatar}/> : null}
                        title={item.name}
                        rating={<ItemRating rating={item.rating}/>}
                        description={item.description}
                        style={{
                            minHeight: "160px",
                            maxHeight: "160px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    />
                </Card>
            ))}
        </div>
    );
}

export default ItemList;