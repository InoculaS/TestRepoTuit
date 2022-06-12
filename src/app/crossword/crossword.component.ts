import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-crossword',
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.scss']
})
export class CrosswordComponent implements OnInit {

  constructor(private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) { }


  ngOnInit(): void {
    let script = this._renderer2.createElement('script');
    script.type = `application/ld+json`;
    script.text = `
            {
                "@context": "https://schema.org"
                /* your schema.org microdata goes here */
            }
        `;

    this._renderer2.appendChild(this._document.body, script);
  }



  script = `
  CrosswordWidth = 20;
CrosswordHeight = 14;
Words = 16;
WordLength = new Array(5, 6, 6, 7, 7, 8, 10, 11, 4, 7, 4, 5, 9, 8, 6, 4);
Word = new Array("INERT", "DAZMOL", "QUVVAT", "ARALASH", "LODIGIN", "DVIGATEL", "KUCHLANISH", "HISOBLAGICH", "VATT", "VOLFRAM", "VOLT", "AMPER", "SAQLAGICH", "ISSIQLIK", "EDISON", "JOUL");
Clue = new Array("Sovuq lampalar deb ataluvchi lampalar ichiga solinadigan gaz turi",
  "Elektr tokining issiqlik tasiriga asosan ishlaydigan kundalik turmushda ishlatiladigan uy ro'zg'or buyumi",
  "Elektr tokining bajargan ishini shu ishni bajarish uchun ketgan vaqtga nisbati bilan aniqlanadigan fizik kattalik",
  "Elektr istemolchilarni ulash turlaridan biri",
  "Birinchi cho'g'lanma lampa kim tomonidan yaratilgan",
  "Elektr energiyasini mexanik energiyaga aylantiruvchi qurilma",
  "Elektr tokining zaryadni ko'chirishda bajargan ishining shu zaryad miqdoriga nisbati orqali aniqlanadigan fizik kattalik",
  "Elektr tokining bajargan ishini o'lchovchi asbob",
  "Elektr quvvati o'lchov birligi",
  "Cho'g'lanma lampa spirali yasaladigan modda",
  "Elektr kuchlanish birligi",
  "Tok kuchining o'lchov birligi",
  "Elektr zanjirida qisqa tutashuvlardan himoyalovchi qurilma",
  "Elektr tokining ta'sirlaridan biri",
  "Cho'g'lanma lampani takomillashtirgan Amerikalik olim",
  "Elektr toki bajargan ishning o'lchov birligi");
AnswerHash = new Array(3528, 41371, 36492, 42636, 35608, 3165, 88339, 25316, 67767, 82854, 21216, 1715, 43823, 33911, 86207, 69009);
WordX = new Array(2, 11, 7, 6, 13, 0, 9, 2, 12, 4, 9, 6, 11, 16, 0, 13);
WordY = new Array(1, 1, 3, 5, 6, 8, 12, 0, 0, 3, 3, 5, 5, 6, 7, 9);
LastHorizontalWord = 6;
OnlyCheckOnce = false;


<script type="text/javascript">

// EclipseCrossword (C) Copyright 2000-2013 Green Eclipse.
// The puzzle itself remains the property of its creator. Do not remove this copyright notice.

var BadChars = "\`~!@^*()_={[}]\\|:;\"',<>/?";

        var TableAcrossWord, TableDownWord;
        var CurrentWord, PrevWordHorizontal, x, y, i, j;
        var CrosswordFinished, Initialized;

        // Check the user's browser and then initialize the puzzle.
        if (document.getElementById("waitmessage") != null) {
          document.getElementById("waitmessage").innerHTML = "Iltimos, krossvord yuklanguncha kuting...";

          // Current game variables
          CurrentWord = -1;
          PrevWordHorizontal = false;

          // Create the cell-to-word arrays.
          TableAcrossWord = new Array(CrosswordWidth);
          for (var x = 0; x < CrosswordWidth; x++) TableAcrossWord[x] = new Array(CrosswordHeight);
          TableDownWord = new Array(CrosswordWidth);
          for (var x = 0; x < CrosswordWidth; x++) TableDownWord[x] = new Array(CrosswordHeight);
          for (var y = 0; y < CrosswordHeight; y++)
            for (var x = 0; x < CrosswordWidth; x++) {
              TableAcrossWord[x][y] = -1;
              TableDownWord[x][y] = -1;
            }

          // First, add the horizontal words to the puzzle.
          for (var i = 0; i <= LastHorizontalWord; i++) {
            x = WordX[i];
            y = WordY[i];
            for (var j = 0; j < WordLength[i]; j++) {
              TableAcrossWord[x + j][y] = i;
            }
          }

          // Second, add the vertical words to the puzzle.
          for (var i = LastHorizontalWord + 1; i < Words; i++) {
            x = WordX[i];
            y = WordY[i];
            for (var j = 0; j < WordLength[i]; j++) {
              TableDownWord[x][y + j] = i;
            }
          }

          // Now, insert the crossword table.
          document.writeln("<table id=\"crossword\" cellpadding=\"0\" cellspacing=\"0\" style=\"display: none; border-collapse: collapse;\">");
          for (var y = 0; y < CrosswordHeight; y++) {
            document.writeln("<tr>");
            for (var x = 0; x < CrosswordWidth; x++) {
              if (TableAcrossWord[x][y] >= 0 || TableDownWord[x][y] >= 0)
                document.write("<td id=\"c" + PadNumber(x) + PadNumber(y) + "\" class=\"ecw-box ecw-boxnormal_unsel\" onclick=\"SelectThisWord(event);\">&nbsp;</td>");
              else
                document.write("<td><\/td>");
            }
            document.writeln("<\/tr>");
          }
          document.writeln("<\/table>");

          // Finally, show the crossword and hide the wait message.
          Initialized = true;
          document.getElementById("waitmessage").style.display = "none";
          document.getElementById("crossword").style.display = "block";
        }

        // * * * * * * * * * *
        // Event handlers

        // Raised when a key is pressed in the word entry box.
        function WordEntryKeyPress(event) {
          if (CrosswordFinished) return;
          // Treat an Enter keypress as an OK click.
          if (CurrentWord >= 0 && event.keyCode == 13) OKClick();
        }

        // * * * * * * * * * *
        // Helper functions

        // Called when we're ready to start the crossword.
        function BeginCrossword() {
          if (Initialized) {
            document.getElementById("welcomemessage").style.display = "";
            document.getElementById("checkbutton").style.display = "";
          }
        }

        // Returns true if the string passed in contains any characters prone to evil.
        function ContainsBadChars(theirWord) {
          for (var i = 0; i < theirWord.length; i++)
            if (BadChars.indexOf(theirWord.charAt(i)) >= 0) return true;
          return false;
        }

        // Pads a number out to three characters.
        function PadNumber(number) {
          if (number < 10)
            return "00" + number;
          else if (number < 100)
            return "0" + number;
          else
            return "" + number;
        }

        // Returns the table cell at a particular pair of coordinates.
        function CellAt(x, y) {
          return document.getElementById("c" + PadNumber(x) + PadNumber(y));
        }

        // Deselects the current word, if there's a word selected.  DOES not change the value of CurrentWord.
        function DeselectCurrentWord() {
          if (CurrentWord < 0) return;
          var x, y, i;

          document.getElementById("answerbox").style.display = "none";
          ChangeCurrentWordSelectedStyle(false);
          CurrentWord = -1;

        }

        // Changes the style of the cells in the current word.
        function ChangeWordStyle(WordNumber, NewStyle) {
          if (WordNumber < 0) return;
          var x = WordX[WordNumber];
          var y = WordY[WordNumber];

          if (WordNumber <= LastHorizontalWord)
            for (i = 0; i < WordLength[WordNumber]; i++)
              CellAt(x + i, y).className = NewStyle;
          else
            for (i = 0; i < WordLength[WordNumber]; i++)
              CellAt(x, y + i).className = NewStyle;
        }

        // Changes the style of the cells in the current word between the selected/unselected form.
        function ChangeCurrentWordSelectedStyle(IsSelected) {
          if (CurrentWord < 0) return;
          var x = WordX[CurrentWord];
          var y = WordY[CurrentWord];

          if (CurrentWord <= LastHorizontalWord)
            for (i = 0; i < WordLength[CurrentWord]; i++)
              CellAt(x + i, y).className = CellAt(x + i, y).className.replace(IsSelected ? "_unsel" : "_sel", IsSelected ? "_sel" : "_unsel");
          else
            for (i = 0; i < WordLength[CurrentWord]; i++)
              CellAt(x, y + i).className = CellAt(x, y + i).className.replace(IsSelected ? "_unsel" : "_sel", IsSelected ? "_sel" : "_unsel");
        }

        // Selects the new word by parsing the name of the TD element referenced by the
        // event object, and then applying styles as necessary.
        function SelectThisWord(event) {
          if (CrosswordFinished) return;
          var x, y, i, TheirWord, TableCell;

          // Deselect the previous word if one was selected.
          document.getElementById("welcomemessage").style.display = "none";
          if (CurrentWord >= 0) OKClick();
          DeselectCurrentWord();

          // Determine the coordinates of the cell they clicked, and then the word that
          // they clicked.
          var target = (event.srcElement ? event.srcElement : event.target);
          x = parseInt(target.id.substring(1, 4), 10);
          y = parseInt(target.id.substring(4, 7), 10);

          // If they clicked an intersection, choose the type of word that was NOT selected last time.
          if (TableAcrossWord[x][y] >= 0 && TableDownWord[x][y] >= 0)
            CurrentWord = PrevWordHorizontal ? TableDownWord[x][y] : TableAcrossWord[x][y];
          else if (TableAcrossWord[x][y] >= 0)
            CurrentWord = TableAcrossWord[x][y];
          else if (TableDownWord[x][y] >= 0)
            CurrentWord = TableDownWord[x][y];

          PrevWordHorizontal = (CurrentWord <= LastHorizontalWord);

          // Now, change the style of the cells in this word.
          ChangeCurrentWordSelectedStyle(true);

          // Then, prepare the answer box.
          x = WordX[CurrentWord];
          y = WordY[CurrentWord];
          TheirWord = "";
          var TheirWordLength = 0;
          for (i = 0; i < WordLength[CurrentWord]; i++) {
            // Find the appropriate table cell.
            if (CurrentWord <= LastHorizontalWord)
              TableCell = CellAt(x + i, y);
            else
              TableCell = CellAt(x, y + i);
            // Add its contents to the word we're building.
            if (TableCell.innerHTML != null && TableCell.innerHTML.length > 0 && TableCell.innerHTML != " " && TableCell.innerHTML.toLowerCase() != "&nbsp;") {
              TheirWord += TableCell.innerHTML.toUpperCase();
              TheirWordLength++;
            }
            else {
              TheirWord += "&bull;";
            }
          }

          document.getElementById("wordlabel").innerHTML = TheirWord;
          document.getElementById("wordinfo").innerHTML = ((CurrentWord <= LastHorizontalWord) ? "Eniga, " : "Bo'yiga, ") + WordLength[CurrentWord] + " harf.";
          document.getElementById("wordclue").innerHTML = Clue[CurrentWord];
          document.getElementById("worderror").style.display = "none";
          document.getElementById("cheatbutton").style.display = (Word.length == 0) ? "none" : "";
          if (TheirWordLength == WordLength[CurrentWord])
            document.getElementById("wordentry").value = TheirWord.replace(/&AMP;/g, '&');
          else
            document.getElementById("wordentry").value = "";

          // Finally, show the answer box.
          document.getElementById("answerbox").style.display = "block";
          try {
            document.getElementById("wordentry").focus();
            document.getElementById("wordentry").select();
          }
          catch (e) {
          }

        }

        // Called when the user clicks the OK link.
        function OKClick() {
          var TheirWord, x, y, i, TableCell;
          if (CrosswordFinished) return;
          if (document.getElementById("okbutton").disabled) return;

          // First, validate the entry.
          TheirWord = document.getElementById("wordentry").value.toUpperCase();
          if (TheirWord.length == 0) {
            DeselectCurrentWord();
            return;
          }
          if (ContainsBadChars(TheirWord)) {
            document.getElementById("worderror").innerHTML = "Siz kiritgan so\`zda yaroqsiz belgilar mavjud. Yuqoridagi katakchaga faqat harflarni kiriting.";
            document.getElementById("worderror").style.display = "block";
            return;
          }
          if (TheirWord.length < WordLength[CurrentWord]) {
            document.getElementById("worderror").innerHTML = "Siz yetarlicha harf yozmadingiz. Bu so\`zda " + WordLength[CurrentWord] + "  ta harf bor.";
            document.getElementById("worderror").style.display = "block";
            return;
          }
          if (TheirWord.length > WordLength[CurrentWord]) {
            document.getElementById("worderror").innerHTML = "Siz juda ko\`p harf kiritdingiz.  Bu so\`zda " + WordLength[CurrentWord] + " ta harf bor.";
            document.getElementById("worderror").style.display = "block";
            return;
          }

          // If we made it this far, they typed an acceptable word, so add these letters to the puzzle and hide the entry box.
          x = WordX[CurrentWord];
          y = WordY[CurrentWord];
          for (i = 0; i < TheirWord.length; i++) {
            TableCell = CellAt(x + (CurrentWord <= LastHorizontalWord ? i : 0), y + (CurrentWord > LastHorizontalWord ? i : 0));
            TableCell.innerHTML = TheirWord.substring(i, i + 1);
          }
          DeselectCurrentWord();
        }

        // Called when the "check puzzle" link is clicked.
        function CheckClick() {
          var i, j, x, y, UserEntry, ErrorsFound = 0, EmptyFound = 0, TableCell;
          if (CrosswordFinished) return;
          DeselectCurrentWord();

          for (y = 0; y < CrosswordHeight; y++)
            for (x = 0; x < CrosswordWidth; x++)
              if (TableAcrossWord[x][y] >= 0 || TableDownWord[x][y] >= 0) {
                TableCell = CellAt(x, y);
                if (TableCell.className == "ecw-box ecw-boxerror_unsel") TableCell.className = "ecw-box ecw-boxnormal_unsel";
              }

          for (i = 0; i < Words; i++) {
            // Get the user's entry for this word.
            UserEntry = "";
            for (j = 0; j < WordLength[i]; j++) {
              if (i <= LastHorizontalWord)
                TableCell = CellAt(WordX[i] + j, WordY[i]);
              else
                TableCell = CellAt(WordX[i], WordY[i] + j);
              if (TableCell.innerHTML.length > 0 && TableCell.innerHTML.toLowerCase() != "&nbsp;") {
                UserEntry += TableCell.innerHTML.toUpperCase();
              }
              else {
                UserEntry = "";
                EmptyFound++;
                break;
              }
            }
            UserEntry = UserEntry.replace(/&AMP;/g, '&');
            // If this word doesn't match, it's an error.
            if (HashWord(UserEntry) != AnswerHash[i] && UserEntry.length > 0) {
              ErrorsFound++;
              ChangeWordStyle(i, "ecw-box ecw-boxerror_unsel");
            }
          }

          // If they can only check once, disable things prematurely.
          if (OnlyCheckOnce) {
            CrosswordFinished = true;
            document.getElementById("checkbutton").style.display = "none";
          }

          // If errors were found, just exit now.
          if (ErrorsFound > 0 && EmptyFound > 0)
            document.getElementById("welcomemessage").innerHTML = ErrorsFound + (ErrorsFound > 1 ? " xatolar" : " xato") + " va " + EmptyFound + (EmptyFound > 1 ? " to\`liq bo\`lmagan so\`zlar" : " to\`liq bo\`lmagan so\`z") + " topildi.";
          else if (ErrorsFound > 0)
            document.getElementById("welcomemessage").innerHTML = ErrorsFound + (ErrorsFound > 1 ? " xatolar" : " xato") + " topildi.";
          else if (EmptyFound > 0)
            document.getElementById("welcomemessage").innerHTML = "Hech qanday xato topilmadi, lekin " + EmptyFound + (EmptyFound > 1 ? " to\`liq bo\`lmagan so\`zlar" : " to\`liq bo\`magan so\`z") + " topildi.";

          if (ErrorsFound + EmptyFound > 0) {
            document.getElementById("welcomemessage").style.display = "";
            return;
          }

          // They finished the puzzle!
          CrosswordFinished = true;
          document.getElementById("checkbutton").style.display = "none";
          document.getElementById("congratulations").style.display = "block";
          document.getElementById("welcomemessage").style.display = "none";
        }

        // Called when the "cheat" link is clicked.
        function CheatClick() {
          if (CrosswordFinished) return;
          var OldWord = CurrentWord;
          document.getElementById("wordentry").value = Word[CurrentWord];
          OKClick();
          ChangeWordStyle(OldWord, "ecw-box ecw-boxcheated_unsel");
        }

        // Returns a one-way hash for a word.
        function HashWord(Word) {
          var x = (Word.charCodeAt(0) * 719) % 1138;
          var Hash = 837;
          var i;
          for (i = 1; i <= Word.length; i++)
            Hash = (Hash * i + 5 + (Word.charCodeAt(i - 1) - 64) * x) % 98503;
          return Hash;
        }

      </script>
`
}


