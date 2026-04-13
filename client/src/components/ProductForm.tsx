import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Product, ProductInput } from '@/types';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100),
  category: z.string().min(1, 'Category is required').max(50),
  price: z.number().min(0, 'Price must be non-negative'),
  quantity: z.number().int().min(0, 'Quantity must be non-negative'),
  description: z.string().max(500).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductInput) => void;
  product?: Product | null;
  isLoading?: boolean;
  categories: string[];
}

export function ProductForm({
  open,
  onOpenChange,
  onSubmit,
  product,
  isLoading = false,
  categories,
}: ProductFormProps) {
  const isEdit = !!product;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      description: '',
    },
  });

  const categoryValue = watch('category');

  useEffect(() => {
    if (open) {
      if (product) {
        reset({
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
          description: product.description || '',
        });
      } else {
        reset({
          name: '',
          category: '',
          price: 0,
          quantity: 0,
          description: '',
        });
      }
    }
  }, [open, product, reset]);

  const onFormSubmit: SubmitHandler<ProductFormData> = (data) => {
    onSubmit({
      name: data.name,
      category: data.category,
      price: data.price,
      quantity: data.quantity,
      description: data.description || '',
    });
  };

  const handleSelectChange = (value: string) => {
    setValue('category', value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Product' : 'Add Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="Enter product name"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={categoryValue || product?.category || ''}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
                {!categories.includes('Electronics') && (
                  <SelectItem value="Electronics">Electronics</SelectItem>
                )}
                {!categories.includes('Clothing') && (
                  <SelectItem value="Clothing">Clothing</SelectItem>
                )}
                {!categories.includes('Home & Garden') && (
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                )}
                {!categories.includes('Sports') && (
                  <SelectItem value="Sports">Sports</SelectItem>
                )}
                {!categories.includes('Books') && (
                  <SelectItem value="Books">Books</SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register('price', { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                placeholder="0"
                {...register('quantity', { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className="text-xs text-destructive">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
