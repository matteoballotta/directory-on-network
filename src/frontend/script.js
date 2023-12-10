function load_files() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if(xhttp.readyState === 4 && xhttp.status === 200) {
      let files = JSON.parse(xhttp.response);
      let html = '';
      files.forEach(file => {
        html += `<a href="download/${file}">${file}</a><br />`;
      });
      document.getElementById('files').innerHTML = html;
    }
  }
  xhttp.open('GET', 'get_files', true);
  xhttp.send();
}