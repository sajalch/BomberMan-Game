window.random=[0,0,0,0,0,0,0,0,0,0];
		const gridMaker=()=>{
			const grid=document.querySelector("#grid");
			let str='';
			for(let i=0;i<81;i++){
				str+=`
					<div class="box" id="cell_${i+1}" onclick="mark(${i})"></div>
					`;
			}
			grid.innerHTML=str;
		}
		const isValid=(val)=>{
			if(random.includes(val))
				return false;
			return true;
		}
		const randomNumber=()=>{
			return Math.floor(Math.random()*80)+1;
		}
		const randomizeBombs=()=>{
			for(let i=0;i<10;i++){
				let num=randomNumber();
				while(!isValid(num)){
					num=randomNumber();
				}
				random[i]=num;
			}
		}
		randomizeBombs();
		gridMaker();
		const mark=(val)=>{
			const gameScore=document.querySelector("#gameScore");
			const resultDisplay=document.querySelector("#resultDisplay");
			const box=document.querySelectorAll(".box");
			if(isValid(val+1)){
				gameScore.innerHTML=gameScore.innerHTML==""?1:Number(gameScore.innerHTML)+1;
				box[val].classList.add("normal");
				box[val].removeAttribute("onclick");
				if(Number(gameScore.innerHTML)>=71){
					for(let i=0;i<81;i++){
						box[i].style.cursor="not-allowed";
						box[i].removeAttribute("onclick");
					}
					resultDisplay.innerHTML="Win";
				}
			}else{
				for(let i=0;i<10;i++){
					box[random[i]-1].classList.add("bomb");
					box[random[i]-1].removeAttribute("onclick");
				}
				for(let i=0;i<81;i++){
					box[i].style.cursor="not-allowed";
					box[i].removeAttribute("onclick");
				}
				resultDisplay.innerHTML="Game Over";
			}			
		}
		
		document.querySelector("#resetButton").addEventListener('click',()=>{
			//call random for bombs array
			randomizeBombs();
			gridMaker();
			document.querySelector("#gameScore").innerHTML="";
			document.querySelector("#resultDisplay").innerHTML="";
		});