import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";

function UserCartItemsContent({ cartItem, style }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 300);

    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(
        deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item removed successfully",
          });
        }
      });
    }, 300);
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isRemoving ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-md transition-shadow"
    >
      {/* Product Image with better styling */}
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border">
        <img
          src={cartItem?.image || '/path/to/default-image.jpg'}
          alt={cartItem?.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/path/to/default-image.jpg';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm md:text-base truncate">
          {cartItem?.title}
        </h3>
        
        {/* Price per unit */}
        <p className="text-sm text-gray-500 mt-1">
          ${(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price).toFixed(2)} each
        </p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-full"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-3 h-3" />
          </Button>
          
          <span className={`font-medium w-6 text-center ${isUpdating ? 'animate-pulse' : ''}`}>
            {cartItem?.quantity}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Total Price and Delete Button */}
      <div className="flex flex-col items-end">
        <p className="font-semibold text-sm md:text-base">
          ${(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600 p-1 h-auto"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

export default UserCartItemsContent;