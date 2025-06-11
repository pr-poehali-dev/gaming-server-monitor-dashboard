import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface AddServerFormProps {
  onAddServer: (server: { name: string; ip: string; port: number }) => void;
}

const AddServerForm = ({ onAddServer }: AddServerFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    port: 27015,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.ip && formData.port) {
      onAddServer(formData);
      setFormData({ name: "", ip: "", port: 27015 });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Icon name="Plus" size={20} className="mr-2" />
          Добавить сервер
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            Добавить новый сервер
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Название сервера
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Мой CS2 сервер"
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ip" className="text-slate-300">
              IP адрес
            </Label>
            <Input
              id="ip"
              value={formData.ip}
              onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
              placeholder="192.168.1.100"
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="port" className="text-slate-300">
              Порт
            </Label>
            <Input
              id="port"
              type="number"
              value={formData.port}
              onChange={(e) =>
                setFormData({ ...formData, port: parseInt(e.target.value) })
              }
              placeholder="27015"
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Добавить сервер
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-slate-600 hover:bg-slate-700"
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServerForm;
