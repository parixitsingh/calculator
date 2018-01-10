class Calculator{
	start(mainContainer){
		this.preparedCalculatorStructure();
		mainContainer.appendChild(this.calculatorContainer);
		var numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			operatorKeys = ['-', '+', '*', '/', '=', 'C'];

		for(let i = 0; i < numberKeys.length ; i++){
			let options = {
				tag : 'span',
				content : numberKeys[i],
				value : numberKeys[i],
				className : 'number-key'
			},
			numberPadKey = this.getTagWithClassAndContent(options);
			numberPadKey.onclick = ()=>{
				this.onNumberClick(numberPadKey);
			};
			this.numberPadContainer.appendChild(numberPadKey);
		}

		for(let i = 0; i < operatorKeys.length ; i++){
			let options = {
				tag : 'span',
				content : operatorKeys[i],
				value : operatorKeys[i],
				className : 'number-key'
			},
			operatorPadKey = this.getTagWithClassAndContent(options);
			operatorPadKey.onclick = ()=>{
				this.onOperatorClick(operatorPadKey);
			};
			this.operatorPadContainer.appendChild(operatorPadKey);
		}
	}

	/*
		<div class="calculator">
			<div class="number-screen"></div>
			<div class="keys">
				<div class="number-pad"></div>
				<div class="operator-pad"></div>
			</div>
		</div>
	*/
	preparedCalculatorStructure(){
		this.calculatorContainer = this.getTagWithClassAndContent({
			tag : 'div', className : 'calculator'
		});
		this.screenContainer = this.getTagWithClassAndContent({
			tag : 'div', content : '0', className : 'number-screen'
		});
		this.keysContainer = this.getTagWithClassAndContent({
			tag : 'div', className : 'keys'
		});
		this.numberPadContainer = this.getTagWithClassAndContent({
			tag : 'div', className : 'number-pad'
		});
		this.operatorPadContainer = this.getTagWithClassAndContent({
			tag : 'div', className : 'operator-pad'
		});
		this.keysContainer.appendChild(this.numberPadContainer);
		this.keysContainer.appendChild(this.operatorPadContainer);
		this.calculatorContainer.appendChild(this.screenContainer);
		this.calculatorContainer.appendChild(this.keysContainer);
	}

	onOperatorClick(operatorKey){
		switch(operatorKey.value){
			case 'C':
				this.firstNumber = 0;
				this.secondNumber = 0;
				this.operator = null;
				this.updateNumberScreen(this.firstNumber);
				break;
			case '=':
				if(this.firstNumber && this.operator && this.secondNumber){
					this.updateNumberScreen(this.getCalculatedValue(this.firstNumber, this.secondNumber));
					this.firstNumber = 0;
					this.secondNumber = 0;
					this.operator = null;
				}
				break;
			default:
				if(this.screenContainer.value){
					this.firstNumber = this.screenContainer.value;
				}
				this.operator = operatorKey.value;
		}
	}

	getCalculatedValue(firstNumber, secondNumber){
		switch(this.operator){
			case '-':
				return firstNumber - secondNumber;
				break;
			case '+':
				return firstNumber + secondNumber;
				break;
			case '*':
				return firstNumber * secondNumber;
				break;
			case '/':
				return firstNumber / secondNumber;
				break;
		}
	}

	getTagWithClassAndContent(options){
		let element = document.createElement(options.tag);
		element.className = options.className;
		element.value = options.value;
		element.innerHTML = options.content || '';
		return element;
	}

	onNumberClick(numberKey){
		var result;
		if(!this.firstNumber){
			this.firstNumber = numberKey.value;
			result = this.firstNumber;
		} else if(this.firstNumber && this.operator){
			if(!this.secondNumber){
				this.secondNumber = numberKey.value;
			} else {
				this.secondNumber = this.secondNumber*10 + numberKey.value;
			}
			result = this.secondNumber;
		} else {
			this.firstNumber = this.firstNumber * 10 + numberKey.value;
			result = this.firstNumber;
		}
		this.updateNumberScreen(result);
	}

	updateNumberScreen(value){
		this.screenContainer.value = value;
		this.screenContainer.innerHTML = value;
	}
}