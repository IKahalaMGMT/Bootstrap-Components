

var style = document.createElement('style');
style.innerHTML = '.dwmodal-box,.dwmodal-box-sticky{max-width:380px;text-align:center}.dwmodal{z-index:100000;position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.7);opacity:0;visibility:hidden}.dwmodal-box{z-index:1000;position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);background-color:#fff;padding:0 0 30px;width:85%;border-radius:10px}.dwmodal-box-sticky{z-index:100000;position:fixed;bottom:25px;left:25px;background-color:#769ca3;border-radius:3px;box-shadow:0 4px 8px 0 rgba(0,0,0,.3);transition:.3s;display:flex;align-items:center;padding:7px 15px 7px 20px;opacity:0;visibility:hidden}.dwmodal-box-sticky:hover{box-shadow:0 8px 16px 0 rgba(0,0,0,.6)}.dwmodal-image{max-height:393px;min-height:150px;width:100%;border-top-left-radius:10px;border-top-right-radius:10px;object-fit:cover;object-position:0% 100%}.dwmodal-close-button,.dwmodal-sticky-close-button{width:26px;height:26px;text-align:center;cursor:pointer;background:0 0;border:none;padding:0;display:flex;align-items:center;justify-content:center}.dwmodal-close-button{position:fixed;right:10px;top:10px;background:#000;border-radius:50px}.dwmodal-close-button:focus{outline:purple solid 2px}.dwmodal-sticky-close-button{position:relative}.dwmodal-sticky-link,.dwmodal-sticky-link:hover{text-decoration:none}.dwmodal-vertical-button-wrapper{width:100%;padding:0 10%}.dwmodal-vertical-button-wrapper .dwmodal-first-btn{margin-right:0;margin-bottom:7px}.dwmodal-disclaimer{margin:25px 15px -20px;text-align:center}.dwmodal-wrapper{display:flex;flex-wrap:nowrap;justify-content:center}.dwmodal-show-modal,.dwmodal-show-sticky-box{opacity:1;visibility:visible;transform:scale(1)}#dwmodal-label-span,.dwmodal-hide-sticky-box{display:none}@media only screen and (max-width:600px){.dwmodal-headline{font-size:2.25rem}.dwmodal-subheadline{font-size:1rem}.dwmodal-box-sticky{bottom:10px;left:10px}}.dwmodal-box h2, .dwmodal-box p { color: #CC0C7A; font-family: "Neutraface Text Bold", sans-serif; font-size: 1.75rem; font-weight: bold; letter-spacing: 0px; line-height: 1.5; margin: 0.5rem 1rem 0; padding: 0; } .dwmodal-box p { font-size: 18px !important; } .dwmodal-wrapper { display: flex; flex-wrap: nowrap; justify-content: center; } .dwmodal-wrapper .btn { color: #fff; background-color: #29B7CB; border-radius: 0.5rem; font-size: 16px; font-family: "Neutraface Text Bold"; text-decoration: none; padding: 10px; margin: 1rem 1rem 0rem 1rem; text-transform: uppercase; }';
document.head.appendChild(style);

var popupDiv = document.createElement('div');
popupDiv.id = 'kbPopup';
//document.body.appendChild(popupDiv);
document.body.insertAdjacentElement("beforeend", popupDiv);

