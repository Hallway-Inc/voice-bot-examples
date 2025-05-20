export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Voice Navigation Demo</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <p className="mb-6 text-lg">
            Try these voice commands to navigate:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <p className="text-red-700">
                &ldquo;Take me to the red page&rdquo;
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-blue-700">
                &ldquo;Show me the blue page&rdquo;
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-green-700">
                &ldquo;Go to the green page&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
