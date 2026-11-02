# Probeaufgabe: Zählerstand-Widget

Willkommen und danke für dein Interesse!

In dieser Aufgabe entwickelst du ein kleines, bestehendes Feature weiter: ein **Vue-Widget**, mit dem
Kund*innen ihren Zählerstand melden können, und die **FirstSpirit-Absatzvorlage**, über die die
Redaktion das Widget in Seiten einbaut.

Der Code in diesem Repository ist **bewusst nicht in gutem Zustand**: Es gibt Fehler, Lint-Fehler
und Stellen, die man besser machen kann. Das Finden und Beheben gehört zur Aufgabe.

---

## Rahmen

- **Zeit:** Plane etwa **4 Stunden** ein und bleib dabei. Du musst nicht alles schaffen –
  **wie du priorisierst**, ist Teil der Aufgabe. Schreib im README auf, was du weggelassen hast und warum.
- **Umfang:** Bearbeite so viel, wie du kannst. Wenn am Ende nicht alles abgearbeitet ist, ist das kein Problem. Viel wichtiger und interessanter ist die Vorgehensweise.
- **Hilfsmittel:** Doku, Suchmaschinen und KI-Assistenten sind erlaubt. Gib im README kurz an,
  wofür du KI genutzt hast. In der Nachbesprechung solltest du jede Zeile erklären können.
- **Abgabe:** als Link zu einem Git-Repository oder als Zip **inklusive `.git`-Ordner**.
  Wir schauen uns auch deine Commits an – kleine, nachvollziehbare Commits sind gern gesehen.
- **Nachbesprechung:** ca. 45 Minuten. Du stellst deine Lösung vor.

## Voraussetzungen und Start

- Node.js **22** oder neuer
- Für Teil C: .NET 8+ **oder** Java 21+

```bash
npm install
npm start            # startet Mock-API (Port 3001) und Vite-Dev-Server (Port 5173)
```

Dann <http://localhost:5173> öffnen.

| Befehl | Zweck |
|---|---|
| `npm start` | Mock-API und Dev-Server zusammen starten |
| `npm run mock-api` / `npm run dev` | einzeln starten |
| `npm run mock-api:reset` | Mock-Daten auf den Ausgangszustand zurücksetzen |
| `npm test` | Unit-Tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript-Prüfung (vue-tsc) |
| `npm run check:xml` | Prüft die XML-Dateien unter `cms/` auf Wohlgeformtheit |

## Was ist drin?

```
src/                    Vue-3-Widget (TypeScript)
mock-api/               Mock-REST-API (json-server) + openapi.yaml
cms/                    FirstSpirit-Absatzvorlage (Formular, Regeln, HTML-Ausgabe) + Anforderungen
backend/                leer – Platz für Teil C
.github/workflows/      leer – Platz für Teil D
index.html              simuliert eine vom CMS erzeugte Seite mit zwei Widget-Absätzen
```

Die Endpunkte der API und ihr (teils absichtlich unfreundliches) Verhalten sind in
[`mock-api/openapi.yaml`](mock-api/openapi.yaml) beschrieben.

---

## Die Aufgaben

### Teil A – Vue-Widget überarbeiten

Nutzer*innen und Tester*innen haben unter anderem Folgendes gemeldet:

- „Wenn ich einen anderen Zähler auswähle, ändert sich nichts.“
- „Als letzter Stand wird ein alter Wert angezeigt.“
- „Ich habe `11900,5` eingegeben, es kam ‚Danke!‘ – aber gespeichert wurde nichts.“
- „Beim Stromzähler steht m³.“
- „Manchmal passiert einfach gar nichts, und ich weiß nicht, ob es lädt oder kaputt ist.“
- „Auf der Seite mit zwei Widgets funktioniert nur eins.“

1. **Behebe die gemeldeten Fehler.** Du findest bestimmt noch weitere – nimm mit, was dir sinnvoll erscheint.
2. **Nutzerführung:** Lade-, Fehler- und Erfolgszustände im Widget statt `alert()`, verständliche
   Fehlermeldungen, bedienbar per Tastatur, Formularfelder mit Beschriftung.
3. **Validierung:** Der neue Stand darf nicht kleiner als der letzte Stand sein. Deutsche Eingaben mit
   Komma sollen funktionieren. Lagere die Validierung so aus, dass sie ohne Komponente testbar ist.
