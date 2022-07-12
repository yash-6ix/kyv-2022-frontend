export const titleCase = (str) => {
    var splitStr = str.toLowerCase().trim().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
};

export const slugCase = (str) => {
    return str.toLowerCase().trim().replace(/\s+/g, "-");
};

export const shortenedText = (original, max) => {
    if (original && original.length > max) {
        return original.slice(0, max) + "...";
    }
    return original;
};

export const removeTags = (str) => {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
};
