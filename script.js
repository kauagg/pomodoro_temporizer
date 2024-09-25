let timer;
        let isPomodoro = false;
        let timeRemaining;

        function updateDisplay(minutes, seconds) {
            const timerDisplay = document.getElementById('timer');
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        function startTimer(duration) {
            clearInterval(timer);
            timeRemaining = duration * 60; // converter para segundos
            isPomodoro = true;

            // Armazenar o tempo restante no localStorage
            localStorage.setItem("timeRemaining", timeRemaining);

            timer = setInterval(() => {
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;

                updateDisplay(minutes, seconds);

                if (timeRemaining <= 0) {
                    clearInterval(timer);
                    isPomodoro = false;
                    alert("Tempo acabou!");
                    updateDisplay(0, 0);
                    localStorage.removeItem("timeRemaining"); // Limpar o localStorage
                }

                timeRemaining--;
                // Atualizar o tempo restante no localStorage
                localStorage.setItem("timeRemaining", timeRemaining);
            }, 1000);
        }

        document.getElementById('startPomodoro').addEventListener('click', () => {
            if (!isPomodoro) {
                startTimer(25);
            }
        });

        document.getElementById('startInterval').addEventListener('click', () => {
            if (!isPomodoro) {
                startTimer(5);
            }
        });

        document.getElementById('reset').addEventListener('click', () => {
            clearInterval(timer);
            isPomodoro = false;
            updateDisplay(25, 0);
            localStorage.removeItem("timeRemaining"); // Limpar o localStorage
        });

        // Recuperar o tempo restante do localStorage ao carregar a página
        window.onload = () => {
            const storedTime = localStorage.getItem("timeRemaining");
            if (storedTime) {
                timeRemaining = parseInt(storedTime, 10);
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;
                updateDisplay(minutes, seconds);
            } else {
                updateDisplay(25, 0); // Exibir o tempo padrão se não houver tempo armazenado
            }
        };
