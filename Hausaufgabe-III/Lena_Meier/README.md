# Helper functions to pull data from g-sheets

`function getRow(row)`

Helper-Funktion, die eine bestimmte Zeile getted (row = Zeilennummer)

---

`function getRows(rowStart = 0, rowEnd = data.length)`

Helper-Funktion, die bestimmte Zeilen getted (rowStart = Zeilennummer Start, sonst 0; rowEnd = Zeilennummer Ende, sonst alle Zeilen)

---

`function getColumn(column)`

Helper-Funktion, die eine bestimmte Spalte getted (column = Zeilennummer)

---

`function getColumns(columnStart = 0, columnEnd = Object.values(data[0]).length) `

Helper-Funktion, die bestimmte Spalten getted (columnStart = Spaltennummer Start, sonst 0; columnEnd = Sapltennummer Ende, sonst alle Spalten)

---

`function getCell(row, column)`

Helper-Funktion, die eine bestimmte Zelle getted (row = Zeile, column = Spalte)

---

`function appendValues(values = [], appendToObj = "output", wrapperClass = "wrapper")`

Helper-Funktion, die einen Array von values an ein HTML-Objekt (default = "output") anhängt. Dabei werden die Objekte zeilenweise an eine wrapperClass (default = "wrapper") angehängt.
