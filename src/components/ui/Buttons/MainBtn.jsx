import Link from 'next/link'

export default function MainBtn({ children, href, className = '', onClick, withClipPath = false, ...props }) {
  const Component = href ? Link : 'button'

  return (
    <Component
      href={href || ''}
      onClick={onClick}
      className={`group relative bg-bg border hover:border-main overflow-hidden cursor-pointer duration-300 py-3 px-6 ${className}`}
      style={
        withClipPath ? { clipPath: 'polygon(0% 25%, 100% 0%, 85% 64.25%, 25% 85%)', background: '#030303', padding: '1.5rem' } : undefined
      }
      {...props}
    >
      <div className="absolute inset-0 bg-main rotate-10 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />

      <span className="relative z-10 block overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-[150%]">{children}</span>
        <span className="block absolute top-0 left-0 translate-y-[150%] transition-transform duration-300 ease-out group-hover:translate-y-0 text-bg">
          {children}
        </span>
      </span>
    </Component>
  )
}
