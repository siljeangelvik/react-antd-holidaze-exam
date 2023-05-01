import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import useApiPost from '../../../hooks/useApiPost';
import {API_LOGIN} from '../../../utilities/constants';
import {schema} from './schema';

function LoginForm({data}) {
    const {postData, isLoading, isError} = useApiPost(API_LOGIN, postData(data));

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        postData(data).then(r => console.log(r));
        console.log(data);
    }

    return (
        <>
            <Content style={{paddingBottom: "40px"}}>
                <Title level={1}>Login</Title>
                <Title level={4}>Log in to you account</Title>
            </Content>

            <form onSubmit={handleSubmit(onSubmit)} id={"loginForm"}
                  style={{maxWidth: "320px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px"}}>
                <label htmlFor="email">Email:</label>
                <input {...register("email")} style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
                <p className={'error'}>{errors.email?.message}</p>

                <label htmlFor="password">Password:</label>
                <input {...register("password")} style={{padding: "9px", borderRadius: "7px", border: "2px solid lightgray"}}/>
                <p className={'error'}>{errors.password?.message}</p>

                <button type="submit" disabled={isLoading}
                        style={{
                            padding: "9px",
                            background: "transparent",
                            border: "2px solid transparent",
                            borderRadius: "7px",
                            backgroundColor: "#3dbd7d",
                            color: "white",
                            fontWeight: "bold",
                        }}>Login
                </button>
                {isError && <div>Error submitting form</div>}
                {data && <div>{data.message}</div>}
            </form>

        </>

    );
}

export default LoginForm;