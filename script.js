// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCR6pogNfCUJSradGjPYIRc1_LJuDc2GoM",
    authDomain: "logstic-system-5fcac.firebaseapp.com",
    databaseURL: "https://logstic-system-5fcac-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "logstic-system-5fcac",
    storageBucket: "logstic-system-5fcac.firebasestorage.app",
    messagingSenderId: "1048996922654",
    appId: "1:1048996922654:web:9a2cc5abf5bfc43e68b50f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Admin credentials updated
const ADMIN_USERNAME = "jack";
const ADMIN_PASSWORD = "33355555";

// Page Routing Check
const currentPage = window.location.pathname.split("/").pop();

let doubleClickCount = 0;
let doubleClickTimer;

if (currentPage === "index.html" || currentPage === "" || !currentPage.includes("admin")) {
    initializeIndexPage();
} else if (currentPage.includes("admin")) {
    initializeAdminPage();
}

function initializeIndexPage() {
    const trackingNumberInput = document.getElementById('trackingNumber');
    const confirmationCodeInput = document.getElementById('confirmationCode');
    const trackButton = document.getElementById('trackButton');
    const resultSection = document.getElementById('resultSection');
    const errorMessage = document.getElementById('errorMessage');
    const adminText = document.getElementById('adminText');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close');
    const loginButton = document.getElementById('loginButton');
    const newSearchButton = document.getElementById('newSearchButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    if (adminText) {
        adminText.addEventListener('click', handleDoubleClick);
    }

    function handleDoubleClick() {
        doubleClickCount++;
        if (doubleClickCount === 1) {
            doubleClickTimer = setTimeout(() => { doubleClickCount = 0; }, 300);
        } else if (doubleClickCount === 2) {
            clearTimeout(doubleClickTimer);
            doubleClickCount = 0;
            openLoginModal();
        }
    }

    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const trackingParam = urlParams.get('tracking');
        const codeParam = urlParams.get('code');
        
        if (trackingParam && codeParam) {
            trackingNumberInput.value = trackingParam;
            confirmationCodeInput.value = codeParam;
            setTimeout(() => {
                if (trackButton) trackButton.click();
            }, 300);
        }
    }

    async function trackShipment() {
        const trackingNumber = trackingNumberInput.value.trim().toUpperCase();
        const confirmationCode = confirmationCodeInput.value.trim().toUpperCase();

        errorMessage.style.display = 'none';
        resultSection.style.display = 'none';

        if (!trackingNumber || !confirmationCode) {
            showError("Please enter both tracking number and confirmation code.");
            return;
        }

        try {
            trackButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
            trackButton.disabled = true;

            const shipmentRef = database.ref('shipments/' + trackingNumber);
            const snapshot = await shipmentRef.once('value');

            if (!snapshot.exists()) {
                showError("Shipment not found. Please check your tracking number.");
                resetTrackBtn();
                return;
            }

            const shipment = snapshot.val();

            if (!shipment.confirmationCode || shipment.confirmationCode !== confirmationCode) {
                showError("Invalid confirmation code. Please check and try again.");
                resetTrackBtn();
                return;
            }

            displayShipmentInfo(shipment, trackingNumber);
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            shipmentRef.on('value', (snap) => {
                if (snap.exists()) displayShipmentInfo(snap.val(), trackingNumber);
            });

            resetTrackBtn();
        } catch (error) {
            showError("An error occurred while tracking your shipment.");
            resetTrackBtn();
        }
    }

    function resetTrackBtn() {
        trackButton.innerHTML = '<i class="fas fa-search"></i> Track Shipment';
        trackButton.disabled = false;
    }

    function displayShipmentInfo(shipment, trackingNumber) {
        document.getElementById('displayTrackingNumber').textContent = trackingNumber;
        document.getElementById('displayStatus').textContent = shipment.status || 'Pending';
        document.getElementById('displayOrigin').textContent = shipment.origin || 'Not specified';
        document.getElementById('displayDestination').textContent = shipment.destination || 'Not specified';
        document.getElementById('displayConfirmationCode').textContent = shipment.confirmationCode || 'N/A';
        document.getElementById('displaySenderName').textContent = shipment.sender?.name || 'Not specified';
        document.getElementById('displayReceiverName').textContent = shipment.receiver?.name || 'Not specified';
        document.getElementById('displayReceiverAddress').textContent = shipment.receiver?.address || 'Not specified';
        document.getElementById('displayReceiverPhone').textContent = shipment.receiver?.phone || 'Not specified';
        
        const timelineElement = document.getElementById('trackingTimeline');
        timelineElement.innerHTML = '';
        
        const trackingHistory = shipment.trackingHistory || [];
        const sortedHistory = [...trackingHistory].reverse();
        
        sortedHistory.forEach((event) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-date">${event.date || ''}</div>
                <div class="timeline-content">${event.description || ''}</div>
                <div class="timeline-location">${event.location || ''}</div>
            `;
            timelineElement.appendChild(timelineItem);
        });
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function openLoginModal() {
        loginModal.style.display = 'block';
        usernameInput.value = '';
        passwordInput.value = '';
    }

    function closeLoginModal() {
        loginModal.style.display = 'none';
    }

    function loginToAdmin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        usernameError.textContent = '';
        passwordError.textContent = '';
        
        let hasError = false;
        if (username !== ADMIN_USERNAME) {
            usernameError.textContent = "Incorrect username";
            hasError = true;
        }
        if (password !== ADMIN_PASSWORD) {
            passwordError.textContent = "Incorrect password";
            hasError = true;
        }
        
        if (!hasError) {
            localStorage.setItem('sfAdminAuth', 'true');
            localStorage.setItem('sfAdminLoginTime', Date.now());
            window.location.href = 'admin.html';
        }
    }

    if (trackButton) trackButton.addEventListener('click', trackShipment);
    if (newSearchButton) newSearchButton.addEventListener('click', () => {
        resultSection.style.display = 'none';
        trackingNumberInput.value = '';
        confirmationCodeInput.value = '';
    });
    if (closeModal) closeModal.addEventListener('click', closeLoginModal);
    if (loginButton) loginButton.addEventListener('click', loginToAdmin);

    window.addEventListener('load', () => {
        checkUrlParams();
    });
}

function initializeAdminPage() {
    if (!checkAdminAuth()) return;

    const shippingForm = document.getElementById('shippingForm');
    const shippingTableBody = document.getElementById('shippingTableBody');
    const addShippingTab = document.getElementById('addShippingTab');
    const manageShippingTab = document.getElementById('manageShippingTab');
    const addShippingContent = document.getElementById('addShippingContent');
    const manageShippingContent = document.getElementById('manageShippingContent');
    const logoutBtn = document.getElementById('logoutBtn');

    function generateTrackingNumber() {
        return 'SF' + Math.floor(100000000 + Math.random() * 900000000);
    }

    function generateConfirmationCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
        return code;
    }

    async function addShipping(event) {
        event.preventDefault();
        
        const senderName = document.getElementById('senderName').value.trim();
        const receiverName = document.getElementById('receiverName').value.trim();
        const receiverAddress = document.getElementById('receiverAddress').value.trim();
        const receiverPhone = document.getElementById('receiverPhone').value.trim();
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;

        if (origin === destination) {
            alert('Origin and destination cannot be the same.');
            return;
        }

        const trackingNumber = generateTrackingNumber();
        const confirmationCode = generateConfirmationCode();
        const timestamp = new Date().toISOString();

        const shipmentData = {
            trackingNumber: trackingNumber,
            confirmationCode: confirmationCode,
            sender: { name: senderName },
            receiver: { name: receiverName, address: receiverAddress, phone: receiverPhone },
            origin: origin,
            destination: destination,
            status: 'Pending Pickup',
            createdAt: timestamp,
            updatedAt: timestamp,
            trackingHistory: [{
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                description: 'Shipment created and registered in system',
                location: origin
            }]
        };

        try {
            await database.ref('shipments/' + trackingNumber).set(shipmentData);
            shippingForm.reset();
            const userConfirmed = confirm(`Shipment added successfully!\nTracking Number: ${trackingNumber}\nConfirmation Code: ${confirmationCode}\nGenerate QR code now?`);
            if (userConfirmed) {
                generateQRCode(trackingNumber, confirmationCode, receiverName);
            }
        } catch (error) {
            alert('Error adding shipment.');
        }
    }

    async function loadShipments() {
        try {
            const snapshot = await database.ref('shipments').once('value');
            const shipments = snapshot.val();
            shippingTableBody.innerHTML = '';
            
            if (!shipments) return;
            
            const shipmentsArray = Object.entries(shipments).map(([trackingNumber, shipment]) => ({
                trackingNumber,
                ...shipment
            })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            shipmentsArray.forEach((shipment) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${shipment.trackingNumber}</strong><br><small>Code: ${shipment.confirmationCode}</small></td>
                    <td>${shipment.sender?.name || 'N/A'}</td>
                    <td><strong>${shipment.receiver?.name || 'N/A'}</strong></td>
                    <td>${shipment.receiver?.phone || 'N/A'}</td>
                    <td>${shipment.origin || 'N/A'}</td>
                    <td>${shipment.destination || 'N/A'}</td>
                    <td><span class="status">${shipment.status || 'Pending'}</span></td>
                    <td>${new Date(shipment.createdAt).toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="showUpdateModal('${shipment.trackingNumber}')">Update</button>
                        <button class="btn btn-secondary btn-sm" onclick="generateQRCode('${shipment.trackingNumber}', '${shipment.confirmationCode}', '${shipment.receiver?.name || ''}')">QR Code</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteShipment('${shipment.trackingNumber}')">Delete</button>
                    </td>
                `;
                shippingTableBody.appendChild(row);
            });
        } catch (error) {
            console.error(error);
        }
    }

    window.generateQRCode = function(trackingNumber, confirmationCode, receiverName) {
        document.getElementById('qrTrackingNumber').textContent = trackingNumber;
        document.getElementById('qrConfirmationCode').textContent = confirmationCode;
        document.getElementById('qrReceiverName').textContent = receiverName || 'N/A';
        
        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
        const trackingUrl = `${baseUrl}index.html?tracking=${trackingNumber}&code=${confirmationCode}`;
        
        document.getElementById('qrcode').innerHTML = '';
        new QRCode(document.getElementById('qrcode'), {
            text: trackingUrl,
            width: 180,
            height: 180,
            colorDark: "#f25c27",
            colorLight: "#ffffff"
        });
        
        document.getElementById('qrCodeModal').style.display = 'block';
        window.currentQRData = { trackingNumber, url: trackingUrl };
    };

    window.closeQRModal = function() {
        document.getElementById('qrCodeModal').style.display = 'none';
    };

    window.downloadQRCode = function() {
        const canvas = document.querySelector('#qrcode canvas');
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `QR_${window.currentQRData.trackingNumber}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    window.deleteShipment = async function(trackingNumber) {
        if (confirm(`Delete shipment ${trackingNumber}?`)) {
            await database.ref('shipments/' + trackingNumber).remove();
            loadShipments();
        }
    };

    window.showUpdateModal = async function(trackingNumber) {
        const snapshot = await database.ref('shipments/' + trackingNumber).once('value');
        const shipment = snapshot.val();
        if (!shipment) return;
        
        const status = prompt("Enter new status (e.g., In Transit, Customs Clearance, Delivered):", shipment.status);
        const location = prompt("Enter current location:", shipment.origin);
        
        if (status && location) {
            const newEvent = {
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                description: `Status updated to: ${status}`,
                location: location
            };
            
            await database.ref('shipments/' + trackingNumber).update({
                status: status,
                updatedAt: new Date().toISOString(),
                trackingHistory: [...(shipment.trackingHistory || []), newEvent]
            });
            
            loadShipments();
        }
    };

    addShippingTab.addEventListener('click', () => {
        addShippingTab.classList.add('active');
        manageShippingTab.classList.remove('active');
        addShippingContent.classList.add('active');
        manageShippingContent.classList.remove('active');
    });

    manageShippingTab.addEventListener('click', () => {
        manageShippingTab.classList.add('active');
        addShippingTab.classList.remove('active');
        manageShippingContent.classList.add('active');
        addShippingContent.classList.remove('active');
        loadShipments();
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('sfAdminAuth');
            window.location.href = 'index.html';
        });
    }

    if (shippingForm) shippingForm.addEventListener('submit', addShipping);
}

function checkAdminAuth() {
    const isAuthenticated = localStorage.getItem('sfAdminAuth') === 'true';
    if (!isAuthenticated) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}