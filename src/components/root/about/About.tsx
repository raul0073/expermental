import React from 'react'
import Logo from '../logo/Logo'

function About() {
  return (
    <section className='about min-h-screen w-full'>
       <div className="container py-12 px-6">
        <article>

       <h2 className='text-4xl font-default flex gap-4 items-end'>About<Logo size='medium' /></h2>
       <div className='content'>
            <h3>What we want to do</h3>
            <h3>How we go about it</h3>
       </div>
        </article>
       </div>
    </section>
  )
}

export default About