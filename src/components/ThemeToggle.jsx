function ThemeToggle({ dark, setDark }) {
  return (
    <button
      className="btn btn-outline-primary"
      onClick={() => setDark(!dark)}
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
