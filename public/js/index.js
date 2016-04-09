var fileName = document.getElementById('fileToAnalyze');
var fileText = document.getElementById('uploadedFile');

fileName.addEventListener('change', function(e) {
    if (e.target.value.length > 20) {
        fileText.innerHTML = e.target.value.substring(0, 17) + '...';
    }
    else fileText.innerHTML = e.target.value;
});
