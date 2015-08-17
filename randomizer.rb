require 'csv'
require 'json'
require 'socket'

CSV.read('test-data.csv', headers: true).each do |row|
  socket = UDPSocket.new
  socket.send row.to_hash.to_json, 0, "0.0.0.0", 33333
  sleep 0.5
end
