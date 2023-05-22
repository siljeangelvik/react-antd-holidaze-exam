import * as Yup from 'yup';

export const registrationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-Z0-9_]+$/, 'Name can only contain letters, numbers, and underscores')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .matches(
            /(.*@stud\.noroff\.no$|.*@noroff\.no$)/,
            'Email must be a valid stud.noroff.no or noroff.no email address'
        )
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    avatar: Yup.string().url('Invalid URL'),
    venueManager: Yup.boolean(),
});
