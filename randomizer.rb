require 'redis'
require 'csv'
require 'json'

redis = Redis.new

CSV.read('test-data.csv', headers: true).each do |row|
  redis.publish('ws', row.to_hash.to_json)
  sleep rand(5)
end
