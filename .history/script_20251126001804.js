let title = document.getElementById('title');
let url = document.getElementById('url');
let addbtn = document.getElementById('addbtn');

addbtn.addEventListener('click', function() {
     title = title.value.trim();
     url = url.value.trim();

    if (title === '' || url=== '') {
        alert('Please fill in both fields.');
        return;
    }

    if (!/^https?:\/\//i.test(url)) {
        alert('URL must start with http:// or https://');
        return;
    }

    let bookmarkList = document.getElementById('bookmark-list');
    let listItem = document.createElement('li');

    let link = document.createElement('a');
    link.href = url;
    link.textContent = title;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    listItem.appendChild(link);
    bookmarkList.appendChild(listItem);

    title.value = '';
    url.value = '';
});

