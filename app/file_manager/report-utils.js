export const report_keys = {
    1: {
        default: "Begin date  ",
        translated: "Начало даты",
    },
    2: {
        default: "End date  ",
        translated: "Конец даты"
    },
    3:
    {
        default: "Conv. cons. (Normal Volume)",
        translated: "Объем (С.У.) (нм3)"
    },
    4: {
        default: "Unconv. cons. (m3)",
        translated: "Объем (Р.У.) (нм3)"
    },
    5: {
        default: "Conv. cons. (AL) (Normal Volume)",
        translated: "Объем Трг.(С.У.) (нм3)"
    },
    6: {
        default: "Unconv. cons.(AL) (m3)",
        translated: "Объем Трг.(Р.У.) (нм3)"
    },
    9: {
        default: "Tav (°C)",
        translated: "Т сред. (С)"
    },
    10: {
        default: "Pav (Bar)",
        translated: "Р сред. (бар)"
    },
}
export const defaultFront = {
    name: 'Times New Roman',
    family: 4,
    size: 12,
    color: '#000000'
}
export const aligmentCenter = {
    vertical: 'middle',
    horizontal: 'center'
}
export const headerStyle = {
    font: {
        name: 'Times New Roman',
        family: 4,
        size: 14,
        bold: true,
        color: '#000000'
    },
    alignment: { vertical: 'middle', horizontal: 'center' }
}
export const descriptionStyle = {
    font: {
        defaultFront, italic: true, bold: true,
    },
    alignment: {
        aligmentCenter, wrapText: true
    }
}
export const tableHeaderStyle = {
    font: { defaultFront, bold: true },
    alignment: { aligmentCenter, wrapText: true }
}
export const tableStyle = {
    font: defaultFront,
    alignment: {
        aligmentCenter, wrapText: true
    }
}
