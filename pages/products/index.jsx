export default function Products({ products }) {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:5000/products');
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
