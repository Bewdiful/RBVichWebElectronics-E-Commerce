import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  imageUrl: "",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { productList, status, error } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        imageUrl: formData.imageUrl,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        brand: formData.brand,
        price: Number(formData.price),
        salePrice: Number(formData.salePrice),
        totalStock: Number(formData.totalStock),
        averageReview: Number(formData.averageReview),
      };

      let actionResult;
      if (currentEditedId) {
        actionResult = await dispatch(editProduct({
          id: currentEditedId,
          formData: productData
        }));
      } else {
        actionResult = await dispatch(addNewProduct(productData));
      }

      if (actionResult?.payload?.success) {
        toast({
          title: currentEditedId ? "Product updated successfully" : "Product added successfully",
          variant: "success",
        });
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setFormData(initialFormData);
        setCurrentEditedId(null);
      } else {
        throw new Error(actionResult?.payload?.message || "Operation failed");
      }
    } catch (error) {
      toast({
        title: "Error occurred",
        description: error.message,
        variant: "destructive",
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const actionResult = await dispatch(deleteProduct(productId));
      if (actionResult?.payload?.success) {
        toast({
          title: "Product deleted successfully",
          variant: "success",
        });
        dispatch(fetchAllProducts());
      } else {
        throw new Error(actionResult?.payload?.message || "Deletion failed");
      }
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isFormValid = () => {
    return (
      formData.imageUrl &&
      formData.title &&
      formData.description &&
      formData.category &&
      formData.brand &&
      formData.price !== "" &&
      !isNaN(Number(formData.price)) &&
      formData.totalStock !== "" &&
      !isNaN(Number(formData.totalStock))
    );
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (currentEditedId && productList) {
      const productToEdit = productList.find(p => p._id === currentEditedId);
      if (productToEdit) {
        setFormData({
          imageUrl: productToEdit.imageUrl || "",
          title: productToEdit.title || "",
          description: productToEdit.description || "",
          category: productToEdit.category || "",
          brand: productToEdit.brand || "",
          price: productToEdit.price?.toString() || "",
          salePrice: productToEdit.salePrice?.toString() || "",
          totalStock: productToEdit.totalStock?.toString() || "",
          averageReview: productToEdit.averageReview || 0,
        });
      }
    }
  }, [currentEditedId, productList]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      
      {status === "loading" ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-48 bg-gray-200 animate-pulse rounded-md" />
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">Error loading products: {error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productList?.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(open) => {
          if (!open) {
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            setFormData(initialFormData);
          }
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {formData.imageUrl && (
              <div className="mt-2">
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="h-40 w-full object-contain border rounded"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
              </div>
            )}
          </div>

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid() || isSubmitting}
              isLoading={isSubmitting}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;