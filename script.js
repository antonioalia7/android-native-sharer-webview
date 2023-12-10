    function shareLink() {
        if (navigator.share) {
            navigator.share({
                title: 'Link Title',
                text: 'Link Description',
                url: window.location.href
            })
            .then(() => console.log('Link shared successfullyo'))
            .catch((error) => console.error('Error while sharing:', error));
        } else {
            // Fallback for Android
            if (window.Android && window.Android.shareLink) {
                // Call the fallback function defined in Android (make sure the function exists in Android)
                window.Android.shareLink(window.location.href);
            } else {
                // Generic fallback
                alert('Sorry, sharing is not supported by your browser.');
            }
        }
    }