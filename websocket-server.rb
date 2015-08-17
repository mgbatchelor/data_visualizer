require 'em-websocket'

EM.run do
  $channel = EM::Channel.new

  class Client < EventMachine::Connection
    def receive_data(data)
      $channel.push(data)
    end
  end

  EM.open_datagram_socket('0.0.0.0', 33333, Client)

  EM::WebSocket.run(host: "0.0.0.0", port: 8080) do |ws|
    ws.onopen do
      sid = $channel.subscribe { |msg| ws.send msg }
      ws.onclose { $channel.unsubscribe(sid) }
    end
  end
end
