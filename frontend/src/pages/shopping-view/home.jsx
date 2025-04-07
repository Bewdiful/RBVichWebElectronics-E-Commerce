import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllFilteredProducts,
    fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import {
    FaLaptopCode,
    FaMemory,
    FaGamepad,
    FaChevronRight,
    FaDesktop,
    FaHeadphones,
} from "react-icons/fa";
import { BsController } from "react-icons/bs";
import {
    SiRazer,
    SiSteelseries,
    SiLogitech,
    SiCorsair,
    SiMsi,
    SiAlienware,
    SiAsus,
} from "react-icons/si";
import gsap from "gsap";

const categoriesWithIcon = [
    { id: "gaming-pcs", label: "Gaming PCs", icon: FaLaptopCode, color: "#FF4A6B" },
    { id: "gaming-accessories", label: "Gaming Accessories", icon: FaGamepad, color: "#7B4AFF" },
    { id: "laptops-notebooks", label: "Laptops & Notebooks", icon: FaLaptopCode, color: "#4A9FFF" },
    { id: "peripherals", label: "Peripherals", icon: FaChevronRight, color: "#4AFFCF" },
    { id: "consoles", label: "Consoles", icon: BsController, color: "#FFB74A" },
    { id: "monitors-displays", label: "Monitors & Displays", icon: FaDesktop, color: "#FF4AE5" },
    { id: "memory", label: "Memory", icon: FaMemory, color: "#4AFF8C" },
];

const brandsWithIcon = [
    { id: "razer", label: "Razer", icon: SiRazer, color: "#66FF00" },
    { id: "steelseries", label: "SteelSeries", icon: SiSteelseries, color: "#FF6600" },
    { id: "logitech", label: "Logitech", icon: SiLogitech, color: "#00B8FF" },
    { id: "corsair", label: "Corsair", icon: SiCorsair, color: "#FFD700" },
    { id: "msi", label: "MSI", icon: SiMsi, color: "#FF0000" },
    { id: "alienware", label: "Alienware", icon: SiAlienware, color: "#5856D6" },
    { id: "asus", label: "ASUS", icon: SiAsus, color: "#0070C9" },
];

function AnimatedCategoryCard({ icon: Icon, label, color, onClick }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (cardRef.current) {
            if (isHovered) {
                gsap.to(cardRef.current, {
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    duration: 0.3,
                    ease: "power2.out",
                });
            } else {
                gsap.to(cardRef.current, {
                    y: 0,
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        }
    }, [isHovered]);

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer bg-gradient-to-r from-[#3f2a8f] to-[#431865] text-white rounded-xl overflow-hidden shadow transition-all"
            style={{ borderTop: `4px solid ${color}` }}
        >
            <div className="flex flex-col items-center justify-center p-4">
                <div className="bg-opacity-10 rounded-full p-3 mb-2" style={{ backgroundColor: `${color}30` }}>
                    <Icon className="w-8 h-8" style={{ color: color }} />
                </div>
                <span className="font-bold text-center text-sm">{label}</span>
            </div>
        </div>
    );
}

function AnimatedBrandIcon({ IconComponent, label, color, handleNavigate }) {
    const iconRef = useRef(null);
    const textRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (iconRef.current && textRef.current) {
            if (isHovered) {
                gsap.to(iconRef.current, {
                    scale: 1.2,
                    y: -5,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                });
                gsap.to(textRef.current, {
                    fontWeight: 700,
                    duration: 0.2,
                });
            } else {
                gsap.to(iconRef.current, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
                gsap.to(textRef.current, {
                    fontWeight: 600,
                    duration: 0.2,
                });
            }
        }
    }, [isHovered]);

    return (
        <div
            onClick={handleNavigate}
            className="cursor-pointer bg-gradient-to-r from-[#3f2a8f] to-[#431865] text-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all p-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col items-center justify-center">
                <div ref={iconRef} className="transition-all duration-300">
                    <IconComponent className="w-12 h-12" style={{ color }} />
                </div>
                <span ref={textRef} className="font-semibold mt-3">{label}</span>
            </div>
        </div>
    );
}

function ShoppingHome() {
    const { productList, productDetails } = useSelector(
        (state) => state.shopProducts
    );
    const { featureImageList } = useSelector((state) => state.commonFeature);

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const categoryRef = useRef(null);
    const brandRef = useRef(null);

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem("filters");
        const currentFilter = {
            [section]: [getCurrentItem.id],
        };

        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate(`/shop/listing`);
    }

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    function handleAddtoCart(getCurrentProductId) {
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
                    title: "Product is added to cart",
                });
            }
        });
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    useEffect(() => {
        dispatch(
            fetchAllFilteredProducts({
                filterParams: {},
                sortParams: "price-lowtohigh",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        dispatch(getFeatureImages());
    }, [dispatch]);

    // Animation for section titles
    useEffect(() => {
        gsap.fromTo(
            categoryRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: categoryRef.current } }
        );

        gsap.fromTo(
            brandRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: brandRef.current } }
        );
    }, []);

    return (
        <>
            {/* Shop by category Section (moved to the top) */}
                 <section className="py-12 bg-gradient-to-r from-[#3f2a8f] to-[#431865] text-white">
                <div className="container mx-auto px-4">
                    <div ref={categoryRef} className="mb-8">
                        <h2 className="text-3xl font-extrabold text-center mb-2 text-white">
                            Shop by Category
                        </h2>
                        <div className="h-1 w-24 bg-[#7A1CAC] mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {categoriesWithIcon.map((categoryItem, index) => (
                            <AnimatedCategoryCard
                                key={categoryItem.id}
                                icon={categoryItem.icon}
                                label={categoryItem.label}
                                color={categoryItem.color}
                                onClick={() =>
                                    handleNavigateToListingPage(categoryItem, "category")
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop by Brand Section */}
            <section className="py-12 bg-gradient-to-r from-[#3f2a8f] to-[#431865] text-white">
                <div className="container mx-auto px-4">
                    <div ref={brandRef} className="mb-8">
                        <h2 className="text-3xl font-extrabold text-center mb-2 text-white">
                            Shop by Brand
                        </h2>
                        <div className="h-1 w-24 bg-[#AD49E1] mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {brandsWithIcon.map((brandItem) => (
                            <AnimatedBrandIcon
                                key={brandItem.id}
                                IconComponent={brandItem.icon}
                                label={brandItem.label}
                                color={brandItem.color}
                                handleNavigate={() =>
                                    handleNavigateToListingPage(brandItem, "brand")
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

{/* Feature Products Section */}
 <section className="py-12 bg-gradient-to-r from-[#3f2a8f] to-[#431865] text-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-extrabold text-center mb-2 text-white">
      Feature Products
    </h2>
    <div className="h-1 w-24 bg-[#5127c5] mx-auto rounded-full mb-8"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {productList && productList.length > 0 ? (
        productList.slice(0, 8).map((productItem) => (
          <ShoppingProductTile
            key={productItem.id}
            handleGetProductDetails={handleGetProductDetails}
            product={productItem}
            handleAddtoCart={handleAddtoCart}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-10 text-white">
          Loading products...
        </div>
      )}
    </div>
  </div>
</section>

            {/* Product Details Dialog */}
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </>
    );
}

export default ShoppingHome;