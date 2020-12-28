import Link from 'next/link'
import Layout from '@components/Layout'

export default function Products() {
  return (
    <div>
      Products Page
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Index
        </button>
      </Link>
    </div>
  )
}

Products.Layout = Layout