var json = {"popup":{"image":{"path":"/assets/images/popups/popup.jpg","site":"PLANETSMOOTHIE-2022-WWW","link":"site://PLANETSMOOTHIE-2022-WWW/assets/images/popups/popup.jpg","name":"popup.jpg","file-size":219289,"width":600,"type":"file","content":"","height":400},"imageAltText":"PB&amp;Jammin' Products","buttonGroup":{"button":[{"buttonTarget":"_blank","buttonText":"Order Delivery","buttonAriaLabel":"Order Delivery","buttonLink":"https://order.planetsmoothie.com/"},{"buttonTarget":"_blank","buttonText":"Order Pick-Up","buttonAriaLabel":"Order Pick-Up","buttonLink":"https://order.planetsmoothie.com/"}]},"singleDayReoccuringGroup":{"singleDayReoccurringDays":{"value":["monday","tuesday","sunday"]}},"pathsGroup":{"globalRegexPath":"","excludeContainsPath":"","includeContainsPath":""},"stickyBanner":"","singleDayReoccurring":"","imageAriaLabel":"PB&amp;Jammin' Products","startEndDateGroup":{"endDate":"","startDate":""},"subHeadline":"Come taste the greatest thing since sliced bread! These PBJ-inspired flavors give a nod to the childhood favorite but with fresh fruit, protein and whole food ingredients!","disclaimerDisplay":"","buttonLayout":"horizontal","disclaimerGroup":{"disclaimerText":"","disclaimerExpandable":""},"headline":"PB&amp;Jammin\u2019","stickyBannerGroup":{"stickyHeadline":"","stickyCustomLink":"","stickyLinkTarget":"_self","stickyLink":"","stickyLinkAriaLabel":""}},"active":true};
var currentPopUp = 0;
//var kbKey = 0;
var inTimeRange;
var inDayRange;
const now = new Date();
var activePopup = json['active'];

