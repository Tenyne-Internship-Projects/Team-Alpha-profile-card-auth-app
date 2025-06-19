import ProfileDetail from "../home/ProfileDetail";

// Complete HomeContent component
const HomeContent = () => (
  <div className="max-w-7xl mx-auto">
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Dashboard Overview
      </h1>
      <p className="text-gray-600">
        Welcome back! Here&apos;s what&apos;s happening today.
      </p>
    </div>

    <div>
      <ProfileDetail />
    </div>

    {/* Stats Cards */}
    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">2,847</p>
          </div>
          <Users className="h-8 w-8 text-blue-600" />
        </div>
        <p className="text-xs text-green-600 mt-2">+12% from last month</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">$54,329</p>
          </div>
          <TrendingUp className="h-8 w-8 text-green-600" />
        </div>
        <p className="text-xs text-green-600 mt-2">+8% from last month</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Projects</p>
            <p className="text-2xl font-bold text-gray-900">127</p>
          </div>
          <FileText className="h-8 w-8 text-purple-600" />
        </div>
        <p className="text-xs text-red-600 mt-2">-3% from last month</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Sessions</p>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
          </div>
          <Activity className="h-8 w-8 text-orange-600" />
        </div>
        <p className="text-xs text-green-600 mt-2">+15% from last hour</p>
      </div>
    </div> */}

    {/* Recent Activity */}
    {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">New user registered</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Document uploaded</p>
              <p className="text-xs text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">System updated</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </div> 

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Team meeting</p>
              <p className="text-xs text-gray-500">Today at 2:00 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Project deadline</p>
              <p className="text-xs text-gray-500">Tomorrow at 5:00 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Client presentation</p>
              <p className="text-xs text-gray-500">Friday at 10:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div> */}
  </div>
);

export default HomeContent;
