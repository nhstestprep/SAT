import React from 'react'

const Progress_bar = ({bgcolor,progress,height,progressDisplay}) => {
	
	const Parentdiv = {

		height: height,
		width: '36%',
		backgroundColor: 'whitesmoke',
		borderRadius: 40,
		margin: 'auto'
	}
	
	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
		borderRadius:40,
		textAlign: 'center'
	}
	
	const progresstext = {
		padding: 10,
		color: 'black',
		fontWeight: 900
	}
		
	return (
	<div style={Parentdiv}>
	<div style={Childdiv}>
		<span style={progresstext}>{`${progressDisplay}`}</span>
	</div>
	</div>
	)
}

export default Progress_bar;
