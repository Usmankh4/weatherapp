function Header({title, theme, onThemeToggle}){
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={onThemeToggle}>{theme === "dark" ? "Light Mode ": "Dark Mode"}</button>
        </div>
    )
}
export default Header;