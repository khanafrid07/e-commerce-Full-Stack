import { Instagram, Youtube, Twitter, Facebook, Mail, MapPin, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative mt-12 text-gray-800 border-t sm:pl-4 border-gray-200">
            <h2 className="text-center text-sm  font-semibold tracking-widest">ShopSmart • by Afrid Khan</h2>

            {/* Background */}
            <div className="backdrop-blur-xl bg-white/10 border-t border-white/20">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12">


                    <div className="grid grid-cols-2  md:grid-cols-4 gap-6 sm:gap-10">

                        {/* Brand */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-black">
                                ShopSmart
                            </h2>
                            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Fashion, beauty, accessories & footwear — curated for your lifestyle.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-semibold mb-3 text-black text-sm sm:text-base">
                                Quick Links
                            </h3>
                            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                                <li className="hover:text-black cursor-pointer"><Link to="/">Home</Link></li>
                                <li className="hover:text-black cursor-pointer"><Link to="/shop">Shop</Link></li>
                                <li className="hover:text-black cursor-pointer"><Link to="/#category">Categories</Link></li>
                                <li className="hover:text-black cursor-pointer"><Link to="/#new-arrivals">New Arrivals</Link></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="font-semibold mb-3 text-black text-sm sm:text-base">
                                Categories
                            </h3>
                            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                                <li className="hover:text-black cursor-pointer"><Link to="/category/Fashion">Fashion</Link></li>
                                <li className="hover:text-black cursor-pointer"><Link to="/category/Beauty">Beauty</Link></li>
                                <li className="hover:text-black cursor-pointer"><Link to="/category/Accessories">Accessories</Link></li>
                                <li className="hover:text-black cursor-pointer"><Link to="/category/Footwear">Footwear</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-semibold mb-3 text-black text-sm sm:text-base">
                                Contact
                            </h3>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <Mail size={14} className="sm:w-4 sm:h-4" />
                                kafrid488@gmail.com
                            </div>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mt-2">
                                <MapPin size={14} className="sm:w-4 sm:h-4" />
                                Kathmandu, Nepal
                            </div>

                            {/* Social */}
                            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-5">
                                <Github onClick={() => window.open("https://github.com/khanafrid07", "_blank")} size={18} className="cursor-pointer hover:text-black transition" />
                                <Facebook onClick={() => window.open("https://www.facebook.com/khan.afrid.388", "_blank")} size={18} className="cursor-pointer hover:text-black transition" />
                                <Instagram onClick={() => window.open("https://www.instagram.com/khan__afrid/", "_blank")} size={18} className="cursor-pointer hover:text-black transition" />
                                <Twitter size={18} className="cursor-pointer hover:text-black transition" />
                            </div>
                        </div>

                    </div>

                    {/* Bottom */}
                    <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs sm:text-sm text-gray-600">
                        © {new Date().getFullYear()} ShopSmart. All rights reserved.
                    </div>

                </div>
            </div>
        </footer>
    );
}