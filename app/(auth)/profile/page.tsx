export default function ProfilePage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
      </div>

      <div className="bg-white rounded-lg shadow max-w-2xl">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
        </div>
        <div className="px-6 py-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">anastasia@example.com</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <p className="mt-1 text-gray-900">Client</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p>Settings coming soon.</p>
      </div>
    </div>
  );
}