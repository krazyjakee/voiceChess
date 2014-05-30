wsr = new webkitSpeechRecognition()

speech = 
	error: false

	init: ->
		wsr.continuous = true
		wsr.maxAlternatives = 1
		wsr.interimResults = false
		wsr.lang = "English"
		wsr.onend = speech.reset
		wsr.onresult = speech.listen
		wsr.onerror = (e) -> speech.error = true
		speech.start()

	start: ->
		if speech.working
			wsr.stop()
			speech.reset()
		else
			wsr.start()
			speech.working = true
			speech.error = false

	reset: ->
		speech.working = false
		speech.start() unless speech.error

	listen: (e) ->
		best = e.results[e.results.length-1][0].transcript.toLowerCase().trim()

		if best is 'move' and chess.selectedPiece
			speech.speak 'Move ' + chess.selectedPiece + ' to?'
			chess.selectMode = 'move'
		else
			letter =
				b: ['bee', 'b', 'pet', 'be']
				f: ['f', 'eff', 'ph']
				c: ['c', 'see', 'sed', 'sea']
				d: ['d', 'dee', 'day']
				e: ['e', 'eye', '28', 't']
				g: ['gee', 'g']
				h: ['ache', 'h', 'ch']
				a: ['aye','a', '8']
			bestLetter = speech.sortBest letter, best

			number =
				six: ['6', 'x']
				five: ['5', 'ive']
				seven: ['7', 'seven']
				four: ['4', 'full', 'four', 'for', 'fault']
				one: ['1', 'one', 'won', 'own', 'lon']
				two: ['2', 'two', 'to', 'ter']
				three: ['3', 'three', 'ee']
				eight: ['8', 'eight', 'ate', ' it', 'a']
			bestNumber = speech.sortBest number, best

			if bestLetter and bestNumber
				result = bestLetter + speech.toNumber(bestNumber)

				if chess.selectMode is 'select'
					speech.speak result
					chess.select result
				if chess.selectMode is 'move'
					speech.speak chess.selectedPiece + ' at ' + chess.selected + ' moved to ' + result + '.'
					chess.move result
			else
				speech.speak 'Sorry, say that again?'

	sortBest: (catches, best) ->
		for key, value of catches
			for v in value
				return key if best.indexOf(v) > -1
		return false

	toNumber: (word) ->
		if word
			switch word.toLowerCase()
				when "one" then return 1
				when "two" then return 2
				when "three" then return 3
				when "four" then return 4
				when "five" then return 5
				when "six" then return 6
				when "seven" then return 7
				when "eight" then return 8
		else
			return false

	speak: (text) -> speechSynthesis.speak new SpeechSynthesisUtterance(text)

	working: false

speech.init()