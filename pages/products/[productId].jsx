
export default function ProductDetail({ product }) {
  return (
    <div>
      {product.name} - {product.price}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:5000/products/${params.productId}`);
  const product = await res.json();

  if (!product.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}
