import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const formatCurrency = (amount, currencyCode, locale) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <div key={item.productId} className="flex items-start gap-4 p-3 border rounded-lg">
                {/* Product Image */}
                <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                  <img 
                    src={item.image || '/path/to/default-image.jpg'} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(
                      item.salePrice > 0 ? item.salePrice : item.price, 
                      "USD", 
                      "en-US"
                    )} × {item.quantity}
                  </p>
                  <p className="font-medium text-sm mt-1">
                    {formatCurrency(
                      (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
                      "USD",
                      "en-US"
                    )}
                  </p>
                </div>
              </div>
            ))
          : <p className="text-center py-4">Your cart is empty</p>}
      </div>
      {cartItems && cartItems.length > 0 && (
        <>
          <div className="mt-6 space-y-4 border-t pt-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">{formatCurrency(totalCartAmount, "USD", "en-US")}</span>
            </div>
          </div>
          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full mt-6"
          >
            Checkout
          </Button>
        </>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;