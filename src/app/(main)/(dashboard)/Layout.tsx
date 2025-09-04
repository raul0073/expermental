
type Props = {
  type: "league" | "team" | "player";
  title: string;
  // eslint-disable-next-line
  stats?: any[];       // For league/team stats table
  // eslint-disable-next-line
  topPlayers?: any[];  // Top players table
  // eslint-disable-next-line
  bestXI?: any[];      // Best XI lineup
  // eslint-disable-next-line
  plotData?: any[];    // Charts data
};

export default function Layout({
  type,
  title,
  stats = [],
  topPlayers = [],
  bestXI = [],
  plotData = [],
}: Props) {
  console.log(type)
  return (
    <div className="space-y-12 px-4 md:px-8">
      {/* Header */}
      <header className="text-3xl font-bold">{title}</header>

      {/* Stats Table Section */}
      {stats.length > 0 && (
        <section className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          {/* Replace with your StatsTable component */}
          {/* <StatsTable data={stats} /> */}
          <div className="p-4 border rounded bg-gray-50 text-gray-600">
            Stats Table Placeholder
          </div>
        </section>
      )}

      {/* Top Players Table */}
      {topPlayers.length > 0 && (
        <section className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2">Top Players</h2>
          {/* <PlayerTable players={topPlayers} /> */}
          <div className="p-4 border rounded bg-gray-50 text-gray-600">
            Top Players Table Placeholder
          </div>
        </section>
      )}

      {/* Best XI Section */}
      {bestXI.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Best XI</h2>
          {/* <BestXI lineup={bestXI} /> */}
          <div className="p-4 border rounded bg-gray-50 text-gray-600">
            Best XI Placeholder
          </div>
        </section>
      )}

      {/* Plot Section */}
      {plotData.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="text-xl font-semibold mb-2 col-span-full">Plots</h2>
          {/* <PlotSection type={type} data={plotData} /> */}
          {plotData.map((_, idx) => (
            <div
              key={idx}
              className="p-4 border rounded bg-gray-50 text-gray-600 h-64 flex items-center justify-center"
            >
              Plot Placeholder
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
