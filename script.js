let team1Score = 0;
let team2Score = 0;
let targetScore = 0;

const team1Name = document.getElementById('team1Name');
const team2Name = document.getElementById('team2Name');
const teamNameNext = document.getElementById('teamNameNext');
team1Name.addEventListener('input', checkTeamNames);
team2Name.addEventListener('input', checkTeamNames);

function checkTeamNames() {
    teamNameNext.disabled = !(team1Name.value.trim() && team2Name.value.trim());
}

teamNameNext.addEventListener('click', () => switchPage('warmupPage'));

document.querySelectorAll('#warmupPage .option-button').forEach(button => {
    button.addEventListener('click', () => {
        targetScore = parseInt(button.dataset.value);
        selectOption(button);
        document.getElementById('warmupNext').disabled = false;
    });
});

document.getElementById('warmupNext').addEventListener('click', () => switchPage('gamePage'));

document.querySelectorAll('#gamePage .option-button').forEach(button => {
    button.addEventListener('click', () => {
        targetScore = parseInt(button.dataset.value);
        selectOption(button);
        document.getElementById('gameNext').disabled = false;
    });
});

document.getElementById('gameNext').addEventListener('click', () => {
    document.getElementById('team1Title').textContent = team1Name.value;
    document.getElementById('team2Title').textContent = team2Name.value;
    switchPage('counterPage');
});

document.getElementById('team1Add').addEventListener('click', () => addPoint('team1'));
document.getElementById('team2Add').addEventListener('click', () => addPoint('team2'));

function addPoint(team) {
    if (team === 'team1') {
        team1Score++;
    } else {
        team2Score++;
    }
    updateScores();
    if (team1Score >= targetScore || team2Score >= targetScore) {
        showWinner();
    }
}

function updateScores() {
    document.getElementById('team1Counter').textContent = team1Score;
    document.getElementById('team2Counter').textContent = team2Score;
}

function selectOption(button) {
    document.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function showWinner() {
    const winner = team1Score >= targetScore ? team1Name.value : team2Name.value;
    document.getElementById('winnerText').textContent = `${winner} WIN!!`;
    document.getElementById('winNotification').classList.add('show');
}

document.getElementById('okButton').addEventListener('click', () => {
    document.getElementById('winNotification').classList.remove('show');
    resetGame();
    switchPage('teamNamePage');
});

function resetGame() {
    team1Score = 0;
    team2Score = 0;
    targetScore = 0;
    updateScores();
    team1Name.value = '';
    team2Name.value = '';
    document.querySelectorAll('.option-button.selected').forEach(button => button.classList.remove('selected'));
    teamNameNext.disabled = true;
    document.getElementById('warmupNext').disabled = true;
    document.getElementById('gameNext').disabled = true;
}

function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}