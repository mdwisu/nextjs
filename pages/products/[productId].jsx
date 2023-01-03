import { useRouter } from 'next/router';

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {product.name} - {product.price}
    </div>
  );
}
export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:5000/products?_limit=2`);
  const product = await res.json();

  const paths = product.map((item) => ({
    params: {
      productId: `${item.id}`,
    },
  }));
  return {
    paths,
    fallback: true, //false, true, 'blocking'
  };
};

export async function getStaticProps({ params }) {
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
    }, // will be passed to the page component as props
    revalidate: 1
  };
}
