window.CamwearaRingSizer = class CamwearaRingSizer {

    constructor(companyName, buttonId) {
        this.companyName = companyName;
        this.buttonId = buttonId;
        this.iframeId = "camweara-ring-sizer-iframe-new";
    }

    init() {

        if (!this.isRingSizeIframeExisting()) {
            console.log("ring sizer iframe not present");
            this.loadRingSizerGTM();
        }

        const button = document.getElementById(this.buttonId);

        if (!button) {
            console.error("Button not found with id:", this.buttonId);
            return;
        }

        button.addEventListener("click", () => {
            this.open();
        });

        // listen for close message from iframe
        window.addEventListener("message", (event) => {
            if (event.data === "closeIframe" || event.data === "closeRingSizer") {
                this.closeIframe();
            }
        });

    }

    createIframe() {

        let iframe = document.getElementById(this.iframeId);

        if (!iframe) {

            iframe = document.createElement("iframe");
            iframe.id = this.iframeId;
            iframe.allowTransparency = "true";

            iframe.style.position = "fixed";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            iframe.style.zIndex = "2147483647";
            iframe.style.background = "transparent";

            document.body.appendChild(iframe);
        }

        return iframe;
    }

    open() {
        const ringSizerIframe = this.createIframe();
        const ringSizerButton = document.getElementById(this.buttonId);

        const rawLocale =
            (ringSizerButton && ringSizerButton.dataset.locale) ||
            (window.Shopify && window.Shopify.locale) ||
            document.documentElement.lang ||
            "en";

        const shortLang = rawLocale.split("-")[0].toLowerCase();

        ringSizerIframe.src = `https://cdn.camweara.com/ring_sizer/?companyname=${encodeURIComponent(this.companyName)}&lang=${shortLang}`;
        ringSizerIframe.style.display = "block";
    }

    isRingSizeIframeExisting() {
        let iframe = document.getElementById(this.iframeId);
        return iframe;
    }

    closeIframe() {
        const iframe = document.getElementById(this.iframeId);
        if (iframe) {
            iframe.style.display = "none";
            iframe.src = "";
        }
    }

    loadRingSizerGTM() {
        let scriptTag = document.createElement("script");

        let scriptContent = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WKRBVRMZ');`;

        scriptTag.text = scriptContent;
        document.head.appendChild(scriptTag);

        let noScriptTag = document.createElement("noscript");
        noScriptTag.innerHTML =
            '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WKRBVRMZ" height="0" width="0"></iframe>';
        document.body.append(noScriptTag);
    };

};
