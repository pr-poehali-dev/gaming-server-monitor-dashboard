import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ServerStatsProps {
  servers: Array<{
    status: "online" | "offline" | "connecting";
    players: number;
    maxPlayers: number;
  }>;
}

const ServerStats = ({ servers }: ServerStatsProps) => {
  const totalServers = servers.length;
  const onlineServers = servers.filter((s) => s.status === "online").length;
  const totalPlayers = servers.reduce((sum, s) => sum + s.players, 0);
  const totalSlots = servers.reduce((sum, s) => sum + s.maxPlayers, 0);

  const stats = [
    {
      title: "Всего серверов",
      value: totalServers,
      icon: "Server",
      color: "text-blue-500",
    },
    {
      title: "Онлайн",
      value: onlineServers,
      icon: "CheckCircle",
      color: "text-green-500",
    },
    {
      title: "Игроков",
      value: `${totalPlayers}/${totalSlots}`,
      icon: "Users",
      color: "text-orange-500",
    },
    {
      title: "Заполненность",
      value: `${totalSlots > 0 ? Math.round((totalPlayers / totalSlots) * 100) : 0}%`,
      icon: "Activity",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              {stat.title}
            </CardTitle>
            <Icon name={stat.icon as any} size={20} className={stat.color} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServerStats;
