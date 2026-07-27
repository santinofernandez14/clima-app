export function getWeatherDescription(code: number) {

    switch (code) {

        case 0:
            return "☀️ Despejado";

        case 1:
            return "🌤️ Mayormente despejado";

        case 2:
            return "⛅ Parcialmente nublado";

        case 3:
            return "☁️ Nublado";

        case 45:
        case 48:
            return "🌫️ Niebla";

        case 51:
        case 53:
        case 55:
            return "🌦️ Llovizna";

        case 61:
        case 63:
        case 65:
            return "🌧️ Lluvia";

        case 71:
        case 73:
        case 75:
            return "❄️ Nieve";

        case 95:
            return "⛈️ Tormenta";

        default:
            return "🌍 Clima desconocido";

    }

}