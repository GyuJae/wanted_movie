import { createPortal } from 'react-dom'

import { useEffect, useState } from 'react'

interface IProps {
  children: React.ReactNode
}

const Portal = ({ children }: IProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted ? createPortal(children, document.querySelector('#portal') as Element) : null
}

export default Portal
