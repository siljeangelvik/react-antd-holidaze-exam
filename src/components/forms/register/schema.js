import {API_BASE_URL} from '../../../utilities/constants';
import * as yup from 'yup';
import axios from 'axios';

export const schema = yup
    .object({
        name: yup
            .string()
            .min(2, '* Your name should be at least 2 characters.')
            .max(10, '* Your name cannot be longer than 35 characters.')
            .matches(/^[a-zæøåA-ZÆØÅ ]+$/, '* Please enter a valid name') // Only letters and spaces
            .test('Unique Name', 'Name already in use', // <- key, message
                function (value) {
                    return new Promise((resolve, reject) => {
                        axios.get(API_BASE_URL + "/profiles/" + value)
                            .then((res) => {
                                resolve(true)
                            })
                            .catch((error) => {
                                if (error.response.data.content === "The name has already been taken.") {
                                    resolve(false);
                                }
                            })
                    })
                }
            )
            .required('* Name is required'),
        email: yup
            .string()
            .min(2, '* Your email should be at least 3 characters.')
            .matches(/^[a-z0-9_æøå]{4,25}@(stud\.)?noroff\.no$/i, '* Please enter a valid Noroff email address')
            .email("* Invalid email format"),
        manager: yup
            .string()
            .notRequired(),
        password: yup
            .string()
            .min(8, '* Your password must be 8 characters or higher')
            .max(30, '* Your password must be 30 characters or lower')
            .typeError('* Please enter your password'),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password'), null], '* Passwords must match')
            .required('* Please confirm your password'),
    })
    .required();