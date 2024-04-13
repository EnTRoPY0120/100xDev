import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connection established");
      socket.send("Hello Server!");
    };
    socket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setLatestMessage(message.data);
    };
    setSocket(socket);
    return () => socket.close();
  }, []);

  if (!socket) {
    return <div>Connecting to the Server</div>;
  }

  return (
    <>
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          socket.send(message);
        }}
      ></button>
      {latestMessage}
    </>
  );
}

export default App;
