import Link from 'next/link'

export default function MainBtn({ children, href, className = '', onClick, ...props }) {
  const Component = href ? Link : 'button'

  return (
    <Component
      href={href || ''}
      onClick={onClick}
      className={`group relative px-6 py-3 overflow-hidden border border-text/20 rounded-full transition-colors duration-300 hover:border-main ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-main translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />

      <span className="relative z-10 block overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-[150%]">{children}</span>
        <span className="absolute top-0 left-0 block translate-y-[150%] transition-transform duration-300 ease-out group-hover:translate-y-0 text-bg">
          {children}
        </span>
      </span>
    </Component>
  )
}
