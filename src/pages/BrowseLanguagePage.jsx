const LANGUAGES = [
  "English", "Spanish", "French", "German", "Korean",
  "Japanese", "Hindi", "Portuguese", "Italian", "Arabic",
];

export default function BrowseLanguagePage() {
  return (
    <main className="rows" style={{ paddingTop: "110px", minHeight: "60vh", padding: "110px 4% 60px" }}>
      <h1 style={{ marginBottom: "20px" }}>Browse by Language</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "12px",
        }}
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            style={{
              background: "#2a2a2a",
              border: "none",
              color: "#fff",
              padding: "24px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            {lang}
          </button>
        ))}
      </div>
    </main>
  );
}
