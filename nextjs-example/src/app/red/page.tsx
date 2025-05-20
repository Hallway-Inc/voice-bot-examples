export default function RedPage() {
  return (
    <div className="min-h-screen bg-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-red-900">Red Page</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 border border-red-200">
          <p className="text-red-700 text-lg">
            Try asking the bot to show you the blue or green page.
          </p>
        </div>
      </div>
    </div>
  );
} 