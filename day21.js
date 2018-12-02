// Listen for form submit
document.getElementById('myform').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  //get form values
  var name=document.getElementById('name').value;
  var url=document.getElementById('url').value;


  var bookmark={
  siteName:name,
  siteUrl:url
  };
  if(!formValidation(name,url)){
  return false;
  }


  if(localStorage.getItem('bookmarks')===null){
  var bookmarks=[];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  else{
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  e.preventDefault();
  fetchBookmark();
  }

  //deleteBookmarks
  function deleteBookmark(url) {
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'))
  for (var i = 0; i < bookmarks.length; i++) {
  if(bookmarks[i].siteUrl==url){
  bookmarks.splice(i,1);
  }
  }
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  fetchBookmark()
  };

 //fetchBookmarks
  function fetchBookmark() {
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'))
  var result=document.getElementById('bookmarksResults');
  result.innerHTML='';

  for (var i = 0; i < bookmarks.length; i++) {
  var name=bookmarks[i].siteName;
  var url=bookmarks[i].siteUrl;

    result.innerHTML += '<div class="jumbotron m-4 card p-2">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-primary"  href="'+addhttp(url)+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
  };

//formValidation
  function formValidation(name,url) {
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!url.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

    return true;
  };

  //url link
  function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
    return url;
  }
