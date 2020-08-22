document.addEventListener("DOMContentLoaded",
	function(){


		var count = 1;
		const cells = document.querySelectorAll(".cell");
		startGame();
		function startGame(){
			count = 1;
			document.querySelector(".board").style.display = "none";
			document.querySelector(".result").style.display = "none";
			document.querySelector(".welcpage").style.display = "block";
			document.querySelector("#hplayer").addEventListener("click",changeFlag0);
			document.querySelector("#cplayer").addEventListener("click",changeFlag1);

			function changeFlag0(event){
				document.querySelector(".welcpage").style.display = "none";
				document.querySelector(".choiceselect").style.display = "block";
				document.querySelector("#x").addEventListener("click",playerAssignx);
				document.querySelector("#o").addEventListener("click",playerAssigno);
				human();
			}

			function changeFlag1(event){
				document.querySelector(".welcpage").style.display = "none";
				document.querySelector(".choiceselect").style.display = "block";
				document.querySelector("#x").addEventListener("click",playerAssignx);
				document.querySelector("#o").addEventListener("click",playerAssigno);
			}
			function human(){
				for (var i = 0; i < cells.length; i++){
						cells[i].innerText = '';
						cells[i].addEventListener("click",turn);
						cells[i].style.removeProperty("background-color"); 
						cells[i].style.cursor = "pointer";
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
							document.getElementById("rescon").innerText = currPlayer + " WINS!!";
						}else{
							count++;
						if(count == 10){
								document.getElementById("rescon").innerText = "TIE GAME!!";
							}
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
				document.getElementById("rescon").innerText = player1 + " turn";
			}

			function playerAssigno(event){
				player1 = 'O';
				player2 = 'X';
				document.querySelector(".choiceselect").style.display = "none";
				document.querySelector(".board").style.display = "block";
				document.querySelector(".result").style.display = "block";
				document.getElementById("rescon").innerText = player1 + " turn";
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
		}
		document.getElementById("res").addEventListener("click",startGame);
});