4. **Code-Qualität:** Typen statt `any`, `npm run lint` und `npm run typecheck` ohne Fehler,
   eine Struktur, die du im Team gern weiterentwickeln würdest.

### Teil B – FirstSpirit-Absatzvorlage erweitern

Die Anforderungen der Redaktion und das Zielbild für das HTML stehen in
[`cms/README.md`](cms/README.md).

1. **Formular** (`form.xml`): Erweitere das Formular um alle geforderten Felder und bring die
   vorhandenen Felder in Ordnung (Namen, Beschriftungen für die Redaktion).
2. **Regeln** (`rules.xml`): Die Überschrift ist ein Pflichtfeld.
3. **Ausgabe** (`output_html.fs`): Erzeuge das Markup aus dem Zielbild mit der FirstSpirit-Vorlagensyntax.
   Nicht gepflegte Felder sollen nicht als leere Elemente ausgegeben werden.
4. Setze die Anforderungen aus der Tabelle in `cms/README.md` in Regeln bzw. Formular um
   (Pflichtfelder, Längen).
5. Sorg dafür, dass die Ausgabe auch bei **mehreren Absätzen** auf einer Seite und bei Sonderzeichen
   in Redaktionstexten (z. B. `"` in der Erfolgsmeldung) korrektes HTML ergibt.

### Teil A+B – Widget an die CMS-Konfiguration anbinden

Das Widget soll seine Konfiguration aus den `data-*`-Attributen lesen (Energieart, Verlauf anzeigen,
Erfolgsmeldung) und mit mehreren Instanzen auf einer Seite funktionieren. Pass `index.html` so an,
dass sie die Ausgabe **deiner** neuen Absatzvorlage simuliert. Nimm am besten zwei unterschiedlich
konfigurierte Absätze.

### Teil C – Backend-Proxy

Siehe [`backend/README.md`](backend/README.md). C#/.NET oder Java, eine Minimalversion reicht.

### Teil D – Continuous Integration

Leg unter `.github/workflows/` eine GitHub-Actions-Pipeline an, die bei jedem Push und Pull Request
Lint, Typecheck, Tests und `check:xml` ausführt. Wenn du Teil C gemacht hast: gern auch Build und
Tests des Backends.

### Teil E – Dokumentation

Ergänze am Ende dieser Datei einen Abschnitt **„Meine Lösung“** mit:

- Was hast du geändert und warum? (Stichpunkte reichen)
- Welche Annahmen hast du getroffen?
- Was hast du bewusst weggelassen, und was würdest du mit mehr Zeit als Nächstes tun?
- Wofür hast du KI-Werkzeuge genutzt?
- Wie würdest du Widget-Skript, CMS und Backend in Produktion zusammenbringen
  (Auslieferung, Caching, Fehlerfälle, Sicherheit)? Eine halbe Seite reicht.

---

Bei Fragen melde dich gern bei uns. Unklarheiten darfst du aber auch selbst entscheiden und im README
begründen. Viel Spaß!

## Meine Lösung

Meine Änderungen

Was hast du geändert und warum? (Stichpunkte reichen)

1. Überprüfung der Daten mithilfe der existierenden Befehle für den typecheck und linter
2. Überprüfung des Frontends des Widgets
3. Analyse des bestehenden Codes um festzustellen was ich unbedingt anpassen will
4. Erstellen von interfaces angepasst unter Berücksichtigung der Daten aus der Mock API
5. Anpassung des Zählerstandwidgets zur Verwendung der interfaces
6. Auslagerung der einer Hilfsfunktion zur Validierung der Eingabe durch den User
7. Wiederherstellung der Reaktivität bei der Auswahl des Zählers
8. Erstellen einer Sort Hilfsfunktion um die History von aktuell nach alt zu sortieren
9. Auslagerung des inline Styles in den Styling Parts des Templates und Verbesserung der Barrierefreiheit
10. Auslagerung der API Calls in ein Service API um den Code schlank zu halten
11. Vorbereitung des Codes um mehrere Instanzen auf einer Seite zu haben
12. Forms und Rules anpassen im CMS task der Aufgabe
13. Anpassen der index.html und main.ts um mehrere Absätze zu verwenden

