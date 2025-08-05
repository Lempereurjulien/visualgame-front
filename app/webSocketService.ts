
type MessageCallBack = (data: any) => void;

class webSocketService {
    private socket : WebSocket | null = null;
    private url : string;
    private listeners : MessageCallBack[] = [];

    constructor(url : string){
        this.url = url;
    }

    connect(){
        if(this.socket) return;

        this.socket = new WebSocket(this.url);

        this.socket.onopen = () =>{
            console.log("Websocket connecté");
        };

        this.socket.onmessage = (event) =>{
            const data = JSON.parse(event.data);
            this.listeners.forEach((cb) => cb(data));
        };

        this.socket.onclose = () =>{
            console.log("Websocket deconnecté");
            this.socket = null;
        };

        this.socket.onerror = (error) =>{
            console.log("Erreur Websocket : ", error);
        };
    }

    send(data : any){
        if(this.socket && this.socket.readyState === WebSocket.OPEN){
            this.socket.send(JSON.stringify(data));
        }else{
            console.warn("Websocket non connecté, message non envoyé")
        }
    }

    onMessage(callback : MessageCallBack){
        this.listeners.push(callback);
    }

    offMessage(callback : MessageCallBack){
        this.listeners = this.listeners.filter((cb) => cb !== callback);
    }

    disconnect(){
        if(this.socket){
            this.socket.close();
            this.socket = null;
        }
    }
}

const wsService = new webSocketService("ws://localhost:8887");
export default wsService;