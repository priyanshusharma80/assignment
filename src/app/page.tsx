import Chart from "../components/Chart";

export default function DashboardPage() {
  return (
    <main className="flex justify-center items-center space-y-8">
      {/* Chart */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <Chart />
      </div>
    </main>
  );
}
