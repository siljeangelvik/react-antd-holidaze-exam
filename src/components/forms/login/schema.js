import * as yup from 'yup';

export const schema = yup
    .object({
        name: yup
            .string()
            .min(2, '* Your name should be at least 2 characters.')
            .max(10, '* Your name cannot be longer than 10 characters.')
            .required('* Please enter your name'),
        password: yup
            .string()
            .min(8, '* Your password must be 8 characters or higher')
            .max(30, '* Your password must be 30 characters or lower')
            .typeError('* Please enter your password'),
    })
    .required();