import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Tuition Center Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your tuition center operations with our comprehensive management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Teachers</h2>
            <p className="text-gray-600 mb-6">
              Manage student attendance, upload study materials, and track fee payments.
            </p>
            <Link
              href="/login?role=teacher"
              className="btn-primary inline-block"
            >
              Teacher Login
            </Link>
          </div>

          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Students</h2>
            <p className="text-gray-600 mb-6">
              View your attendance, access study materials, and check fee status.
            </p>
            <Link
              href="/login?role=student"
              className="btn-primary inline-block"
            >
              Student Login
            </Link>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            New to the platform?{' '}
            <Link href="/register" className="text-primary-600 hover:text-primary-700">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 