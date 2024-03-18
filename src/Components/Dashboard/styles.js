// export const success = { color: 'white', backgroundColor: "#3CD4A0" }
export const success = { color: 'white', backgroundColor: "#2A9D8F", backgroundColorLight: '#F8FFFE' }
export const warning = { color: 'white', backgroundColor: "#FFC260" }
export const error = { color: 'white', backgroundColor: "#E73040" }
export const secondary = { color: 'white', backgroundColor: "#FF5C93" }
export const tag1 = { color: 'white', backgroundColor: "#1AB4BC" }
export const tag2 = { color: 'white', backgroundColor: "#9C1ABC" }
export const grey_icons = { color: '#808080' }
export const hint = { color: '#264653' }

// general font and color
const fonts = { color: "#264653", family: "Roboto, Helvetica, Arial" }

// general button
export const btnStyle = {
    textTransform: 'none',
    color: '#F3FFFE',
    backgroundColor: '#2A9D8F',
    '&:hover': { backgroundColor: '#2A9D8F' },
}

export const btnStyle2 = {
    textTransform: "none",
    color: success.backgroundColor,
    outlineColor: success.backgroundColor,
    backgroundColor: success.backgroundColorLight,
    '&:hover': {}
}

export const deleteBtnStyle = {
    textTransform: 'none',
    color: '#fff',
    backgroundColor: '#E73040',
    '&:hover': { backgroundColor: '#E73040' },
}

// Widget
export const tableContent = { color: fonts.color, fontFamily: fonts.family, fontSize: "0.95rem", fontWeight: "500", lineHeight: "1.5rem", padding: "16px 16px 16px 24px" }
export const cardHeader = { color: "#7b7b7b", fontFamily: fonts.family, fontSize: "1.285rem", fontWeight: "400", lineHeight: "1.334", padding: "16px 16px 16px 0px" }
export const pageTitle = { color: "#888888", fontFamily: fonts.family, fontSize: "2.4rem", fontWeight: "400", marginBottom: "1.75rem" }

// Cards
export const fullHeightBody = { display: "flex", flexGrow: 1, flexDirection: "column", justifyContent: "space-between" }
export const statsBig = { color: fonts.color, fontFamily: fonts.family, fontSize: "28px", fontWeight: "300", }
export const statsSmall = { color: fonts.color, fontFamily: fonts.family, fontSize: "21px", fontWeight: "300", }
export const statsSmallHeader = { color: "rgb(110, 110, 110)", fontFamily: fonts.family, fontSize: "14px" }
export const card = { minHeight: "100%", display: "flex", flexDirection: "column" }
export const visitsNumberContainer = { display: "flex", alignItems: "center", flexGrow: 1, padding: "24px 0 24px 0" }