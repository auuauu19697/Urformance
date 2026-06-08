import { useTheme } from '../context/ThemeContext'

export default function WishlistSuccess() {
  const { brandName, closedText, wishlistText } = useTheme()
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-16 text-center space-y-6">
      <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <div>
        <h2 className="text-3xl font-black italic uppercase leading-none mb-3">
          {wishlistText?.successHeading || "You're on the list"}
        </h2>
        <p className="text-muted font-bold max-w-xs mx-auto">
          {wishlistText?.successBody || `Thank you for joining the ${brandName} wishlist. We'll notify you when the pre-order opens!`}
        </p>
      </div>

      {closedText?.instagram && (
        <a 
          href={closedText.instagramUrl ?? `https://www.instagram.com/${closedText.instagram.replace('@', '')}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary w-full max-w-xs py-4 font-black uppercase italic tracking-wider shadow-lg flex items-center justify-center gap-2 mt-8"
        >
          Follow {closedText.instagram}
        </a>
      )}
    </div>
  )
}
