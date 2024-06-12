window.onload = () => {
    const unitSystem = document.querySelector("#unitSystem");
    const metricInputs = document.querySelector("#metricInputs");
    const imperialInputs = document.querySelector("#imperialInputs");
    const calculateBtn = document.querySelector("#calculateBtn");
    const resultContainer = document.querySelector("#result");
    const historyContainer = document.querySelector("#historyContainer");

    unitSystem.addEventListener("change", () => {
        if (unitSystem.value === "metric") {
            metricInputs.classList.remove("is-hidden");
            imperialInputs.classList.add("is-hidden");
        } else {
            metricInputs.classList.add("is-hidden");
            imperialInputs.classList.remove("is-hidden");
        }
    });

    calculateBtn.addEventListener("click", calculateBMI);

    function calculateBMI() {
        const heightCm = document.querySelector("#heightCm").value;
        const weightKg = document.querySelector("#weightKg").value;
        const heightFt = document.querySelector("#heightFt").value;
        const heightIn = document.querySelector("#heightIn").value;
        const weightLbs = document.querySelector("#weightLbs").value;

        let height, weight;

        if (unitSystem.value === "metric") {
            if (!validateMetricInputs(heightCm, weightKg)) return;
            height = heightCm;
            weight = weightKg;
        } else {
            if (!validateImperialInputs(heightFt, heightIn, weightLbs)) return;
            height = convertToMetric(heightFt, heightIn);
            weight = convertToMetric(weightLbs, "lbs");
        }

        const bmi = calculateBMIValue(weight, height);
        displayResult(bmi);
        addToHistory(bmi);
    }

    function validateMetricInputs(heightCm, weightKg) {
        let isValid = true;
        clearErrors();

        if (!heightCm) {
            displayError("heightCmError", "Please enter your height.");
            isValid = false;
        }

        if (!weightKg) {
            displayError("weightKgError", "Please enter your weight.");
            isValid = false;
        }

        return isValid;
    }

    function validateImperialInputs(heightFt, heightIn, weightLbs) {
        let isValid = true;
        clearErrors();

        if (!heightFt && !heightIn) {
            displayError("heightImperialError", "Please enter your height.");
            isValid = false;
        }

        if (!weightLbs) {
            displayError("weightLbsError", "Please enter your weight.");
            isValid = false;
        }

        return isValid;
    }

    function clearErrors() {
        document.querySelector("#heightCmError").textContent = "";
        document.querySelector("#weightKgError").textContent = "";
        document.querySelector("#heightImperialError").textContent = "";
        document.querySelector("#weightLbsError").textContent = "";
    }

    function displayError(elementId, message) {
        document.querySelector(`#${elementId}`).textContent = message;
    }
    function convertToMetric(value, unit) {
        if (unit === "lbs") {
            return value * 0.45359237; // 1 lb = 0.45359237 kg
        } else {
            const totalInches = (value[0] * 12) + parseInt(value[1]);
            return totalInches * 2.54; // 1 inch = 2.54 cm
        }
    }
    
    function calculateBMIValue(weight, height) {
        const heightInMeters = height / 100; // Convert height to meters
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi.toFixed(2);
    }
    
    function displayResult(bmi) {
        let bmiCategory, bmiMessage;
    
        if (bmi < 18.5) {
            bmiCategory = "Underweight";
            bmiMessage = "You are underweight. Consider increasing your calorie intake and engaging in strength training exercises.";
        } else if (bmi >= 18.5 && bmi < 25) {
            bmiCategory = "Normal";
            bmiMessage = "You have a healthy weight. Keep up the good work!";
        } else if (bmi >= 25 && bmi < 30) {
            bmiCategory = "Overweight";
            bmiMessage = "You are overweight. Consider reducing your calorie intake and increasing your physical activity.";
        } else {
            bmiCategory = "Obese";
            bmiMessage = "You are obese. It's recommended to consult a healthcare professional for a personalized plan to improve your health.";
        }
    
        resultContainer.innerHTML = `
            <h2 class="subtitle">Your BMI: ${bmi}</h2>
            <h3 class="subtitle is-4">${bmiCategory}</h3>
            <p>${bmiMessage}</p>
        `;
    }
    
    function addToHistory(bmi) {
        const bmiHistoryItem = document.createElement("div");
        bmiHistoryItem.classList.add("column", "is-one-quarter");
        bmiHistoryItem.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <p class="title is-4">${bmi}</p>
                    <p class="subtitle is-6">${new Date().toLocaleString()}</p>
                </div>
            </div>
        `;
        historyContainer.appendChild(bmiHistoryItem);
    }
}
    