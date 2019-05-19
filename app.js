window.addEventListener('load', () => {
	let long;
	let lat;
	let description = document.querySelector('.description');
	let degree = document.querySelector('.degree');
	let timezone = document.querySelector('.location-timezone');
	let tempSection = document.querySelector('.degree-section');
	let tempSpan = document.querySelector('.degree-section section');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = `https://cors-anywhere.herokuapp.com/`;
			const api = `${proxy}https://api.darksky.net/forecast/852bf23ecc99c0093f3e7210e3de40eb/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					const { temperature, summary, icon } = data.currently;
					// console.log(data);
					degree.textContent = temperature;
					description.textContent = summary;
					timezone.textContent = data.timezone;

					let celsius = (temperature - 32) * (5 / 9);

					setIcons(icon, document.querySelector('.icon'));

					tempSection.addEventListener('click', () => {
						if (tempSpan.textContent === 'F') {
							tempSpan.textContent = 'C';
							degree.textContent = Math.floor(celsius);
						} else {
							tempSpan.textContent = 'F';
							degree.textContent = temperature;
						}
					});
				});
		});
	}

	function setIcons(icon, iconID) {
		var skycons = new Skycons({ color: 'pink' });
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconID, currentIcon);
	}
});
