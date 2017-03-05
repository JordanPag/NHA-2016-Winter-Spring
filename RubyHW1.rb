require "csv"

CSV.open("HW1fixed.csv", "wb") do |file|
	File.open("RubyHW1.txt", "r") do |csv|
		csv.each do |line|
			lin = line.split("")
			deleteables = []
			lin.each do |piece|
				if piece != "1" and piece != "2" and piece != "3" and piece != "4" and piece != "5" and piece != "6" and piece != "7" and piece != "8" and piece != "9" and piece != "0"
					deleteables.push(piece)
				end
			end
			deleteables.each do |part|
				lin.delete(part)
			end
			puts lin.inspect
			if lin.size == 10
				fix1 = lin[0] + lin[1] + lin[2]
				fix2 = lin[3] + lin[4] + lin[5]
				fix3 = lin[6] + lin[7] + lin[8] + lin[9]
				file << ["1-#{fix1}-#{fix2}-#{fix3}"]
			end
			if lin.size == 11
				fix1 = lin[0]
				fix2 = lin[1] + lin[2] + lin[3]
				fix3 = lin[4] + lin[3] + lin[6]
				fix4 = lin[5] + lin[6] + lin[9] + lin[10]
				file << ["#{fix1}-#{fix2}-#{fix3}-#{fix4}"]
			end
		end
	end
end