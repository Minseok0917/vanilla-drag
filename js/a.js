if( ad  ) return;
	if( findClashItem ){
		const focusTop = focusMoveOption.middleY - focusMoveOption.height/2;
		const focusBottom = focusMoveOption.middleY + focusMoveOption.height/2;
		const findY = findClashItem.middleY;
		const t = Math.abs(focusTop - findY);
		const b = Math.abs(focusBottom - findY);
		let element = findClashItem.element;
		/*
		*/if( t > b && focusBottom > findY && t < 20 ) { // focusBottom Clash
			element = element.nextElementSibling;
		}
		// ad = true;
		// setTimeout(()=>  ad = false,130)

		$items.forEach( $item => $item.classList.remove('clash') );

		element.classList.add('clash');
		setRoot('--focusHeight',`${focusOption.height}px`);
		useDrag.commit('setClashItem',element);
	}else{
		$items.forEach( $item => $item.classList.remove('clash') );
	}