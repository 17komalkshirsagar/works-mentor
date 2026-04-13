import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Pagination as PaginationType } from '@/types'

interface PaginationProps {
  pagination: PaginationType
  limit: number
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

export function Pagination({ pagination, limit, onPageChange, onLimitChange }: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Show:</span>
        <select
          className="h-9 rounded-md border border-input bg-background px-2 py-1 text-sm"
          value={limit}
          onChange={(e) => { onLimitChange(Number(e.target.value)); onPageChange(1) }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <span className="text-sm text-muted-foreground">
          Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => onPageChange(pagination.page - 1)} disabled={!pagination.hasPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <Button variant="outline" size="icon" onClick={() => onPageChange(pagination.page + 1)} disabled={!pagination.hasNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}