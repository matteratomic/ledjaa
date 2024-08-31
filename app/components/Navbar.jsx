// components/Navbar.js
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
    </nav>
  )
}