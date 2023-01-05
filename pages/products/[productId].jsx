import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function ProductDetail() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();
  const { productId } = router.query;
  const { data, error } = useSWR(
    () => productId && `http://localhost:5000/products/${productId}`,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>
  // useEffect(() => {
  //   const getProductById = async () => {
  //     const response = await fetch(
  //       `http://localhost:5000/products/${productId}`
  //     );
  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //     setName(data.name);
  //     setPrice(data.price);
  //   };
  //   getProductById();
  // }, [productId]);
  return (
    <div>
      {data.name} - {data.price}
    </div>
  );
}
