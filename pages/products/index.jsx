import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Layout from '../../components/layout';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Products({ host }) {
  console.log(host);
  const { data, error } = useSWR(`${host}/products`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      host: process.env.HOST,
    },
  };
};
