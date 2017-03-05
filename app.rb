require "csv"
#
#ary = CSV.read("telephone-nums.csv")
#puts ary
#
#newArray = ary.map do |row|
#	"011-1-#{row[0]}-#{row[1]}-#{row[2]}"
#end
#
#puts newArray

names = []

File.open("telephone-nums.txt", "r") do |f|
  f.each_line do |line|
    names.push(line.split(" "))
  end
end
# File is closed automatically at end of block

puts names

CSV.open("new-file.csv", "wb") do |csv|
	csv.each do |line|
		csv << ["first name","second name"]
	end
end