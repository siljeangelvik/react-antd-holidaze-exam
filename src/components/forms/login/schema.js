import * as yup from 'yup';

export const schema = yup
    .object({
        email: yup
            .string()
            .email('* Please enter a valid email')
            .typeError('* Please enter your email')
            .required('* Please enter your email'),
        password: yup
            .string()
            .min(8, '* Your password must be 8 characters or higher')
            .max(30, '* Your password must be 30 characters or lower')
            .typeError('* Please enter your password'),
    })
    .required();
