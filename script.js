const firebaseConfig = {
  apiKey: "AIzaSyAdHq_2wosa2wL_1OLMXWn16g9h_eqOe3U",
  authDomain: "long-shipping-3ecee.firebaseapp.com",
  databaseURL: "https://long-shipping-3ecee-default-rtdb.firebaseio.com",
  projectId: "long-shipping-3ecee",
  storageBucket: "long-shipping-3ecee.firebasestorage.app",
  messagingSenderId: "980923923170",
  appId: "1:980923923170:web:0b5164fce3d07f928ffcbb",
  measurementId: "G-KLGYK2QEM9"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const countryTranslations = {
    "Malaysia": "马来西亚",
    "Singapore": "新加坡",
    "US": "美国",
    "UK": "英国",
    "Dubai": "迪拜",
    "Oman": "阿曼",
    "Myanmar": "缅甸",
    "Philiphine": "菲律宾",
    "China": "中国",
    "Thiland": "泰国",
    "Swetzarland": "瑞士",
    "Australia": "澳大利亚",
    "newzeland": "新西兰",
    "Thiwan": "台湾",
    "Hongkong": "香港",
    "vietnam": "越南"
};

const countryFlags = {
    "Malaysia": "🇲🇾",
    "Singapore": "🇸🇬",
    "US": "🇺🇸",
    "UK": "🇬🇧",
    "Dubai": "🇦🇪",
    "Oman": "🇴🇲",
    "Myanmar": "🇲🇲",
    "Philiphine": "🇵🇭",
    "China": "🇨🇳",
    "Thiland": "🇹🇭",
    "Swetzarland": "🇨🇭",
    "Australia": "🇦🇺",
    "newzeland": "🇳🇿",
    "Thiwan": "🇹🇼",
    "Hongkong": "🇭🇰",
    "vietnam": "🇻🇳"
};

const predefinedLocations = [
    { en: "Origin Sorting Facility", zh: "始发地分拨中心" },
    { en: "International Cargo Terminal", zh: "国际货运航站楼" },
    { en: "Customs Inspection Center", zh: "海关查验中心" },
    { en: "Bonded Warehouse", zh: "保税仓库" },
    { en: "Destination Transit Hub", zh: "目的地中转枢纽" },
    { en: "Regional Express Delivery Depot", zh: "区域快递派送点" }
];

const trackingSteps = [
    { step: 1, en: "Order Created & Registered", zh: "运单已创建并登记" },
    { step: 2, en: "Picked Up by Courier", zh: "快递员已揽收" },
    { step: 3, en: "Arrived at Regional Logistics Center", zh: "已到达区域物流中心" },
    { step: 4, en: "Departed Origin Hub", zh: "已离开始发地转运中心" },
    { step: 5, en: "In Transit to Destination Country", zh: "正在发往目的地国家" },
    { step: 6, en: "Arrived at Customs Facility", zh: "已到达海关监管中心" },
    { step: 7, en: "Customs Clearance in Progress", zh: "海关清关中" },
    { step: 8, en: "Customs Cleared Successfully", zh: "海关顺利清关完成" },
    { step: 9, en: "Arrived at Destination Distribution Hub", zh: "已到达目的地分拨中心" },
    { step: 10, en: "Out for Local Delivery", zh: "派送员正在派送中" },
    { step: 11, en: "Delivery Attempt in Progress", zh: "正在尝试送达" },
    { step: 12, en: "Package Delivered Successfully", zh: "包裹已签收" }
];

const i18n = {
    en: {
        adminTitle: "SF Shipping Admin",
        adminTagline: "Management Portal - Real-time Shipment Tracking",
        logout: "Logout",
        createShipment: "Create Shipment",
        shipmentDirectory: "Shipment Directory",
        createNewShipment: "Create New Shipment",
        fillDetails: "Fill in receiver, sender, and route details",
        senderInfo: "Sender Information",
        senderName: "Sender Full Name",
        receiverInfo: "Receiver Information",
        fullName: "Full Name",
        phone: "Phone Number",
        address: "Delivery Address",
        routeDetails: "Route Details",
        origin: "Shipping Origin",
        destination: "Shipping Destination",
        selectOrigin: "Select origin country",
        selectDestination: "Select destination country",
        btnGenerate: "Generate & Register Shipment",
        btnReset: "Reset Form",
        registeredShipments: "Registered Shipments",
        manageSubtitle: "Manage tracking histories and export QR codes",
        modalUpdateTitle: "Update Shipment Progress",
        lblSelectStep: "Select Progress Milestone",
        lblCurrentLocation: "Select Current Hub Location",
        btnSaveUpdate: "Save Progress Event",
        qrModalTitle: "Shipment QR Code",
        qrTracking: "Tracking Number:",
        qrCode: "Confirmation Code:",
        qrReceiver: "Receiver:",
        qrInstruction: "Scan with any camera to auto-fill and view real-time tracking.",
        btnSaveQR: "Save QR Image",
        btnClose: "Close",
        alertSameCountry: "Origin and destination cannot be the same.",
        alertSuccess: "Shipment created successfully!",
        alertGenQR: "Generate QR code now?"
    },
    zh: {
        adminTitle: "顺丰速运 管理后台",
        adminTagline: "管理门户 - 实时运单追踪",
        logout: "退出登录",
        createShipment: "创建运单",
        shipmentDirectory: "运单列表",
        createNewShipment: "创建新运单",
        fillDetails: "请填写收件人、寄件人及路线信息",
        senderInfo: "寄件人信息",
        senderName: "寄件人姓名",
        receiverInfo: "收件人信息",
        fullName: "收件人姓名",
        phone: "联系电话",
        address: "收货地址",
        routeDetails: "路线信息",
        origin: "始发地",
        destination: "目的地",
        selectOrigin: "选择始发国家/地区",
        selectDestination: "选择目的国家/地区",
        btnGenerate: "生成并登记运单",
        btnReset: "重置表单",
        registeredShipments: "已登记运单",
        manageSubtitle: "管理运单历史状态并导出二维码",
        modalUpdateTitle: "更新物流状态",
        lblSelectStep: "选择物流节点",
        lblCurrentLocation: "选择当前枢纽位置",
        btnSaveUpdate: "保存物流节点",
        qrModalTitle: "运单二维码",
        qrTracking: "运单号：",
        qrCode: "确认码：",
        qrReceiver: "收件人：",
        qrInstruction: "使用任意相机扫码，即可自动填充并查看实时追踪信息。",
        btnSaveQR: "保存二维码图片",
        btnClose: "关闭",
        alertSameCountry: "始发地和目的地不能相同。",
        alertSuccess: "运单创建成功！",
        alertGenQR: "是否立即生成二维码？"
    }
};

let currentLang = localStorage.getItem('sfAdminLang') || 'en';
const currentPage = window.location.pathname.split("/").pop();

if (currentPage === "index.html" || currentPage === "" || !currentPage.includes("admin")) {
    initializeIndexPage();
} else if (currentPage.includes("admin")) {
    initializeAdminPage();
}

function getLocalizedStepText(stepNumber, lang) {
    const stepObj = trackingSteps.find(s => s.step === stepNumber);
    if (!stepObj) return "";
    return lang === 'zh' ? stepObj.zh : stepObj.en;
}

function getLocationEnglishText(locationVal) {
    if (!locationVal) return "";
    const matchedLoc = predefinedLocations.find(l => l.zh === locationVal || l.en === locationVal);
    return matchedLoc ? matchedLoc.en : locationVal;
}

function initializeIndexPage() {
    const trackingNumberInput = document.getElementById('trackingNumber');
    const confirmationCodeInput = document.getElementById('confirmationCode');
    const trackButton = document.getElementById('trackButton');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const resultSection = document.getElementById('resultSection');
    const errorMessage = document.getElementById('errorMessage');
    const newSearchButton = document.getElementById('newSearchButton');
    
    const adminPasswordModal = document.getElementById('adminPasswordModal');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const submitPassBtn = document.getElementById('submitPassBtn');
    const passErrorMessage = document.getElementById('passErrorMessage');

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', () => {
            if (adminPasswordModal) {
                adminPasswordInput.value = '';
                passErrorMessage.style.display = 'none';
                adminPasswordModal.style.display = 'block';
            }
        });
    }

    window.closePasswordModal = function() {
        if (adminPasswordModal) adminPasswordModal.style.display = 'none';
    };

    if (submitPassBtn) {
        submitPassBtn.addEventListener('click', () => {
            const password = adminPasswordInput.value.trim();
            if (password === '33355555') {
                localStorage.setItem('sfAdminAuth', 'true');
                window.location.href = 'admin.html';
            } else {
                passErrorMessage.textContent = 'Incorrect admin password. Please try again.';
                passErrorMessage.style.display = 'block';
            }
        });
    }

    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const trackingParam = urlParams.get('tracking');
        const codeParam = urlParams.get('code');
        
        if (trackingParam && codeParam) {
            if (trackingNumberInput) trackingNumberInput.value = trackingParam;
            if (confirmationCodeInput) confirmationCodeInput.value = codeParam;
            setTimeout(() => { if (trackButton) trackButton.click(); }, 300);
        }
    }

    async function trackShipment() {
        const trackingNumber = trackingNumberInput.value.trim().toUpperCase();
        const confirmationCode = confirmationCodeInput.value.trim().toUpperCase();

        errorMessage.style.display = 'none';
        resultSection.style.display = 'none';

        if (!trackingNumber || !confirmationCode) {
            errorMessage.textContent = "Please enter both tracking number and confirmation code.";
            errorMessage.style.display = 'block';
            return;
        }

        try {
            trackButton.disabled = true;
            const snapshot = await database.ref('shipments/' + trackingNumber).once('value');

            if (!snapshot.exists()) {
                errorMessage.textContent = "Shipment not found.";
                errorMessage.style.display = 'block';
                trackButton.disabled = false;
                return;
            }

            const shipment = snapshot.val();
            if (shipment.confirmationCode.toUpperCase() !== confirmationCode) {
                errorMessage.textContent = "Invalid confirmation code.";
                errorMessage.style.display = 'block';
                trackButton.disabled = false;
                return;
            }

            displayShipmentInfo(shipment, trackingNumber);
            resultSection.style.display = 'block';
            trackButton.disabled = false;
        } catch (error) {
            errorMessage.textContent = "Error fetching shipment.";
            errorMessage.style.display = 'block';
            trackButton.disabled = false;
        }
    }

    function displayShipmentInfo(shipment, trackingNumber) {
        let displayStatus = shipment.status || 'Pending';
        if (shipment.currentStep) {
            displayStatus = getLocalizedStepText(shipment.currentStep, 'en');
        }

        document.getElementById('displayTrackingNumber').textContent = trackingNumber;
        document.getElementById('displayStatus').textContent = displayStatus;
        document.getElementById('displayOrigin').textContent = shipment.origin || 'N/A';
        document.getElementById('displayDestination').textContent = shipment.destination || 'N/A';
        document.getElementById('displayConfirmationCode').textContent = shipment.confirmationCode || 'N/A';
        document.getElementById('displaySenderName').textContent = shipment.sender?.name || 'N/A';
        document.getElementById('displayReceiverName').textContent = shipment.receiver?.name || 'N/A';
        document.getElementById('displayReceiverAddress').textContent = shipment.receiver?.address || 'N/A';
        document.getElementById('displayReceiverPhone').textContent = shipment.receiver?.phone || 'N/A';

        const timelineElement = document.getElementById('trackingTimeline');
        timelineElement.innerHTML = '';
        const history = [...(shipment.trackingHistory || [])].reverse();

        history.forEach((event) => {
            const descriptionText = event.step ? getLocalizedStepText(event.step, 'en') : (event.description || '');
            const englishLocation = getLocationEnglishText(event.location);
            
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-date">${event.date || ''}</div>
                <div class="timeline-content">${descriptionText}</div>
                <div class="timeline-location">${englishLocation}</div>
            `;
            timelineElement.appendChild(timelineItem);
        });
    }

    if (trackButton) trackButton.addEventListener('click', trackShipment);
    if (newSearchButton) newSearchButton.addEventListener('click', () => {
        resultSection.style.display = 'none';
        trackingNumberInput.value = '';
        confirmationCodeInput.value = '';
    });

    window.addEventListener('load', checkUrlParams);
}

function initializeAdminPage() {
    if (localStorage.getItem('sfAdminAuth') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    const shippingForm = document.getElementById('shippingForm');
    const tableBody = document.getElementById('shipmentTableBody');
    const addShippingTab = document.getElementById('addShippingTab');
    const manageShippingTab = document.getElementById('manageShippingTab');
    const addShippingContent = document.getElementById('addShippingContent');
    const manageShippingContent = document.getElementById('manageShippingContent');
    const logoutBtn = document.getElementById('logoutBtn');
    const langSelect = document.getElementById('langSelect');
    const updateStatusModal = document.getElementById('updateStatusModal');
    const updateStatusForm = document.getElementById('updateStatusForm');
    const stepSelect = document.getElementById('stepSelect');
    const stepLocationSelect = document.getElementById('stepLocationSelect');

    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('sfAdminLang', currentLang);
            updateAdminLanguage();
            populateStepSelect();
            populateLocationSelect();
            loadShipments();
        });
    }

    function updateAdminLanguage() {
        const dictionary = i18n[currentLang] || i18n.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[key]) el.textContent = dictionary[key];
        });

        document.querySelectorAll('option[data-country]').forEach(opt => {
            const originalCountry = opt.getAttribute('data-country');
            if (currentLang === 'zh') {
                opt.textContent = countryTranslations[originalCountry] || originalCountry;
            } else {
                opt.textContent = originalCountry;
            }
        });
    }

    function populateStepSelect() {
        if (!stepSelect) return;
        stepSelect.innerHTML = '';
        trackingSteps.forEach((s) => {
            const option = document.createElement('option');
            option.value = s.step;
            option.textContent = `${s.step}. ${currentLang === 'zh' ? s.zh : s.en}`;
            stepSelect.appendChild(option);
        });
    }

    function populateLocationSelect() {
        if (!stepLocationSelect) return;
        stepLocationSelect.innerHTML = '';
        predefinedLocations.forEach((loc) => {
            const option = document.createElement('option');
            option.value = currentLang === 'zh' ? loc.zh : loc.en;
            option.textContent = currentLang === 'zh' ? loc.zh : loc.en;
            stepLocationSelect.appendChild(option);
        });
    }

    updateAdminLanguage();
    populateStepSelect();
    populateLocationSelect();

    // GENERATES SF FOLLOWED BY 13 RANDOM DIGITS
    function generateTrackingNumber() {
        let digits = '';
        for (let i = 0; i < 13; i++) digits += Math.floor(Math.random() * 10);
        return 'SF' + digits;
    }

    function generateConfirmationCode() {
        const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
        return code;
    }

    async function addShipping(event) {
        event.preventDefault();
        const langDict = i18n[currentLang] || i18n.en;
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;

        if (origin === destination) {
            alert(langDict.alertSameCountry);
            return;
        }

        const trackingNumber = generateTrackingNumber();
        const confirmationCode = generateConfirmationCode();
        const timestamp = new Date().toISOString();
        const initialStep = trackingSteps[0];

        const shipmentData = {
            trackingNumber,
            confirmationCode,
            sender: { name: document.getElementById('senderName').value.trim() },
            receiver: {
                name: document.getElementById('receiverName').value.trim(),
                address: document.getElementById('receiverAddress').value.trim(),
                phone: document.getElementById('receiverPhone').value.trim()
            },
            origin,
            destination,
            currentStep: 1,
            status: initialStep.en,
            createdAt: timestamp,
            updatedAt: timestamp,
            trackingHistory: [{
                step: 1,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                description: initialStep.en,
                location: origin
            }]
        };

        try {
            await database.ref('shipments/' + trackingNumber).set(shipmentData);
            shippingForm.reset();
            const userConfirmed = confirm(`${langDict.alertSuccess}\nTracking: ${trackingNumber}\nCode: ${confirmationCode}\n\n${langDict.alertGenQR}`);
            if (userConfirmed) {
                generateQRCode(trackingNumber, confirmationCode, shipmentData.receiver.name);
            }
        } catch (error) {
            alert('Error creating shipment.');
        }
    }

    async function loadShipments() {
        try {
            const snapshot = await database.ref('shipments').once('value');
            const shipments = snapshot.val();
            tableBody.innerHTML = '';
            if (!shipments) return;

            const list = Object.entries(shipments).map(([tn, data]) => ({ trackingNumber: tn, ...data }))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            list.forEach((shipment) => {
                const originLabel = currentLang === 'zh' ? (countryTranslations[shipment.origin] || shipment.origin) : shipment.origin;
                const destLabel = currentLang === 'zh' ? (countryTranslations[shipment.destination] || shipment.destination) : shipment.destination;
                
                const originFlag = countryFlags[shipment.origin] || '🌐';
                const destFlag = countryFlags[shipment.destination] || '🌐';

                const createdDateObj = new Date(shipment.createdAt);
                const formattedDate = createdDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + 
                                      createdDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                let displayStatusText = shipment.status || 'PENDING';
                if (shipment.currentStep) {
                    displayStatusText = getLocalizedStepText(shipment.currentStep, currentLang);
                }

                let statusClass = 'pill-pickedup';
                const statusUpper = (displayStatusText || '').toUpperCase();
                if (statusUpper.includes('TRANSIT') || statusUpper.includes('HUB') || statusUpper.includes('转运') || statusUpper.includes('枢纽')) {
                    statusClass = 'pill-transit';
                }

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="col-tracking">
                        <div class="tn-bold">${shipment.trackingNumber}</div>
                        <div class="code-sub">Code: ${shipment.confirmationCode}</div>
                    </td>
                    <td class="col-sender">${shipment.sender?.name || 'N/A'}</td>
                    <td class="col-receiver">
                        <div class="receiver-name">${shipment.receiver?.name || 'N/A'}</div>
                        <div class="phone-sub">${shipment.receiver?.phone || ''}</div>
                    </td>
                    <td class="col-phone">${shipment.receiver?.phone || 'N/A'}</td>
                    <td class="col-country">
                        <span class="flag-icon">${originFlag}</span> ${originLabel}
                    </td>
                    <td class="col-country">
                        <span class="flag-icon">${destFlag}</span> ${destLabel}
                    </td>
                    <td class="col-status">
                        <span class="status-pill ${statusClass}">${displayStatusText.toUpperCase()}</span>
                    </td>
                    <td class="col-date">${formattedDate}</td>
                    <td class="col-actions">
                        <div class="table-actions-row">
                            <button class="btn btn-primary btn-sm" onclick="showUpdateModal('${shipment.trackingNumber}')"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-secondary btn-sm" onclick="generateQRCode('${shipment.trackingNumber}', '${shipment.confirmationCode}', '${shipment.receiver?.name || ''}')"><i class="fas fa-qrcode"></i></button>
                            <button class="btn btn-danger btn-sm" onclick="deleteShipment('${shipment.trackingNumber}')"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        } catch (e) { console.error(e); }
    }

    window.generateQRCode = function(trackingNumber, confirmationCode, receiverName) {
        document.getElementById('qrTrackingNumber').textContent = trackingNumber;
        document.getElementById('qrConfirmationCode').textContent = confirmationCode;
        document.getElementById('qrReceiverName').textContent = receiverName || 'N/A';
        
        let targetHost = window.location.origin;
        if (targetHost.includes('file://') || targetHost.includes('127.0.0.1') || targetHost.includes('localhost')) {
            targetHost = window.location.protocol + "//" + window.location.host;
        }

        let directoryPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        let trackingUrl = `${targetHost}${directoryPath}index.html?tracking=${encodeURIComponent(trackingNumber)}&code=${encodeURIComponent(confirmationCode)}`;
        
        const qrcodeContainer = document.getElementById('qrcode');
        qrcodeContainer.innerHTML = '';
        
        new QRCode(qrcodeContainer, {
            text: trackingUrl,
            width: 220,
            height: 220,
            colorDark: "#111827",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        document.getElementById('qrCodeModal').style.display = 'block';
        window.currentQRData = { trackingNumber, url: trackingUrl };
    };

    window.closeQRModal = () => document.getElementById('qrCodeModal').style.display = 'none';

    window.downloadQRCode = function() {
        const canvas = document.querySelector('#qrcode canvas');
        const img = document.querySelector('#qrcode img');
        const link = document.createElement('a');
        link.download = `QR_${window.currentQRData.trackingNumber}.png`;

        if (canvas) link.href = canvas.toDataURL('image/png');
        else if (img) link.href = img.src;
        link.click();
    };

    window.showUpdateModal = function(trackingNumber) {
        document.getElementById('modalTrackingNumber').value = trackingNumber;
        updateStatusModal.style.display = 'block';
    };

    window.closeUpdateModal = () => updateStatusModal.style.display = 'none';

    if (updateStatusForm) {
        updateStatusForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const tn = document.getElementById('modalTrackingNumber').value;
            const stepVal = parseInt(stepSelect.value, 10);
            const locationVal = stepLocationSelect.value;
            const selectedStepObj = trackingSteps.find(s => s.step === stepVal);

            if (!tn || !selectedStepObj || !locationVal) return;

            const stepTextEn = selectedStepObj.en;
            const snapshot = await database.ref('shipments/' + tn).once('value');
            const shipment = snapshot.val();

            if (shipment) {
                const newEvent = {
                    step: stepVal,
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                    description: stepTextEn,
                    location: locationVal
                };

                await database.ref('shipments/' + tn).update({
                    currentStep: stepVal,
                    status: stepTextEn,
                    updatedAt: new Date().toISOString(),
                    trackingHistory: [...(shipment.trackingHistory || []), newEvent]
                });

                closeUpdateModal();
                loadShipments();
            }
        });
    }

    window.deleteShipment = async function(tn) {
        if (confirm(`Delete shipment ${tn}?`)) {
            await database.ref('shipments/' + tn).remove();
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