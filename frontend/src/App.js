import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import logo from './img.jpg'
import './App.css'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function App() {
	const [name, setName] = useState('')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_7u6VXo1UbLBB9S' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Donating to The Sparks Foundation',
			description: 'Donate via any type of system you',
			
			handler: function (response) {
				alert('Check Your Email for Invoice Details ');
				
			},
			prefill: {
				name,
				email:'',
				phone_number:'',
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo}  alt="logo" />
				<h1>
				The Sparks Foundation
			  </h1>
			  <h2>
				Payment gateway integration system
			  </h2>
			 
				<a
				
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
					variant="outline-primary"
				>
					Donate Now
				</a>
			</header>
		</div>
	)
}

export default App
