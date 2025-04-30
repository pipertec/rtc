document.addEventListener('DOMContentLoaded', () => {
    const layoutSelector = document.getElementById('layout-selector');
    const cabinetStyleSelector = document.getElementById('cabinet-style');
    const cabinetColorPicker = document.getElementById('cabinet-color');
    const countertopMaterialSelector = document.getElementById('countertop-material');
    const countertopColorPicker = document.getElementById('countertop-color');
    const fridgeToggle = document.getElementById('fridge-toggle');
    const ovenToggle = document.getElementById('oven-toggle');
    const dishwasherToggle = document.getElementById('dishwasher-toggle');
    const kitchenArea = document.getElementById('kitchen-area');
    const cabinetsContainer = document.getElementById('cabinets-container');
    const countertopsContainer = document.getElementById('countertops-container');
    const appliancesContainer = document.getElementById('appliances-container');
    const resetButton = document.getElementById('reset-button');

    let currentLayout = 'l-shape';
    let cabinetColor = '#f0f0f0';
    let countertopColor = '#e0e0e0';
    let showFridge = false;
    let showOven = false;
    let showDishwasher = false;

    function updateKitchenView() {
        cabinetsContainer.innerHTML = '';
        countertopsContainer.innerHTML = '';
        appliancesContainer.innerHTML = '';

        // Basic layout rendering (very simplified)
        if (currentLayout === 'l-shape') {
            createCabinet(20, 20, 150, 80, cabinetColor); // Base cabinet 1
            createCabinet(20, 100, 80, 80, cabinetColor); // Base cabinet 2
            createCountertop(20, 20, 150, 80, countertopColor);
            createCountertop(20, 100, 80, 80, countertopColor);
        } else if (currentLayout === 'u-shape') {
            createCabinet(20, 20, 150, 80, cabinetColor);
            createCabinet(20, 100, 80, 80, cabinetColor);
            createCabinet(200, 100, 100, 80, cabinetColor);
            createCountertop(20, 20, 150, 80, countertopColor);
            createCountertop(20, 100, 80, 80, countertopColor);
            createCountertop(200, 100, 100, 80, countertopColor);
        } else if (currentLayout === 'island') {
            createCabinet(50, 50, 120, 80, cabinetColor); // Island base
            createCountertop(50, 50, 120, 80, countertopColor);
        }

        if (showFridge) {
            createAppliance(400, 20, 60, 150, 'Fridge');
        }
        if (showOven) {
            createAppliance(300, 100, 60, 80, 'Oven');
        }
        if (showDishwasher) {
            createAppliance(120, 180, 50, 60, 'Dishwasher');
        }
    }

    function createCabinet(x, y, width, height, color) {
        const cabinet = document.createElement('div');
        cabinet.classList.add('cabinet');
        cabinet.style.left = `${x}px`;
        cabinet.style.top = `${y}px`;
        cabinet.style.width = `${width}px`;
        cabinet.style.height = `${height}px`;
        cabinet.style.backgroundColor = color;
        cabinetsContainer.appendChild(cabinet);
    }

    function createCountertop(x, y, width, height, color) {
        const countertop = document.createElement('div');
        countertop.classList.add('countertop');
        countertop.style.left = `${x}px`;
        countertop.style.top = `${y}px`;
        countertop.style.width = `${width}px`;
        countertop.style.height = `${height}px`;
        countertop.style.backgroundColor = color;
        countertopsContainer.appendChild(countertop);
    }

    function createAppliance(x, y, width, height, label) {
        const appliance = document.createElement('div');
        appliance.classList.add('appliance');
        appliance.style.left = `${x}px`;
        appliance.style.top = `${y}px`;
        appliance.style.width = `${width}px`;
        appliance.style.height = `${height}px`;
        appliance.textContent = label;
        appliancesContainer.appendChild(appliance);
    }

    layoutSelector.addEventListener('change', (event) => {
        currentLayout = event.target.value;
        updateKitchenView();
    });

    cabinetColorPicker.addEventListener('input', (event) => {
        cabinetColor = event.target.value;
        updateKitchenView();
    });

    countertopColorPicker.addEventListener('input', (event) => {
        countertopColor = event.target.value;
        updateKitchenView();
    });

    fridgeToggle.addEventListener('change', (event) => {
        showFridge = event.target.checked;
        updateKitchenView();
    });

    ovenToggle.addEventListener('change', (event) => {
        showOven = event.target.checked;
        updateKitchenView();
    });

    dishwasherToggle.addEventListener('change', (event) => {
        showDishwasher = event.target.checked;
        updateKitchenView();
    });

    resetButton.addEventListener('click', () => {
        currentLayout = 'l-shape';
        cabinetColorPicker.value = '#f0f0f0';
        countertopColorPicker.value = '#e0e0e0';
        showFridge = false;
        showOven = false;
        showDishwasher = false;
        layoutSelector.value = 'l-shape';
        fridgeToggle.checked = false;
        ovenToggle.checked = false;
        dishwasherToggle.checked = false;
        updateKitchenView();
    });

    // Initial rendering
    updateKitchenView();
});