# Applied-AI Team 6

Die Webapp kann über folgenden link aufgerufen werden: https://monsieur-monet.github.io/applied-ai/

### Was soll die Anwendung können?
* Automatisches Training eines Modells auf Basis des MNIST-Datensatzes (Ziffern 0-9)
* Treffsicherheit des Modells auf Basis von Testdaten ausgeben
* Möglichkeit bieten, eigene Zahlen auf einem Canvas zu zeichnen (und wieder zu löschen)
* Modell versucht, User-gezeichnete Zahlen zu erkennen und gibt Voraussage ab
* Modell weiter trainierbar mit User-generierten Zeichnungen von Zahlen (erkannte Zahlen sowie auch Korrekturen bei falschen Predictions)
* Weights visualisieren
  * Alle Weights der Zahlen anzeigen
  * Live Aktualisierungen der Weights der Zahlen
  * Prediction-Weights visualisieren
* Lokales Speichern des trainierten Modells (um das Trainieren nicht jedes Mal durchführen zu müssen)
* Möglichkeit, das gespeicherte Modell zu löschen um es neu zu trainieren

### Wie ist die Aufgabe eingegrenzt und beherrschbar gemacht?
* Zunächst keine Möglichkeit für Buchstaben, da es hierfür keine leicht zugänglichen Daten wie mit mnist-data.js gab
