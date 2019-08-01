import Button from './Button';
import { useAuth } from '../context/auth-context';

function AppRoot() {
  const { user, signOut } = useAuth();
  console.log(user);
  return (
    <>
      {user && user.firstName && (
        <>
          <header className="bg-blue-300 p-2">
            <nav className="container mx-auto flex bg-blue-300 items-center justify-between ">
              <div>College Football Bowl Pickem</div>
              <Button onClick={signOut}>Sign Out</Button>
            </nav>
          </header>
          <main className="container mx-auto">
            <div className="text-center">Welcome {user.firstName}!</div>
          </main>
        </>
      )}
    </>
  );
}

export default AppRoot;
