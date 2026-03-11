import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍔</span>
              <span className="font-poppins font-bold text-xl text-white">FoodStore</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Delivering happiness to your doorstep. Fresh food, fast delivery, great taste.</p>
            <div className="flex space-x-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[['Home', '/'], ['Menu', '/menu'], ['Restaurants', '/restaurants'], ['About', '/about']].map(([label, path]) => (
                <li key={path}><Link to={path} className="hover:text-primary transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {[['FAQ', '#'], ['Contact Us', '/contact'], ['Privacy Policy', '#'], ['Terms of Service', '#']].map(([label, path]) => (
                <li key={label}><Link to={path} className="hover:text-primary transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Download App</h4>
            <p className="text-sm text-gray-400 mb-4">Get the FoodStore app for a better experience</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors">
                <span className="text-lg">🍎</span>
                <div><p className="text-xs text-gray-400">Download on the</p><p className="text-sm font-medium text-white">App Store</p></div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors">
                <span className="text-lg">🤖</span>
                <div><p className="text-xs text-gray-400">Get it on</p><p className="text-sm font-medium text-white">Google Play</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} FoodStore. All rights reserved. Made with ❤️ for food lovers</p>
        </div>
      </div>
    </footer>
  )
}
