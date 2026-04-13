import { useState, useCallback, useMemo } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductForm } from '@/components/ProductForm'
import { ProductTable } from '@/components/ProductTable'
import { ProductFilters } from '@/components/ProductFilters'
import { Pagination } from '@/components/Pagination'
import { DeleteDialog } from '@/components/DeleteDialog'
import { useGetProductsQuery, useGetCategoriesQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, } from '@/redux/admin.api'
import { useDebounce } from '@/hooks/useDebounce'
import type { Product, ProductInput, Pagination as PaginationType } from '@/types'

const Admin = () => {
  const [search, setSearch] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  const { data: categoriesData } = useGetCategoriesQuery()
  const categories = useMemo(() => categoriesData?.data || [], [categoriesData])

  const queryParams = useMemo(() => ({
    search: debouncedSearch, category: categoryFilter, page, limit
  }), [debouncedSearch, categoryFilter, page, limit])
  const { data: productsData, isLoading, isFetching } = useGetProductsQuery(queryParams)

  const products = useMemo(() => productsData?.data || [], [productsData])
  const pagination = productsData?.pagination as PaginationType | undefined

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const handleCreateProduct = async (data: ProductInput) => {
    try {
      await createProduct(data).unwrap()
      setIsDialogOpen(false)
      toast.success('Product created successfully')
    } catch (error) {
      console.error('Failed to create product:', error)
    }
  }

  const handleUpdateProduct = async (data: ProductInput) => {
    if (!editingProduct) return;
    try {
      await updateProduct({ id: editingProduct._id as string, data }).unwrap()
      setIsDialogOpen(false);
      setEditingProduct(null);
      toast.success('Product updated successfully')
    } catch (error) {
      console.error('Failed to update product:', error)
    }
  }

  const handleDeleteProduct = async () => {
    if (!deletingProductId) return;
    try {
      await deleteProduct(deletingProductId).unwrap()
      setDeletingProductId(null)
      toast.success('Product deleted successfully')
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  const handleOpenCreate = useCallback(() => {
    setEditingProduct(null)
    setIsDialogOpen(true)
  }, [])

  const handleOpenEdit = useCallback((product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleCategoryChange = useCallback((value: string) => {
    setCategoryFilter(value === 'all' ? '' : value)
    setPage(1)
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Product Inventory</CardTitle>
            <CardDescription>Manage your products inventory</CardDescription>
          </div>
          <Button onClick={handleOpenCreate}> <Plus className="mr-2 h-4 w-4" /> Add Product </Button>
        </CardHeader>
        <CardContent>
          <ProductFilters
            search={search}
            category={categoryFilter}
            categories={categories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
          />

          {isLoading || isFetching ? <>
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          </> : products.length === 0 ? <>
            <div className="text-center py-12 text-muted-foreground">
              <p>No products found</p>
            </div>
          </> : <>
            <ProductTable
              products={products}
              onEdit={handleOpenEdit}
              onDelete={(id) => setDeletingProductId(id)}
            />
            {
              pagination && <Pagination
                pagination={pagination}
                limit={limit}
                onPageChange={setPage}
                onLimitChange={setLimit}
              />
            }
          </>
          }
        </CardContent>
      </Card>

      <ProductForm
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        product={editingProduct}
        isLoading={isCreating || isUpdating}
        categories={categories}
      />

      <DeleteDialog
        open={!!deletingProductId}
        onOpenChange={() => setDeletingProductId(null)}
        onConfirm={handleDeleteProduct}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default Admin