import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.h1`
  color: blue;
`

const Button = styled.button`
  color: black;
`

export default function Home() {
  return (
    <>
      <Title className="text-center text-4xl">Slatam Application</Title>
      <Link href="/products">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Product page
        </Button>
      </Link>
    </>
  )
}
