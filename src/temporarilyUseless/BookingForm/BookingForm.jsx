import useApiPost from '../../../hooks/useApiPost';
import {API_VENUES} from '../../../utilities/constants';
import MediaSelect from '../../input/MediaSelect';

export function BookingForm ({onSubmit}) {


    const {data, isLoading, isError, postData} = useApiPost(API_VENUES)

const handleSubmit = () => {
        postData().then(r => {
            onSubmit(r)
        })
    }

    return (
        <div>
            <h1>Booking Form</h1>
            <MediaSelect  />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}