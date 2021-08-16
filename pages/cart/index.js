import cookie from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
import CartItem from '../../components/CartItem';
import baseUrl from '../../helpers/baseUrl';

const Index = ({error, products}) => {
    const {token} = parseCookies()
    const router = useRouter()

    if(!token) {
        return (
            <div className='center-align'>
                <h3>Please login to view your cart.</h3>
                <Link href='/login'><a><button className='btn #1565c0 blue darken-3'>Login</button></a></Link>
            </div>
        )
    }

    if(error) {
        M.toast({ html: error, classes: "red" });
        cookie.remove('token')
        cookie.remove('user')
        router.push('/login')
    }
    return (
        <div className='container'>
            <CartItem products={products} token={token} />
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const {token} = parseCookies(context)
    if(!token) {
        return {
            props: {
                products: []
            }
        }
    }
    const response = await fetch(`${baseUrl}/api/cart`, {
        headers: {
            'Authorization': token
        }
    })
    const result = await response.json()

    if(result.error) {
        return {
            props: {
                error: result.error
            }
        }
    }
    console.log({result})

    return {
        props: {
            products: result
        }
    }
}

export default Index;