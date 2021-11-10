const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var GLOBAL_GENERATEDTITLE = false;

function save(content, fileName) {
	var data = new Blob([content], {
		type: "text/plain"
	});
	var downloadUrl = window.URL.createObjectURL(data);
	var anchor = document.createElement("a");
	anchor.href = downloadUrl;
	anchor.download = fileName;
	anchor.click();
	window.URL.revokeObjectURL(data);
}

function generateProblem() {
	if (!GLOBAL_GENERATEDTITLE) {
		alert("请先添加标题");
		return;
	}

	var correctNumber = 0;
	var correct = [];

	for (var i = 0; i < document.getElementById('count').value; i++) {
		if (document.getElementById("answer-" + charSet[i]).checked) {
			correct.push("x");
			correctNumber++;
		} else correct.push("");
	}

	if (correctNumber == 0) {
		alert("至少要有一个选项是正确的。");
		return;
	}

	var x = text.value.replace(/[A-Z](\s*?)?([、\.]*?(\s*?))?/g, "$").split("$");
	generated.innerHTML += "+" + document.getElementById("score").value + "\n" + x[0].trim() + "\n";

	for (var i = 1; i < x.length; i++) {
		if (correctNumber >= 2) {
			generated.innerHTML += "[" + correct[i - 1] + "]" + x[i].trim() + "\n";
		} else {
			generated.innerHTML += "(" + correct[i - 1] + ")" + x[i].trim() + "\n";
		}
	}
}

function generateTitle() {
	GLOBAL_GENERATEDTITLE = true;
	generated.innerHTML += "\n# " + document.getElementById("title").value + "\n";
}

function generateOnClick() {
	generateProblem(document.getElementById('text').value, [document.getElementById('answer-A').checked, document.getElementById('answer-B').checked, document.getElementById('answer-C').checked, document.getElementById('answer-D').checked]);
}

function countOnChange() {
	document.getElementById('answers').innerHTML = "";

	for (var i = 0; i < document.getElementById('count').value; i++)
		if (typeof charSet[i] != "undefined") document.getElementById('answers').innerHTML += `<input type="checkbox" class="answer" id="answer-${charSet[i]}" name="answer"></input><label for="answer-${charSet[i]}">${charSet[i]}</label>`;
}

function countCheckValue() {
	if (document.getElementById('count').value < 2 || document.getElementById('count').value > 26) {
		document.getElementById('count').value = 2;
		alert("请输入一个0到26之内的整数！");
		countOnChange();
	}
}