let isLoggedIn = false;
let activities = [];
let departments = {
    medicalLab: [],
    anesthesia: [],
    optics: [],
    radiology: [],
    dental: [],
    all: []
};

function login() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === 'admin' && password === '1234') {
        isLoggedIn = true;
        document.getElementById('login').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        document.getElementById('loginError').innerText = '';
    } else {
        document.getElementById('loginError').innerText = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
    }
}

function addActivity() {
    if (!isLoggedIn) return;

    const title = document.getElementById('activityTitle').value;
    const date = document.getElementById('activityDate').value;
    const location = document.getElementById('activityLocation').value;
    const department = document.getElementById('activityDepartment').value;
    const link = document.getElementById('activityLink').value;

    if (title && date && location && department && link) {
        const activity = { title, date, location, department, link };
        activities.push(activity);
        departments[department].push(activity); // إضافة النشاط للقسم المناسب
        renderActivities();
        document.querySelector('.add-activity-form').reset();
    } else {
        alert('يرجى ملء جميع الحقول.');
    }
}

function renderActivities(filter = "") {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';

    const filteredActivities = activities.filter(activity => {
        const matchesTitle = activity.title.toLowerCase().includes(filter.toLowerCase());
        const matchesDate = activity.date === filter;
        const matchesLink = activity.link.toLowerCase().includes(filter.toLowerCase());
        return matchesTitle || matchesDate || matchesLink;
    });

    if (filteredActivities.length === 0) {
        activityList.innerHTML = '<div class="no-results">لا توجد نتائج تطابق معايير البحث.</div>';
    } else {
        filteredActivities.forEach(activity => {
            const activityDiv = document.createElement('div');
            activityDiv.className = 'activity';
            activityDiv.innerHTML = `
                <strong>${activity.title}</strong><br>
                التاريخ: ${activity.date}<br>
                المكان: ${activity.location}<br>
                القسم: ${activity.department}<br>
                <a href="${activity.link}" target="_blank">رابط النشاط</a>
                <button onclick="editActivity('${activity.title}')">تعديل</button>
                <button onclick="deleteActivity('${activity.title}')">حذف</button>
            `;
            activityList.appendChild(activityDiv);
        });
    }
}

function editActivity(title) {
    const activity = activities.find(act => act.title === title);
    if (activity) {
        const newTitle = prompt("تعديل عنوان النشاط:", activity.title);
        if (newTitle) activity.title = newTitle;

        const newDate = prompt("تعديل التاريخ:", activity.date);
        if (newDate) activity.date = newDate;

        const newLocation = prompt("تعديل المكان:", activity.location);
        if (newLocation) activity.location = newLocation;

        const newDepartment = prompt("تعديل القسم:", activity.department);
        if (newDepartment) activity.department = newDepartment;

        const newLink = prompt("تعديل الرابط:", activity.link);
        if (newLink) activity.link = newLink;

        renderActivities();
    }
}

function deleteActivity(title) {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا النشاط؟")) {
        activities = activities.filter(activity => activity.title !== title);
        renderActivities();
    }
}

function searchActivities() {
    const titleFilter = document.getElementById('searchInput').value;
    const dateFilter = document.getElementById('searchDate').value;
    renderActivities(titleFilter || dateFilter);
}

function showDepartment(department) {
    const departmentContent = document.getElementById('departmentContent');
    departmentContent.innerHTML = '';

    const activitiesInDepartment = departments[department];
    if (activitiesInDepartment.length === 0) {
        departmentContent.innerHTML = `<div class="no-results">لا توجد أنشطة في هذا القسم.</div>`;
    } else {
        activitiesInDepartment.forEach(activity => {
            const activityDiv = document.createElement('div');
            activityDiv.className = 'department';
            activityDiv.innerHTML = `
                <strong>${activity.title}</strong><br>
                التاريخ: ${activity.date}<br>
                المكان: ${activity.location}<br>
                <a href="${activity.link}" target="_blank">رابط النشاط</a>
            `;
            departmentContent.appendChild(activityDiv);
        });
    }
}

function showAllDepartments() {
    const departmentContent = document.getElementById('departmentContent');
    departmentContent.innerHTML = '';

    activities.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'department';
        activityDiv.innerHTML = `
            <strong>${activity.title}</strong><br>
            التاريخ: ${activity.date}<br>
            المكان: ${activity.location}<br>
            القسم: ${activity.department}<br>
            <a href="${activity.link}" target="_blank">رابط النشاط</a>
        `;
        departmentContent.appendChild(activityDiv);
    });
}

document.getElementById('editTitleBtn').addEventListener('click', function() {
    if (!isLoggedIn) return;

    const newTitle = prompt("أدخل اسم التطبيق الجديد:", document.getElementById('appTitle').innerText);
    if (newTitle) {
        document.getElementById('appTitle').innerText = newTitle;
    }
});