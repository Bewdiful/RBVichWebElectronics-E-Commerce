export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-white">RBVichWebElectronics</h3>
                    <p className="text-sm">Your trusted source for cutting-edge electronics and tech solutions.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-gray-400">Quick Links</h4>
                    <ul className="space-y-2">
                        {['Home', 'Shop', 'Blog', 'About Us', 'Contact'].map((link) => (
                            <li key={link}><a href="#" className="hover:text-blue-500 transition-colors duration-300 text-sm">{link}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-gray-400">Product Categories</h4>
                    <ul className="space-y-2">
                        {['Gaming PCs', 'Laptops', 'Peripherals', 'Monitors', 'Audio', 'Accessories'].map((cat) => (
                            <li key={cat}><a href="#" className="hover:text-blue-500 transition-colors duration-300 text-sm">{cat}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-gray-400">Contact Us</h4>
                    <p className="text-sm">support@rbvichwebelectronics.com</p>
                    <p className="text-sm">123 Tech Lane, Innovation City, Techland 54321</p>
                    <p className="text-sm">Phone: +1 (555) 987-6543</p>
                    <p className="text-sm">Hours: Mon-Fri, 9 AM - 6 PM (GMT)</p>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                <div className="flex justify-center gap-4 mb-4">
                    <a href="#" className="hover:text-blue-500 transition-colors duration-300 text-sm">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-500 transition-colors duration-300 text-sm">Terms of Service</a>
                </div>
                <p className="text-sm">© {new Date().getFullYear()} RBVichWebElectronics. All rights reserved.</p>
            </div>
        </footer>
    );
}