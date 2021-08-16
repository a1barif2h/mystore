import { useRouter } from "next/router";
import { useState } from "react";
import SignupForm from "../../components/SignupForm";
import baseUrl from "../../helpers/baseUrl";


const Index = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userSignup = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${baseUrl}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const result = await response.json()
            if(result.error) {
                M.toast({ html: result.error, classes: "red" });
            } else {
                M.toast({ html: result.success, classes: "green" });
                setName('')
                setEmail('')
                setPassword('')
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            <SignupForm 
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                userSignup={userSignup}
            />
        </>
    );
};

export default Index;