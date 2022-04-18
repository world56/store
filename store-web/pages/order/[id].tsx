import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring';
import React from 'react'

interface TypeRequestOrderProps extends ParsedUrlQuery {
  id: string;
}

const Order: NextPage = () => {
  return (
    <div>Order</div>
  )
}

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [
//       { params: { id: '1', data: ['cate'] } },
//       { params: { id: '2' } }
//     ],
//     fallback: false
//   }
// }

// export const getStaticProps: GetStaticProps = (ctx) => {
//   console.log('@-getStaticProps', ctx)
//   return {
//     props: {}
//   }
// }


export default Order