if (activePopup == true) {
    //convert single object to array
    if (!Array.isArray(json['popup'])) {
        json['popup'] = [json['popup']]
    }

    const kbKeys = Object.keys(json['popup']);

   for (const kbKey of kbKeys) {

        inTimeRange = false;
        inDayRange = false;
        var startDate = json['popup'][kbKey].startEndDateGroup.startDate; // leave as '' if no start date, string, ex. '05/22/2022'; 
        //console.log(startDate);
        var endDate = json['popup'][kbKey].startEndDateGroup.endDate; // leave as '' if no end date, string, ex. '05/27/2022'; 
        var isSingleDayReoccuring = json['popup'][kbKey].singleDayReoccurring; 
        var daysForSingleDayReoccuring = json['popup'][kbKey].singleDayReoccuringGroup.singleDayReoccurringDays.value;  
        
        if (startDate && !endDate) {
            const startDateDateTime = new Date(startDate);
            if (now > startDateDateTime) {
                inTimeRange = true; 
            } else {
                inTimeRange = false;
            }
        } else if (startDate && endDate) {
            const startDateDateTime = new Date(startDate);
            const endDateDateTime = new Date(endDate + ' 23:59:00');
            if (now > startDateDateTime && now < endDateDateTime) {
                inTimeRange = true; 
            } else {
                inTimeRange = false;
            }         
        } else if (!startDate && endDate) {
            const endDateDateTime = new Date(endDate + ' 23:59:00');
            if (now < endDateDateTime) {
            inTimeRange = true; 
            } else {
            inTimeRange = false;
            }
        } else if (!startDate && !endDate) {
            inTimeRange = true; 
        }
    
        if (isSingleDayReoccuring && daysForSingleDayReoccuring) {
            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            var singleDayReoccuringDayIndexes = [];
            daysForSingleDayReoccuring.forEach((element) => {
            singleDayReoccuringDayIndexes.push(days.indexOf(element.toLowerCase()));
        });
            const dateDay = now.getDay();
            if (singleDayReoccuringDayIndexes.includes(dateDay)) {
                inDayRange = true;
            } else {
                inDayRange = false;
            }
        } else {
            inDayRange = true;  
        }

        if (inTimeRange && inDayRange) {
            currentPopUp = kbKey
        }
    }
    
    function lineBreakTextArea(text, html = '') {
        if (text.includes('&#xd;')){
            html = text.replace(/&#xd;/g, '<br><span>');
            html += '</span>'
        } else {
            html = text;
        }

        return html;
    }
    
    if (inTimeRange && inDayRange) {
        // image
        const imageUrl = json['popup'][currentPopUp].image.path; 
        const imageAltTxt = json['popup'][currentPopUp].imageAltText;
        const imageAriaLabel = json['popup'][currentPopUp].imageAriaLabel; 
        
        // headline 
        var headline = lineBreakTextArea(json['popup'][currentPopUp].headline);
        // sub headline 
        const subheadline = lineBreakTextArea(json['popup'][currentPopUp].subHeadline);
        
        // cta buttons 
        var singleButton = false; 
        var singleBtnTxt = '';
        var singleBtnUrl = '';
        var doubleBtnOneTxt = '';
        var doubleBtnTwoTxt = '';
        var doubleBtnOneUrl = '';
        var doubleBtnTwoUrl = '';
        var isVerticalLayout = false; 
        var doubleVerticalBtnOneTxt = '';
        var doubleVerticalBtnTwoTxt = '';
        
        if (json['popup'][currentPopUp].buttonGroup.button.length === undefined || json['popup'][currentPopUp].buttonGroup.button.length < 2) {
            singleButton = true;
            singleBtnTxt = json['popup'][currentPopUp].buttonGroup.button.buttonText; // string, ex. 'Order Now'; 
            var singleBtnUrl = json['popup'][currentPopUp].buttonGroup.button.buttonLink; // string, ex. 'https://order.example.com/'; 
        } else {
            doubleBtnOneTxt = json['popup'][currentPopUp].buttonGroup.button[0].buttonText; // string, ex. 'Delivery'; 
            doubleBtnTwoTxt = json['popup'][currentPopUp].buttonGroup.button[1].buttonText; // string, ex. 'Pickup'; 
            doubleBtnOneUrl = json['popup'][currentPopUp].buttonGroup.button[0].buttonLink; // string, ex. 'https://order.example.com/'; 
            doubleBtnTwoUrl = json['popup'][currentPopUp].buttonGroup.button[1].buttonLink; // string, ex. 'https://order.example.com/'; 
            isVerticalLayout = false; // false if buttons are horizontal, boolean, ex. true (no quotes around true or false) 
        if (json['popup'][currentPopUp].buttonLayout != 'horizontal') {
            isVerticalLayout = true;
            doubleVerticalBtnOneTxt = json['popup'][currentPopUp].buttonGroup.button[0].buttonText; // string, ex. 'Delivery';
            doubleVerticalBtnTwoTxt = json['popup'][currentPopUp].buttonGroup.button[1].buttonText; // string, ex. 'Pickup';
        }
        }
        
        // disclaimer
        var disclaimer = json['popup'][currentPopUp].disclaimerDisplay;
        const disclaimerTxt = json['popup'][currentPopUp].disclaimerGroup.disclaimerText;
        const disclaimerExpandable = json['popup'][currentPopUp].disclaimerExpandable;
        
        // page path rules 
        const excludeContainsPath = json['popup'][currentPopUp].pathsGroup.excludeContainsPath; // string, ex. '/menu/restaurant/'; 
        const includeContainsPath = json['popup'][currentPopUp].pathsGroup.includeContainsPath; // string, ex. '/menu/';  
        const globalRegexPath = json['popup'][currentPopUp].pathsGroup.globalRegexPath; // string of global regex, ex. 'menu|locations' to include strings, or '^((?!(catering|legal|apply\=1)).)*$' to exclude strings; 
        
        // page path checks
        const pageHref = window.location.href;
        var passContainsPagePath = false;
        var passContainsRegexPath = false;
        
        if (!excludeContainsPath && !includeContainsPath) {
            passContainsPagePath = true; 
        } else if (excludeContainsPath && !includeContainsPath) {
            passContainsPagePath = !pageHref.includes(excludeContainsPath);
        } else if (!excludeContainsPath && includeContainsPath) {
            passContainsPagePath = pageHref.includes(includeContainsPath);
        } else if (excludeContainsPath && includeContainsPath) {
            passContainsPagePath = !pageHref.includes(excludeContainsPath) && pageHref.includes(includeContainsPath);
        }
        
        if (globalRegexPath) {
            newGlobalRegexPath = new RegExp(globalRegexPath, 'g');
            passContainsRegexPath = newGlobalRegexPath.test(pageHref);
        } else {
            passContainsRegexPath = true;
        }
        
        var popupHTML = '';
        popupHTML += '<div aria-hidden="false" class="dwmodal dwmodal-show-modal"><div class="dwmodal-box" role="alertdialog" aria-modal="true" aria-labelledby="dwmodal-label-span dwmodal-dialog-label" aria-describedby="dwmodal-dialog-desc"><span id="dwmodal-label-span">something special from us</span><div><img src="https://www.planetsmoothie.com/assets/images/popups/popup.jpg" alt="' + imageAltTxt + '" class="dwmodal-image"></img></div><div><h2>' + headline + '</h2><p class="subHeadline">' + subheadline + '</p><div class="dwmodal-wrapper">';
        if (singleButton) {
            popupHTML += '<a class="btn" aria-describedby="dwmodal-disclaimer-text" href="'+ singleBtnUrl + '">' + singleBtnTxt + '</a>';
        } else {
            if (isVerticalLayout) {
                popupHTML += '<div class="dwmodal-vertical-button-wrapper"><a class="btn" aria-describedby="dwmodal-disclaimer-text" href="' + doubleBtnOneUrl + '">' + doubleVerticalBtnOneTxt + '</a><a class="btn" aria-describedby="dwmodal-disclaimer-text" href="' + doubleBtnTwoUrl + '">' + doubleVerticalBtnTwoTxt + '</a></div>';
            } else {
                popupHTML += '<a class="btn" aria-describedby="dwmodal-disclaimer-text" href="' + doubleBtnOneUrl + '">' + doubleBtnOneTxt + '</a><a class="btn" aria-describedby="dwmodal-disclaimer-text" href="' + doubleBtnTwoUrl + '">' + doubleBtnTwoTxt + '</a>';
            }
        }
        popupHTML += '</div>';
        
        if (disclaimer) {
            popupHTML += '<div class="dwmodal-disclaimer">';
                if (disclaimerExpandable) {
                    popupHTML += '<button class="dwmodal-disclaimer-button">View Offer Details</button>';
                }
            popupHTML += '<span id="dwmodal-disclaimer-text">' + disclaimerTxt + '</span></div>'
        }
        
        popupHTML += '<button aria-label="close ' + headline + '" class="dwmodal-close-button"><svg alt="close" aria-label="close" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div></div></div>'

        // html
        //window.addEventListener("load",e=>{
            //var body = document.getElementById("popup");
            //body.innerHTML = popupHTML;
            //var test = document.getElementsByClassName("kbPopup");
            //test.insertAdjacentHTML('afterbegin',popupHTML);
            document.querySelector("#kbPopup").insertAdjacentHTML('afterbegin',popupHTML);
            
        //});
        
       // display logic 
        //window.addEventListener("load",e=>{
            var modal = document.querySelector(".dwmodal");
            var modalBox = document.querySelector(".dwmodal-box");
            var closeButton = document.querySelector(".dwmodal-close-button");
            
            function toggleModal(sticky) {
                modal.classList.toggle("dwmodal-show-modal");
                modal.ariaHidden == "true" ? modal.ariaHidden = "false" : modal.ariaHidden = "true";
                modalBox.focus();
                sessionStorage.setItem('modalFired', 'true');
                sticky;
            }
            function windowOnClick(event) {
                if (event.target === modal) {
                    toggleModal(true);
                }
            }  
            
            closeButton.addEventListener("click", () => toggleModal(true));
            window.addEventListener("click", windowOnClick);
            if (sessionStorage.getItem('modalFired') && inTimeRange && inDayRange && passContainsPagePath && passContainsRegexPath) {
                toggleModal(false);
            };
            
            // accessibility 
            const focusableElements = 'button, [href], a, [tabindex]:not([tabindex="-1"])';
            //window.addEventListener("load",e=>{
                const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; 
                const secondFocusableElement = modal.querySelectorAll(focusableElements)[1];
                const focusableContent = modal.querySelectorAll(focusableElements);
                const lastFocusableElement = focusableContent[focusableContent.length - 1]; 
            //});
            
            document.addEventListener('keydown', function(e) {
                let isTabPressed = e.key === 'Tab' || e.code === 'Tab';
                let isEscPressed = e.key === 'Escape' || e.code === 'Escape';
                if (isEscPressed) {
                toggleModal();
                return;
                } else if (!isTabPressed) {
                return;
                }
                if (e.shiftKey) { 
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus(); 
                    
                }
                } else { 
                if (document.activeElement === lastFocusableElement) { 
                    e.preventDefault();
                    firstFocusableElement.focus(); 
                }
                }
            });
        //});
    }
}

