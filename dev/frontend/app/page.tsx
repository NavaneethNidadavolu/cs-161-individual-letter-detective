'use client'

import NavBar from '@/components/navbar';
import Track from '@/components/track';
import Link from 'next/link';

import { toast } from 'sonner'

export default function Home(context: any) {

  return (
    <div>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">

        <div className='grid grid-rows-3 gap-y-5'>
          <Link href="/play" className='bg-black text-white text-center rounded-[10px] px-12 py-2 m-2 hover:scale-110'>
            <button onClick={() => {
              toast.message("Let's Play");
            }}>
              Play
            </button>
          </Link>
          <Link href="/instructions" className='bg-black text-white text-center rounded-[10px] px-12 py-2 m-2 hover:scale-110'>
            <button>
              Instructions
            </button>
          </Link>
          <Link href="/leaderboard" className='bg-black text-white text-center rounded-[10px] px-12 py-2 m-2 hover:scale-110'>
            <button>
              Leaderboard
            </button>
          </Link>
        </div>
        <Track context={context} />
      </main>
    </div>
  );
}
