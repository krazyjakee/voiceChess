window.onload = ->
	container = document.getElementById 'container'
	html = ""
	letters = ['a','b','c','d','e','f','g','h']

	for i in [7..0]
		piece = ''
		evenRow = (if (i % 2) then true else false)
		piece = 0 if i is 1
		piece = 6 if i is 6
		for j in [0...8]
			if evenRow
				even = (if (j % 2) then 'white' else 'black')
			else
				even = (if (j % 2) then 'black' else 'white')
			html += '<div class="tile ' + even + ' ' + letters[j] + (i+1) + '">' + piece + '</div>'
	container.innerHTML = html

chess = 
	selected: false
	selectedPiece: false
	selectMode: 'select'

	select: (what) ->
		chess.clearSelected()
		chess.selected = what
		tile = $('.'+what)
		tile.addClass('selected')
		piece = speech.sortBest chess.identifiers, tile.html()
		chess.selectedPiece = piece
		speech.speak piece || 'empty'

	move: (to) ->
		if chess.selected != to
			chess.clearSelected()
			tile = $('.'+chess.selected)
			newTile = $('.'+to)
			newTile.addClass('selected')

			newTile.html tile.html()
			tile.html('')
			chess.selectMode = 'select'

	clearSelected: -> $('.tile').removeClass('selected')

	identifiers:
		pawn: [6,0]
		rook: [9,3]
		knight: [7, 1]
		bishop: [8, 2]
		king: [':', 4]
		queen: [';', 5]