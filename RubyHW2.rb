require "google_drive"

cert_path = Gem.loaded_specs['google-api-client'].full_gem_path+'/lib/cacerts.pem'
ENV['SSL_CERT_FILE'] = cert_path

session = GoogleDrive::Session.from_config("config.json")


sheet = session.spreadsheet_by_key("1REau9FnyfO5qXs3kYBsXIPlAJquszUV1u7TAQJ09kEQ")
ws = sheet.worksheets[2]

places = []
farmerplace = 0
cowplace = 0
minutes = 0
hit = false

(1..ws.num_rows).each do |row|
	(1..ws.num_cols).each do |col|
		places.push(ws[row,col])
		if ws[row,col] == "F"
			farmerplace = (row-1)*10 + col-1
		end
		if ws[row,col] == "C"
			cowplace = (row-1)*10 + col-1
		end
	end
end

puts places.inspect
puts farmerplace
puts cowplace

farmerdirec = "up"
cowdirec = "up"

while hit != true

	ws[((cowplace/10).floor)+1,(cowplace%10)+1] = "."
	ws[((farmerplace/10).floor)+1,(farmerplace%10)+1] = "."

	#cow
	if cowdirec == "up"
		if places[cowplace-10] == "*"
			cowplace += 10
			cowdirec = "right"
		end
		if cowplace-10 < 0
			cowplace += 10
			cowdirec = "right"
		end
		cowplace -= 10
	elsif cowdirec == "down"
		if places[cowplace+10] == "*"
			cowplace -= 10
			cowdirec = "left"
		end
		if cowplace+10 > 99
			cowplace -= 10
			cowdirec = "left"
		end
		cowplace += 10
	elsif cowdirec == "left"
		if places[cowplace-1] == "*"
			cowplace += 1
			cowdirec = "up"
		end
		if cowplace % 10 == 0
			cowplace += 1
			cowdirec = "up"
		end
		cowplace -= 1
	elsif cowdirec == "right"
		if places[cowplace+1] == "*"
			cowplace -= 1
			cowdirec = "down"
		end
		if cowplace % 10 == 9
			cowplace -= 1
			cowdirec = "down"
		end
		cowplace += 1
	end


	#farmer
	if farmerdirec == "up"
		if places[farmerplace-10] == "*"
			farmerplace += 10
			farmerdirec = "right"
		end
		if farmerplace-10 < 0
			farmerplace += 10
			farmerdirec = "right"
		end
		farmerplace -= 10
	elsif farmerdirec == "down"
		if places[farmerplace+10] == "*"
			farmerplace -= 10
			farmerdirec = "left"
		end
		if farmerplace+10 > 99
			farmerplace -= 10
			farmerdirec = "left"
		end
		farmerplace += 10
	elsif farmerdirec == "left"
		if places[farmerplace-1] == "*"
			farmerplace += 1
			farmerdirec = "up"
		end
		if farmerplace % 10 == 0
			farmerplace += 1
			farmerdirec = "up"
		end
		farmerplace -= 1
	elsif farmerdirec == "right"
		if places[farmerplace+1] == "*"
			farmerplace -= 1
			farmerdirec = "down"
		end
		if farmerplace % 10 == 9
			farmerplace -= 1
			farmerdirec = "down"
		end
		farmerplace += 1
	end


	minutes += 1

	ws["C12"] = minutes
	ws[((cowplace/10).floor)+1,(cowplace%10)+1] = "C"
	ws[((farmerplace/10).floor)+1,(farmerplace%10)+1] = "F"
	ws.save

	sleep(1)

	if cowplace == farmerplace
		#make the new sheet named tamworth-#{minutes}
		sheet.add_worksheet("Tamworth-#{minutes}")
		hit = true
	end
end

ws.save

puts "#{minutes} minutes"
puts "done"