import { Card, CardContent } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton className="w-8 h-8 rounded-lg mr-4" />
              <Skeleton className="w-16 h-6 rounded" />
            </div>
            <Skeleton className="w-8 h-8 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-24"></div>
          <CardContent className="p-6 -mt-12 relative">
            <div className="flex items-end justify-between mb-4">
              <Skeleton className="w-20 h-20 rounded-full" />
              <Skeleton className="w-16 h-8 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-32 h-6 rounded" />
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-3/4 h-4 rounded" />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <Skeleton className="w-12 h-12 rounded-xl mx-auto mb-2" />
              <Skeleton className="w-8 h-6 rounded mx-auto mb-1" />
              <Skeleton className="w-16 h-4 rounded mx-auto" />
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <Skeleton className="w-12 h-12 rounded-xl mx-auto mb-2" />
              <Skeleton className="w-8 h-6 rounded mx-auto mb-1" />
              <Skeleton className="w-16 h-4 rounded mx-auto" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="space-y-4">
          <Skeleton className="w-full h-12 rounded-xl" />

          {/* Content Cards */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-4">
                <Skeleton className="w-24 h-5 rounded mb-3" />
                <div className="space-y-2">
                  <Skeleton className="w-full h-4 rounded" />
                  <Skeleton className="w-3/4 h-4 rounded" />
                  <Skeleton className="w-1/2 h-4 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
