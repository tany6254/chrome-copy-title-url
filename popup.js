const copyFn = (text) => {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  window.navigator.clipboard
    .write(data)
    .then(() => {
      console.log("done");
    })
    .catch(() => {
      console.log("input 模式");
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select(); // 选中文本
      textarea.focus(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      document.body.removeChild(textarea);
      console.log(title, url);
    });
};

let title = "";
let url = "";
let copyText = "";

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  title = tabs[0].title;
  url = tabs[0].url;
  copyText = `${title}\n${url}`;
  document.querySelector("#title").innerHTML = `${title}`;
  document.querySelector("#url").innerHTML = `${url}`;
  copyFn(copyText);
});

document.querySelector("#copy-button").addEventListener("click", () => {
  copyFn(copyText);
});
