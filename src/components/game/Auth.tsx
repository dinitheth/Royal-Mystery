'use client';
import { usePrivy, type CrossAppAccountWithMetadata } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export default function Auth() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [hasUsername, setHasUsername] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticated && user && ready) {
      const crossAppAccount = user.linkedAccounts.find(
        (account) =>
          account.type === 'cross_app' &&
          account.providerApp.id === 'cmd8euall0037le0my79qpz42'
      ) as CrossAppAccountWithMetadata | undefined;

      if (crossAppAccount && crossAppAccount.embeddedWallets && crossAppAccount.embeddedWallets.length > 0) {
        const address = crossAppAccount.embeddedWallets[0].address;
        setAccountAddress(address);
      } else {
        setLoading(false);
      }
    } else if (ready) {
      setLoading(false);
    }
  }, [authenticated, user, ready]);

  useEffect(() => {
    if (accountAddress) {
      fetch(`https://monad-games-id-site.vercel.app/api/check-wallet?wallet=${accountAddress}`)
        .then((res) => res.json())
        .then((data) => {
          setHasUsername(data.hasUsername);
          if (data.hasUsername) {
            setUsername(data.user.username);
          }
          setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching username", err);
            setLoading(false);
        });
    }
  }, [accountAddress]);

  if (!ready) {
    return null;
  }
  
  const AuthDisplay = () => {
    if (loading) {
        return <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-24" />
        </div>
    }

    if (username) {
        return <div className="font-bold text-white text-lg">{username}</div>
    }

    if (hasUsername === false) {
        return (
            <a href="https://monad-games-id-site.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-white underline hover:text-accent">
                Reserve your username
            </a>
        )
    }
    
    return null;
  }

  return (
    <div>
      {authenticated ? (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-accent">
            <AvatarImage src={user?.pfp as string} />
            <AvatarFallback>{username ? username.charAt(0).toUpperCase() : '?'}</AvatarFallback>
          </Avatar>
          <AuthDisplay />
          <Button onClick={logout} variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white rounded-full">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <Button onClick={login} variant="ghost" className="text-white hover:bg-white/20 hover:text-white rounded-lg">
          <LogIn className="mr-2 h-5 w-5" /> Login
        </Button>
      )}
    </div>
  );
}
