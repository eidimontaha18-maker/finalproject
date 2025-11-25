let title = document.getElementById('title');
let url = document.getElementById('url');
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function() {
    if (title.value === '' || url.value === '') {
        alert('Please fill in both fields.');
        return;
    }   
    let bookmarkList = document.getElementById('bookmark-list');
    let listItem = document.createElement('li');
    let link = document.createElement('a');
    link.href = url.value;
    link.textContent = title.value;
    listItem.appendChild(link);
    bookmarkList.appendChild(listItem);
    title.value = '';
    url.value = '';
});
// Note: Make sure to add <ul id="bookmark-list"></ul> in the HTML where you want the bookmarks to appear.
