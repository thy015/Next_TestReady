export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-700 border-l-blue-500 border-r-blue-700 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  )
}
