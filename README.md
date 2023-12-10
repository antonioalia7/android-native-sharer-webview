# How to implement Android's native sharer in a webview
<br>


![ezgif com-video-to-gif](https://github.com/antonioalia7/android-native-sharer-webview/assets/39644570/53a99cf1-1427-46f2-b064-fc1faadc984a)



## 🖥️ Server Side
Suppose we have a button on our website like this:
```html
<button class="custom-button" onclick="shareLink()"><i class="fa-solid fa-share-nodes" style="font-size: 34px;"></i></button>
```
Having set up the onclick call with shareLink(), we have the following code script:

```javascript
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
```

## 📱 Application Side Java
Now we need to insert this method into our main Activity that manages the webview
```java
public class WebViewJavaScriptInterface {
        private MainActivity mActivity;

        // Pass the current task
        public WebViewJavaScriptInterface(MainActivity activity) {
            mActivity = activity;
        }

        // Annotate the method with @JavascriptInterface
        @JavascriptInterface
        public void shareLink(String url) {
            Intent shareIntent = new Intent(Intent.ACTION_SEND);
            shareIntent.setType("text/plain");
            shareIntent.putExtra(Intent.EXTRA_TEXT, url);
            mActivity.startActivity(Intent.createChooser(shareIntent, "Share link via"));
        }
    }
```

Now in the OnCreate method we insert these instructions
```java
        WebViewJavaScriptInterface jsInterface = new WebViewJavaScriptInterface(this);
        web.addJavascriptInterface(jsInterface, "Android");

```

In this way now when we click on the button inside the webview the native Android functionality will open and share the link displayed on that page.






