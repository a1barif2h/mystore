import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import baseUrl from '../../helpers/baseUrl';

const Index = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userLogin = async (e) => {
        e.preventDefault()
        const response = await fetch(`${baseUrl}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const result = await response.json()

        if(result.error) {
            M.toast({ html: result.error, classes: "red" });
        } else {
            cookie.set('token', result.token)
            cookie.set('user', JSON.stringify(result.user))
            M.toast({ html: result.success, classes: "green" });
            setEmail('')
            setPassword('')
            router.push('/account')
        }
    }
    return (
        <>
            <LoginForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                userLogin={userLogin}
            />
        </>
    );
};

export default Index;