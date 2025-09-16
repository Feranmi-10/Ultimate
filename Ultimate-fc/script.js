
        // Initialize EmailJS with your user ID
        (function() {
            emailjs.init("WkpSexO7J3fPkNJ3S"); // Replace with your actual EmailJS user ID
        })();
        
        // // Initialize map
        // function initMap() {
        //     // Coordinates for the stadium (example: Old Trafford)
        //     const stadium = [6.609052136400239, 3.2690811816661554];
            
        //     const map = L.map('stadium-map').setView(stadium, 15);
            
        //     L.tileLayer('https://maps.app.goo.gl/Yt28Q2XJvPnjUTrg6', {
        //         attribution: '&copy; <a href="https://maps.app.goo.gl/Yt28Q2XJvPnjUTrg6">AbesanStreet</a> contributors'
        //     }).addTo(map);
            
        //     L.marker(stadium).addTo(map)
        //         .bindPopup('Abesan MINI Stadium<br>Home of the STARS')
        //         .openPopup();
        // }
        
        // Initialize map when page loads
        window.onload = function() {
            initMap();
            
            // Form validation and submission
            document.getElementById('signup-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for signing up! A verification code has been sent to your phone.');
                // Here you would integrate with EmailJS and SMS service
            });
            
            document.getElementById('signin-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Welcome back! You are now signed in.');
            });
            
            document.getElementById('registration-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Registration submitted successfully! We will contact you soon.');
                // Here you would integrate with EmailJS to send the form data
            });
        };

                // Comment form functionality
        document.getElementById('commentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('commentName');
            const commentInput = document.getElementById('commentText');
            
            if (nameInput.value.trim() === '' || commentInput.value.trim() === '') {
                alert('Please fill in both fields');
                return;
            }
            
            // Create new comment
            const commentsList = document.getElementById('commentsList');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            
            // Get current date
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateString = now.toLocaleDateString('en-US', options);
            
            // Create avatar from initials
            const names = nameInput.value.split(' ');
            let initials = '';
            if (names.length === 1) {
                initials = names[0].charAt(0);
            } else {
                initials = names[0].charAt(0) + names[names.length - 1].charAt(0);
            }
            
            newComment.innerHTML = `
                <div class="comment-header">
                    <div class="comment-avatar">${initials.toUpperCase()}</div>
                    <div class="comment-author">${nameInput.value}</div>
                    <div class="comment-date">${dateString}</div>
                </div>
                <div class="comment-content">
                    <p>${commentInput.value}</p>
                </div>
            `;
            
            // Add new comment to the top of the list
            commentsList.insertBefore(newComment, commentsList.firstChild);
            
            // Clear form
            nameInput.value = '';
            commentInput.value = '';
            
            // Show confirmation
            alert('Thanks for your comment!');
        });



           document.addEventListener('DOMContentLoaded', function() {
            // Gallery functionality
            const slides = document.querySelectorAll('.gallery-slide');
            const dots = document.querySelectorAll('.gallery-dot');
            const prevBtn = document.querySelector('.gallery-control.prev');
            const nextBtn = document.querySelector('.gallery-control.next');
            let currentSlide = 0;
            let slideInterval;

            // Function to show a specific slide
            function showSlide(n) {
                // Remove active class from all slides and dots
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Adjust currentSlide index if out of bounds
                if (n >= slides.length) currentSlide = 0;
                if (n < 0) currentSlide = slides.length - 1;
                else currentSlide = n;
                
                // Add active class to current slide and dot
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }

            // Function to move to next slide
            function nextSlide() {
                showSlide(currentSlide + 1);
            }

            // Function to start automatic slideshow
            function startSlideShow() {
                slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
            }

            // Function to stop automatic slideshow
            function stopSlideShow() {
                clearInterval(slideInterval);
            }

            // Event listeners for controls
            nextBtn.addEventListener('click', () => {
                stopSlideShow();
                nextSlide();
                startSlideShow();
            });

            prevBtn.addEventListener('click', () => {
                stopSlideShow();
                showSlide(currentSlide - 1);
                startSlideShow();
            });

            // Event listeners for dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    stopSlideShow();
                    showSlide(index);
                    startSlideShow();
                });
            });

            // Pause slideshow when hovering over gallery
            const gallery = document.querySelector('.gallery-container');
            gallery.addEventListener('mouseenter', stopSlideShow);
            gallery.addEventListener('mouseleave', startSlideShow);

            // Start the slideshow
            startSlideShow();
        });


