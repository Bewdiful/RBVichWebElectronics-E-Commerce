import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Search } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { resetTokenAndCredentials } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { motion } from "framer-motion";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    const menuItem = shoppingViewHeaderMenuItems.find(item => item.id === path);
    if (menuItem) setActiveItem(menuItem.id);
  }, [location.pathname]);

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    setActiveItem(getCurrentMenuItem.id);

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <motion.div
          key={menuItem.id}
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <button
            onClick={() => handleNavigate(menuItem)}
            className={`text-sm font-medium cursor-pointer transition-colors duration-300 px-3 py-2 rounded-md ${
              activeItem === menuItem.id
                ? "text-white bg-purple-700"
                : "text-gray-200 hover:text-white hover:bg-purple-800"
            }`}
          >
            {menuItem.label}
          </button>
        </motion.div>
      ))}
    </nav>
  );
}

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop/search?keyword=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full pl-4 pr-12 py-2 bg-purple-900/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors duration-300"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-purple-800/50 transition-colors duration-300"
          >
            <ShoppingCart className="w-6 h-6" />
            {(cartItems?.items?.length > 0) && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-[-5px] right-[-5px] bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
              >
                {cartItems?.items?.length || 0}
              </motion.span>
            )}
            <span className="sr-only">User cart</span>
          </Button>
        </motion.div>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <div className="flex items-center gap-3">

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            className="px-4 py-2 text-white bg-purple-600 hover:bg-purple-500 rounded-md transition-colors duration-300"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </motion.div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Avatar className="bg-purple-700 border-2 border-purple-400 cursor-pointer ml-2">
                <AvatarFallback className="bg-purple-700 text-white font-extrabold">
                  {user?.userName ? user.userName[0].toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="w-56 bg-purple-900 text-white border border-purple-500">
            <DropdownMenuLabel className="text-purple-200">Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-purple-700" />
            <DropdownMenuItem
              onClick={() => navigate("/shop/account")}
              className="hover:bg-purple-700 cursor-pointer"
            >
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-purple-700" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-purple-700 text-red-300 hover:text-red-200 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 w-full border-b border-purple-700/50 bg-gradient-to-r from-purple-900 to-purple-800 shadow-lg"
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 20, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <HousePlug className="h-6 w-6 text-purple-300" />
          </motion.div>
          <motion.span
            className="font-bold text-lg bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            RBVichWebElectronics
          </motion.span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-purple-800">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-purple-900 text-white border-r border-purple-700">
            <div className="flex flex-col gap-6 py-4">
              <Link to="/shop/home" className="flex items-center gap-2">
                <HousePlug className="h-6 w-6 text-purple-300" />
                <span className="font-bold text-lg text-white">WebElectronics</span>
              </Link>
              <MenuItems />
              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden md:block">
          <SearchBar />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </motion.header>
  );
}

export default ShoppingHeader;