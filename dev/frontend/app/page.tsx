'use client'

import Link from 'next/link';

import { toast } from 'sonner'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">

      <div className='grid grid-rows-2'>
        <Link href="/play" className='bg-black text-white text-center rounded-[10px] px-12 py-2 m-2 hover:scale-110'>
          <button onClick={() => {
            toast.message("Let's Play");
          }}>
            Play
          </button>
        </Link>
      </div>

    </main>
  );
}
