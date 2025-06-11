import { useState, useEffect } from "react";
import ServerCard from "./ServerCard";
import AddServerForm from "./AddServerForm";
import ServerStats from "./ServerStats";

interface Server {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: "online" | "offline" | "connecting";
  players: number;
  maxPlayers: number;
  map: string;
  ping: number;
}

const ServerDashboard = () => {
  const [servers, setServers] = useState<Server[]>([
    {
      id: "1",
      name: "RU Dust2 24/7",
      ip: "185.230.126.12",
      port: 27015,
      status: "online",
      players: 18,
      maxPlayers: 20,
      map: "de_dust2",
      ping: 45,
    },
    {
      id: "2",
      name: "Mirage Competitive",
      ip: "92.63.105.44",
      port: 27016,
      status: "online",
      players: 12,
      maxPlayers: 16,
      map: "de_mirage",
      ping: 78,
    },
    {
      id: "3",
      name: "Inferno Deathmatch",
      ip: "176.57.166.19",
      port: 27017,
      status: "offline",
      players: 0,
      maxPlayers: 32,
      map: "de_inferno",
      ping: 999,
    },
  ]);

  const addServer = (newServer: { name: string; ip: string; port: number }) => {
    const server: Server = {
      id: Date.now().toString(),
      ...newServer,
      status: "connecting",
      players: 0,
      maxPlayers: 20,
      map: "Unknown",
      ping: 0,
    };
    setServers([...servers, server]);

    // Симуляция проверки сервера
    setTimeout(() => {
      setServers((prev) =>
        prev.map((s) =>
          s.id === server.id
            ? {
                ...s,
                status: "online" as const,
                players: Math.floor(Math.random() * 20),
                map: "de_dust2",
                ping: Math.floor(Math.random() * 100) + 20,
              }
            : s,
        ),
      );
    }, 2000);
  };

  const removeServer = (id: string) => {
    setServers(servers.filter((s) => s.id !== id));
  };

  const connectToServer = (server: Server) => {
    // В реальном приложении здесь была бы логика подключения
    console.log(`Подключение к серверу: ${server.ip}:${server.port}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-oswald text-blue-500">
              GAMEMASTER
            </h1>
            <p className="text-slate-400 mt-1">
              Мониторинг игровых серверов в реальном времени
            </p>
          </div>
          <AddServerForm onAddServer={addServer} />
        </div>

        <ServerStats servers={servers} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server) => (
            <ServerCard
              key={server.id}
              {...server}
              onConnect={() => connectToServer(server)}
              onRemove={() => removeServer(server.id)}
            />
          ))}
        </div>

        {servers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-4">
              Нет добавленных серверов
            </div>
            <p className="text-slate-500">
              Нажмите "Добавить сервер" чтобы начать мониторинг
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerDashboard;
