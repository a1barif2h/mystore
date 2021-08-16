import { useRouter } from 'next/router';
import ProductDetails from '../../components/ProductDetails';
import baseUrl from '../../helpers/baseUrl';

const ProductDetail = ({product}) => {
    const router = useRouter()

    if(router.isFallback) {
        return (
            <h1>loading...</h1>
        )
    }

    return (
        <>
           <ProductDetails product={product} /> 
        </>
    );
};

export const getStaticProps = async (context) => {
    const {params: {id}} = context

    const res = await fetch(`${baseUrl}/api/product/${id}`)
    const data = await res.json()

    return {
        props: {
            product: data
        }
    }

}

export const getStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    id: '6113b2d82aedd5550e2674e7'
                }
            }
        ],
        fallback: true
    }
}

export default ProductDetail;