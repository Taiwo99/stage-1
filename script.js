// Function to generate a random color
        function getRandomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return { r, g, b };
        }

        // Function to generate a shade of a given color
        function generateShade(baseColor, factor) {
            return `rgb(${Math.min(255, baseColor.r + factor)}, ${Math.min(255, baseColor.g + factor)}, ${Math.min(255, baseColor.b + factor)})`;
        }

        let targetColor = "";
        let score = 0;

         // Function to start a new game round
         function startNewGame(resetScore = false) {
            if (resetScore) {
                score = 0;
                document.getElementById("score").innerText = `Score: ${score}`;
            }
            
            const baseColor = getRandomColor(); // Generate a base color
            const shades = [];
            for (let i = -50; i <= 50; i += 20) {
                shades.push(generateShade(baseColor, i));
            }
            
            // Randomly pick one of the shades as the target color
            targetColor = shades[Math.floor(Math.random() * shades.length)];
            document.getElementById("colorBox").style.backgroundColor = targetColor;
            
            generateColorOptions(shades);
            document.getElementById("gameStatus").innerText = "Pick a color!";
        }

        // Function to generate color buttons for selection
        function generateColorOptions(shades) {
            const colorOptionsContainer = document.getElementById("colorOptions");
            colorOptionsContainer.innerHTML = "";
            
            shades.forEach(color => {
                const button = document.createElement("button");
                button.className = "color-option";
                button.style.backgroundColor = color;
                button.dataset.testid = "colorOption";
                button.onclick = () => handleGuess(color);
                colorOptionsContainer.appendChild(button);
            });
        }

        // Function to handle the user's guess
        function handleGuess(color) {
            if (color === targetColor) {
                document.getElementById("gameStatus").innerText = "Correct!";
                score++;
                document.getElementById("score").innerText = `Score: ${score}`;
                setTimeout(startNewGame, 1000); // Delay new game for feedback
            } else {
                document.getElementById("gameStatus").innerText = "Wrong! Try again.";
            }
        }

        document.getElementById("newGameButton").addEventListener("click",() => startNewGame(true));
        
        startNewGame();