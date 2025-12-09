  const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                const accordionContent = accordionItem.querySelector('.accordion-content');
                const accordionIcon = this.querySelector('.accordion-icon');
                const isActive = accordionContent.style.maxHeight !== '0px' && accordionContent.style.maxHeight !== '';
                
                // Toggle the clicked item
                if (isActive) {
                    accordionContent.style.maxHeight = '0';
                    accordionIcon.style.transform = 'rotate(0deg)';
                } else {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                    accordionIcon.style.transform = 'rotate(180deg)';
                }
            });
        });