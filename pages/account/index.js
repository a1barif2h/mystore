import { parseCookies } from 'nookies';
const Index = () => {
    // const cookies = parseCookies()

    return (
        <div>
            <h1>account page</h1>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const {token} = parseCookies(context)
    if(!token) {
        const {res} = context
        res.writeHead(302, {location: '/login'})
        res.end()
    }

    return {
        props: {}
    }
}

export default Index;