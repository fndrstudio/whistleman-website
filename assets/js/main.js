(function() {
  "use strict";

  /**
   * Throttle utility - limits function execution to once per specified interval
   * Used for performance optimization on scroll/resize handlers
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return; // Exit if #header does not exist
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', throttle(toggleScrolled, 16));
  window.addEventListener('load', toggleScrolled);

  document.addEventListener('DOMContentLoaded', function() {
    new PureCounter();
  });


  document.addEventListener("DOMContentLoaded", function () {
    const pills = document.querySelectorAll(".pill-toggle a");
    const statsContainers = document.querySelectorAll(".stats");
  
    pills.forEach(pill => {
      pill.addEventListener("click", function (event) {
        event.preventDefault();
  
        // Remove 'active' class from all pills and hide all stats
        pills.forEach(p => p.classList.remove("active"));
        statsContainers.forEach(container => container.style.display = "none");
  
        // Add 'active' class to the clicked pill and show the corresponding stats
        this.classList.add("active");
        const targetId = this.getAttribute("data-target");
        document.getElementById(targetId).style.display = "flex";
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.cards-portfolio .container .row');
    const scrollLeftButton = document.querySelector('.scroll-left');
    const scrollRightButton = document.querySelector('.scroll-right');

    // Set the scroll amount
    const scrollAmount = 300; // How much to scroll with each click

    // Scroll left functionality
    scrollLeftButton.addEventListener('click', () => {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    // Scroll right functionality
    scrollRightButton.addEventListener('click', () => {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.cards .container .row');
    const scrollLeftButton = document.querySelector('.scroll-left');
    const scrollRightButton = document.querySelector('.scroll-right');

    // Set the scroll amount
    const scrollAmount = 300; // How much to scroll with each click

    // Scroll left functionality
    scrollLeftButton.addEventListener('click', () => {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    // Scroll right functionality
    scrollRightButton.addEventListener('click', () => {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  });
  
  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all DOM elements
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');
    const backBtn = document.querySelector('.back-btn');
    const successCloseBtn = document.querySelector('.success-close');
    const showFormBtn = document.querySelector('.show-form-btn');
    const subscribeButton = document.getElementById('subscribe-button');
    const downloadForm = document.getElementById('download-form');
    
    const initialContent = document.getElementById('initial-content');
    const formContent = document.getElementById('form-content');
    const successContent = document.getElementById('success-content');
    
    // Dragging variables
    let isDragging = false;
    let currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
    const popupContent = document.querySelector('.balloon-content');
    
    // Show the popup after a short delay
    setTimeout(function() {
        if (popup) {
            popup.style.display = 'block';
            popup.classList.add('balloon-entrance');
            
            // Add a gentle bounce effect after entrance
            setTimeout(function() {
                popup.style.animation = 'floatUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            }, 800);
        }
    }, 1500);
    
    // Close button functionality
    function closePopup() {
        popup.classList.remove('balloon-entrance');
        popup.classList.add('balloon-exit');
        
        setTimeout(function() {
            popup.style.display = 'none';
        }, 500);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', closePopup);
    }
    
    // Close popup when clicking outside
    // document.addEventListener('click', function(event) {
    //     if (popup && popup.style.display !== 'none' && 
    //         !popup.contains(event.target) && 
    //         !event.target.classList.contains('show-form-btn') && 
    //         !event.target.classList.contains('final-download-btn') && 
    //         !event.target.classList.contains('subscribe-btn') &&
    //         !event.target.classList.contains('download-btn')) {
    //         closePopup();
    //     }
    // });
    
    // Show form when "Download Now" button is clicked
    if (showFormBtn) {
        showFormBtn.addEventListener('click', function() {
            showFormDirectly();
        });
    }
    
    // Go back to initial content
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            formContent.style.animation = 'slideOutRight 0.5s ease forwards';
            
            setTimeout(function() {
                formContent.style.display = 'none';
                initialContent.style.display = 'block';
                initialContent.style.animation = 'slideInLeft 0.5s ease forwards';
            }, 250);
        });
    }
    
    // Handle form submission with Web3Forms
    if (downloadForm) {
        downloadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            
            // Basic validation
            if (!name || !email || !company) {
                showError('Please fill in all required fields (marked with *)');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Show loading state
            const submitBtn = downloadForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            try {
                // Prepare form data for Web3Forms
                const formData = new FormData(downloadForm);
                formData.append('submission_time', new Date().toISOString());
                formData.append('source', 'website_popup');
                
                // Send to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (response.status === 200 && result.success) {
                    // Success - show success message
                    formContent.style.animation = 'fadeOut 0.5s ease forwards';
                    
                    setTimeout(function() {
                        formContent.style.display = 'none';
                        successContent.style.display = 'block';
                        successContent.style.animation = 'fadeIn 0.5s ease forwards';
                        
                        // Reset form button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Auto-open download link after 2 seconds
                        setTimeout(function() {
                            window.open('https://drive.google.com/file/d/1EL1ZZ8dnxT_-eR0f1Un-oidhAw0O2XDn/view?usp=drive_link', '_blank');
                        }, 2000);
                    }, 250);
                } else {
                    // Error from Web3Forms
                    console.error('Form submission error:', result.message);
                    showError('Submission failed. Please try again or contact support.');
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                // Network error
                console.error('Network error:', error);
                showError('Network error. Please check your connection and try again.');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Helper function to show error messages
    function showError(message) {
        // Remove any existing errors first
        const existingError = document.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        // Create error display using safe DOM methods
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';

        const innerDiv = document.createElement('div');
        innerDiv.style.cssText = 'background: #ffebee; color: #c62828; padding: 10px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #c62828; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;';

        const icon = document.createElement('i');
        icon.className = 'fas fa-exclamation-circle';

        const text = document.createElement('span');
        text.textContent = message;  // Safe: textContent escapes HTML

        innerDiv.appendChild(icon);
        innerDiv.appendChild(text);
        errorDiv.appendChild(innerDiv);

        // Insert error at the top of the form
        if (downloadForm.firstChild) {
            downloadForm.insertBefore(errorDiv, downloadForm.firstChild);
        } else {
            downloadForm.appendChild(errorDiv);
        }

        // Add animation
        errorDiv.style.animation = 'slideDown 0.3s ease';

        // Auto-remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Handle subscribe button click
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function() {
            // Reset popup to initial state if it was closed
            popup.style.display = 'block';
            ensurePopupVisible();
            
            // Show form directly
            showFormDirectly();
        });
    }
    
    // Helper function to show form directly (bypassing initial content)
    function showFormDirectly() {
        initialContent.style.animation = 'slideOutLeft 0.5s ease forwards';
        
        setTimeout(function() {
            initialContent.style.display = 'none';
            formContent.style.display = 'block';
            formContent.style.animation = 'slideInRight 0.5s ease forwards';
            ensurePopupVisible();
        }, 250);
    }
    
    // Helper function to ensure popup is visible and properly positioned
    function ensurePopupVisible() {
        if (!popup) return;
        
        // Bring popup to front if needed
        popup.style.zIndex = '1000000';
        
        // Make sure it's in the correct position
        popup.style.bottom = '10%';
        popup.style.right = '2%';
        
        // Remove exit animation if present
        popup.classList.remove('balloon-exit');
        popup.classList.add('balloon-entrance');
    }
    
    // Make popup draggable on desktop
    if (window.innerWidth > 768 && popupContent) {
        popupContent.addEventListener('mousedown', dragStart);

        // Prevent dragging on buttons
        const noDragElements = [closeBtn, showFormBtn, document.querySelector('.download-btn'),
                              document.querySelector('.submit-btn'), document.querySelector('.final-download-btn')];

        noDragElements.forEach(element => {
            if (element) {
                element.addEventListener('mousedown', function(e) {
                    e.stopPropagation();
                });
            }
        });
    }

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === popupContent || e.target.classList.contains('balloon-header')) {
            isDragging = true;
            // Add document listeners only when dragging starts (prevents memory leaks)
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            popup.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
    }

    function dragEnd() {
        if (isDragging) {
            isDragging = false;
            // Clean up document listeners to prevent memory leaks
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', dragEnd);
        }
    }
    
    // Add animation keyframes
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes slideOutLeft {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-20px); }
        }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(20px); }
        }
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.95); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);
});