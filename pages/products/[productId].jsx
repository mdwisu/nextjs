export default function ProductDetail({ product }) {
  return (
    <div>
      {product.name} - {product.price}
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:5000/products`);
  const product = await res.json();

  const paths = product.map((item) => ({
    params: {
      productId: `${item.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:5000/products/${params.productId}`);
  const product = await res.json();
  return {
    props: {
      product,
    }, // will be passed to the page component as props
  };
}
