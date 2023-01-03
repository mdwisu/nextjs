export default function Products({ products }) {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch('http://localhost:5000/products');
  const products = await res.json();
  return {
    props: {
      products,
    }, // will be passed to the page component as props
    revalidate: 1,
  };
}
