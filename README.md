# Applied-AI Team 6

Die Webapp kann über folgenden link aufgerufen werden: https://monsieur-monet.github.io/applied-ai/

## Projektdokumentation

Basis der Webapplikation ist ein neuronales Netzwerk (basierend auf dem Perzeptron-Modell), das in der Lage ist, handgeschriebene Nummern zu erkennen.

Das Netzwerk wird beim erstmaligen Öffnen der Website mit einem Online-Datensatz namens MNIST trainiert. Dieser liefert in unserem Fall 5000 Bilder von unterschiedlichen, handgeschriebenen Ziffern (0-9) mit den jeweiligen “Lösungs-Beschriftungen”, die vom Netzwerk eingelesen werden. Beim Einlesen der Bilder werden pixelgenaue “Gewichte” gesetzt, sodass das Netzwerk dieser Basis die Übereinstimmung dieser Gewichte mit weiteren Bildern vergleichen kann und so eine Voraussage trifft, um welche Zahl es sich bei den neuen Bildern handelt.

Nachdem das Netzwerk mit den 5000 Bildern trainiert wurde, wird es mit 1000 weiteren, anderen Bildern getestet. Die Annahmen über die Lösungen der Test-Bilder werden mit den Lösungs-Beschriftungen dieser verglichen und die prozentuale Erkennungsrate ausgegeben. Im Schnitt liegt diese bei unserer Webapplikation bei ~90%.

Die Webapplikation bietet Usern die Möglichkeit, auf einem Canvas Ziffern zu malen, die währenddessen mit den Gewichten verglichen werden. Das Gewicht der Ziffer, welche die größte Übereinstimmung mit der Zeichnung des Nutzers besitzt, wird live daneben angezeigt, zusätzlich zur Textversion der am meisten übereinstimmenden Zahl. Der User kann die Zeichnung vom Canvas auch wieder durch Druck auf einen Button löschen.

Wenn vom Netzwerk richtig erkannt, kann der Nutzer das Modell mithilfe der Zeichnung weiter auf die Gewichte der erkannten Ziffer trainieren. Sofern die Erkennung falsch ist, kann dieser die eigentliche Lösung angeben und schließlich ebenfalls auf das richtige Gewicht trainiert und somit verbessert werden (sodass dieses die Zahl in dieser Zeichenweise nächstes mal mit höherer Wahrscheinlichkeit erkennt).


Die Gewichte der einzelnen Ziffern werden alle gleichzeitig visualisiert am unteren Rand der Website dargestellt und passen sich live während des initialen Trainings wie auch während des Nachtrainierens durch den Nutzer an.

Das trainierte Modell wird im localstorage des verwendeten Browsers gespeichert, sodass das Training des Modells mit den ersten 5000 Bildern nicht jedes Mal neu stattfinden muss. Beim Training durch den User wird das Modell ebenfalls jedes Mal wieder abgespeichert. Der Nutzer hat gleichzeitig auch die Möglichkeit, das gesamte Modell aus dem lokalen Speicher zu löschen und es direkt wieder mit 5000 Beispielbildern trainieren zu lassen. Hierbei kann er wieder live dabei zusehen, wie sich die Gewichte nach und nach entwickeln.


##Projektspezifikationen

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
