require "google_drive"

cert_path = Gem.loaded_specs['google-api-client'].full_gem_path+'/lib/cacerts.pem'
ENV['SSL_CERT_FILE'] = cert_path

session = GoogleDrive::Session.from_config("config.json")


sheet = session.spreadsheet_by_key("1REau9FnyfO5qXs3kYBsXIPlAJquszUV1u7TAQJ09kEQ")
ws = sheet.worksheets[0]

def checkforwin(ws,x_or_o)
	if ws[2,1] == x_or_o and ws[2,2] == x_or_o and ws[2,3] == x_or_o
		return x_or_o
	elsif ws[2,1] == x_or_o and ws[3,1] == x_or_o and ws[4,1] == x_or_o
		return x_or_o
	elsif ws[2,1] == x_or_o and ws[3,2] == x_or_o and ws[4,3] == x_or_o
		return x_or_o
	elsif ws[3,1] == x_or_o and ws[3,2] == x_or_o and ws[3,3] == x_or_o
		return x_or_o
	elsif ws[4,1] == x_or_o and ws[4,2] == x_or_o and ws[4,3] == x_or_o
		return x_or_o
	elsif ws[2,2] == x_or_o and ws[3,2] == x_or_o and ws[4,2] == x_or_o
		return x_or_o
	elsif ws[2,3] == x_or_o and ws[3,3] == x_or_o and ws[4,3] == x_or_o
		return x_or_o
	elsif ws[4,1] == x_or_o and ws[3,2] == x_or_o and ws[2,3] == x_or_o
		return x_or_o
	else
		return "nope"
	end
end

def intro(ws)
	puts "TIC TAC TOE"
	puts "A game of strategy"
	puts "__________________"
	puts ""
	puts "Type in howto for instructions on how to play"
	puts "Everyone should look at the instructions because they are a bit different than normal tic tac toe"
	puts "Type in start to start the game"
	prompt(ws)
end

def prompt(ws)
	input = gets
	if input == "howto\n"
		instructions(ws)
	elsif input == "start\n"
		start(ws)
	else
		puts "Sorry, I didn't get that"
		prompt(ws)
	end
end

def instructions(ws)
	puts "HOW TO PLAY"
	puts "___________"
	puts ""
	puts "Play like normal tic tac toe, but instead of writing in an x or an o, you type in a number"
	puts "1 is the top left spot, 2 is the top middle, and so on up to 9"
	puts "When you are ready, type in start"
	prompt(ws)
end

def start(ws)
	row = 2
	taken = true
	while taken == true
		if ws[row,5] == ""
			taken = false
		else
			row += 1
		end
	end
	ws[row,5] = row-1
	time = Time.new
	date = "#{time.month}/#{time.day}/#{time.year}"
	ws[row,6] = date
	hour = time.hour
	if hour >= 12
		am_or_pm = "PM"
		if hour == 12
		else
			hour -= 12
		end
	else
		am_or_pm = "AM"
	end
	hourtime = "#{hour}:#{time.min} #{am_or_pm}"
	ws[row,7] = hourtime
	ws.save
	puts "Player 1's name (X):"
	player1name = gets
	player1name = player1name.split("\n")
	player1name = player1name[0]
	ws[row,8] = player1name
	ws.save
	puts "Player 2's name (O):"
	player2name = gets
	player2name = player2name.split("\n")
	player2name = player2name[0]
	ws[row,9] = player2name
	ws[2,1] = ""
	ws[2,2] = ""
	ws[2,3] = ""
	ws[3,1] = ""
	ws[3,2] = ""
	ws[3,3] = ""
	ws[4,1] = ""
	ws[4,2] = ""
	ws[4,3] = ""
	ws.save
	turn(ws,"X",row,player1name,player2name)
end

def turn(ws, player,row,player1name,player2name)
	puts "#{player}'s turn!"
	puts "Where would you like to go? Remember, 1 through 9"
	num = gets
	num = num.split("\n")
	num = num[0]
	num = num.to_i
	if num != 1 and num != 2 and num != 3 and num != 4 and num != 5 and num != 6 and num != 7 and num != 8 and num != 9
		puts "That's not a number between 1 and 9!"
		turn(ws,player,row,player1name,player2name)
	else
		col = num%3
		if col == 0
			col = 3
		end
		placerow = ((num/3).floor)+2
		if col == 3
			placerow -= 1
		end
		if ws[placerow,col] == "X" or ws[placerow,col] == "O"
			puts "That space is already taken!"
			turn(ws,player,row,player1name,player2name)
		else
			ws[placerow,col] = player
			ws.save
			x = checkforwin(ws,"X")
			o = checkforwin(ws,"O")
			if x == "X"
				winner(ws,1,row,player1name,player2name)
			elsif o == "O"
				winner(ws,2,row,player1name,player2name)
			elsif ws[2,1] != "" and ws[2,2] != "" and ws[2,3] != "" and ws[3,1] != "" and ws[3,2] != "" and ws[3,3] != "" and ws[4,1] != "" and ws[4,2] != "" and ws[4,3] != ""
				winner(ws,3,row,player1name,player2name)
			else
				if player == "X"
					player = "O"
					turn(ws,player,row,player1name,player2name)
				else
					player = "X"
					turn(ws,player,row,player1name,player2name)
				end
			end
		end
	end
end

def winner(ws, player,row,player1name,player2name)
	if player == 1
		ws[row,10] = player1name
		ws.save
	elsif player == 2
		ws[row,10] = player2name
		ws.save
	else
		ws[row,10] = "TIE"
		ws.save
	end
	recap = "#{ws[2,1]},#{ws[2,2]},#{ws[2,3]},#{ws[3,1]},#{ws[3,2]},#{ws[3,3]},#{ws[4,1]},#{ws[4,2]},#{ws[4,3]}"
	ws[row,11] = recap
	ws.save
end

intro(ws)