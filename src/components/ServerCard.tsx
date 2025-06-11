import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ServerCardProps {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: "online" | "offline" | "connecting";
  players: number;
  maxPlayers: number;
  map: string;
  ping: number;
  onConnect: () => void;
  onRemove: () => void;
}

const ServerCard = ({
  id,
  name,
  ip,
  port,
  status,
  players,
  maxPlayers,
  map,
  ping,
  onConnect,
  onRemove,
}: ServerCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      case "connecting":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPingColor = () => {
    if (ping < 50) return "text-green-500";
    if (ping < 100) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
            {name}
          </CardTitle>
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
            CS2
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Icon name="Globe" size={16} />
              <span>
                {ip}:{port}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Icon name="Users" size={16} />
              <span>
                {players}/{maxPlayers}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Icon name="Map" size={16} />
              <span>{map}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Wifi" size={16} className={getPingColor()} />
              <span className={getPingColor()}>{ping}ms</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onConnect}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={status === "offline"}
          >
            <Icon name="Play" size={16} className="mr-2" />
            Подключиться
          </Button>
          <Button
            onClick={onRemove}
            variant="outline"
            size="icon"
            className="border-slate-600 hover:bg-slate-700"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerCard;
