// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){

	// Get Form Values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if(!validateForm(siteName, siteURL)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteURL
	}

	/*
		// Local Storage Test
		localStorage.setItem('test', 'Hello');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
		console.log(localStorage.getItem('test'));
		*/

	// Test if bookamrk is null
	if(localStorage.getItem('bookmarks') === null){
		// Init Array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookamrks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to array
		bookmarks.push(bookmark);
		// Reset back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Clear Form
	document.getElementById('myForm').reset;

	// Refetch Bookamrks
	fetchBookmarks();

	// Prevent Form from Submitting
	e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Loop Through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}
	// Reset back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Refetch Bookamrks
	fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks(){
	// Get bookamrks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// Build Output
	bookmarksResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="jumbotron">' +
		'<h3>' + name +
		' <a class="btn btn-success" target="_blank" href="' + url + '">Visit</a>' +
		' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'  
		+ '</h3'
		+ '</div>';
	}
}

function validateForm(siteName, siteURL){
	if(!siteName || !siteURL){
		alert("Please fill in the form.");
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){
		alert("Please use a valid URL.");
		return false;
	}

	return true;
}