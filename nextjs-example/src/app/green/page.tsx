export default function GreenPage() {
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-green-900">Green Page</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 border border-green-200">
          <p className="text-green-700 text-lg">
            Try asking the bot to show you the red or blue page.
          </p>
        </div>
      </div>
    </div>
  );
} 