import React from 'react'
import Image from 'next/image'
import loader from '@/public/images/loading-7528_256.gif'


export default function LoadingPage() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
        <Image src={loader} height={100} width={100} alt='loading...'/>
    </div>
  )
}
