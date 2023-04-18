import * as yup from 'yup';

export const schema = yup
    .object({
        name: yup
            .string()
            .min(2, '* Your name should be at least 3 characters.')
            .max(10, '* Your name cannot be longer than 28 characters.')
            .required('* Please enter your name'),
        email: yup
            .string()
            .min(2, '* Your email should be at least 3 characters.')
            .matches(/^[a-z0-9_æøå]{4,25}@(stud\.)?noroff\.no$/i, '* Please enter a valid Noroff email address')
            .required('* Please enter your email address'),
        manager: yup
            .string()
            .notRequired(),
        password: yup
            .string()
            .min(8, '* Your password must be 8 characters or higher')
            .max(30, '* Your password must be 30 characters or lower')
            .typeError('* Please enter your password'),
    })
    .required();