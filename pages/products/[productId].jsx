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

export default function ProductDetail({ host }) {
  const router = useRouter();
  const { productId } = router.query;
  const { data, error } = useSWR(
    () => productId && `${host}/products/${productId}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.name} - {data.price}
    </div>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      host: process.env.HOST,
    },
  };
};
