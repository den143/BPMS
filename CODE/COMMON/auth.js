// --- Role-Based Access Control ---

document.addEventListener('DOMContentLoaded', () => {
    const userRole = sessionStorage.getItem('userRole');
    const currentPage = window.location.pathname;

    const ROLES = {
        'Event Manager': [
            '../MANAGE-ORGANIZER/organizer.html',
            '../MANAGE_ACTIVITY/activities.html',
            '../MANAGE_ROUNDS/rounds.html',
            '../MANAGE_SEGMENTS/segments.html',
            '../MANAGE_AWARDS/awards.html',
            '../REGISTER_CONTESTANT/contestant.html',
            '../REGISTER_JUDGE/judge.html',
            '../RESULT_PANEL/result.html'
        ],
        'Contestant Manager': [
            '../REGISTER_CONTESTANT/contestant.html'
        ],
        'Judge Coordinator': [
            '../REGISTER_JUDGE/judge.html'
        ],
        'Tabulator': [
            '../RESULT_PANEL/result.html'
        ]
    };

    // --- Authorization Check ---
    if (userRole && ROLES[userRole] && !ROLES[userRole].some(path => currentPage.endsWith(path.substring(2)))) {
        // If user is not authorized, redirect to login page
        window.location.href = '../HOME/index.html';
    }

    // --- Sidebar Role-Based Visibility ---
    const sidebarNav = document.querySelector('.sidebar-nav ul');

    if (userRole && ROLES[userRole]) {
        const authorizedLinks = ROLES[userRole];
        sidebarNav.querySelectorAll('li a').forEach(link => {
            const linkPath = link.getAttribute('href');
            if (!authorizedLinks.includes(".." + linkPath) && linkPath !== '#') {
                link.parentElement.style.display = 'none';
            }
        });
    } else {
        // If no role or invalid role, hide all links
        sidebarNav.querySelectorAll('li').forEach(li => {
            li.style.display = 'none';
        });
    }
});

// --- Logout Function ---
function logout() {
    sessionStorage.removeItem('userRole');
    window.location.href = '../HOME/index.html';
}
