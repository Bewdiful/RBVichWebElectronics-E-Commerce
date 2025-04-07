import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";
import gsap from "gsap";

// Import other necessary components and actions
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  // Initialize with URL param if present
  useEffect(() => {
    const urlKeyword = searchParams.get("keyword");
    if (urlKeyword) {
      setKeyword(urlKeyword);
      handleSearch(urlKeyword);
    }
  }, []);

  // Debounced search function
  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim().length > 2) {
        setIsSearching(true);
        dispatch(getSearchResults(searchTerm)).finally(() => {
          setIsSearching(false);
        });
      } else if (searchTerm.trim().length === 0) {
        dispatch(resetSearchResults());
      }
    }, 500),
    []
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setSearchParams(value ? { keyword: value } : {});
    handleSearch(value);
  };

  // Handle add to cart
  const handleAddtoCart = (getCurrentProductId, getTotalStock) => {
    const getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product added to cart",
        });
      }
    });
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  // Animation effects
  useEffect(() => {
    gsap.from(searchInputRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.from(resultsRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: 0.3,
      ease: "power2.out",
    });
  }, []);

  // Product details dialog
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3f2a8f] to-[#431865]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl relative" ref={searchInputRef}>
            <Input
              ref={searchInputRef}
              value={keyword}
              name="keyword"
              onChange={handleInputChange}
              className="py-6 bg-[#3f2a8f]/70 border-[#431865] text-white placeholder:text-gray-300 focus-visible:ring-[#a78bfa]"
              placeholder="Search for products, brands, categories..."
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-400"></div>
              </div>
            )}
          </div>
        </div>

        <div ref={resultsRef}>
          {!keyword && (
            <div className="text-center text-gray-300 my-20">
              <h3 className="text-xl font-semibold mb-2">
                What are you looking for?
              </h3>
              <p className="text-sm">
                Try searching for products, brands, or categories
              </p>
            </div>
          )}

          {keyword && keyword.trim().length <= 2 && (
            <div className="text-center text-gray-300 my-20">
              <p>Please enter at least 3 characters to search</p>
            </div>
          )}

          {isSearching && keyword.trim().length > 2 && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#a78bfa]"></div>
            </div>
          )}

          {!isSearching && keyword.trim().length > 2 && searchResults.length === 0 && (
            <div className="text-center text-gray-300 my-20">
              <h3 className="text-xl font-semibold mb-2">
                No results found for "{keyword}"
              </h3>
              <p className="text-sm">
                Try different keywords or check out our featured products
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="mt-4 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
              >
                Browse Products
              </button>
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-white mb-6">
                Search Results for "{keyword}"
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((item) => (
                  <ShoppingProductTile
                    key={item._id}
                    handleAddtoCart={handleAddtoCart}
                    product={item}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </div>
  );
}

export default SearchProducts;