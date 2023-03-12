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


	// this will only fetch the photos when it is called by the event listener

	
	function getFetch(){
		const date = document.querySelector('input').value
		console.log(date);
		const container = document.querySelector('.raw-image-container')
		container.innerText = '';
		
		fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${date}&api_key=nzch7KX7METbfXDHs74CXlhb46UGmJoVe1gZTZRL`)
		.then(res=> res.json())
		.then(data=> {
			console.log(data)
			
			// this will show each images in the page
			data.photos.forEach(photo => {
				const img = document.createElement('img');
				img.src = photo.img_src;
				img.alt = "Mars Rover Photo";
				img.classList.add('.photo');
				container.appendChild(img);
			});
			
			// get all checkboxes and add event listners to filter images
			const cameraCheckboxes = document.querySelectorAll('.facetitem-checkbox')
			let selectedCameras = []
			cameraCheckboxes.forEach(function(checkbox) {
				checkbox.addEventListener('change', function() {
					selectedCameras = Array.from(cameraCheckboxes).filter(i => i.checked).map(i => i.value)
				console.log(selectedCameras);
				}); // add 'change' to anki
		
			})

		})
		.catch(err => {
			console.log(`error ${err}`)			
		});	
}
