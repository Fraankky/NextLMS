import React from 'react'
import { Button } from '../ui/button'

export const Header = () => {
  return (
    <header className='flex items-center justify-between px-10 py-6'>
        <div className='text-3xl tracking-tight'>nextlms.</div>
        <nav className='flex items-center gap-6 font-semibold'>
            <div>Courses</div>
            <div>Flash Sale</div>
            <div>About</div>
            <div>Login</div>
            <Button className='w-fit' size="default">
                Get started
            </Button>
        </nav>
    </header>
  )
}

