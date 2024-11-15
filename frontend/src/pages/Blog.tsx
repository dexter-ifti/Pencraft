import { BlogList, Navbar, Recommendations } from '../components'
function Blog() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BlogList />
          </div>
          <div className="lg:col-span-1">
            <Recommendations />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Blog