document.getElementById("step3btn").addEventListener("click", function () {
    // Helper function to parse formatted currency input (with commas)
    function parseFormattedValue(inputValue) {
        // Remove commas and return the numeric value
        return parseFloat(inputValue.replace(/,/g, ''));
    }

    // Get the values from the input fields and parse them
    const income = parseFormattedValue(document.getElementById("monthlyIncome").value);
    const investment = parseFormattedValue(document.getElementById("monthlyInvestment").value);
    const emiCommitment = parseFormattedValue(document.getElementById("monthlyCommitment").value);

    // Input validation
    let isValid = true;

    // Validate income
    if (isNaN(income) || income < 100) {
        document.getElementById("incomeError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("incomeError").style.display = "none";
    }

    // Validate investment
    if (isNaN(investment) || investment < 0) {
        document.getElementById("investmentError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("investmentError").style.display = "none";
    }

    // Validate EMI commitment
    if (isNaN(emiCommitment) || emiCommitment < 1) {
        document.getElementById("commitmentError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("commitmentError").style.display = "none";
    }

    // If any validation failed, stop further processing
    if (!isValid) {
        return;
    }

    // Continue with the next steps if validation passes
    // (e.g., submitting the form, navigating to the next step, etc.)


    // Calculate the percentage of investment relative to income for the first graph
    const investmentPercentage = (investment / income) * 100;
    let needleAngle, firstGraphScore;

    if (investmentPercentage < 9) {
        needleAngle = -60; // Red zone
        firstGraphScore = 1;
    } else if (investmentPercentage >= 10 && investmentPercentage <= 19) {
        needleAngle = 0; // Orange zone
        firstGraphScore = 2;
    } else {
        needleAngle = 60; // Green zone
        firstGraphScore = 3;
    }

    document.getElementById("needle").style.transform = `rotate(${needleAngle}deg)`;

    // EMI Commitment vs Income Graph
    const emiPercentage = (emiCommitment / income) * 100;
    let emiNeedleAngle, secondGraphScore;

    if (emiPercentage <= 20) {
        emiNeedleAngle = 60; // Green zone
        secondGraphScore = 3;
    } else if (emiPercentage > 20 && emiPercentage <= 40) {
        emiNeedleAngle = 0; // Orange zone
        secondGraphScore = 2;
    } else {
        emiNeedleAngle = -60; // Red zone
        secondGraphScore = 1;
    }

    document.getElementById("emiNeedle").style.transform = `rotate(${emiNeedleAngle}deg)`;

    // Calculate and display the GIP score
    const gipScore = firstGraphScore + secondGraphScore;
    const gipMessage = `Your GIP score is ${gipScore} Out of 6`;

    // Display GIP score message
    const messageContainer = document.getElementById("dynamicMessage");
    messageContainer.style.display = "block";
    messageContainer.innerText = gipMessage;

    // Add further message based on score
    let detailedMessage;
    if (gipScore <= 3) {
        detailedMessage = "Please improve your GIP score & create a solid financial plan.";
    } else if (gipScore === 4) {
        detailedMessage = "Please improve your GIP score & create a solid financial plan.";
    } else {
        detailedMessage = "Please improve your GIP score & create a solid financial plan.";
    }

    // Append the detailed message
    messageContainer.innerText += `\n${detailedMessage}`;

    // Hide the form and show both graphs
    document.getElementById("step3").style.display = "none";
    document.getElementById("graphContainer").style.display = "block";
    document.getElementById("emiGraphContainer").style.display = "block";
    document.getElementById("nxtbtn").style.display = "block";
});
