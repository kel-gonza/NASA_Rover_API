// Event listener for scrolling effect
window.addEventListener("scroll", function(){
	let nav = document.querySelector('.nav');
	nav.classList.toggle("sticky", window.scrollY > 433 )
})

// SPIRIT API through fetch

document.querySelector('button').addEventListener('click', getFetch)
// my url for manifest 
const url = "https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=nzch7KX7METbfXDHs74CXlhb46UGmJoVe1gZTZRL"

// will fetch the max sol and total photos of this rover
fetch(url)
	.then(res => res.json()) // parse response as JSON
	.then(data => {
		console.log(data)
		document.querySelector('.number-sols').innerText = `Max-Sol: ${data.photo_manifest.max_sol}`;
		document.querySelector('.total-photos').innerText = `Total Photos: ${data.photo_manifest.total_photos}`;
		document.querySelector('.max-date').innerText = `Max Date: ${data.photo_manifest.max_date}`;
	})
	.catch(err => {
		console.log(`error ${err}`)
	});


function getFetch(){
	const date = document.querySelector('input').value
	console.log(date);
	fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${date}&api_key=nzch7KX7METbfXDHs74CXlhb46UGmJoVe1gZTZRL`)
		.then(res=> res.json())
		.then(data=> {
			console.log(data)
		})
		.catch(err => {
			console.log(`error ${err}`)
		});
	
}