function load_files() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if(xhttp.readyState === 4 && xhttp.status === 200) {
      let files = JSON.parse(xhttp.response);
      let filesContainer = document.getElementById('files');
      filesContainer.innerHTML = '';
      files.forEach(file => {
        let element = document.createElement('a');
        element.className = 'file';
        element.href = `download/${file}`;
        element.textContent = file;
        filesContainer.append('📝 ', element, document.createElement('br'));
      });
    }
  }
  xhttp.open('GET', 'get_files', true);
  xhttp.send();
}