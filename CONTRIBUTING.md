# Contributing

Danke, dass du zum `Supernatural`-Projekt beitragen möchtest! Diese Richtlinien helfen uns, hohe Code-Qualität und Konsistenz zu bewahren.

## Code Style & Standards

### HTML
- Einrückung: **4 Leerzeichen** (definiert in `.editorconfig`)
- Semantische Elemente verwenden: `<article>`, `<header>`, `<footer>`, `<figure>` statt generischer `<div>`-Elemente
- **Alle Bilder müssen ein aussagekräftiges `alt`-Attribut haben**
- IDs müssen eindeutig sein (z. B. `id="article1"`, `id="article2"`)
- Neue Artikel-Abschnitte folgen diesem Muster:
  ```html
  <section id="articleN">
      <h2>Überschrift</h2>
      <figure>
          <img src="Pictures/file.jpg" alt="Beschreibung">
          <figcaption>Bildunterschrift</figcaption>
      </figure>
      <p>STANDORT/KATEGORIE: </p>
      <p>Artikel-Text...<br>Autor</p>
  </section>
  ```

### CSS
- Einrückung: **2 Leerzeichen**
- Klassen-Namen: `kebab-case` (z. B. `.article-title`, `.byline`)
- Verwende Flexbox oder Grid für Layouts

### JavaScript
- Einrückung: **2 Leerzeichen**
- Verwende aussagekräftige Variablennamen
- Kommentiere komplexe Logik

### Allgemein
- **Charset:** UTF-8
- **Zeilenumbrüche:** LF (Unix-Style)
- **Final Newline:** Jede Datei endet mit einer leeren Zeile
- **Trailing Whitespace:** Entfernen (außer `.md`-Dateien)

Alle diese Einstellungen sind in `.editorconfig` definiert und werden von VS Code/WebStorm automatisch angewendet.

## Workflow

### 1. Branch erstellen
```bash
git checkout -b feature/beschreibung
# oder
git checkout -b fix/bug-beschreibung
```

### 2. Änderungen vornehmen
- Kleine, fokussierte Commits bevorzugt
- Teste deine Änderungen lokal

### 3. Commit-Nachricht schreiben
Nutze prägnante, kurze Messages mit optionalem Präfix:
- `feat:` für neue Features (z. B. `feat: Neuer Artikel-Abschnitt`)
- `fix:` für Bugfixes (z. B. `fix: Fehlende alt-Attribute`)
- `docs:` für Dokumentation (z. B. `docs: README aktualisiert`)
- `style:` für Formatierung (z. B. `style: Einrückung korrigiert`)

Beispiel:
```bash
git commit -m "fix: HTML-Validierungsfehler in articles-2025-12-07.html behoben"
```

### 4. Push & Pull Request
```bash
git push origin feature/beschreibung
```
Erstelle dann einen Pull Request auf GitHub mit einer kurzen Beschreibung:
- Was wurde geändert?
- Warum?
- Betroffene Dateien/Artikel

## Vor dem Commit — Checkliste

- [ ] `.editorconfig`-Regeln eingehalten (VS Code sollte das automatisch machen)
- [ ] Alle Bilder haben `alt`-Attribute
- [ ] Keine doppelten IDs in HTML-Dateien
- [ ] HTML mit einem Validator geprüft (z. B. https://validator.w3.org/)
- [ ] Keine `console.log()`-Statements im Production-Code
- [ ] Trailing Whitespace entfernt

## Barrierefreiheit & Best Practices

- Semantische HTML-Struktur ist wichtig für Screen-Reader und SEO
- `<section>` für logische Gruppierungen, `<article>` für eigenständige Inhalte
- Verwende aussagekräftige Link-Texte (nicht „Klick hier")
- Farbkontraste beachten (WCAG AA-Standard minimum)

## Fragen & Support

- Öffne ein **Issue** auf GitHub für Bugs oder Feature-Requests
- Nutze **Discussions** für allgemeine Fragen
- Schreib dem Maintainer bei Fragen zur Contribution

---

Danke für deinen Beitrag! 🚀
