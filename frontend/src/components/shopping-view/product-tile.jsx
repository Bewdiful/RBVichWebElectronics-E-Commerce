import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import StarRatingComponent from "../common/star-rating";
import { useState } from "react";

function ShoppingProductTile({
    product,
    handleGetProductDetails,
    handleAddtoCart,
}) {
    const [imageLoading, setImageLoading] = useState(true);

    const formatCurrency = (amount, currencyCode, locale) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
        }).format(amount);
    };

    return (
        <div className="flex-shrink-0 w-full sm:w-[280px]"> {/* Fixed width for consistent sizing */}
            <Card className="h-full bg-gradient-to-r from-[#3f2a8f] to-[#431865] text-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div
                    onClick={() => handleGetProductDetails(product?._id)}
                    className="cursor-pointer flex-grow"
          >
            <div className="relative group">
              {imageLoading && <div className="animate-pulse bg-[#3f2a8f] w-full h-48 rounded-t-lg" />}
              <img
                src={product?.imageUrl}
                alt={product?.title}
                className={`w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity ${imageLoading ? 'hidden' : ''}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                }}
                onLoad={() => setImageLoading(false)}
              />
              <div className="absolute top-2 left-2 space-y-2">
                {product?.totalStock === 0 ? (
                  <Badge className="bg-[#5a4a8a] hover:bg-[#4a3a7a] px-3 py-1 text-white">
                    Out Of Stock
                  </Badge>
                ) : product?.totalStock < 10 ? (
                  <Badge className="bg-[#a78bfa] hover:bg-[#8b5cf6] px-3 py-1 text-[#1e0a4e]">
                    Only {product?.totalStock} left
                  </Badge>
                ) : null}

                {product?.salePrice > 0 && (
                  <Badge className="bg-[#c084fc] hover:bg-[#a855f7] px-3 py-1 text-white">
                    Sale
                  </Badge>
                )}
              </div>
            </div>

                    <CardContent className="p-4 space-y-2 flex-grow">
                        <h2 className="text-lg font-bold text-white line-clamp-2 h-12">
                            {product?.title}
                        </h2>

                        <div className="flex justify-between items-center text-sm text-gray-300">
                            <span>{categoryOptionsMap[product?.category]}</span>
                            <span>{brandOptionsMap[product?.brand]}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <StarRatingComponent rating={product?.averageReview || 0} />
                            <span className="text-xs text-gray-300">
                                ({product?.averageReview?.toFixed(2) || 0})
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 mt-2">
                            {product?.salePrice > 0 ? (
                                <>
                                    <span className="text-lg font-bold text-white">
                                        {formatCurrency(product?.salePrice, 'USD', 'en-US')} 
                                    </span>
                                    <span className="text-sm text-gray-300 line-through">
                                        {formatCurrency(product?.price, 'USD', 'en-US')} 
                                    </span>
                                </>
                            ) : (
                                <span className="text-lg font-bold text-white">
                                    {formatCurrency(product?.price, 'USD', 'en-US')} 
                                </span>
                            )}
                        </div>
                    </CardContent>
                </div>

                <CardFooter className="p-4 pt-0">
                    {product?.totalStock === 0 ? (
                        <Button
                            className="w-full bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
                            disabled
                        >
                            Out Of Stock
                        </Button>
                    ) : (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddtoCart(product?._id, product?.totalStock);
                            }}
                            className="w-full bg-[#4f46e5] hover:bg-[#7973ec] text-white"
                        >
                            Add to cart
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

export default ShoppingProductTile;