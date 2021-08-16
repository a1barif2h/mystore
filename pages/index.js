import ProductList from "../components/ProductList";
import baseUrl from "../helpers/baseUrl";

export default function Home({products}) {

  return (
    <>
      <div className="rootcard">
        {
          products.map(product => (
            <ProductList product={product} key={product._id} />
          ))
        }
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json()

  return {
    props: {
      products: data
    }
  }
}