// COMMENT SECTION

   
   // Show notification function
        function showNotification(message, type) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = 'notification ' + type;
            
            setTimeout(() => {
                notification.className = 'notification';
            }, 3000);
        }

        // Load comments from localStorage
        function loadComments() {
            const commentsList = document.getElementById('commentsList');
            const comments = JSON.parse(localStorage.getItem('footballComments')) || [];
            
            if (comments.length === 0) {
                commentsList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-comments"></i>
                        <h3>No comments yet</h3>
                        <p>Be the first to share your thoughts about our team!</p>
                    </div>
                `;
                return;
            }
            
            commentsList.innerHTML = '';
            
            comments.forEach((comment, index) => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                
                // Create avatar from initials
                const names = comment.name.split(' ');
                let initials = '';
                if (names.length === 1) {
                    initials = names[0].charAt(0);
                } else {
                    initials = names[0].charAt(0) + names[names.length - 1].charAt(0);
                }
                
                commentElement.innerHTML = `
                    <div class="comment-header">
                        <div class="comment-avatar">${initials.toUpperCase()}</div>
                        <div class="comment-author">${comment.name}</div>
                        <div class="comment-date">${comment.date}</div>
                    </div>
                    <div class="comment-content">
                        <p>${comment.text}</p>
                    </div>
                    <div class="comment-actions">
                        <button onclick="deleteComment(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                commentsList.appendChild(commentElement);
            });
        }

        // Delete a comment
        function deleteComment(index) {
            const comments = JSON.parse(localStorage.getItem('footballComments')) || [];
            comments.splice(index, 1);
            localStorage.setItem('footballComments', JSON.stringify(comments));
            loadComments();
            showNotification('Comment deleted successfully', 'success');
        }

        // Add a new comment
        document.getElementById('commentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('commentName');
            const commentInput = document.getElementById('commentText');
            
            if (nameInput.value.trim() === '' || commentInput.value.trim() === '') {
                showNotification('Please fill in both fields', 'error');
                return;
            }
            
            // Create new comment
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const dateString = now.toLocaleDateString('en-US', options);
            
            const newComment = {
                name: nameInput.value,
                text: commentInput.value,
                date: dateString
            };
            
            // Save to localStorage
            const comments = JSON.parse(localStorage.getItem('footballComments')) || [];
            comments.unshift(newComment); // Add to beginning of array
            localStorage.setItem('footballComments', JSON.stringify(comments));
            
            // Reload comments
            loadComments();
            
            // Clear form
            nameInput.value = '';
            commentInput.value = '';
            
            // Show confirmation
            showNotification('Thanks for your comment!', 'success');
        });

        // Load comments when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadComments();
            
            // Add some sample comments if none exist
            const comments = JSON.parse(localStorage.getItem('footballComments')) || [];
            if (comments.length === 0) {
                const sampleComments = [
                    {
                        name: "John Doe",
                        text: "What an amazing performance last weekend! The team showed great character coming back from being 2-0 down. Osas's hat-trick was incredible!",
                        date: "June 10, 2025, 02:30 PM"
                    },
                    {
                        name: "Sarah Miller",
                        text: "I've been a fan for over 5 years, and this is one of the most exciting teams we've had. The young players are really stepping up. Future looks bright!",
                        date: ", 2023, 10:15 AM"
                    },
                    {
                        name: "Robert Johnson",
                        text: "Can't wait for the derby match next week. We need all the support we can get at the stadium. Let's pack the stands and show our support!",
                        date: "September 9, 2023, 04:45 PM"
                    }
                ];
                
                localStorage.setItem('footballComments', JSON.stringify(sampleComments));
                loadComments();
            }
        });