Die ersten Schritte sollten dazu dienen mir ein klares Bild über den bestehenden Code zu verschaffen
und die entsprechenden Mängel aus meiner Sicht zu identifizieren (1-3). Im weiteren Verlauf habe ich
damit weitergemacht die Fehler des linter zu beheben und die Typisierung zu optimieren. Eigentlich
hätte ich mich normalerweise dem Styling gewidmet, aber da dies bereits bestand mit inline Styling
habe ich es zu diesem Zeitpunkt noch nicht angerührt. Da meine Vorgehensweise normalerweise Erstellung
des HTML, Styling, Funktionalität und dann testing ist. Da jedoch zu dem Zeitpunkt ein gewisses Styling bestand
und die Zeit knapp bemessen war, habe ich mich dazu entschlossen mich, um die Funktionalitäten zu kümmern.
Als Erstes habe ich die Reaktivität des Widgets wiederhergestellt und damit begonnen die entsprechenden
Stellen im Template anzupassen und ging dazu über mich um die Aufarbeitung der Daten zu widmen. Danach
habe ich mich darum gekümmert, dass der Code den Normen der Barrierefreiheit entspricht und den inline
Style entfernt. Für eine bessere Wartbarkeit und Übersichtlichkeit habe ich, die API calls als auch
meine Hilfsfunktionen ausgelagert. Die Hilfsfunktionen sind ohne das Testing des Templates möglich und
die nötigen API calls sind extrahiert.

Welche Annahmen hast du getroffen?

Aufgrund der kurzen Zeit für die AUfgabe habe ich mich dazu entschieden lediglich den User, darauf
hinzuweisen, dass etwas schiefgelaufen ist bei der Übertragung und erwarte einen weiteren Sendeversuch
des Nutzers. Hier könnte man entweder den Hilfetext anpassen wie der User damit umgehen kann.

Was hast du bewusst weggelassen, und was würdest du mit mehr Zeit als Nächstes tun?

Aktuell habe ich das Schreiben und Erweitern der bestehenden Tests vernachlässigt, da dies auch immer
ein recht zeitintensiver Aufwand ist, wäre die man nächster Schritt. Da die Bereiche des Front- und
Backends sehr gekapselt behandelt werden können. Danach würde ich mich dem Backend widmen. Nach dem
Backend würde die Einbindung der Tests also Unit Tests, linter und typecheck in die Pipeline einbinden.
Zu guter Letzt würde ich nochmal einen Blick über die UI werfen und über das Grundstyling hinaus erweitern.
Eine weitere Möglichkeit wäre ist auch noch an der Barrierefreiheit stärker zu arbeiten.

Wofür hast du KI-Werkzeuge genutzt?

Ich habe KI Werkzeuge an verschiedenen Stellen genutzt, da ich in meiner IDE Webstorm google Antigravity integriert habe.
Ich habe unter anderem den Autocomplete genutzt, als auch die KI zur Analyse meines Codes um
möglichst die best Practices einzuhalten. Speziell bei der Erstellung der Forms.xml, rules.xml und
dem HTML von Firstspirit habe ich sehr stark auf die Erstellung des Codes durch KI gestützt, da mir
in diesem Bereich die Erfahrung fehlt im Umgang mit Firstspirit und in dieser kurzen Zeit mir nicht
das nötige Wissen hätte aneignen können.

Wie würdest du Widget-Skript, CMS und Backend in Produktion zusammenbringen
(Auslieferung, Caching, Fehlerfälle, Sicherheit)? Eine halbe Seite reicht.

Ich würde es als ein Ticket mit verschiedenen Subtasks herunterbrechen. Ich würde das Ticket in die folgenden Subtasks herunterbrechen.
Erster Subtask Errstellung des Fronends mit dem entsprechenden Unit Tests und testing. Zweiter Subtask wäre die Erstellung des Backends und
als dritten würde ich die Erstellung des Formvorlagen im CMS erstellen.

Die Eingaben werden zum einen Lokal zwischengespeichert im Session Storage. Das Scriptbundle wird mit einem
Hash ausgeliefert, um eine Einzigartigkeit für die laufende Session zu gewährleisten.

Sollte das Script clientseitig ausfallen, wird ein Fallback ausgegeben, der ohne die Daten des CMS
funktioniert. Dafür muss sollte beispielweise mithilfe der von Defaults beim Setzen der Props im Template
gearbeitet werden.

Um Sicherheiten zu gewährleisten würde ich nur bestimmte Eingaben in dem Inputfeld zulassen, damit die User kein
JS in den Input ausführen können.
