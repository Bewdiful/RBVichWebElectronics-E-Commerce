import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useState } from "react";
import { Badge } from "../ui/badge";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card className="w-full max-w-sm mx-auto border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div>
        <div className="relative group">
          {imageLoading && (
            <div className="animate-pulse bg-gray-200 w-full h-64 rounded-t-lg" />
          )}
          <img
            src={product?.imageUrl}
            alt={product?.title}
            className="w-full h-64 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
              setImageLoading(false);
            }}
          />

          {/* Status Badges */}
          <div className="absolute top-2 left-2 space-y-2">
            {product?.totalStock === 0 ? (
              <Badge className="bg-red-600 hover:bg-red-700 px-3 py-1">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-amber-600 hover:bg-amber-700 px-3 py-1">
                Low Stock
              </Badge>
            ) : null}

            {product?.salePrice > 0 && (
              <Badge className="bg-green-600 hover:bg-green-700 px-3 py-1">
                On Sale
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
            {product?.title}
          </h2>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>ID: {product?._id?.slice(-6)}</span>
            <span>Stock: {product?.totalStock}</span>
          </div>

          <div className="flex items-center gap-2">
            {product?.salePrice > 0 ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  ${product?.salePrice} {/* Changed currency symbol to $ */}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product?.price} {/* Changed currency symbol to $ */}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${product?.price} {/* Changed currency symbol to $ */}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between gap-2">
          <Button
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-100"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData({
                ...product,
                imageUrl: product.imageUrl,
              });
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;