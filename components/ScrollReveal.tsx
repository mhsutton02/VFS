'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  animation?: 'vf-fadeInUp' | 'vf-fadeInLeft' | 'vf-fadeInRight' | 'vf-scaleIn'
  delay?: number
  threshold?: number
  className?: string
}

export default function ScrollReveal({
  children,
  animation = 'vf-fadeInUp',
  delay = 0,
  threshold = 0.15,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Reveal once, cleanup
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={`vf-reveal ${isVisible ? `vf-reveal-visible ${animation}` : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
