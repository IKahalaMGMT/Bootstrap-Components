// accessibility tab trap on mobile menu
window.addEventListener("load",e=>{
    var mobileNavToggle = document.querySelector(".navbar-toggler");
    if (mobileNavToggle.length) {
        mobileNavToggle.addEventListener("click", function() { 
            var nav = document.querySelector(".navbar");
            const focusableElements = 'button, [href], a, [tabindex]:not([tabindex="-1"])';
            const firstFocusableElement = nav.querySelectorAll(focusableElements)[0]; 
            const secondFocusableElement = nav.querySelectorAll(focusableElements)[1];
            const focusableContent = nav.querySelectorAll(focusableElements);
            const lastFocusableElement = focusableContent[focusableContent.length - 1]; 

            document.addEventListener('keydown', function(e) {
                let isTabPressed = e.key === 'Tab' || e.code === 'Tab';
                let isEscPressed = e.key === 'Escape' || e.code === 'Escape';
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
        });
    }
  });