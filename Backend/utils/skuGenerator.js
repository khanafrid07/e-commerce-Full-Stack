const generateSKU = ({
    title = "",
    variant = {},
}) => {

    const namePart = title
        .slice(0, 3)
        .toUpperCase()
        .replace(/\s/g, "");

    const attrPart = Object.values(variant)
        .map((val) => val.toString().slice(0, 2).toUpperCase())
        .join("");

    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `${namePart}-${attrPart}-${randomPart}`;
};

module.exports = { generateSKU };