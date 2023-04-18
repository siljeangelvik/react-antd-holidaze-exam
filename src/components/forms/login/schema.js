import * as yup from 'yup';

export const schema = yup
    .object({
        name: yup
            .string()
            .required('* Please enter your name'),

        password: yup
            .string()
            .min(8, '* Your password must be 8 characters or higher')
            .max(30, '* Your password must be 30 characters or lower')
            .required('* Please enter your password'),
    })
    .required();