// ฟังก์ชันเปลี่ยนการแสดงผลฟอร์มตามการเลือกประเภทการคำนวณ
function changeCalculationType() {
    const calcType = document.getElementById("calc-type").value;
    const forms = document.querySelectorAll(".calc-form");
    forms.forEach(form => form.style.display = "none");  // ซ่อนทุกฟอร์ม

    if (calcType === "simple-interest") {
        document.getElementById("simple-interest-form").style.display = "block";
    } else if (calcType === "compound-interest") {
        document.getElementById("compound-interest-form").style.display = "block";
    } else if (calcType === "monthly-savings") {
        document.getElementById("monthly-savings-form").style.display = "block";
    } else if (calcType === "loan-payment") {
        document.getElementById("loan-payment-form").style.display = "block";
    }
}

// ฟังก์ชันคำนวณและแสดงผล
function calculate() {
    const calcType = document.getElementById("calc-type").value;
    let resultData = [];
    let timeLabels = [];
    let totalAmount = 0;

    // คำนวณดอกเบี้ยง่าย
    if (calcType === "simple-interest") {
        const principal = parseFloat(document.getElementById("principal").value);
        const rate = parseFloat(document.getElementById("rate").value) / 100;
        const time = parseInt(document.getElementById("time").value);
        
        for (let year = 1; year <= time; year++) {
            totalAmount = principal + (principal * rate * year);
            resultData.push(totalAmount);
            timeLabels.push(`ปี ${year}`);
        }
    }

    // คำนวณดอกเบี้ยทบต้น
    else if (calcType === "compound-interest") {
        const principal = parseFloat(document.getElementById("principal-ci").value);
        const rate = parseFloat(document.getElementById("rate-ci").value) / 100;
        const time = parseInt(document.getElementById("time-ci").value);

        for (let year = 1; year <= time; year++) {
            totalAmount = principal * Math.pow(1 + rate, year);
            resultData.push(totalAmount);
            timeLabels.push(`ปี ${year}`);
        }
    }

    // คำนวณเงินออมรายเดือน
    else if (calcType === "monthly-savings") {
        const monthlyContribution = parseFloat(document.getElementById("monthly-contribution").value);
        const rate = parseFloat(document.getElementById("rate-savings").value) / 100 / 12;
        const time = parseInt(document.getElementById("time-savings").value) * 12;
        let accumulatedAmount = 0;

        for (let month = 1; month <= time; month++) {
            accumulatedAmount += monthlyContribution;
            accumulatedAmount += accumulatedAmount * rate;
            resultData.push(accumulatedAmount);
            timeLabels.push(`เดือน ${month}`);
        }
    }

    // คำนวณเงินกู้รายเดือน
    else if (calcType === "loan-payment") {
        const loanAmount = parseFloat(document.getElementById("loan-amount").value);
        const rate = parseFloat(document.getElementById("loan-rate").value) / 100 / 12;
        const time = parseInt(document.getElementById("loan-time").value) * 12;
        
        const monthlyPayment = loanAmount * rate / (1 - Math.pow(1 + rate, -time));
        const monthlyPayments = Array(time).fill(monthlyPayment);

        resultData = monthlyPayments;
        timeLabels = Array.from({ length: time }, (_, i) => `เดือน ${i + 1}`);
    }

    // แสดงผลลัพธ์
    displayResult(resultData, timeLabels);
}

// ฟังก์ชันแสดงผลลัพธ์
function displayResult(resultData, timeLabels) {
    document.getElementById("calculation-result").innerHTML = `ผลลัพธ์: ${resultData[resultData.length - 1].toFixed(2)} บาท`;

    // แสดงกราฟ
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'ผลลัพธ์การคำนวณ',
                data: resultData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        }
    });
}
