const form = document.querySelector('#generate-form');
const qr = document.querySelector('#qrcode');
const downloadButton = document.querySelector('.download');

function onGenerateSubmit(e) {
    clearUi();

    e.preventDefault();
    const url = document.querySelector('#url').value;
    const size = document.querySelector('#size').value;

    console.log(url, size);

    if (url == "") {
        alert('Please enter a URL');
    } else {
        showSpinner();
        downloadButton.style.display = 'block';
        downloadButton.style.background = 'hsl(0, 0%, 60%)';

        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size);
            
            setTimeout(() => {
                downloadButton.style.background = 'var(--blue)';
                const imageUrl = qr.querySelector('img').src;
                downloadButton.href = imageUrl;
                downloadButton.download = 'qrcode';
            }, 50)
        }, 1500);
    }

    function showSpinner() {
        document.querySelector('#default').style.display = 'none';
        document.querySelector('#spinner').style.display = 'block';
    }
    function hideSpinner() {
        document.querySelector('#spinner').style.display = 'none';
    }
}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    })
}

function clearUi() {
    qr.innerHTML = '';
}

form.addEventListener('submit', onGenerateSubmit);