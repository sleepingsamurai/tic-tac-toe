document.addEventListener("DOMContentLoaded",
	function(){
		var count = 1;
		var f = 0;
		const cells = document.querySelectorAll(".cell");
		document.querySelector(".board").style.display = "none";
		document.querySelector(".result").style.display = "none";
		document.querySelector(".welcpage").style.display = "block";
		document.querySelector("#hplayer").addEventListener("click",changeFlag0);
		document.querySelector("#cplayer").addEventListener("click",changeFlag1);

		function changeFlag0(event){
			f = 1;
			document.querySelector(".welcpage").style.display = "none";
			document.querySelector(".choiceselect").style.display = "block";
			document.querySelector("#x").addEventListener("click",playerAssignx);
			document.querySelector("#o").addEventListener("click",playerAssigno);
			
			for (var i = 0; i < cells.length; i++){
				cells[i].addEventListener("click",turn);
			}
		}

		var currPlayer;
			function turn(move){
				var mark = move.target.id;
				var mark1 = document.getElementById(mark).innerText;
				if(!mark1){
						if(count%2 != 0){
					currPlayer = player1;
					}else{
						currPlayer = player2;
					}
					document.getElementById(mark).innerText = currPlayer;
					document.getElementById(mark).style.cursor = "default";
					info();
					function info(){
						if(currPlayer == player1){
							document.getElementById("rescon").innerText = player2 + " turn";
						}else{
							document.getElementById("rescon").innerText = player1 + " turn";
						}
					}
					if(checkWin(currPlayer)){
						for(var i=0; i < cells.length; i++){
							cells[i].removeEventListener("click",turn);
							cells[i].style.cursor = "default";
						}
						f = 0;
						document.getElementById("rescon").innerText = currPlayer + " WINS!!";
					}else{
						count++;
						if(count == 10){
							for(var i=0; i < cells.length; i++){
								cells[i].removeEventListener("click",turn);
								cells[i].style.cursor = "default";
							}
							f=0;
							document.getElementById("rescon").innerText = "TIE GAME!!";
						}
					}
				}	
			}

		function changeFlag1(event){
			f = 2;
			document.querySelector(".welcpage").style.display = "none";
			document.querySelector(".choiceselect").style.display = "block";
			document.querySelector("#x").addEventListener("click",playerAssignx);
			document.querySelector("#o").addEventListener("click",playerAssigno);

			for(var i = 0;i < cells.length;i++){
				cells[i].addEventListener("click",turn1);
			}
			document.getElementById("rescon").innerText = "YOUR TURN!!";
		}

		var currPlayer;
			function turn1(move1){
				currPlayer = player1;
				var mark1 = move1.target.id;
				var mark11 = document.getElementById(mark1).innerText;
				if(!mark11){
					document.getElementById(mark1).innerText = currPlayer;
					document.getElementById(mark1).style.cursor = "default";
					currPlayer = player2;
					var thisBoard = [];
					for(var i = 0;i < cells.length;i++){
						var ent = cells[i].innerText;
						thisBoard.push(ent);
					}

					var gin1 = 0;
					for(var i = 0;i < thisBoard.length;i++){
						if(!thisBoard[i]){
							gin1++;
						}
					}
					if(gin1){
						var moveAi = bestMove(thisBoard,currPlayer);
						document.getElementById(moveAi+1).innerText = currPlayer;
						document.getElementById(moveAi+1).style.cursor = "default";
					}
					if(checkWin(currPlayer)){
						for(var i = 0; i < cells.length; i++){
							cells[i].removeEventListener("click",turn1);
							cells[i].style.cursor = "default";
						}
						f = 0;
						document.getElementById("rescon").innerText = "YOU LOSE!!";
					}else{
						var gin = 0;
						for(var i = 0;i < cells.length;i++){
							if(!cells[i].innerText){
								gin++;
							}
						}
						if(gin==0){
							for(var i = 0; i < cells.length; i++){
								cells[i].removeEventListener("click",turn1);
								cells[i].style.cursor = "default";
							}
							f = 0;
							document.getElementById("rescon").innerText = "TIE GAME!!";
						}
					}
				}
			}

		var player1;
		var player2;

		function playerAssignx(event){
			player1 = 'X';
			player2 = 'O';
			document.querySelector(".choiceselect").style.display = "none";
			document.querySelector(".board").style.display = "block";
			document.querySelector(".result").style.display = "block";
			if(f == 1){
				document.getElementById("rescon").innerText = player1 + " turn";
			}
		}

		function playerAssigno(event){
			player1 = 'O';
			player2 = 'X';
			document.querySelector(".choiceselect").style.display = "none";
			document.querySelector(".board").style.display = "block";
			document.querySelector(".result").style.display = "block";
			if(f == 1){
				document.getElementById("rescon").innerText = player1 + " turn";
			}
		}

		const winningCombo = [
				[1,2,3],
				[4,5,6],
				[7,8,9],
				[1,4,7],
				[2,5,8],
				[3,6,9],
				[1,5,9],
				[3,5,7]
			] ;

		function checkWin(ind){
			for(var i=0; i < 8; i++){
				var element1 = document.getElementById(winningCombo[i][0]); 
				var element2 = document.getElementById(winningCombo[i][1]); 
				var element3 = document.getElementById(winningCombo[i][2]); 
				if(element1.innerText == ind && element2.innerText == ind && element3.innerText == ind){
					element1.style.backgroundColor = "#000066";
					element2.style.backgroundColor = "#000066";
					element3.style.backgroundColor = "#000066";
					return true;
				}
			}
			return false;
		}
		document.getElementById("res").addEventListener("click",startGame);
		function startGame(event){
			const cells = document.querySelectorAll(".cell");
			if(f == 1){
				for(var i = 0;i < cells.length;i++){
					cells[i].removeEventListener("click",turn);
				}
			}else if(f == 2){
				for(var i = 0;i < cells.length;i++){
					cells[i].removeEventListener("click",turn1);
				}
			}
			f = 0;
			count = 1;
			for (var i = 0; i < cells.length; i++){
					cells[i].innerText = '';
					cells[i].style.removeProperty("background-color"); 
					cells[i].style.cursor = "pointer";
			}
			document.querySelector(".board").style.display = "none";
			document.querySelector("#rescon").innerText = '';
			document.querySelector(".result").style.display = "none";
			document.querySelector(".welcpage").style.display = "block";
		}

		function bestMove(board,aiplayer){
			return minmax(board,aiplayer).index;
		}

		function checkWin1(layout,who){
			for(var i = 0;i < 8;i++){
				var element1 = layout[winningCombo[i][0]-1];
				var element2 = layout[winningCombo[i][1]-1];
				var element3 = layout[winningCombo[i][2]-1];

				if(element1 == who && element2 == who && element3 == who){
					return true;
				}
			}
			return false;

		}

		function minmax(currboard,player){
			var availspots = [];
			for(var i = 0;i < currboard.length;i++){
				if(!currboard[i]){
					availspots.push(i);
				}
			}

			if(checkWin1(currboard,player2)){
				return {score: 10};
			}else if(checkWin1(currboard,player1)){
				return {score: -10};
			}else if(availspots.length == 0){
				return {score: 0};
			}

			var moves = [];
			for(var i = 0;i < availspots.length;i++){
				var move = {};
				move.index = availspots[i];
				move.space = currboard[availspots[i]];
				currboard[availspots[i]] = player;

				if(player == player2){
					var result = minmax(currboard,player1);
					move.score = result.score;
				}else{
					var result = minmax(currboard,player2);
					move.score = result.score;
				}

				currboard[availspots[i]] = move.space;

				moves.push(move);
			}

			var best;
			if(player == player2){
				var bestScore = -10000;
				for(var i = 0;i < moves.length;i++){
					if(moves[i].score > bestScore){
						bestScore = moves[i].score;
						best = i;
					}
				}
			}else{
				var bestScore = 10000;
				for(var i = 0; i < moves.length;i++){
					if(moves[i].score < bestScore){
						bestScore = moves[i].score;
						best = i;
					}
				}
			}

			return moves[best]; 
		}
});