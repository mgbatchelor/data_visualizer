require 'em-websocket'
require 'em-hiredis'

EM.run do
  channel = EM::Channel.new
  pubsub = EM::Hiredis.connect.pubsub
  pubsub.subscribe('ws') { |msg| channel.push msg }

  EM::WebSocket.run(host: "0.0.0.0", port: 8080) do |ws|
    ws.onopen do
      sid = channel.subscribe { |msg| ws.send msg }
      ws.onmessage { |msg| channel.push msg }
      ws.onclose { channel.unsubscribe(sid) }
    end
  end
end
