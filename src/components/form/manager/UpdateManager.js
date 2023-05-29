import useApiPut from '../../../hooks/useApiPut';
import {API_PROFILES} from '../../../utilities/constants';


export function UpdateManager () {

    const {put, isLoading, hasError, data, response, error} = useApiPut(API_PROFILES);

    const updateManager = (id, manager) => {
        put(id, manager);
    }

    return {updateManager, isLoading, hasError, data, response, error};
}