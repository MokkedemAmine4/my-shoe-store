// ===============================
// 🔥 إعدادات
// ===============================
const WHATSAPP_NUMBER = "213552428317";

// ===============================
// 🎨 تغيير اللون والصورة (FIX)
// ===============================
let selectedColor = "أصفر";

function changeProductImage(imageName, element) {

    // تغيير الصورة
    document.getElementById("mainProductImage").src = "images/" + imageName;
    document.getElementById("pricingProductImage").src = "images/" + imageName;

    // إزالة التحديد من الكل
    document.querySelectorAll(".thumb, .color-chip").forEach(el => {
        el.classList.remove("is-active");
    });

    // تفعيل الحالي
    element.classList.add("is-active");

    // حفظ اللون
    selectedColor = element.getAttribute("data-color-name");

    // تحديث في summary
    const summary = document.getElementById("summaryColor");
    if (summary) summary.innerText = selectedColor;
}

// ===============================
// 📦 Multi Step Form
// ===============================
function goToOrderStep(step) {

    // إخفاء الكل
    document.querySelectorAll(".order-panel").forEach(p => {
        p.classList.remove("is-active");
    });

    document.querySelectorAll(".order-step").forEach(s => {
        s.classList.remove("is-active");
    });

    // إظهار المطلوب
    document.querySelector(`.order-panel[data-panel="${step}"]`).classList.add("is-active");
    document.querySelector(`.order-step[data-step="${step}"]`).classList.add("is-active");

    // تحديث summary
    if (step === 3) {
        document.getElementById("summaryColor").innerText = selectedColor;
    }
}

// ===============================
// ✅ التحقق من البيانات
// ===============================
function validateForm() {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const size = document.getElementById("shoeSize").value;
    const wilaya = document.getElementById("wilaya").value;

    if (!name) {
        alert("❌ يرجى إدخال الاسم");
        return false;
    }

    if (!phone || phone.length < 8) {
        alert("❌ رقم الهاتف غير صحيح");
        return false;
    }

    if (!address) {
        alert("❌ يرجى إدخال العنوان");
        return false;
    }

    if (!size) {
        alert("❌ اختر المقاس");
        return false;
    }

    if (!wilaya) {
        alert("❌ اختر الولاية");
        return false;
    }

    return true;
}

// ===============================
// 📲 إرسال الطلب إلى واتساب
// ===============================
function submitOrderWhatsApp() {

    if (!validateForm()) return;

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;
    const size = document.getElementById("shoeSize").value;
    const wilaya = document.getElementById("wilaya").value;
    const note = document.getElementById("customerNote").value || "لا يوجد";

    const message =
`طلب جديد 🔥

👤 الاسم: ${name}
📞 الهاتف: ${phone}
📍 الولاية: ${wilaya}
🏠 العنوان: ${address}

👟 المنتج: حذاء S1P
🎨 اللون: ${selectedColor}
📏 المقاس: ${size}

📝 ملاحظة:
${note}

💰 السعر: 6800 دج
🚚 الدفع عند الاستلام`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

// ===============================
// 💬 زر الاستفسار واتساب
// ===============================
function openInquiryWhatsApp() {

    const message = "مرحبا، أريد الاستفسار عن حذاء S1P 👟";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

// ===============================
// 🎯 عداد الإحصائيات
// ===============================
const counters = document.querySelectorAll(".stat-card__number");

const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const step = target / 100;

    const update = () => {
        count += step;
        if (count < target) {
            counter.innerText = Math.floor(count);
            requestAnimationFrame(update);
        } else {
            counter.innerText = target;
        }
    };

    update();
};

window.addEventListener("load", () => {
    counters.forEach(c => runCounter(c));
});

// ===============================
// 📸 Lightbox (اختياري)
// ===============================
function openLightbox(src) {
    const box = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImage");

    img.src = src;
    box.classList.add("active");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
}

// ===============================
// 🎯 Menu Mobile
// ===============================
function toggleMobileMenu() {
    document.getElementById("mobileMenu").classList.toggle("active");
}

function closeMobileMenu() {
    document.getElementById("mobileMenu").classList.remove("active");
}

// ===============================
// 🧠 Rating Stars
// ===============================
document.querySelectorAll(".rating-star").forEach(star => {
    star.addEventListener("click", () => {

        let rating = star.getAttribute("data-rate");

        document.querySelectorAll(".rating-star").forEach(s => {
            s.classList.remove("active");
        });

        for (let i = 0; i < rating; i++) {
            document.querySelectorAll(".rating-star")[i].classList.add("active");
        }
    });
});
// ===============================
// 🔥 FIX LOADER (مهم)
// ===============================
window.addEventListener("load", function () {

    const loader = document.getElementById("pageLoader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 800); // مدة التحميل
    }

});