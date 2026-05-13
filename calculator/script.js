// Данные по вкладам
const depositData = {
    replenishable: {
        name: 'Пополняемый',
        terms: {
            '6_months': { label: '6 месяцев', months: 6, rate: 20 },
            '1_year': { label: '1 год', months: 12, rate: 22 },
            '1.5_years': { label: '1,5 года', months: 18, rate: 15 },
            '2_years': { label: '2 года', months: 24, rate: 10 }
        }
    },
    fixed: {
        name: 'Срочный',
        terms: {
            '3_months': { label: '3 месяца', months: 3, rate: 20 },
            '6_months': { label: '6 месяцев', months: 6, rate: 22 },
            '9_months': { label: '9 месяцев', months: 9, rate: 23 },
            '1_year': { label: '1 год', months: 12, rate: 24 },
            '1.5_years': { label: '1,5 года', months: 18, rate: 18 },
            '2_years': { label: '2 года', months: 24, rate: 15 }
        }
    }
};

// Получаем элементы DOM
const depositTypeSelect = document.getElementById('deposit-type');
const termSelect = document.getElementById('term');
const amountInput = document.getElementById('amount');
const interestRateInput = document.getElementById('interest-rate');
const calculateBtn = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result');

// Функция обновления списка сроков при смене вида вклада
function updateTerms() {
    const depositType = depositTypeSelect.value;
    const terms = depositData[depositType].terms;
    
    termSelect.innerHTML = '';
    for (const [key, term] of Object.entries(terms)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = term.label;
        termSelect.appendChild(option);
    }
    
    updateInterestRate(); // обновить отображаемую ставку
}

// Функция обновления поля с процентной ставкой
function updateInterestRate() {
    const depositType = depositTypeSelect.value;
    const termKey = termSelect.value;
    const rate = depositData[depositType].terms[termKey].rate;
    interestRateInput.value = rate + '%';
}

// Валидация суммы
function validateAmount(amount) {
    if (amount === '' || amount === null) {
        return 'Пожалуйста, введите сумму вклада.';
    }
    const numAmount = Number(amount);
    if (isNaN(numAmount)) {
        return 'Введите корректное число.';
    }
    if (numAmount < 1000) {
        return 'Сумма вклада должна быть не менее 1 000 ₽.';
    }
    if (numAmount > 100000000) {
        return 'Сумма не может превышать 100 000 000 ₽.';
    }
    return null; // всё хорошо
}

// Расчёт итоговой суммы по формуле простых процентов
function calculateFinalAmount(depositType, termKey, amount) {
    const term = depositData[depositType].terms[termKey];
    const rate = term.rate;
    const months = term.months;
    const years = months / 12;
    const finalAmount = amount * (1 + (rate / 100) * years);
    return finalAmount;
}

// Основная функция расчёта и отображения результата
function calculateAndDisplay() {
    const depositType = depositTypeSelect.value;
    const termKey = termSelect.value;
    const amountRaw = amountInput.value;
    
    // Валидация
    const error = validateAmount(amountRaw);
    if (error) {
        resultDiv.innerHTML = `<div class="error">❌ ${error}</div>`;
        return;
    }
    
    const amount = Number(amountRaw);
    const term = depositData[depositType].terms[termKey];
    const depositName = depositData[depositType].name;
    
    const finalAmount = calculateFinalAmount(depositType, termKey, amount);
    const profit = finalAmount - amount;
    
    // Формируем красивое сообщение
    resultDiv.innerHTML = `
        <div class="success">✅ Результат расчёта:</div>
        <br>
        📌 <strong>Вид вклада:</strong> ${depositName}<br>
        ⏱️ <strong>Срок вклада:</strong> ${term.label}<br>
        💰 <strong>Процентная ставка:</strong> ${term.rate}% годовых<br>
        💵 <strong>Сумма вклада:</strong> ${amount.toLocaleString('ru-RU')} ₽<br>
        📈 <strong>Начисленные проценты:</strong> ${profit.toLocaleString('ru-RU')} ₽<br>
        🏆 <strong>Итоговая сумма в конце срока:</strong> <span style="font-size: 1.2em;">${finalAmount.toLocaleString('ru-RU')} ₽</span>
    `;
}

// Навешиваем обработчики событий
depositTypeSelect.addEventListener('change', () => {
    updateTerms();
    calculateAndDisplay(); // пересчёт при смене типа
});
termSelect.addEventListener('change', () => {
    updateInterestRate();
    calculateAndDisplay();
});
amountInput.addEventListener('input', calculateAndDisplay);
calculateBtn.addEventListener('click', calculateAndDisplay);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateTerms();          // заполнит сроки для первого типа
    updateInterestRate();   // покажет ставку
    calculateAndDisplay();  // покажет начальный результат (сумма по умолчанию 10000)
});