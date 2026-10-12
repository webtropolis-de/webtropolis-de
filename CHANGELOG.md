# Changelog

## 2026-10-12 – Visuelles Portfolio und kürzere Projekttexte

- Ziel: das GitHub-Profil schneller erfassbar machen und Anwendungen visuell zeigen.
- Umsetzung: SVG-Kopfbanner, zehn lokal gespeicherte Technologie-Badges mit Logos, vorhandene App-Icons, Nachtmanager-Logo mit heller/dunkler Variante, sichtbare Produktansicht und öffentliche 3D-Festivalkarte. Lange Featurelisten durch kurze Beschreibungen und kompakte Projektkarten ersetzt; alle bisherigen Projekte bleiben enthalten.
- Dateien: README.md, assets/profile-banner.svg, assets/badges/*, assets/logos/*, assets/nightmanager-app.png, assets/festivalplaner.png; überholten Screenshot assets/nightmanager-website.png entfernt.
- Medienherkunft: Logos und App-Icons aus den eigenen Projektordnern; Nachtmanager-Produktansicht aus den Website-Medien mit fiktiven Beispieldaten; Festivalplaner-Screenshot aus der anonym erreichbaren öffentlichen Besucherkarte; Technologie-Badges von Shields.io. Das Stimmwerk-Menübild mit persönlichen Nutzungs- und Netzwerkdaten wurde nicht übernommen.
- Validierung: GitHub-Markdown-Rendering, lokale Bildreferenzen und SVG-Struktur geprüft. Lokale Browser-Vorschau bei 1100 und 390 Pixeln sowie im Dark Theme geprüft; Bilder laden, kein horizontaler Seitenüberlauf. git diff --check vor Veröffentlichung.
- Live-Risiko: ausschließlich öffentliche Profil-Dokumentation; keine Änderungen an Anwendungen, Infrastruktur oder Zugangsdaten. Medien werden im Repository gespeichert und benötigen keine Badge-Dienste beim Profilaufruf.
- Rollback: Portfolio-Commit mit git revert rückgängig machen; vorheriger veröffentlichter Stand ist 9bcbc90.

## 2026-10-12 – Projektportfolio für das GitHub-Profil ergänzt

- Ziel: Arbeitgebern einen nachvollziehbaren Überblick über Projekte und technische Schwerpunkte geben.
- Umsetzung: Nachtmanager erweitert und Produktwebsite verlinkt; Stimmwerk, Festivalplaner, Haushaltsbuch, InfoPoint, SysInfoTool und Webtropolis AI ergänzt. Bestehenden Amazon-Rechner und Kontaktlinks erhalten. Zwei aufklappbare Screenshots öffentlicher Seiten ergänzt.
- Dateien: README.md, assets/nightmanager-website.png, assets/infopoint.png.
- Validierung: Beschreibungen mit lokalen Projektunterlagen und ausgewählten Quelldateien abgeglichen; beide fotografierten Seiten mit HTTP 200 geöffnet und Bilder visuell geprüft; GitHub-Markdown-API und lokale Bildverweise geprüft; git diff --check erfolgreich. Kein vollständiger Funktions- oder Release-Audit der vorgestellten Anwendungen.
- Live-Risiko: rein redaktionelle Profiländerung; Veröffentlichung der vorbereiteten README und Screenshots auf ausdrücklichen Nutzerwunsch. Screenshots zeigen den Stand vom 12.10.2026.
- Rollback: ursprüngliche README aus dem bisherigen Git-Stand wiederherstellen und neu hinzugefügte Portfolio-Dateien gezielt entfernen.
