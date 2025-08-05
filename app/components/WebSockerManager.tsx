import { useEffect, useRef, useState } from "react";
import { useIp } from "../context/IpContext";

export default function WebSocketManager() {
  const { ip } = useIp();
  const [status, setStatus] = useState("Disconnected");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!ip) return;

    const ws = new WebSocket(`ws://${ip}:8887`);
    wsRef.current = ws;

    ws.onopen = () => setStatus("Connected");
    ws.onclose = () => setStatus("Disconnected");
    ws.onerror = () => setStatus("Error");

    return () => {
      ws.close();
    };
  }, [ip]);

  return (
    <div className="text-sm text-gray-600">
      WebSocket status: <strong>{status}</strong>
    </div>
  );
}
