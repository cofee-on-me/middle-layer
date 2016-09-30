document.addEventListener("DOMContentLoaded", () => {
	const btnRequest = document.querySelector('#request');
	
	btnRequest.addEventListener("click", () => {
		fetch('/data', { method: 'GET' })
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.warn(err);
			})
		});

});
