// File: src/pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  ActivityIcon,
  UsersIcon,
  BarChartIcon,
  BookOpenIcon,
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const timeout = setTimeout(() => {
      const mockData = {
        avgContactTime: "2.5 days",
        contactCount: 87,
        conversionRate: 38.6,
        topMajor: "Information Technology",
        contactStatusDistribution: {
          New: 40,
          Contacted: 25,
          Closed: 22,
        },
        requestsWithInterest: 55,
        requestsWithoutInterest: 15,
      };
      setData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!data) return <div>No dashboard data available.</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Avg. First Contact Time"
          value={data.avgContactTime}
          icon={<ActivityIcon />}
        />
        <Card
          title="Contacted Users (This Month)"
          value={data.contactCount}
          icon={<UsersIcon />}
        />
        <Card
          title="Conversion Rate"
          value={data.conversionRate + "%"}
          icon={<BarChartIcon />}
        />
        <Card
          title="Top Major"
          value={data.topMajor || "N/A"}
          icon={<BookOpenIcon />}
        />
      </div>

      {/* Example Charts or Tables */}
      <div className="bg-white rounded-xl shadow p-4 mt-6">
        <h3 className="text-xl font-semibold mb-2">
          Contact Status Distribution
        </h3>
        <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-x-auto">
          {JSON.stringify(data.contactStatusDistribution, null, 2)}
        </pre>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mt-6">
        <h3 className="text-xl font-semibold mb-2">Requests Info</h3>
        <ul className="list-disc pl-5 text-sm">
          <li>Requests with Interested Info: {data.requestsWithInterest}</li>
          <li>
            Requests without Interest Info: {data.requestsWithoutInterest}
          </li>
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition duration-300">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-orange-100 text-orange-500">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
