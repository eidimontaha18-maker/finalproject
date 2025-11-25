document.addEventListener('DOMContentLoaded', function() {
    let title = document.getElementById('title');
    let url = document.getElementById('url');
    let addbtn = document.getElementById('addbtn');

    addbtn.addEventListener('click', function() {
    let titleValue = title.value.trim();
    let urlValue = url.value.trim();

    if (titleValue === '' || urlValue === '') {
        alert('Please fill in both fields.');
        return;
    }

    if (!/^https?:\/\//i.test(urlValue)) {
        alert('URL must start with http:// or https://');
        return;
    }

    let bookmarkList = document.getElementById('bookmark-list');
    let listItem = document.createElement('li');

    let link = document.createElement('a');
    link.href = urlValue;
    link.textContent = titleValue;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    // Create Open button
    let openBtn = document.createElement('button');
    openBtn.textContent = 'Open';
    openBtn.className = 'openbtn';
    openBtn.addEventListener('click', function() {
        window.open(urlValue, '_blank');
    });

    // Create Delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deletebtn';
    deleteBtn.addEventListener('click', function() {
        listItem.remove();
    });

    listItem.appendChild(link);
    listItem.appendChild(openBtn);
    listItem.appendChild(deleteBtn);
    bookmarkList.appendChild(listItem);

    title.value = '';
    url.value = '';
});

    let modeBtn = document.getElementById('mode');
    modeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        modeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
});
