//global variables
const container = document.querySelector('.raw-image-container')
let selectedCameras = []
const cameraCheckboxes = document.querySelectorAll('.facetitem-checkbox')
let loadMoreButton = document.querySelector('.next');
let loadPrevButton = document.querySelector('.prev');
let pageNumber = document.querySelectorAll('.page-num')

// Event listener for scrolling effect
window.addEventListener("scroll", function(){
	let nav = document.querySelector('.nav');
	nav.classList.toggle("sticky", window.scrollY > 440 )
})


// SPIRIT API through fetch


document.querySelector('button').addEventListener('click', getFetch)
// my url for manifest 
const url = "https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=nzch7KX7METbfXDHs74CXlhb46UGmJoVe1gZTZRL"

// will fetch the max sol and total photos of this rover when the pages render
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
//  inside the function will show the checkboxes on which value it was checked.



function getFetch(){
	const date = document.querySelector('input').value
	console.log(date);
	container.innerText = '';
	let currentPage = 1;
	
	fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${date}&api_key=nzch7KX7METbfXDHs74CXlhb46UGmJoVe1gZTZRL&page=${currentPage}`)
	.then(res=> res.json())
	.then(data=> {
		console.log(data)
		
		// define a variable to keep track of the current page number
		
		// define a function to laod the next page of images
		function loadNextPage() {
			currentPage++;
			let apiRequestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${date}&api_key=nzch7KX7METbfXDHs74CXlhb46UGmJoVe1gZTZRL&page=${currentPage}`
			fetch(apiRequestUrl)
				.then(res => res.json())
				.then(data => {
					console.log(data)
					pageNumber.forEach(number => {
						number.placeholder = currentPage
					})
					showImages();
					filter();

				})
		}

		function loadPrevPage() {
			currentPage--;
			let apiRequestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${date}&api_key=nzch7KX7METbfXDHs74CXlhb46UGmJoVe1gZTZRL&page=${currentPage}`
			fetch(apiRequestUrl)
				.then(res => res.json())
				.then(data => {
					console.log(data)
					pageNumber.forEach(number => {
						number.placeholder = currentPage
					}) 
					showImages();
					filter();

				})
		}

		// show images that match the selected camera(s)
			function showImages() {
				let noResults = document.querySelector('.no-results')
				noResults.innerText = '';
				container.innerText = '';

				const pageSize = 25;
				const firstIndex = (currentPage - 1) * pageSize;
				const lastIndex = firstIndex + pageSize - 1;
		
				data.photos.slice(firstIndex, lastIndex + 1).forEach(photo => {
					const cameraName = photo.camera.name;
					if(selectedCameras.includes(cameraName) || selectedCameras.length === 0) {
						const img = document.createElement('img');
						img.src = photo.img_src;
						img.alt = "Mars Rover Photo";
						img.classList.add('.photo');
						container.appendChild(img);
					}
				});

				if(container.childNodes.length === 0){
					noResults.innerText = "No Results Found. ";
				}
			};

			function filter(){
				// get all checkboxes and add event listners to filter images
				cameraCheckboxes.forEach(function(checkbox) {
					checkbox.addEventListener('change', function() {
						selectedCameras = Array.from(cameraCheckboxes).filter(i => i.checked).map(i => i.value)
						console.log(selectedCameras);
						showImages();
					});
				});
			}
			
		filter();
		showImages();
		pageNumber.forEach(number => {
			number.placeholder = currentPage
		})
		// showImages();// add 'change' to anki
		loadMoreButton.addEventListener('click', loadNextPage)
		loadPrevButton.addEventListener('click', loadPrevPage)
		
	})
	.catch(err => {
		console.log(`error ${err}`)			
	});	
}

