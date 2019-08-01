import Link from 'next/link';
import Anchor from '../components/Anchor';
import '../style.css';

function Home() {
  return (
    <>
      <div className="bg-purple-300 text-center">Welcome to Next.js!</div>
      <Link href="/login">
        <Anchor>Sign In</Anchor>
      </Link>
      <Link href="/signup">
        <Anchor>Register Now!</Anchor>
      </Link>
    </>
  );
}

export default Home;
