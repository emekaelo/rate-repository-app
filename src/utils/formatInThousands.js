export function formatInThousands(num) {
    if (num >= 1000) {
        const formatted = (num / 1000).toFixed(1) + "k";
        return formatted;
    } else {
        return num.toString();
    }
}