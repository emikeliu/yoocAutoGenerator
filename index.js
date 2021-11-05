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
			const charSet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "K", "L", "M", "N"];
			for (var i = 0; i <= 3; i++) {
				if (document.getElementById("answer-" + charSet[i]).checked) {
					correct.push("x");
					correctNumber++;
				} else correct.push("");
			}
			if (correctNumber == 0) {
				alert("至少要有一个选项是正确的。");
				return;
			}
			console.log(text.value);
			var x = (text.value.replace(/[ABCD](\s*?)?([、\.]*?(\s*?))?/g, "$")).split("$");
			console.log(x)
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
